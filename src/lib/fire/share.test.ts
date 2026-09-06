import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createDefaultPlan, PRESETS } from "./defaults.ts";
import { assetsFromWindow, windowById } from "./sourced-params.ts";
import { compactPlan, decodePlan, encodePlan, expandPlan } from "./share.ts";
import type { Plan } from "./types.ts";

function comparable(plan: Plan) {
  const { seed: _s, trials: _t, ...rest } = plan;
  return JSON.stringify(rest);
}

describe("share codec", () => {
  it("omits defaults", () => {
    const def = createDefaultPlan();
    assert.deepEqual(compactPlan(def), {});
    assert.equal(comparable(expandPlan({})), comparable(def));
    const token = encodePlan(def);
    assert.ok(token.length < 20, token);
    assert.equal(comparable(decodePlan(token)!), comparable(def));
  });

  it("stores equity preset as one letter", () => {
    const plan = PRESETS.find((p) => p.id === "equity")!.apply(createDefaultPlan());
    assert.deepEqual(compactPlan(plan), { p: "e" });
    assert.equal(comparable(expandPlan({ p: "e" })), comparable(plan));
  });

  it("stores mixed phase presets as two letters", () => {
    const conservative = PRESETS.find((p) => p.id === "conservative")!;
    const equity = PRESETS.find((p) => p.id === "equity")!;
    const plan = equity.apply(conservative.apply(createDefaultPlan(), "accum"), "withdraw");
    assert.deepEqual(compactPlan(plan), { p: "c:e" });
    assert.equal(comparable(expandPlan({ p: "c:e" })), comparable(plan));
  });


  it("stores window and cashflow without catalog", () => {
    const win = windowById("postwar");
    const plan: Plan = {
      ...createDefaultPlan(),
      currentAge: 41,
      fireAge: 58,
      currentAssets: 13000,
      dataWindow: "postwar",
      assets: assetsFromWindow(win),
      correlations: win.correlations.map((row) => row.slice()),
    };
    const packed = compactPlan(plan);
    assert.equal(packed.w, "p");
    assert.equal(packed.a, 41);
    assert.equal(packed.as, undefined);
    assert.equal(packed.co, undefined);
    assert.ok(encodePlan(plan).length < 80);
    assert.equal(comparable(decodePlan(encodePlan(plan))!), comparable(plan));
  });

  it("reads legacy full-json tokens", () => {
    const old = Buffer.from(JSON.stringify(createDefaultPlan()), "utf8").toString("base64url");
    const decoded = decodePlan(old);
    assert.ok(decoded);
    assert.equal(decoded.currentAge, 40);
  });
});
