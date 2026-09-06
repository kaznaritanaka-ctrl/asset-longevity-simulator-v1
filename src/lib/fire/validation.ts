import { createDefaultPlan } from "./defaults";
import { makePositiveDefinite } from "./math";
import type { AssetClass, AssetKind, Plan, RuinRule, Sex } from "./types";

export type PlanValidationIssue = {
  field: string;
  message: string;
};

const ASSET_KINDS: AssetKind[] = ["equity", "bond", "cash", "alt"];
const MAX_AMOUNT = 1_000_000_000_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function finiteNumber(value: unknown, fallback: number): number | null {
  const candidate = value == null ? fallback : value;
  return typeof candidate === "number" && Number.isFinite(candidate) ? candidate : null;
}

function readAsset(value: unknown): AssetClass | null {
  if (!isRecord(value)) return null;
  const expectedReturnPct = finiteNumber(value.expectedReturnPct, Number.NaN);
  const volatilityPct = finiteNumber(value.volatilityPct, Number.NaN);
  const accumWeight = finiteNumber(value.accumWeight, Number.NaN);
  const withdrawWeight = finiteNumber(value.withdrawWeight, Number.NaN);
  if (
    typeof value.id !== "string" ||
    typeof value.name !== "string" ||
    !ASSET_KINDS.includes(value.kind as AssetKind) ||
    expectedReturnPct == null ||
    volatilityPct == null ||
    accumWeight == null ||
    withdrawWeight == null
  ) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    kind: value.kind as AssetKind,
    expectedReturnPct,
    volatilityPct,
    accumWeight,
    withdrawWeight,
  };
}

function readRuinRule(value: unknown, index: number): RuinRule | null {
  if (!isRecord(value) || typeof value.type !== "string") return null;
  const id = typeof value.id === "string" && value.id ? value.id : `rule-${index}`;
  if (value.type === "depleted") {
    const threshold = finiteNumber(value.threshold, Number.NaN);
    return threshold == null ? null : { id, type: "depleted", threshold };
  }
  if (value.type === "below_at_age") {
    const age = finiteNumber(value.age, Number.NaN);
    const amount = finiteNumber(value.amount, Number.NaN);
    return age == null || amount == null
      ? null
      : { id, type: "below_at_age", age: Math.round(age), amount };
  }
  if (value.type === "years_of_spend") {
    const years = finiteNumber(value.years, Number.NaN);
    return years == null ? null : { id, type: "years_of_spend", years };
  }
  return null;
}

export function validatePlan(plan: Plan): PlanValidationIssue[] {
  const issues: PlanValidationIssue[] = [];
  const add = (field: string, message: string) => issues.push({ field, message });
  const amountFields: [keyof Plan, string][] = [
    ["currentAssets", "金融資産"],
    ["annualContribution", "年間積立"],
    ["annualSpend", "年間支出"],
    ["annualPension", "年金額"],
  ];

  for (const [field, label] of amountFields) {
    const value = plan[field];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > MAX_AMOUNT) {
      add(String(field), `${label}は0以上の有限な金額で入力してください。`);
    }
  }
  if (!Number.isInteger(plan.currentAge) || plan.currentAge < 18 || plan.currentAge > 109) {
    add("currentAge", "現在年齢は18〜109歳の整数で入力してください。");
  }
  if (!Number.isInteger(plan.fireAge) || plan.fireAge < plan.currentAge || plan.fireAge > 109) {
    add("fireAge", "FIRE年齢は現在年齢以上、109歳以下で入力してください。");
  }
  if (!Number.isInteger(plan.endAge) || plan.endAge < plan.fireAge || plan.endAge > 110) {
    add("endAge", "終了年齢はFIRE年齢以上、110歳以下で入力してください。");
  }
  if (!Number.isInteger(plan.pensionAge) || plan.pensionAge < 18 || plan.pensionAge > 110) {
    add("pensionAge", "年金開始年齢は18〜110歳の整数で入力してください。");
  }
  if (!Number.isFinite(plan.inflationPct) || plan.inflationPct <= -100 || plan.inflationPct > 100) {
    add("inflationPct", "インフレ率は−100%より大きく、100%以下で入力してください。");
  }
  if (!Number.isFinite(plan.taxRatePct) || plan.taxRatePct < 0 || plan.taxRatePct > 90) {
    add("taxRatePct", "売却税率は0〜90%で入力してください。");
  }
  if (!Number.isInteger(plan.trials) || plan.trials < 200 || plan.trials > 20_000) {
    add("trials", "試行回数は200〜20,000回の整数で入力してください。");
  }
  if (!Number.isInteger(plan.seed) || plan.seed < 0 || plan.seed > 0xffffffff) {
    add("seed", "乱数シードが不正です。");
  }
  if (!Array.isArray(plan.assets) || plan.assets.length < 1 || plan.assets.length > 8) {
    add("assets", "資産クラスは1〜8件にしてください。");
  } else {
    const ids = new Set<string>();
    for (const [index, asset] of plan.assets.entries()) {
      const prefix = `assets.${index}`;
      if (!asset.id || ids.has(asset.id)) add(prefix, "資産クラスのIDが空または重複しています。");
      ids.add(asset.id);
      if (!asset.name.trim()) add(prefix, "資産クラス名を入力してください。");
      if (
        !Number.isFinite(asset.expectedReturnPct) ||
        asset.expectedReturnPct < -95 ||
        asset.expectedReturnPct > 500
      ) {
        add(prefix, `${asset.name || "資産"}の期待リターンは−95〜500%で入力してください。`);
      }
      if (
        !Number.isFinite(asset.volatilityPct) ||
        asset.volatilityPct < 0 ||
        asset.volatilityPct > 300
      ) {
        add(prefix, `${asset.name || "資産"}のリスクは0〜300%で入力してください。`);
      }
      if (!Number.isFinite(asset.accumWeight) || asset.accumWeight < 0) {
        add(prefix, `${asset.name || "資産"}の形成期配分は0以上で入力してください。`);
      }
      if (!Number.isFinite(asset.withdrawWeight) || asset.withdrawWeight < 0) {
        add(prefix, `${asset.name || "資産"}の取り崩し期配分は0以上で入力してください。`);
      }
    }
    if (plan.assets.every((asset) => asset.accumWeight === 0)) {
      add("assets.accumWeight", "形成期配分を少なくとも1つ設定してください。");
    }
    if (plan.assets.every((asset) => asset.withdrawWeight === 0)) {
      add("assets.withdrawWeight", "取り崩し期配分を少なくとも1つ設定してください。");
    }
  }
  if (
    plan.correlations.length !== plan.assets.length ||
    plan.correlations.some((row) => row.length !== plan.assets.length)
  ) {
    add("correlations", "相関行列と資産クラスの数が一致していません。");
  }
  for (const rule of plan.ruinRules) {
    if (rule.type === "depleted" && (!Number.isFinite(rule.threshold) || rule.threshold < 0)) {
      add(`ruinRules.${rule.id}`, "資産枯渇の閾値は0以上で入力してください。");
    } else if (rule.type === "below_at_age") {
      if (!Number.isInteger(rule.age) || rule.age < plan.currentAge || rule.age > plan.endAge) {
        add(`ruinRules.${rule.id}`, "チェックポイント年齢は計算期間内の整数にしてください。");
      }
      if (!Number.isFinite(rule.amount) || rule.amount < 0) {
        add(`ruinRules.${rule.id}`, "チェックポイント金額は0以上で入力してください。");
      }
    } else if (
      rule.type === "years_of_spend" &&
      (!Number.isFinite(rule.years) || rule.years <= 0 || rule.years > 100)
    ) {
      add(`ruinRules.${rule.id}`, "支出年数は0より大きく100以下で入力してください。");
    }
  }
  return issues;
}

