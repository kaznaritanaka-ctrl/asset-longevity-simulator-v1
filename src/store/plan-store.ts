import { create } from "zustand";
import { createDefaultPlan, PRESETS, type Phase } from "@/lib/fire/defaults";
import { runSimAsync, warmupWorker } from "@/lib/fire/run-sim";
import { resizeCorrelations } from "@/lib/fire/math";
import { hasPlanInLocation, readPlanFromLocation, sanitizePlan } from "@/lib/fire/share";
import { assetsFromWindow, windowById, type DataWindowId } from "@/lib/fire/sourced-params";
import type { AssetClass, Plan, RuinRule, SimResult } from "@/lib/fire/types";
import { validatePlan, type PlanValidationIssue } from "@/lib/fire/validation";

const STORAGE_KEY = "shisan-jumyou-plan-v2";

const initialPlan = createDefaultPlan();

type PlanState = {
  plan: Plan;
  result: SimResult | null;
  status: "idle" | "running" | "done";
  hydrated: boolean;
  activated: boolean;
  fromShare: boolean;
  storyNonce: number;
  resultStale: boolean;
  error: string | null;
  validationIssues: PlanValidationIssue[];
  patchPlan: (patch: Partial<Plan>) => void;
  replacePlan: (plan: Plan) => void;
  updateAsset: (id: string, patch: Partial<AssetClass>) => void;
  addAsset: () => void;
  removeAsset: (id: string) => void;
  setCorrelation: (i: number, j: number, value: number) => void;
  updateRuinRule: (id: string, rule: RuinRule) => void;
  addRuinRule: (type: RuinRule["type"]) => void;
  removeRuinRule: (id: string) => void;
  applyPreset: (id: string, phase?: Phase) => void;
  applyDataWindow: (id: DataWindowId) => void;
  reroll: () => void;
  drawAnotherStory: () => void;
  reset: () => void;
  saveSharedPlan: () => void;
  restorePreviousPlan: () => void;
  run: () => void;
  hydrate: () => void;
};

let deferPersistence = false;
let planBeforeShare: Plan | null = null;

function persist(plan: Plan) {
  if (typeof window === "undefined") return;
  if (deferPersistence) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {
    /* ignore quota */
  }
}

function readStoredPlan(): Plan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizePlan(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function clearSharedPlanFromLocation() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("p");
  if (url.hash.includes("p=")) url.hash = "";
  window.history.replaceState(window.history.state, "", url);
}

function updatedPlanState(plan: Plan, result: SimResult | null) {
  persist(plan);
  return {
    plan,
    resultStale: result !== null,
    error: null,
    validationIssues: validatePlan(plan),
  };
}

function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

let runGen = 0;
let skipAutoRun = false;

export function consumeSkipAutoRun() {
  if (!skipAutoRun) return false;
  skipAutoRun = false;
  return true;
}

/** シミュレーションに効かない表示用フィールドを除いた指紋。性別は生命表だけ。 */
export function simSignature(plan: Plan): string {
  return JSON.stringify({ ...plan, sex: undefined });
}

