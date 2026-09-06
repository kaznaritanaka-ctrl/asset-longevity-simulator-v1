import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildRuinRiskBreakdown } from "./risk-breakdown.ts";

describe("ruin risk breakdown", () => {
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
