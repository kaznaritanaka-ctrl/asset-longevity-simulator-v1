import type { FailurePeriod, Plan, RuinPeriod, RuinRule, SamplePath, SimResult } from "./types";
import {
  cholesky,
  gaussian,
  makePositiveDefinite,
  mulberry32,
  normalizeWeights,
  percentile,
  portfolioMoments,
} from "./math";
import { buildRuinStory } from "./story";
import { isAssetDepletionOnly } from "./risk-breakdown";
import { validatePlan } from "./validation";
import { maxBalanceDrawdown, summarizeBalanceDrawdowns } from "./balance-drawdown";

function hitsRuin(rules: RuinRule[], wealth: number, age: number, annualSpend: number): boolean {
  for (const rule of rules) {
    if (rule.type === "depleted") {
      if (wealth <= rule.threshold) return true;
    } else if (rule.type === "below_at_age") {
      if (age === rule.age && wealth <= rule.amount) return true;
    } else if (rule.type === "years_of_spend") {
      const need = Math.max(0, annualSpend) * rule.years;
      if (wealth < need) return true;
    }
  }
  return false;
}

function realReturn(nominal: number, inflation: number, returnsAreNominal: boolean): number {
  if (!returnsAreNominal) return nominal;
  return (1 + nominal) / (1 + inflation) - 1;
}