export const usePlanStore = create<PlanState>((set, get) => ({
  plan: initialPlan,
  result: null,
  status: "idle",
  hydrated: false,
  activated: false,
  fromShare: false,
  storyNonce: 0,
  resultStale: false,
  error: null,
  validationIssues: [],

  patchPlan: (patch) => {
    const plan = { ...get().plan, ...patch };
    set(updatedPlanState(plan, get().result));
  },

  replacePlan: (plan) => {
    set(updatedPlanState(plan, get().result));
  },

  updateAsset: (id, patch) => {
    const plan = {
      ...get().plan,
      assets: get().plan.assets.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    };
    set(updatedPlanState(plan, get().result));
  },

  addAsset: () => {
    const { plan } = get();
    if (plan.assets.length >= 8) return;
    const asset: AssetClass = {
      id: newId("asset"),
      name: "新規クラス",
      kind: "equity",
      expectedReturnPct: 6,
      volatilityPct: 15,
      accumWeight: 0,
      withdrawWeight: 0,
    };
    const assets = [...plan.assets, asset];
    const next = {
      ...plan,
      assets,
      correlations: resizeCorrelations(plan.correlations, assets.length, 0.25),
    };
    set(updatedPlanState(next, get().result));
  },

  removeAsset: (id) => {
    const { plan } = get();
    if (plan.assets.length <= 1) return;
    const idx = plan.assets.findIndex((a) => a.id === id);
    if (idx < 0) return;
    const assets = plan.assets.filter((a) => a.id !== id);
    const correlations = plan.correlations
      .filter((_, i) => i !== idx)
      .map((row) => row.filter((_, j) => j !== idx));
    const next = { ...plan, assets, correlations };
    set(updatedPlanState(next, get().result));
  },

  setCorrelation: (i, j, value) => {
    const { plan } = get();
    const n = plan.correlations.length;
    if (i === j || i < 0 || j < 0 || i >= n || j >= n) return;
    const correlations = plan.correlations.map((row) => row.slice());
    const v = Math.max(-0.99, Math.min(0.99, value));
    correlations[i]![j] = v;
    correlations[j]![i] = v;
    const next = { ...plan, correlations };
    set(updatedPlanState(next, get().result));
  },

  updateRuinRule: (id, rule) => {
    const plan = {
      ...get().plan,
      ruinRules: get().plan.ruinRules.map((r) => (r.id === id ? rule : r)),
    };
    set(updatedPlanState(plan, get().result));
  },

  addRuinRule: (type) => {
    const { plan } = get();
    const id = newId("ruin");
    let rule: RuinRule;
    if (type === "depleted") rule = { id, type, threshold: 0 };
    else if (type === "below_at_age") rule = { id, type, age: plan.endAge, amount: 0 };
    else rule = { id, type, years: 3 };
    const next = { ...plan, ruinRules: [...plan.ruinRules, rule] };
    set(updatedPlanState(next, get().result));
  },

  removeRuinRule: (id) => {
    const plan = {
      ...get().plan,
      ruinRules: get().plan.ruinRules.filter((r) => r.id !== id),
    };
    set(updatedPlanState(plan, get().result));
  },

  applyPreset: (id, phase) => {
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset) return;
    const plan = preset.apply(get().plan, phase);
    set(updatedPlanState(plan, get().result));
  },

  applyDataWindow: (id) => {
    const win = windowById(id);
    const { plan } = get();
    const sourced = assetsFromWindow(win, plan.assets);
    const extras = plan.assets.filter((a) => !win.assets.some((s) => s.id === a.id));
    const assets = [...sourced, ...extras];
    const next: Plan = {
      ...plan,
      dataWindow: win.id,
      returnsAreNominal: false,
      assets,
      correlations: resizeCorrelations(win.correlations, assets.length, 0.2),
    };
    set(updatedPlanState(next, get().result));
  },

  reroll: () => {
    const plan = { ...get().plan, seed: (Math.random() * 0xffffffff) >>> 0 };
    skipAutoRun = true;
    set({ ...updatedPlanState(plan, get().result), storyNonce: 0 });
    get().run();
  },

  drawAnotherStory: () => {
    set({ storyNonce: get().storyNonce + 1 });
    get().run();
  },

  reset: () => {
    const plan = createDefaultPlan();
    deferPersistence = false;
    planBeforeShare = null;
    clearSharedPlanFromLocation();
    set({ ...updatedPlanState(plan, get().result), fromShare: false });
  },

  saveSharedPlan: () => {
    deferPersistence = false;
    planBeforeShare = null;
    clearSharedPlanFromLocation();
    persist(get().plan);
    set({ fromShare: false });
  },

  restorePreviousPlan: () => {
    const plan = planBeforeShare ?? createDefaultPlan();
    deferPersistence = false;
    planBeforeShare = null;
    clearSharedPlanFromLocation();
    persist(plan);
    set({
      plan,
      result: null,
      status: "idle",
      activated: false,
      fromShare: false,
      storyNonce: 0,
      resultStale: false,
      error: null,
      validationIssues: validatePlan(plan),
    });
  },

  run: () => {
    const id = ++runGen;
    const { plan, storyNonce, result } = get();
    const validationIssues = validatePlan(plan);
    if (validationIssues.length > 0) {
      set({
        status: result ? "done" : "idle",
        activated: true,
        resultStale: result !== null,
        error: "入力条件を確認してください。修正後に自動で再計算します。",
        validationIssues,
      });
      return;
    }
    set({
      status: "running",
      activated: true,
      resultStale: result !== null,
      error: null,
      validationIssues: [],
    });
    void runSimAsync(plan, storyNonce)
      .then((next) => {
        if (id !== runGen) return;
        set({ result: next, status: "done", resultStale: false, error: null, validationIssues: [] });
      })
      .catch((err) => {
        if (id !== runGen) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        set({
          status: get().result ? "done" : "idle",
          resultStale: get().result !== null,
          error: err instanceof Error ? err.message : "計算中にエラーが発生しました。",
        });
      });
  },

  hydrate: () => {
    if (get().hydrated) return;
    if (typeof window === "undefined") {
      set({ hydrated: true });
      return;
    }
    warmupWorker();
    const shared = readPlanFromLocation();
    if (shared) {
      planBeforeShare = readStoredPlan();
      deferPersistence = true;
      set({
        plan: shared,
        hydrated: true,
        status: "idle",
        fromShare: true,
        validationIssues: [],
        error: null,
      });
      return;
    }
    if (hasPlanInLocation()) {
      set({
        hydrated: true,
        error: "共有リンクの条件を読み込めませんでした。URLが壊れている可能性があります。",
      });
      return;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const plan = sanitizePlan(JSON.parse(raw));
        if (plan) {
          set({ plan, hydrated: true, status: "idle", validationIssues: [], error: null });
          return;
        }
        set({
          hydrated: true,
          error: "保存されていた条件が不正なため、初期値を使用しています。",
        });
        return;
      }
    } catch {
      set({
        hydrated: true,
        error: "保存されていた条件を読み込めないため、初期値を使用しています。",
      });
      return;
    }
    set({ hydrated: true });
  },
}));
