import { createDefaultPlan, matchingPresetId, PRESETS } from "./defaults";
import { formatPct } from "./format";
import { assetsFromWindow, windowById, type DataWindowId } from "./sourced-params";
import type { AssetClass, AssetKind, Plan, RuinRule, SimResult } from "./types";
import { sanitizePlan } from "./validation";

export { sanitizePlan } from "./validation";

const WINDOW_CODE: Record<DataWindowId, string> = { long: "l", postwar: "p", float: "f" };
const WINDOW_FROM: Record<string, DataWindowId> = { l: "long", p: "postwar", f: "float" };
const PRESET_CODE: Record<string, string> = {
  equity: "e",
  conservative: "c",
  "all-equity": "q",
};
const PRESET_FROM: Record<string, string> = { e: "equity", c: "conservative", q: "all-equity" };
const KIND_CODE: Record<AssetKind, string> = { equity: "e", bond: "b", cash: "c", alt: "a" };
const KIND_FROM: Record<string, AssetKind> = { e: "equity", b: "bond", c: "cash", a: "alt" };

type Compact = {
  a?: number;
  f?: number;
  h?: number;
  x?: 1;
  k?: number;
  c?: number;
  d?: number;
  g?: number;
  n?: number;
  i?: number;
  t?: number;
  m?: 1;
  w?: string;
  p?: string;
  wt?: number[];
  as?: CompactAsset[];
  co?: number[][];
  ru?: CompactRuin[];
};

type CompactAsset = [string, string, string, number, number, number, number];
type CompactRuin = [string, ...number[]];

function nearly(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-6;
}

function sameCorr(a: number[][], b: number[][]): boolean {
  if (a.length !== b.length) return false;
  return a.every(
    (row, i) => row.length === b[i]!.length && row.every((v, j) => nearly(v, b[i]![j]!)),
  );
}

function catalogAssets(plan: Plan): AssetClass[] {
  return assetsFromWindow(windowById(plan.dataWindow));
}

function statsMatchCatalog(plan: Plan): boolean {
  const cat = catalogAssets(plan);
  if (plan.assets.length !== cat.length) return false;
  return plan.assets.every((a, i) => {
    const c = cat[i]!;
    return (
      a.id === c.id &&
      a.kind === c.kind &&
      a.name === c.name &&
      nearly(a.expectedReturnPct, c.expectedReturnPct) &&
      nearly(a.volatilityPct, c.volatilityPct)
    );
  });
}

function weightsMatch(plan: Plan, other: AssetClass[]): boolean {
  if (plan.assets.length !== other.length) return false;
  return plan.assets.every(
    (a, i) =>
      nearly(a.accumWeight, other[i]!.accumWeight) &&
      nearly(a.withdrawWeight, other[i]!.withdrawWeight),
  );
}

function defaultRuin(): RuinRule[] {
  return createDefaultPlan().ruinRules;
}

function ruinSignature(rules: RuinRule[]): string {
  return rules
    .map((r) => {
      if (r.type === "depleted") return `d:${r.threshold}`;
      if (r.type === "below_at_age") return `b:${r.age}:${r.amount}`;
      return `y:${r.years}`;
    })
    .join("|");
}

function packRuin(rules: RuinRule[]): CompactRuin[] {
  return rules.map((r) => {
    if (r.type === "depleted") return ["d", r.threshold];
    if (r.type === "below_at_age") return ["b", r.age, r.amount];
    return ["y", r.years];
  });
}

function unpackRuin(rows: CompactRuin[]): RuinRule[] {
  return rows.map((row, i) => {
    const [type, ...nums] = row;
    if (type === "b")
      return { id: `b-${i}`, type: "below_at_age", age: nums[0] ?? 100, amount: nums[1] ?? 0 };
    if (type === "y") return { id: `y-${i}`, type: "years_of_spend", years: nums[0] ?? 1 };
    return { id: `d-${i}`, type: "depleted", threshold: nums[0] ?? 0 };
  });
}

export function compactPlan(plan: Plan): Compact {
  const def = createDefaultPlan();
  const out: Compact = {};
  if (plan.currentAge !== def.currentAge) out.a = plan.currentAge;
  if (plan.fireAge !== def.fireAge) out.f = plan.fireAge;
  if (plan.endAge !== def.endAge) out.h = plan.endAge;
  if (plan.sex === "female") out.x = 1;
  if (plan.currentAssets !== def.currentAssets) out.k = plan.currentAssets;
  if (plan.annualContribution !== def.annualContribution) out.c = plan.annualContribution;
  if (plan.annualSpend !== def.annualSpend) out.d = plan.annualSpend;
  if (plan.pensionAge !== def.pensionAge) out.g = plan.pensionAge;
  if (plan.annualPension !== def.annualPension) out.n = plan.annualPension;
  if (plan.inflationPct !== def.inflationPct) out.i = plan.inflationPct;
  if (plan.taxRatePct !== def.taxRatePct) out.t = plan.taxRatePct;
  if (plan.returnsAreNominal) out.m = 1;
  if (plan.dataWindow !== def.dataWindow) out.w = WINDOW_CODE[plan.dataWindow] ?? plan.dataWindow;

  const cat = catalogAssets(plan);
  if (statsMatchCatalog(plan)) {
    const preset = matchingPresetId(plan);
    if (preset && preset !== "balanced") out.p = PRESET_CODE[preset];
    else if (!weightsMatch(plan, cat)) {
      out.wt = plan.assets.flatMap((a) => [a.accumWeight, a.withdrawWeight]);
    }
  } else {
    out.as = plan.assets.map((a) => [
      a.id,
      KIND_CODE[a.kind],
      a.name,
      a.expectedReturnPct,
      a.volatilityPct,
      a.accumWeight,
      a.withdrawWeight,
    ]);
  }

  const win = windowById(plan.dataWindow);
  if (!sameCorr(plan.correlations, win.correlations)) out.co = plan.correlations;

  if (ruinSignature(plan.ruinRules) !== ruinSignature(defaultRuin()))
    out.ru = packRuin(plan.ruinRules);
  return out;
}