export function simulate(plan: Plan, storyNonce = 0): SimResult {
  const validationIssues = validatePlan(plan);
  if (validationIssues.length > 0) {
    throw new Error(validationIssues[0]!.message);
  }
  const currentAge = Math.round(plan.currentAge);
  const fireAge = Math.round(plan.fireAge);
  const endAge = Math.round(plan.endAge);
  const years = endAge - currentAge;
  const trials = Math.max(200, Math.min(20_000, Math.round(plan.trials) || 1000));
  const failureMode = isAssetDepletionOnly(plan.ruinRules) ? "depletion" : "custom";

  if (years < 1 || plan.assets.length === 0) {
    const ages = [currentAge];
    return {
      trials: 0,
      years: 0,
      ages,
      ruinCount: 0,
      periodFailureCounts: { throughAge80: 0, age81To100: 0, afterAge100: 0 },
      successRate: 1,
      failureMode,
      balanceDrawdown: { median: 0, experienced30Pct: 0, experienced50Pct: 0 },
      percentiles: {
        p5: [plan.currentAssets],
        p10: [plan.currentAssets],
        p25: [plan.currentAssets],
        p50: [plan.currentAssets],
        p75: [plan.currentAssets],
        p90: [plan.currentAssets],
        p95: [plan.currentAssets],
      },
      survival: [1],
      terminal: {
        mean: plan.currentAssets,
        p5: plan.currentAssets,
        p10: plan.currentAssets,
        p25: plan.currentAssets,
        p50: plan.currentAssets,
        p75: plan.currentAssets,
        p90: plan.currentAssets,
        p95: plan.currentAssets,
        survivorMedian: plan.currentAssets,
      },
      samplePaths: [],
      ruinStory: null,
      medianStory: null,
      periodStories: {
        throughAge80: null,
        age81To100: null,
        afterAge100: null,
        survived: null,
      },
      medianRuinAge: null,
      fireAge,
      currentAge,
      endAge,
      portfolio: { accum: { mu: 0, sigma: 0 }, withdraw: { mu: 0, sigma: 0 } },
    };
  }

  const inflation = plan.inflationPct / 100;
  const nA = plan.assets.length;
  const mu = plan.assets.map((a) =>
    realReturn(a.expectedReturnPct / 100, inflation, plan.returnsAreNominal),
  );
  const sigma = plan.assets.map((a) => Math.max(0, a.volatilityPct / 100));
  const corr = makePositiveDefinite(plan.correlations, nA);
  const L = cholesky(corr);
  const wAcc = normalizeWeights(plan.assets.map((a) => a.accumWeight));
  const wWd = normalizeWeights(plan.assets.map((a) => a.withdrawWeight));

  const rng = mulberry32(plan.seed >>> 0);
  const T = years + 1;
  const wealth = new Float64Array(trials * T);
  const rets = new Float64Array(trials * years);
  const sold = new Float64Array(trials * years);
  const taxPaid = new Float64Array(trials * years);
  const ruined = new Uint8Array(trials);
  const ruinAge = new Int16Array(trials).fill(-1);
  const z = new Float64Array(nA);
  const shock = new Float64Array(nA);

  for (let trial = 0; trial < trials; trial++) {
    let w = Math.max(0, plan.currentAssets);
    wealth[trial * T] = w;
    let isRuined = false;

    for (let y = 0; y < years; y++) {
      const age = currentAge + y;
      const isWithdraw = age >= fireAge;
      const pension = age >= plan.pensionAge ? plan.annualPension : 0;
      const taxRate = Math.max(0, Math.min(0.9, (plan.taxRatePct ?? 0) / 100));
      let soldY = 0;
      let taxY = 0;

      if (isWithdraw) {
        const netNeed = plan.annualSpend - pension;
        if (netNeed > 0) {
          const desired = netNeed / (1 - taxRate);
          soldY = Math.min(desired, Math.max(0, w));
          taxY = soldY * taxRate;
          w -= desired;
        } else {
          w += -netNeed;
        }
      } else {
        w += plan.annualContribution + pension;
      }
      if (w < 0) w = 0;

      for (let i = 0; i < nA; i++) z[i] = gaussian(rng);
      for (let i = 0; i < nA; i++) {
        let s = 0;
        for (let j = 0; j <= i; j++) s += L[i]![j]! * z[j]!;
        shock[i] = s;
      }

      let portR = 0;
      if (w > 0) {
        const weights = isWithdraw ? wWd : wAcc;
        for (let i = 0; i < nA; i++) {
          let r = mu[i]! + sigma[i]! * shock[i]!;
          if (r < -0.95) r = -0.95;
          portR += weights[i]! * r;
        }
        w *= 1 + portR;
        if (w < 0) w = 0;
      }

      rets[trial * years + y] = portR;
      sold[trial * years + y] = soldY;
      taxPaid[trial * years + y] = taxY;

      const ageEnd = age + 1;
      if (!isRuined && hitsRuin(plan.ruinRules, w, ageEnd, plan.annualSpend)) {
        isRuined = true;
        ruinAge[trial] = ageEnd;
      }
      wealth[trial * T + (y + 1)] = w;
    }

    if (!isRuined && hitsRuin(plan.ruinRules, w, endAge, plan.annualSpend)) {
      isRuined = true;
      ruinAge[trial] = endAge;
    }
    ruined[trial] = isRuined ? 1 : 0;
  }

  const fireStartIndex = Math.max(0, Math.min(T - 1, fireAge - currentAge));
  const trialBalanceDrawdowns = new Float64Array(trials);
  for (let trial = 0; trial < trials; trial++) {
    trialBalanceDrawdowns[trial] = maxBalanceDrawdown(
      wealth.subarray(trial * T, (trial + 1) * T),
      fireStartIndex,
    );
  }
  const balanceDrawdown = summarizeBalanceDrawdowns(trialBalanceDrawdowns);

  const ages = Array.from({ length: T }, (_, i) => currentAge + i);
  const col = new Array<number>(trials);
  const p5: number[] = [];
  const p10: number[] = [];
  const p25: number[] = [];
  const p50: number[] = [];
  const p75: number[] = [];
  const p90: number[] = [];
  const p95: number[] = [];
  const survival: number[] = [];

  for (let t = 0; t < T; t++) {
    for (let i = 0; i < trials; i++) col[i] = wealth[i * T + t]!;
    col.sort((a, b) => a - b);
    p5.push(percentile(col, 0.05));
    p10.push(percentile(col, 0.1));
    p25.push(percentile(col, 0.25));
    p50.push(percentile(col, 0.5));
    p75.push(percentile(col, 0.75));
    p90.push(percentile(col, 0.9));
    p95.push(percentile(col, 0.95));

    const age = ages[t]!;
    let ruinedBy = 0;
    for (let i = 0; i < trials; i++) {
      if (ruinAge[i] !== -1 && ruinAge[i] <= age) ruinedBy++;
    }
    survival.push(1 - ruinedBy / trials);
  }

  const terminalCol = col; // last sort is terminal year
  const survivors: number[] = [];
  let ruinCount = 0;
  const periodFailureCounts: Record<FailurePeriod, number> = {
    throughAge80: 0,
    age81To100: 0,
    afterAge100: 0,
  };
  const ruinedAges: number[] = [];
  for (let i = 0; i < trials; i++) {
    if (ruined[i]) {
      ruinCount++;
      const failedAt = ruinAge[i]!;
      ruinedAges.push(failedAt);
      periodFailureCounts[failurePeriodForAge(failedAt)]++;
    } else {
      survivors.push(wealth[i * T + (T - 1)]!);
    }
  }
  survivors.sort((a, b) => a - b);
  ruinedAges.sort((a, b) => a - b);

  const samplePaths: SamplePath[] = [];
  const stride = Math.max(1, Math.floor(trials / 12));
  for (let i = 0; i < trials && samplePaths.length < 12; i += stride) {
    const values = Array.from({ length: T }, (_, t) => wealth[i * T + t]!);
    samplePaths.push({ values, ruined: ruined[i] === 1 });
  }

  const storyArgs = {
    wealth,
    rets,
    sold,
    taxPaid,
    ruined,
    ruinAge,
    trials,
    T,
    years,
    currentAge,
    fireAge,
    endAge,
    ruinCount,
    seed: plan.seed,
    storyNonce,
  };
  const ruinStory = pickRuinStory(storyArgs);

  const medianStory = pickMedianStory({
    wealth,
    rets,
    sold,
    taxPaid,
    ruined,
    ruinAge,
    trials,
    T,
    years,
    currentAge,
    fireAge,
    endAge,
    ruinCount,
    p50,
  });
  const periodStories = {
    throughAge80: pickRuinStory(storyArgs, "throughAge80"),
    age81To100: pickRuinStory(storyArgs, "age81To100"),
    afterAge100: pickRuinStory(storyArgs, "afterAge100"),
    survived: medianStory,
  } satisfies Record<RuinPeriod, ReturnType<typeof pickRuinStory>>;

  return {
    trials,
    years,
    ages,
    ruinCount,
    periodFailureCounts,
    successRate: 1 - ruinCount / trials,
    failureMode,
    balanceDrawdown,
    percentiles: { p5, p10, p25, p50, p75, p90, p95 },
    survival,
    terminal: {
      mean: terminalCol.reduce((a, b) => a + b, 0) / trials,
      p5: percentile(terminalCol, 0.05),
      p10: percentile(terminalCol, 0.1),
      p25: percentile(terminalCol, 0.25),
      p50: percentile(terminalCol, 0.5),
      p75: percentile(terminalCol, 0.75),
      p90: percentile(terminalCol, 0.9),
      p95: percentile(terminalCol, 0.95),
      survivorMedian: survivors.length ? percentile(survivors, 0.5) : null,
    },
    samplePaths,
    ruinStory,
    medianStory,
    periodStories,
    medianRuinAge: ruinedAges.length ? percentile(ruinedAges, 0.5) : null,
    fireAge,
    currentAge,
    endAge,
    portfolio: {
      accum: portfolioMoments(mu, sigma, wAcc, corr),
      withdraw: portfolioMoments(mu, sigma, wWd, corr),
    },
  };
}

