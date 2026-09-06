import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { maxBalanceDrawdown, summarizeBalanceDrawdowns } from "./balance-drawdown.ts";

describe("FIRE-period balance drawdown", () => {
  it("reports no drawdown for a rising path", () => {
    assert.equal(maxBalanceDrawdown([100, 110, 120]), 0);
    assert.deepEqual(summarizeBalanceDrawdowns([0]), {
      median: 0,
      experienced30Pct: 0,
      experienced50Pct: 0,
    });
  });

  it("counts a drawdown of at least 30%", () => {
    const drawdown = maxBalanceDrawdown([100, 120, 83]);
    assert.ok(drawdown < -0.3 && drawdown > -0.5);
    assert.deepEqual(summarizeBalanceDrawdowns([drawdown]), {
      median: drawdown,
      experienced30Pct: 1,
      experienced50Pct: 0,
    });
  });

  it("counts a drawdown of at least 50% in both thresholds", () => {
    const drawdown = maxBalanceDrawdown([100, 140, 60]);
    assert.ok(drawdown < -0.5);
    assert.deepEqual(summarizeBalanceDrawdowns([drawdown]), {
      median: drawdown,
      experienced30Pct: 1,
      experienced50Pct: 1,
    });
  });

  it("treats depletion as a 100% drawdown", () => {
    assert.equal(maxBalanceDrawdown([100, 80, 0]), -1);
  });

  it("ignores drawdowns before the FIRE start index", () => {
    assert.equal(maxBalanceDrawdown([100, 50, 100, 120], 2), 0);
  });

  it("uses the median and exact trial shares", () => {
    assert.deepEqual(summarizeBalanceDrawdowns([0, -0.4, -0.6]), {
      median: -0.4,
      experienced30Pct: 2 / 3,
      experienced50Pct: 1 / 3,
    });
  });
});
