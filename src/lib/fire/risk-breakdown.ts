import type { RuinRule, SimResult } from "./types";

export type RuinRiskBreakdown = {
  throughAge80: number;
  age81To100: number;
  afterAge100: number;
  survived: number;
  counts: {
    throughAge80: number;
    age81To100: number;
    afterAge100: number;
    survived: number;
  };
};

function clampProbability(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function isAssetDepletionOnly(rules: RuinRule[]): boolean {
  return (
    rules.length > 0 && rules.every((rule) => rule.type === "depleted" && rule.threshold === 0)
  );
}

export function wilsonInterval(successes: number, trials: number, z = 1.96): [number, number] {
  if (!Number.isFinite(trials) || trials <= 0) return [0, 1];
  const n = Math.max(1, Math.round(trials));
  const p = Math.max(0, Math.min(n, successes)) / n;
  const z2 = z * z;
  const denominator = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denominator;
  const margin = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denominator;
  return [Math.max(0, center - margin), Math.min(1, center + margin)];
}

export function buildRuinRiskBreakdown(
  result: Pick<SimResult, "trials" | "periodFailureCounts">,
): RuinRiskBreakdown {
  const trials = Math.max(0, Math.round(result.trials));
  const throughAge80 = Math.max(0, Math.round(result.periodFailureCounts.throughAge80));
  const age81To100 = Math.max(0, Math.round(result.periodFailureCounts.age81To100));
  const afterAge100 = Math.max(0, Math.round(result.periodFailureCounts.afterAge100));
  const survived = Math.max(0, trials - throughAge80 - age81To100 - afterAge100);
  const rate = (count: number) => (trials > 0 ? clampProbability(count / trials) : 0);

  return {
    throughAge80: rate(throughAge80),
    age81To100: rate(age81To100),
    afterAge100: rate(afterAge100),
    survived: trials > 0 ? rate(survived) : 1,
    counts: { throughAge80, age81To100, afterAge100, survived },
  };
}