function pickRuinStory(
  args: {
    wealth: Float64Array;
    rets: Float64Array;
    sold: Float64Array;
    taxPaid: Float64Array;
    ruined: Uint8Array;
    ruinAge: Int16Array;
    trials: number;
    T: number;
    years: number;
    currentAge: number;
    fireAge: number;
    endAge: number;
    ruinCount: number;
    seed: number;
    storyNonce: number;
  },
  period?: Exclude<RuinPeriod, "survived">,
) {
  const { wealth, rets, sold, taxPaid, ruined, ruinAge, trials, T, years } = args;
  const ruinedIdx: number[] = [];
  let worst = 0;
  let worstW = Infinity;
  for (let i = 0; i < trials; i++) {
    if (ruined[i] && (!period || isRuinAgeInPeriod(ruinAge[i]!, period))) ruinedIdx.push(i);
    else {
      const tw = wealth[i * T + (T - 1)]!;
      if (tw < worstW) {
        worstW = tw;
        worst = i;
      }
    }
  }
  if (period && ruinedIdx.length === 0) return null;
  const pickRng = mulberry32(
    (args.seed ^ (Math.imul(args.storyNonce + 1, 0x9e3779b9) >>> 0)) >>> 0,
  );
  const chosen =
    ruinedIdx.length > 0 ? ruinedIdx[Math.floor(pickRng() * ruinedIdx.length)]! : worst;

  const wPath = Array.from({ length: T }, (_, t) => wealth[chosen * T + t]!);
  const rPath = Array.from({ length: years }, (_, y) => rets[chosen * years + y]!);
  const sPath = Array.from({ length: years }, (_, y) => sold[chosen * years + y]!);
  const tPath = Array.from({ length: years }, (_, y) => taxPaid[chosen * years + y]!);

  return buildRuinStory({
    wealth: wPath,
    returns: rPath,
    sold: sPath,
    taxPaid: tPath,
    ruined: ruined[chosen] === 1,
    ruinAge: ruinAge[chosen] === -1 ? null : ruinAge[chosen]!,
    currentAge: args.currentAge,
    fireAge: args.fireAge,
    endAge: args.endAge,
    trialIndex: chosen,
    ruinCount: period ? ruinedIdx.length : args.ruinCount,
    trials,
    role: "ruin",
  });
}

