import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildRuinRiskBreakdown } from "./risk-breakdown.ts";

describe("ruin risk breakdown", () => {
  it("splits ruin risk around FIRE and the first ten withdrawal years", () => {
    const breakdown = buildRuinRiskBreakdown({
      ages: [40, 45, 55, 70],
      survival: [1, 0.96, 0.82, 0.7],
      successRate: 0.7,
      fireAge: 45,
      endAge: 70,
    });

    assert.ok(Math.abs(breakdown.preFire - 0.04) < 1e-12);
    assert.ok(Math.abs(breakdown.firstTenYears - 0.14) < 1e-12);
    assert.ok(Math.abs(breakdown.later - 0.12) < 1e-12);
    assert.equal(breakdown.survived, 0.7);
    assert.equal(breakdown.firstTenEndAge, 55);
  });

  it("uses the end age when the withdrawal period is shorter than ten years", () => {
    const breakdown = buildRuinRiskBreakdown({
      ages: [60, 65, 70],
      survival: [1, 0.9, 0.75],
      successRate: 0.75,
      fireAge: 65,
      endAge: 70,
    });

    assert.ok(Math.abs(breakdown.preFire - 0.1) < 1e-12);
    assert.ok(Math.abs(breakdown.firstTenYears - 0.15) < 1e-12);
    assert.equal(breakdown.later, 0);
    assert.equal(breakdown.firstTenEndAge, 70);
  });
});