export function sanitizePlan(value: unknown): Plan | null {
  if (!isRecord(value) || !Array.isArray(value.assets) || value.assets.length === 0) return null;
  const defaults = createDefaultPlan();
  const assets = value.assets.map(readAsset);
  if (assets.some((asset) => asset == null)) return null;
  const ruinInput = value.ruinRules == null ? defaults.ruinRules : value.ruinRules;
  if (!Array.isArray(ruinInput)) return null;
  const ruinRules = ruinInput.map(readRuinRule);
  if (ruinRules.some((rule) => rule == null)) return null;

  const number = (field: keyof Plan, round = false) => {
    const result = finiteNumber(value[field as string], defaults[field] as number);
    return result == null ? null : round ? Math.round(result) : result;
  };
  const currentAge = number("currentAge", true);
  const fireAge = number("fireAge", true);
  const endAge = number("endAge", true);
  const pensionAge = number("pensionAge", true);
  const currentAssets = number("currentAssets");
  const annualContribution = number("annualContribution");
  const annualSpend = number("annualSpend");
  const annualPension = number("annualPension");
  const inflationPct = number("inflationPct");
  const taxRatePct = number("taxRatePct");
  const trials = number("trials", true);
  const seed = number("seed", true);
  const numbers = [
    currentAge,
    fireAge,
    endAge,
    pensionAge,
    currentAssets,
    annualContribution,
    annualSpend,
    annualPension,
    inflationPct,
    taxRatePct,
    trials,
    seed,
  ];
  if (numbers.some((candidate) => candidate == null)) return null;

  const correlationInput = Array.isArray(value.correlations)
    ? value.correlations.map((row) => (Array.isArray(row) ? row : []))
    : defaults.correlations;
  const plan: Plan = {
    ...defaults,
    currentAge: currentAge!,
    fireAge: fireAge!,
    endAge: endAge!,
    sex: value.sex === "female" ? "female" : ("male" as Sex),
    currentAssets: currentAssets!,
    annualContribution: annualContribution!,
    annualSpend: annualSpend!,
    pensionAge: pensionAge!,
    annualPension: annualPension!,
    inflationPct: inflationPct!,
    taxRatePct: taxRatePct!,
    returnsAreNominal:
      typeof value.returnsAreNominal === "boolean"
        ? value.returnsAreNominal
        : defaults.returnsAreNominal,
    dataWindow:
      value.dataWindow === "postwar" || value.dataWindow === "float" ? value.dataWindow : "long",
    assets: assets as AssetClass[],
    correlations: makePositiveDefinite(correlationInput as number[][], assets.length),
    trials: trials!,
    seed: seed!,
    ruinRules: ruinRules as RuinRule[],
  };
  return validatePlan(plan).length === 0 ? plan : null;
}