function isRuinAgeInPeriod(age: number, period: Exclude<RuinPeriod, "survived">): boolean {
  return failurePeriodForAge(age) === period;
}

function failurePeriodForAge(age: number): FailurePeriod {
  if (age <= 80) return "throughAge80";
  if (age <= 100) return "age81To100";
  return "afterAge100";
}

function pickMedianStory(args: {
  wealth: Float64Array;
  rets: Float64Array;
  sold: Float64Array;
  taxPaid: Float64Array;
  ruined: Uint8Array;
  ruinAge: Int16Array;
  trials: number;
  T: number;
  years: number;
  currentAge: number;
  fireAge: number;
  endAge: number;
  ruinCount: number;
  p50: number[];
}) {
  const { wealth, rets, sold, taxPaid, ruined, ruinAge, trials, T, years, p50 } = args;
  let best = 0;
  let bestScore = Infinity;
  for (let i = 0; i < trials; i++) {
    let score = 0;
    for (let t = 0; t < T; t++) {
      const d = wealth[i * T + t]! - (p50[t] ?? 0);
      score += d * d;
    }
    if (score < bestScore) {
      bestScore = score;
      best = i;
    }
  }

  const wPath = Array.from({ length: T }, (_, t) => wealth[best * T + t]!);
  const rPath = Array.from({ length: years }, (_, y) => rets[best * years + y]!);
  const sPath = Array.from({ length: years }, (_, y) => sold[best * years + y]!);
  const tPath = Array.from({ length: years }, (_, y) => taxPaid[best * years + y]!);

  return buildRuinStory({
    wealth: wPath,
    returns: rPath,
    sold: sPath,
    taxPaid: tPath,
    ruined: ruined[best] === 1,
    ruinAge: ruinAge[best] === -1 ? null : ruinAge[best]!,
    currentAge: args.currentAge,
    fireAge: args.fireAge,
    endAge: args.endAge,
    trialIndex: best,
    ruinCount: args.ruinCount,
    trials,
    role: "median",
  });
}
