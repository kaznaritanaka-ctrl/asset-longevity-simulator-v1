import { assetsFromWindow, DEFAULT_WINDOW, windowById } from "./sourced-params";
import type { AssetClass, Plan, RuinRule } from "./types";

export const ASSET_COLORS: Record<string, string> = {
  "jp-equity": "#2f4f45",
  "us-equity": "#3d5a80",
  bonds: "#7a7468",
  gold: "#8b7355",
  cash: "#b3ad9f",
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

type PhaseWeight = { accum: number; withdraw: number };

const BALANCED_WEIGHTS: Record<string, PhaseWeight> = {
  "jp-equity": { accum: 25, withdraw: 20 },
  "us-equity": { accum: 45, withdraw: 35 },
  bonds: { accum: 15, withdraw: 30 },
  gold: { accum: 10, withdraw: 10 },
  cash: { accum: 5, withdraw: 5 },
};

function applyAllocationPreset(plan: Plan, weights: Record<string, PhaseWeight>): Plan {
  return {
    ...plan,
    assets: plan.assets.map((asset) => {
      const weight = weights[asset.id];
      return {
        ...asset,
        accumWeight: weight?.accum ?? 0,
        withdrawWeight: weight?.withdraw ?? 0,
      };
    }),
  };
}

export const PRESETS: { id: string; name: string; hint: string; apply: (plan: Plan) => Plan }[] = [
  {
    id: "conservative",
    name: "保守型",
    hint: "取崩期は債券・現金を厚く。シーケンスリスクを抑える",
    apply: (plan) =>
      applyAllocationPreset(plan, {
        "jp-equity": { accum: 20, withdraw: 10 },
        "us-equity": { accum: 35, withdraw: 20 },
        bonds: { accum: 25, withdraw: 45 },
        gold: { accum: 10, withdraw: 10 },
        cash: { accum: 10, withdraw: 15 },
      }),
  },
  {
    id: "balanced",
    name: "バランス型",
    hint: "形成期は株式7割、取崩期は株式55%",
    apply: (plan) => applyAllocationPreset(plan, BALANCED_WEIGHTS),
  },
  {
    id: "equity",
    name: "株式重視",
    hint: "取崩期も株式8割。期待値は高いが破綻尾が厚い",
    apply: (plan) =>
      applyAllocationPreset(plan, {
        "jp-equity": { accum: 30, withdraw: 25 },
        "us-equity": { accum: 55, withdraw: 55 },
        bonds: { accum: 5, withdraw: 10 },
        gold: { accum: 7, withdraw: 7 },
        cash: { accum: 3, withdraw: 3 },
      }),
  },
  {
    id: "all-equity",
    name: "株式100%",
    hint: "日本株40・米国株60。債券・金・現金はゼロ",
    apply: (plan) =>
      applyAllocationPreset(plan, {
        "jp-equity": { accum: 40, withdraw: 40 },
        "us-equity": { accum: 60, withdraw: 60 },
      }),
  },
];

export function matchingPresetId(plan: Plan): string | null {
  const key = (assets: AssetClass[]) =>
    assets
      .map((a) => `${a.id}:${a.accumWeight}:${a.withdrawWeight}`)
      .sort()
      .join("|");
  const current = key(plan.assets);
  for (const p of PRESETS) {
    if (key(p.apply(plan).assets) === current) return p.id;
  }
  return null;
}
