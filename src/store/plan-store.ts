import { create } from "zustand";
import { createDefaultPlan, PRESETS } from "@/lib/fire/defaults";
import { runSimAsync, warmupWorker } from "@/lib/fire/run-sim";
import { resizeCorrelations } from "@/lib/fire/math";
import { readPlanFromLocation, sanitizePlan } from "@/lib/fire/share";
import { assetsFromWindow, windowById, type DataWindowId } from "@/lib/fire/sourced-params";
import type { AssetClass, Plan, RuinRule, SimResult } from "@/lib/fire/types";

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
  patchPlan: (patch: Partial<Plan>) => void;
  replacePlan: (plan: Plan) => void;
  updateAsset: (id: string, patch: Partial<AssetClass>) => void;
  addAsset: () => void;
  removeAsset: (id: string) => void;
  setCorrelation: (i: number, j: number, value: number) => void;
  updateRuinRule: (id: string, rule: RuinRule) => void;
  addRuinRule: (type: RuinRule["type"]) => void;
  removeRuinRule: (id: string) => void;
  applyPreset: (id: string) => void;
  applyDataWindow: (id: DataWindowId) => void;
  reroll: () => void;
  drawAnotherStory: () => void;
  reset: () => void;
  run: () => void;
  hydrate: () => void;
};

function persist(plan: Plan) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {
    /* ignore quota */
  }
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

export const usePlanStore = create<PlanState>((set, get) => ({
  plan: initialPlan,
  result: null,
  status: "idle",
  hydrated: false,
  activated: false,
  fromShare: false,
  storyNonce: 0,

  patchPlan: (patch) => {
    const plan = { ...get().plan, ...patch };
    persist(plan);
    set({ plan });
  },

  replacePlan: (plan) => {
    persist(plan);
    set({ plan });
  },

  updateAsset: (id, patch) => {
    const plan = {
      ...get().plan,
      assets: get().plan.assets.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    };
    persist(plan);
    set({ plan });
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
    persist(next);
    set({ plan: next });
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
    persist(next);
    set({ plan: next });
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
    persist(next);
    set({ plan: next });
  },

  updateRuinRule: (id, rule) => {
    const plan = {
      ...get().plan,
      ruinRules: get().plan.ruinRules.map((r) => (r.id === id ? rule : r)),
    };
    persist(plan);
    set({ plan });
  },

  addRuinRule: (type) => {
    const { plan } = get();
    const id = newId("ruin");
    let rule: RuinRule;
    if (type === "depleted") rule = { id, type, threshold: 0 };
    else if (type === "below_at_age") rule = { id, type, age: plan.endAge, amount: 0 };
    else rule = { id, type, years: 3 };
    const next = { ...plan, ruinRules: [...plan.ruinRules, rule] };
    persist(next);
    set({ plan: next });
  },

  removeRuinRule: (id) => {
    const plan = {
      ...get().plan,
      ruinRules: get().plan.ruinRules.filter((r) => r.id !== id),
    };
    persist(plan);
    set({ plan });
  },

  applyPreset: (id) => {
    const preset = PRESETS.find((p) => p.id === id);
    if (!preset) return;
    const plan = preset.apply(get().plan);
    persist(plan);
    set({ plan });
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
    persist(next);
    set({ plan: next });
  },

  reroll: () => {
    const plan = { ...get().plan, seed: (Math.random() * 0xffffffff) >>> 0 };
    persist(plan);
    skipAutoRun = true;
    set({ plan, storyNonce: 0 });
    get().run();
  },

  drawAnotherStory: () => {
    set({ storyNonce: get().storyNonce + 1 });
    get().run();
  },

  reset: () => {
    const plan = createDefaultPlan();
    persist(plan);
    set({ plan });
  },

  run: () => {
    const id = ++runGen;
    const { plan, storyNonce } = get();
    set({ status: "running", activated: true });
    void runSimAsync(plan, storyNonce)
      .then((result) => {
        if (id !== runGen) return;
        set({ result, status: "done" });
      })
      .catch((err) => {
        if (id !== runGen) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        set({ status: get().result ? "done" : "idle" });
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
      persist(shared);
      set({ plan: shared, hydrated: true, status: "idle", fromShare: true });
      return;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const plan = sanitizePlan(JSON.parse(raw) as Partial<Plan>);
        if (plan) {
          set({ plan, hydrated: true, status: "idle" });
          return;
        }
      }
    } catch {
      /* keep default */
    }
    set({ hydrated: true });
  },
}));
