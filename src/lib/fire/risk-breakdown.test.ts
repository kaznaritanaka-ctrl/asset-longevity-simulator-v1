import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildRuinRiskBreakdown,
  isAssetDepletionOnly,
  wilsonInterval,
} from "./risk-breakdown.ts";

describe("ruin risk breakdown", () => {
  it("distinguishes zero depletion from custom failure conditions", () => {
    assert.equal(
      isAssetDepletionOnly([{ id: "d", type: "depleted", threshold: 0 }]),
      true,
    );
    assert.equal(
      isAssetDepletionOnly([{ id: "d", type: "depleted", threshold: 100 }]),
      false,
    );
    assert.equal(
      isAssetDepletionOnly([{ id: "b", type: "below_at_age", age: 100, amount: 0 }]),
      false,
    );
    assert.equal(isAssetDepletionOnly([]), false);
  });

  it("calculates a bounded 95% Wilson interval", () => {
    const [low, high] = wilsonInterval(2943, 3000);
    assert.ok(low > 0.975 && low < 0.98);
    assert.ok(high > 0.985 && high < 0.99);
    assert.deepEqual(wilsonInterval(0, 0), [0, 1]);
    const none = wilsonInterval(0, 10);
    const all = wilsonInterval(10, 10);
    assert.equal(none[0], 0);
    assert.ok(none[1] > 0 && none[1] < 0.3);
    assert.ok(all[0] > 0.7 && all[0] < 1);
    assert.equal(all[1], 1);
    assert.deepEqual(wilsonInterval(-5, 10), none);
    assert.deepEqual(wilsonInterval(50, 10), all);
  });

  it("splits ruin risk at ages 80 and 100", () => {
    const breakdown = buildRuinRiskBreakdown({
      ages: [40, 80, 100, 110],
      survival: [1, 0.9, 0.72, 0.65],
      successRate: 0.65,
    });

    assert.ok(Math.abs(breakdown.throughAge80 - 0.1) < 1e-12);
    assert.ok(Math.abs(breakdown.age81To100 - 0.18) < 1e-12);
    assert.ok(Math.abs(breakdown.afterAge100 - 0.07) < 1e-12);
    assert.equal(breakdown.survived, 0.65);
  });

  it("puts all ruin risk in the first bucket when the plan ends before age 80", () => {
    const breakdown = buildRuinRiskBreakdown({
      ages: [60, 70],
      survival: [1, 0.75],
      successRate: 0.75,
    });

    assert.equal(breakdown.throughAge80, 0.25);
    assert.equal(breakdown.age81To100, 0);
    assert.equal(breakdown.afterAge100, 0);
  });
});
