import type { SimResult } from "./types";

export type RuinRiskBreakdown = {
  preFire: number;
  firstTenYears: number;
  later: number;
  survived: number;
  firstTenEndAge: number;
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
  result: Pick<SimResult, "ages" | "survival" | "successRate" | "fireAge" | "endAge">,
): RuinRiskBreakdown {
  const firstTenEndAge = Math.min(result.endAge, result.fireAge + 10);
  const atFire = survivalAt(result, result.fireAge);
  const afterFirstTen = survivalAt(result, firstTenEndAge);
  const survived = clampProbability(result.successRate);

  return {
    preFire: clampProbability(1 - atFire),
    firstTenYears: clampProbability(atFire - afterFirstTen),
    later: clampProbability(afterFirstTen - survived),
    survived,
    firstTenEndAge,
  };
}
