import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createDefaultPlan, PRESETS } from "./defaults.ts";
import { resizeCorrelations } from "./math.ts";
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

  it("allows simulation without a failure condition", () => {
    const plan = createDefaultPlan();
    plan.ruinRules = [];
    assert.deepEqual(validatePlan(plan), []);
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

  it("changes only allocation weights when applying presets", () => {
    const source = createDefaultPlan();
    source.assets[0]!.expectedReturnPct = 12.34;
    source.assets.push({
      id: "custom",
      name: "追加資産",
      kind: "alt",
      expectedReturnPct: 4,
      volatilityPct: 10,
      accumWeight: 25,
      withdrawWeight: 25,
    });
    source.correlations = resizeCorrelations(source.correlations, source.assets.length, 0.2);

    for (const preset of PRESETS) {
      const applied = preset.apply(source);
      assert.equal(applied.assets.length, source.assets.length);
      assert.equal(applied.assets[0]!.expectedReturnPct, 12.34);
      assert.equal(applied.assets.find((asset) => asset.id === "custom")!.accumWeight, 0);
      assert.equal(applied.assets.find((asset) => asset.id === "custom")!.withdrawWeight, 0);
      assert.deepEqual(applied.correlations, source.correlations);
      assert.equal(
        applied.assets.reduce((sum, asset) => sum + asset.accumWeight, 0),
        100,
      );
      assert.equal(
        applied.assets.reduce((sum, asset) => sum + asset.withdrawWeight, 0),
        100,
      );
      assert.deepEqual(validatePlan(applied), []);
    }
  });

  it("rejects non-finite external values", () => {
    const source = createDefaultPlan();
    source.annualSpend = Number.NaN;
    assert.equal(sanitizePlan(source), null);
  });
});
