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
    taxRatePct: 0,
    assets: [oneAsset()],
    correlations: [[1]],
    trials: 200,
    seed: 1,
    ruinRules: [{ id: "d", type: "depleted", threshold: 0 }],
    ...patch,
  };
}

describe("simulate", () => {
  it("is fully reproducible for the same plan and seed", () => {
    const plan = basePlan({
      currentAge: 40,
      fireAge: 45,
      endAge: 55,
      assets: [oneAsset({ volatilityPct: 18 })],
      seed: 42,
    });

    assert.deepEqual(simulate(plan), simulate(plan));
  });

  it("preserves the existing seeded result while collecting drawdowns", () => {
    const result = simulate(
      basePlan({
        currentAge: 40,
        fireAge: 45,
        endAge: 55,
        currentAssets: 1_000,
        annualSpend: 100,
        assets: [oneAsset({ expectedReturnPct: 5, volatilityPct: 18 })],
        seed: 42,
      }),
    );

    assert.equal(result.successRate, 0.75);
    assert.equal(result.ruinCount, 50);
    assert.ok(Math.abs(result.terminal.p50 - 606.0799132260884) < 1e-9);
    assert.ok(Math.abs(result.terminal.p90 - 2132.4471196359837) < 1e-9);
    assert.deepEqual(result.periodFailureCounts, {
      throughAge80: 50,
      age81To100: 0,
      afterAge100: 0,
    });
    assert.equal(result.ruinStory?.trialIndex, 96);
    assert.equal(result.ruinStory?.ruinAge, 53);
    assert.equal(result.medianStory?.trialIndex, 81);
    assert.equal(result.periodStories.throughAge80?.trialIndex, 96);
  });

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

  it("returns an empty drawdown summary when there is no simulation period", () => {
    const result = simulate(basePlan({ currentAge: 40, fireAge: 40, endAge: 40 }));
    assert.deepEqual(result.balanceDrawdown, {
      median: 0,
      experienced30Pct: 0,
      experienced50Pct: 0,
    });
  });

  it("excludes a formation-period loss from the FIRE-period aggregation", () => {
    const falling = oneAsset({
      id: "falling",
      expectedReturnPct: -50,
      accumWeight: 100,
      withdrawWeight: 0,
    });
    const rising = oneAsset({
      id: "rising",
      expectedReturnPct: 10,
      accumWeight: 0,
      withdrawWeight: 100,
    });
    const result = simulate(
      basePlan({
        currentAge: 40,
        fireAge: 41,
        endAge: 42,
        currentAssets: 100,
        assets: [falling, rising],
        correlations: [
          [1, 0],
          [0, 1],
        ],
      }),
    );

    assert.ok(Math.abs(result.terminal.p50 - 55) < 1e-9);
    assert.deepEqual(result.balanceDrawdown, {
      median: 0,
      experienced30Pct: 0,
      experienced50Pct: 0,
    });
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
    assert.equal(result.survival.at(-1), result.successRate);
    assert.deepEqual(result.periodFailureCounts, {
      throughAge80: 200,
      age81To100: 0,
      afterAge100: 0,
    });
    assert.equal(
      Object.values(result.periodFailureCounts).reduce((sum, count) => sum + count, 0),
      result.ruinCount,
    );
    assert.ok(result.medianRuinAge !== null);
    assert.equal(result.ruinStory?.marketMaxDrawdown, 0);
    assert.ok(Math.abs((result.ruinStory?.maxDrawdown ?? 0) - -0.8) < 1e-12);
    assert.equal(result.ruinStory?.years.at(-1)?.wealth, 0);
  });

  it("provides a representative story for each populated ruin-age period", () => {
    const makeDoomed = (currentAge: number, endAge: number) =>
      simulate(
        basePlan({
          currentAge,
          fireAge: currentAge,
          endAge,
          currentAssets: 1_000,
          annualSpend: 100,
          assets: [oneAsset({ expectedReturnPct: 0, volatilityPct: 0 })],
        }),
      );

    const early = makeDoomed(60, 80);
    assert.ok((early.periodStories.throughAge80?.ruinAge ?? Infinity) <= 80);
    assert.equal(early.periodStories.age81To100, null);

    const middle = makeDoomed(81, 100);
    assert.ok((middle.periodStories.age81To100?.ruinAge ?? 0) > 80);
    assert.ok((middle.periodStories.age81To100?.ruinAge ?? Infinity) <= 100);

    const late = makeDoomed(100, 110);
    assert.ok((late.periodStories.afterAge100?.ruinAge ?? 0) > 100);
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

  it("keeps cashflow growth separate from investment drawdown", () => {
    const plan = basePlan({
      currentAge: 40,
      fireAge: 42,
      endAge: 42,
      currentAssets: 100,
      annualContribution: 100,
      assets: [oneAsset({ expectedReturnPct: -20, volatilityPct: 0 })],
    });
    const result = simulate(plan);

    assert.equal(result.medianStory?.maxDrawdown, 0);
    assert.ok(Math.abs((result.medianStory?.marketMaxDrawdown ?? 0) - -0.36) < 1e-12);
  });

  it("runs without failure rules and treats every path as achieved", () => {
    const result = simulate(basePlan({ ruinRules: [] }));
    assert.equal(result.ruinCount, 0);
    assert.equal(result.successRate, 1);
  });

  it("applies beginning-of-year cashflow and switches phase at FIRE age", () => {
    const plan = basePlan({
      currentAge: 40,
      fireAge: 41,
      endAge: 42,
      currentAssets: 100,
      annualContribution: 50,
      annualSpend: 20,
      assets: [oneAsset({ expectedReturnPct: 10, volatilityPct: 0 })],
    });

    const result = simulate(plan);
    // Age 40: (100 + 50) * 1.10 = 165. Age 41: (165 - 20) * 1.10 = 159.5.
    assert.ok(Math.abs(result.terminal.p50 - 159.5) < 1e-9);
  });

  it("converts nominal returns to real returns", () => {
    const plan = basePlan({
      currentAge: 40,
      fireAge: 41,
      endAge: 41,
      currentAssets: 100,
      returnsAreNominal: true,
      inflationPct: 10,
      assets: [oneAsset({ expectedReturnPct: 10, volatilityPct: 0 })],
    });

    const result = simulate(plan);
    assert.ok(Math.abs(result.terminal.p50 - 100) < 1e-9);
    assert.ok(Math.abs(result.portfolio.accum.mu) < 1e-12);
  });

  it("offsets spending with pension and grosses up taxable sales", () => {
    const plan = basePlan({
      currentAge: 60,
      fireAge: 60,
      endAge: 61,
      currentAssets: 1_000,
      annualSpend: 100,
      pensionAge: 60,
      annualPension: 40,
      taxRatePct: 25,
      assets: [oneAsset({ expectedReturnPct: 0, volatilityPct: 0 })],
    });

    const result = simulate(plan);
    assert.ok(Math.abs(result.terminal.p50 - 920) < 1e-9);
    assert.ok(Math.abs((result.medianStory?.cumulativeWithdrawal ?? 0) - 80) < 1e-9);
    assert.ok(Math.abs((result.medianStory?.cumulativeTax ?? 0) - 20) < 1e-9);
  });

  it("uses separate accumulation and withdrawal allocations", () => {
    const fast = oneAsset({
      id: "fast",
      expectedReturnPct: 10,
      accumWeight: 100,
      withdrawWeight: 0,
    });
    const flat = oneAsset({
      id: "flat",
      expectedReturnPct: 0,
      accumWeight: 0,
      withdrawWeight: 100,
    });
    const plan = basePlan({
      currentAge: 40,
      fireAge: 41,
      endAge: 42,
      currentAssets: 100,
      assets: [fast, flat],
      correlations: [
        [1, 0],
        [0, 1],
      ],
    });

    const result = simulate(plan);
    assert.ok(Math.abs(result.terminal.p50 - 110) < 1e-9);
    assert.ok(Math.abs(result.portfolio.accum.mu - 0.1) < 1e-12);
    assert.ok(Math.abs(result.portfolio.withdraw.mu) < 1e-12);
  });

  it("combines multiple ruin rules with logical OR", () => {
    const plan = basePlan({
      currentAge: 60,
      fireAge: 60,
      endAge: 61,
      currentAssets: 100,
      annualSpend: 60,
      assets: [oneAsset({ expectedReturnPct: 0, volatilityPct: 0 })],
      ruinRules: [
        { id: "checkpoint", type: "below_at_age", age: 61, amount: 10 },
        { id: "buffer", type: "years_of_spend", years: 2 },
      ],
    });

    const result = simulate(plan);
    assert.equal(result.ruinCount, 200);
    assert.equal(result.successRate, 0);
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
