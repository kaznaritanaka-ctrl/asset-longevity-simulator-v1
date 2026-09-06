import { assetsFromWindow, DEFAULT_WINDOW, windowById } from "./sourced-params";
import type { AssetClass, Plan, RuinRule } from "./types";

export const ASSET_COLORS: Record<string, string> = {
  "jp-equity": "#2f4f45",
  "us-equity": "#3d5a80",
  bonds: "#7a7468",
  gold: "#8b7355",
  cash: "#b3ad9f",
};

export const ASSET_LABELS: Record<string, string> = {
  "jp-equity": "日本株",
  "us-equity": "米国株",
  bonds: "債券",
  gold: "金",
  cash: "現金",
};

export function defaultAssets(): AssetClass[] {
  return assetsFromWindow(windowById(DEFAULT_WINDOW));
}

export function defaultCorrelations(): number[][] {
  return windowById(DEFAULT_WINDOW).correlations.map((row) => row.slice());
}

export function defaultRuinRules(): RuinRule[] {
  return [{ id: "depleted-0", type: "depleted", threshold: 0 }];
}

export function createDefaultPlan(): Plan {
  const win = windowById(DEFAULT_WINDOW);
  return {
    currentAge: 40,
    fireAge: 55,
    endAge: 100,
    sex: "male",
    currentAssets: 8000,
    annualContribution: 240,
    annualSpend: 420,
    pensionAge: 65,
    annualPension: 180,
    inflationPct: 2,
    taxRatePct: 20,
    returnsAreNominal: false,
    dataWindow: win.id,
    assets: assetsFromWindow(win),
    correlations: win.correlations.map((row) => row.slice()),
    trials: 3000,
    seed: 20260831,
    ruinRules: defaultRuinRules(),
  };
}

export type Phase = "accum" | "withdraw";
type PhaseWeight = { accum: number; withdraw: number };

const CONSERVATIVE_WEIGHTS: Record<string, PhaseWeight> = {
  "jp-equity": { accum: 20, withdraw: 10 },
  "us-equity": { accum: 35, withdraw: 20 },
  bonds: { accum: 25, withdraw: 45 },
  gold: { accum: 10, withdraw: 10 },
  cash: { accum: 10, withdraw: 15 },
};

const BALANCED_WEIGHTS: Record<string, PhaseWeight> = {
  "jp-equity": { accum: 25, withdraw: 20 },
  "us-equity": { accum: 45, withdraw: 35 },
  bonds: { accum: 15, withdraw: 30 },
  gold: { accum: 10, withdraw: 10 },
  cash: { accum: 5, withdraw: 5 },
};

const EQUITY_WEIGHTS: Record<string, PhaseWeight> = {
  "jp-equity": { accum: 30, withdraw: 25 },
  "us-equity": { accum: 55, withdraw: 55 },
  bonds: { accum: 5, withdraw: 10 },
  gold: { accum: 7, withdraw: 7 },
  cash: { accum: 3, withdraw: 3 },
};

const ALL_EQUITY_WEIGHTS: Record<string, PhaseWeight> = {
  "jp-equity": { accum: 40, withdraw: 40 },
  "us-equity": { accum: 60, withdraw: 60 },
};

function applyAllocationPreset(plan: Plan, weights: Record<string, PhaseWeight>, phase?: Phase): Plan {
  return {
    ...plan,
    assets: plan.assets.map((asset) => {
      const weight = weights[asset.id];
      if (phase === "accum") {
        return { ...asset, accumWeight: weight?.accum ?? 0 };
      }
      if (phase === "withdraw") {
        return { ...asset, withdrawWeight: weight?.withdraw ?? 0 };
      }
      return {
        ...asset,
        accumWeight: weight?.accum ?? 0,
        withdrawWeight: weight?.withdraw ?? 0,
      };
    }),
  };
}

export const PRESETS: {
  id: string;
  name: string;
  hint: string;
  weights: Record<string, PhaseWeight>;
  apply: (plan: Plan, phase?: Phase) => Plan;
}[] = [
  {
    id: "conservative",
    name: "保守型",
    hint: "取崩期は債券・現金を厚く。シーケンスリスクを抑える",
    weights: CONSERVATIVE_WEIGHTS,
    apply: (plan, phase) => applyAllocationPreset(plan, CONSERVATIVE_WEIGHTS, phase),
  },
  {
    id: "balanced",
    name: "バランス型",
    hint: "形成期は株式7割、取崩期は株式55%",
    weights: BALANCED_WEIGHTS,
    apply: (plan, phase) => applyAllocationPreset(plan, BALANCED_WEIGHTS, phase),
  },
  {
    id: "equity",
    name: "株式重視",
    hint: "取崩期も株式8割。期待値は高いが資産枯渇の尾が厚い",
    weights: EQUITY_WEIGHTS,
    apply: (plan, phase) => applyAllocationPreset(plan, EQUITY_WEIGHTS, phase),
  },
  {
    id: "all-equity",
    name: "株式100%",
    hint: "日本株40・米国株60。債券・金・現金はゼロ",
    weights: ALL_EQUITY_WEIGHTS,
    apply: (plan, phase) => applyAllocationPreset(plan, ALL_EQUITY_WEIGHTS, phase),
  },
];

function phaseKey(assets: AssetClass[], phase: Phase): string {
  return assets
    .map((a) => `${a.id}:${phase === "accum" ? a.accumWeight : a.withdrawWeight}`)
    .sort()
    .join("|");
}

export function matchingPhasePresetId(plan: Plan, phase: Phase): string | null {
  const current = phaseKey(plan.assets, phase);
  for (const p of PRESETS) {
    if (phaseKey(p.apply(plan, phase).assets, phase) === current) return p.id;
  }
  return null;
}

export function matchingPresetId(plan: Plan): string | null {
  const accum = matchingPhasePresetId(plan, "accum");
  const withdraw = matchingPhasePresetId(plan, "withdraw");
  if (accum && accum === withdraw) return accum;
  return null;
}
