import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createDefaultPlan, PRESETS } from "./defaults.ts";
import { sanitizePlan, validatePlan } from "./validation.ts";

describe("plan validation", () => {
  it("accepts the default plan", () => {
    assert.deepEqual(validatePlan(createDefaultPlan()), []);
  });

  it("rejects invalid money, ages and empty allocations", () => {
    const plan = createDefaultPlan();
    plan.annualSpend = -1;
    plan.fireAge = plan.currentAge - 1;
    plan.assets = plan.assets.map((asset) => ({
      ...asset,
      accumWeight: 0,
      withdrawWeight: 0,
    }));
    const fields = validatePlan(plan).map((issue) => issue.field);

    assert.ok(fields.includes("annualSpend"));
    assert.ok(fields.includes("fireAge"));
    assert.ok(fields.includes("assets.accumWeight"));
    assert.ok(fields.includes("assets.withdrawWeight"));
  });

  it("repairs a missing external correlation dimension", () => {
    const source = createDefaultPlan();
    source.assets = source.assets.slice(0, 3);
    source.correlations = [[1]];
    const plan = sanitizePlan(source);

    assert.ok(plan);
    assert.equal(plan.correlations.length, 3);
    assert.ok(plan.correlations.every((row) => row.length === 3));
  });

  it("keeps the balanced preset assets and correlations aligned", () => {
    const source = createDefaultPlan();
    source.assets.push({
      id: "custom",
      name: "追加資産",
      kind: "alt",
      expectedReturnPct: 4,
      volatilityPct: 10,
      accumWeight: 0,
      withdrawWeight: 0,
    });
    const balanced = PRESETS.find((preset) => preset.id === "balanced")!.apply(source);

    assert.equal(balanced.correlations.length, balanced.assets.length);
    assert.ok(balanced.correlations.every((row) => row.length === balanced.assets.length));
    assert.deepEqual(validatePlan(balanced), []);
  });

  it("rejects non-finite external values", () => {
    const source = createDefaultPlan();
    source.annualSpend = Number.NaN;
    assert.equal(sanitizePlan(source), null);
  });
});
