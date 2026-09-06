import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createStoryYScale } from "./ruin-story-scale";

describe("createStoryYScale", () => {
  it("keeps the existing linear coordinate mapping", () => {
    const y = createStoryYScale([0, 50, 100], "linear", 72, 2);

    assert.equal(y(100), 2);
    assert.equal(y(50), 36);
    assert.equal(y(0), 70);
  });

  it("gives equal visual distance to equal ratios on a log scale", () => {
    const y = createStoryYScale([100, 1_000, 10_000], "log", 72, 2);
    const firstDecade = y(100) - y(1_000);
    const secondDecade = y(1_000) - y(10_000);

    assert.ok(firstDecade > 20);
    assert.ok(Math.abs(firstDecade - secondDecade) < 0.000_001);
  });

  it("places zero at the bottom without NaN or Infinity", () => {
    const y = createStoryYScale([10_000, 1_000, 0], "log", 72, 2);

    assert.equal(y(0), 70);
    assert.ok(Number.isFinite(y(0)));
    assert.ok(Number.isFinite(y(1_000)));
    assert.ok(y(1_000) < y(0));
  });
});
