import type { SimResult } from "./types";

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