export function expandPlan(raw: Compact): Plan {
  let plan = createDefaultPlan();
  const windowId = (raw.w && WINDOW_FROM[raw.w]) || (raw.w as DataWindowId | undefined);
  if (windowId === "long" || windowId === "postwar" || windowId === "float") {
    const win = windowById(windowId);
    plan = {
      ...plan,
      dataWindow: windowId,
      assets: assetsFromWindow(win),
      correlations: win.correlations.map((row) => row.slice()),
    };
  }

  const presetId = raw.p ? PRESET_FROM[raw.p] : undefined;
  if (presetId) {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (preset) plan = preset.apply(plan);
  } else if (raw.wt && raw.wt.length >= 2) {
    plan = {
      ...plan,
      assets: plan.assets.map((a, i) => ({
        ...a,
        accumWeight: raw.wt![i * 2] ?? a.accumWeight,
        withdrawWeight: raw.wt![i * 2 + 1] ?? a.withdrawWeight,
      })),
    };
  }

  if (raw.as?.length) {
    plan = {
      ...plan,
      assets: raw.as.map((row, i) => ({
        id: row[0] || `a-${i}`,
        kind: KIND_FROM[row[1]] ?? "alt",
        name: row[2] || `資産${i + 1}`,
        expectedReturnPct: row[3] ?? 0,
        volatilityPct: row[4] ?? 0,
        accumWeight: row[5] ?? 0,
        withdrawWeight: row[6] ?? 0,
      })),
    };
  }

  if (raw.co) plan = { ...plan, correlations: raw.co };
  if (raw.ru) plan = { ...plan, ruinRules: unpackRuin(raw.ru) };
  if (raw.a != null) plan.currentAge = raw.a;
  if (raw.f != null) plan.fireAge = raw.f;
  if (raw.h != null) plan.endAge = raw.h;
  if (raw.x === 1) plan.sex = "female";
  if (raw.k != null) plan.currentAssets = raw.k;
  if (raw.c != null) plan.annualContribution = raw.c;
  if (raw.d != null) plan.annualSpend = raw.d;
  if (raw.g != null) plan.pensionAge = raw.g;
  if (raw.n != null) plan.annualPension = raw.n;
  if (raw.i != null) plan.inflationPct = raw.i;
  if (raw.t != null) plan.taxRatePct = raw.t;
  if (raw.m === 1) plan.returnsAreNominal = true;
  return plan;
}

function toB64url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(raw: string): Uint8Array {
  const pad = raw.length % 4 === 0 ? "" : "=".repeat(4 - (raw.length % 4));
  const b64 = raw.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export function encodePlan(plan: Plan): string {
  const json = JSON.stringify(compactPlan(plan));
  return `c1.${toB64url(new TextEncoder().encode(json))}`;
}

export function decodePlan(token: string): Plan | null {
  try {
    if (token.startsWith("c1.")) {
      const json = new TextDecoder().decode(fromB64url(token.slice(3)));
      return sanitizePlan(expandPlan(JSON.parse(json) as Compact));
    }
    const json = new TextDecoder().decode(fromB64url(token));
    return sanitizePlan(JSON.parse(json) as Partial<Plan>);
  } catch {
    return null;
  }
}

export function hasPlanInLocation(): boolean {
  if (typeof window === "undefined") return false;
  return (
    new URLSearchParams(window.location.search).has("p") || window.location.hash.includes("p=")
  );
}

export function readPlanFromLocation(): Plan | null {
  if (typeof window === "undefined") return null;
  const fromQuery = new URLSearchParams(window.location.search).get("p");
  const hashRaw = window.location.hash.replace(/^#/, "");
  const fromHash = hashRaw.startsWith("p=")
    ? hashRaw.slice(2)
    : new URLSearchParams(hashRaw.includes("=") ? hashRaw : "").get("p");
  const token = fromQuery || fromHash;
  if (!token) return null;
  return decodePlan(token);
}

export function buildShareUrl(plan: Plan, href = window.location.href): string {
  const url = new URL(href);
  url.searchParams.delete("p");
  url.hash = `p=${encodePlan(plan)}`;
  return url.toString();
}

export function buildPublicUrl(href = window.location.href): string {
  const url = new URL(href);
  url.searchParams.delete("p");
  url.hash = "";
  return url.toString();
}

export function buildTweetText(plan: Plan, result: SimResult | null, url: string): string {
  const rate = result ? formatPct(result.successRate, 1) : "—";
  const label = result?.failureMode === "custom" ? "計画達成率" : "資産が持つ割合";
  const lines = [
    `資産寿命シミュレーター｜${plan.endAge}歳までの${label}は${rate}でした`,
    url,
  ];
  return lines.join("\n");
}

export function tweetIntentUrl(text: string): string {
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
