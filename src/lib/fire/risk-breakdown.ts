import type { RuinRule, SimResult } from "./types";

export type RuinRiskBreakdown = {
  throughAge80: number;
  age81To100: number;
  afterAge100: number;
  survived: number;
};

function clampProbability(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function isAssetDepletionOnly(rules: RuinRule[]): boolean {
  return (
    rules.length > 0 &&
    rules.every((rule) => rule.type === "depleted" && rule.threshold === 0)
  );
}

export function wilsonInterval(successes: number, trials: number, z = 1.96): [number, number] {
  if (!Number.isFinite(trials) || trials <= 0) return [0, 1];
  const n = Math.max(1, Math.round(trials));
  const p = Math.max(0, Math.min(n, successes)) / n;
  const z2 = z * z;
  const denominator = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denominator;
  const margin =
    (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / denominator;
  return [Math.max(0, center - margin), Math.min(1, center + margin)];
}

function survivalAt(result: Pick<SimResult, "ages" | "survival">, age: number): number {
  const index = result.ages.findIndex((candidate) => candidate >= age);
  if (index < 0) return clampProbability(result.survival.at(-1) ?? 1);
  return clampProbability(result.survival[index] ?? 1);
}

export function buildRuinRiskBreakdown(
  result: Pick<SimResult, "ages" | "survival" | "successRate">,
): RuinRiskBreakdown {
  const afterAge80 = survivalAt(result, 80);
  const afterAge100 = survivalAt(result, 100);
  const survived = clampProbability(result.successRate);

  return {
    throughAge80: clampProbability(1 - afterAge80),
    age81To100: clampProbability(afterAge80 - afterAge100),
    afterAge100: clampProbability(afterAge100 - survived),
    survived,
  };
}
