import {
  assetsFromWindow,
  DEFAULT_WINDOW,
  windowById,
} from "./sourced-params";
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

export const PRESETS: { id: string; name: string; hint: string; apply: (plan: Plan) => Plan }[] = [
  {
    id: "conservative",
    name: "保守型",
    hint: "取崩期は債券・現金を厚く。シーケンスリスクを抑える",
    apply: (plan) => ({
      ...plan,
      assets: plan.assets.map((a) => {
        if (a.id === "jp-equity") return { ...a, accumWeight: 20, withdrawWeight: 10 };
        if (a.id === "us-equity") return { ...a, accumWeight: 35, withdrawWeight: 20 };
        if (a.id === "bonds") return { ...a, accumWeight: 25, withdrawWeight: 45 };
        if (a.id === "gold") return { ...a, accumWeight: 10, withdrawWeight: 10 };
        return { ...a, accumWeight: 10, withdrawWeight: 15 };
      }),
    }),
  },
  {
    id: "balanced",
    name: "バランス型",
    hint: "形成期は株式7割、取崩期は株式55%",
    apply: (plan) => ({
      ...plan,
      assets: assetsFromWindow(windowById(plan.dataWindow)),
    }),
  },
  {
    id: "equity",
    name: "株式重視",
    hint: "取崩期も株式8割。期待値は高いが破綻尾が厚い",
    apply: (plan) => ({
      ...plan,
      assets: plan.assets.map((a) => {
        if (a.id === "jp-equity") return { ...a, accumWeight: 30, withdrawWeight: 25 };
        if (a.id === "us-equity") return { ...a, accumWeight: 55, withdrawWeight: 55 };
        if (a.id === "bonds") return { ...a, accumWeight: 5, withdrawWeight: 10 };
        if (a.id === "gold") return { ...a, accumWeight: 7, withdrawWeight: 7 };
        return { ...a, accumWeight: 3, withdrawWeight: 3 };
      }),
    }),
  },
  {
    id: "all-equity",
    name: "株式100%",
    hint: "日本株40・米国株60。債券・金・現金はゼロ",
    apply: (plan) => ({
      ...plan,
      assets: plan.assets.map((a) => {
        if (a.id === "jp-equity") return { ...a, accumWeight: 40, withdrawWeight: 40 };
        if (a.id === "us-equity") return { ...a, accumWeight: 60, withdrawWeight: 60 };
        return { ...a, accumWeight: 0, withdrawWeight: 0 };
      }),
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
