import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createDefaultPlan } from "./defaults.ts";
import { simulate } from "./engine.ts";
import type { AssetClass, Plan } from "./types.ts";

function oneAsset(partial: Partial<AssetClass> = {}): AssetClass {
  return {
    id: "only",
    name: "only",
    kind: "equity",
    expectedReturnPct: 5,
    volatilityPct: 0,
    accumWeight: 100,
    withdrawWeight: 100,
    ...partial,
  };
}

function basePlan(patch: Partial<Plan> = {}): Plan {
  const plan = createDefaultPlan();
  return {
    ...plan,
    returnsAreNominal: false,
    inflationPct: 0,
    annualContribution: 0,
    annualSpend: 0,
    annualPension: 0,
    assets: [oneAsset()],
    correlations: [[1]],
    trials: 200,
    seed: 1,
    ruinRules: [{ id: "d", type: "depleted", threshold: 0 }],
    ...patch,
  };
}

describe("simulate", () => {
  it("grows deterministically with zero volatility", () => {
    const plan = basePlan({
      currentAge: 40,
      fireAge: 50,
      endAge: 50,
      currentAssets: 10_000,
      assets: [oneAsset({ expectedReturnPct: 5, volatilityPct: 0 })],
    });
    const result = simulate(plan);
    const expected = 10_000 * Math.pow(1.05, 10);
    assert.equal(result.trials, 200);
    assert.ok(Math.abs(result.terminal.p50 - expected) < 1e-6);
    assert.equal(result.ruinCount, 0);
  });

  it("marks ruin when spending exhausts a zero-return portfolio", () => {
    const plan = basePlan({
      currentAge: 60,
      fireAge: 60,
      endAge: 65,
      currentAssets: 1_000,
      annualSpend: 400,
      assets: [oneAsset({ expectedReturnPct: 0, volatilityPct: 0 })],
    });
    const result = simulate(plan);
    assert.equal(result.ruinCount, 200);
    assert.equal(result.successRate, 0);
    assert.ok(result.medianRuinAge !== null);
  });

  it("adds contributions during accumulation only", () => {
    const plan = basePlan({
      currentAge: 40,
      fireAge: 42,
      endAge: 42,
      currentAssets: 100,
      annualContribution: 50,
      assets: [oneAsset({ expectedReturnPct: 0, volatilityPct: 0 })],
    });
    const result = simulate(plan);
    assert.ok(Math.abs(result.terminal.p50 - 200) < 1e-6);
  });

  it("treats checkpoint ruin at a given age", () => {
    const plan = basePlan({
      currentAge: 90,
      fireAge: 90,
      endAge: 100,
      currentAssets: 500,
      annualSpend: 40,
      assets: [oneAsset({ expectedReturnPct: 0, volatilityPct: 0 })],
      ruinRules: [{ id: "c", type: "below_at_age", age: 100, amount: 50 }],
    });
    const result = simulate(plan);
    // 500 - 40*10 = 100, which is above 50 → survive
    assert.equal(result.ruinCount, 0);

    const doomed = basePlan({
      currentAge: 90,
      fireAge: 90,
      endAge: 100,
      currentAssets: 500,
      annualSpend: 50,
      assets: [oneAsset({ expectedReturnPct: 0, volatilityPct: 0 })],
      ruinRules: [{ id: "c", type: "below_at_age", age: 100, amount: 50 }],
    });
    const r2 = simulate(doomed);
    assert.equal(r2.ruinCount, 200);
  });
});
