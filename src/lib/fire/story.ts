import { formatAge, formatManYen, formatPct } from "./format";
import type { RuinStory, StoryRole, StoryYear } from "./types";

export function buildRuinStory(args: {
  wealth: number[];
  returns: number[];
  sold: number[];
  taxPaid: number[];
  ruined: boolean;
  ruinAge: number | null;
  currentAge: number;
  fireAge: number;
  endAge: number;
  trialIndex: number;
  ruinCount: number;
  trials: number;
  role?: StoryRole;
}): RuinStory {
  const { wealth, returns, sold, taxPaid, ruined, currentAge, fireAge, endAge, trialIndex } = args;
  const role: StoryRole = args.role ?? "ruin";
  const officialAge = args.ruinAge ?? endAge;
  const depletedIdx = wealth.findIndex((w) => w <= 0);
  const officialIdx = Math.max(0, Math.min(wealth.length - 1, officialAge - currentAge));
  const ecoIdx = depletedIdx >= 0 ? Math.min(depletedIdx, officialIdx) : officialIdx;
  const ruinAge = currentAge + ecoIdx;
  const ruinIdx = ecoIdx;
  const horizonIdx = role === "median" || !ruined ? wealth.length - 1 : ruinIdx;
  const balanceDrawdownHorizonIdx =
    ruined && depletedIdx >= 0 && depletedIdx <= horizonIdx
      ? Math.max(0, depletedIdx - 1)
      : horizonIdx;
  const yearsToRuin = (role === "median" ? endAge : ruinAge) - currentAge;

  const years: StoryYear[] = wealth.map((w, i) => ({
    age: currentAge + i,
    wealth: w,
    portR: i === 0 ? 0 : (returns[i - 1] ?? 0),
    withdrawn: i === 0 ? 0 : (sold[i - 1] ?? 0),
    tax: i === 0 ? 0 : (taxPaid[i - 1] ?? 0),
  }));

  let peak = wealth[0] ?? 0;
  let maxDrawdown = 0;
  for (let i = 0; i <= balanceDrawdownHorizonIdx; i++) {
    const w = wealth[i] ?? 0;
    if (w > peak) peak = w;
    if (peak > 0) {
      const dd = w / peak - 1;
      if (dd < maxDrawdown) maxDrawdown = dd;
    }
  }

  const fireYear = fireAge - currentAge;
  const fireSlice = returns.slice(
    Math.max(0, fireYear),
    Math.min(returns.length, Math.max(fireYear, 0) + 10, horizonIdx),
  );
  const fire10yCagr = fireSlice.length >= 3 ? geomMean(fireSlice) : null;

  const retToHorizon = returns.slice(0, horizonIdx);
  let marketIndex = 1;
  let marketPeak = 1;
  let marketMaxDrawdown = 0;
  for (const annualReturn of retToHorizon) {
    marketIndex *= Math.max(0, 1 + annualReturn);
    if (marketIndex > marketPeak) marketPeak = marketIndex;
    if (marketPeak > 0)
      marketMaxDrawdown = Math.min(marketMaxDrawdown, marketIndex / marketPeak - 1);
  }
  let worstYear = 0;
  let worstAge: number | null = null;
  if (retToHorizon.length) {
    worstYear = Math.min(...retToHorizon);
    worstAge = currentAge + retToHorizon.indexOf(worstYear) + 1;
  }

  const preStart = Math.max(0, horizonIdx - 5);
  const preSlice = returns.slice(preStart, horizonIdx);
  const preRuin5yAvg = preSlice.length
    ? preSlice.reduce((a, b) => a + b, 0) / preSlice.length
    : null;

  let cumulativeWithdrawal = 0;
  let cumulativeTax = 0;
  for (let y = 0; y < horizonIdx; y++) {
    cumulativeWithdrawal += sold[y] ?? 0;
    cumulativeTax += taxPaid[y] ?? 0;
  }

  const terminal = wealth[horizonIdx] ?? 0;
  const narrative = narrate({
    role,
    ruined,
    ruinAge,
    currentAge,
    fireAge,
    endAge,
    yearsToRuin,
    fire10yCagr,
    maxDrawdown,
    marketMaxDrawdown,
    worstYear,
    worstAge,
    preRuin5yAvg,
    cumulativeWithdrawal,
    cumulativeTax,
    peak,
    terminal,
    trials: args.trials,
    checkpointAge: officialAge,
  });

  return {
    trialIndex,
    role,
    ruined,
    ruinAge,
    yearsToRuin,
    maxDrawdown,
    marketMaxDrawdown,
    fire10yCagr,
    worstYear,
    worstAge,
    preRuin5yAvg,
    cumulativeWithdrawal,
    cumulativeTax,
    peak,
    terminal,
    narrative,
    years,
    ruinCount: args.ruinCount,
    trials: args.trials,
  };
}

function geomMean(rs: number[]): number | null {
  if (rs.length === 0) return null;
  let log = 0;
  for (const r of rs) log += Math.log(Math.max(1e-9, 1 + r));
  return Math.exp(log / rs.length) - 1;
}

function narrate(s: {
  role: StoryRole;
  ruined: boolean;
  ruinAge: number;
  currentAge: number;
  fireAge: number;
  endAge: number;
  yearsToRuin: number;
  fire10yCagr: number | null;
  maxDrawdown: number;
  marketMaxDrawdown: number;
  worstYear: number;
  worstAge: number | null;
  preRuin5yAvg: number | null;
  cumulativeWithdrawal: number;
  cumulativeTax: number;
  peak: number;
  terminal: number;
  trials: number;
  checkpointAge: number;
}): string {
  const parts: string[] = [];
  const afterFire = (s.role === "median" ? s.endAge : s.ruinAge) - s.fireAge;
  const checkpointLag = s.checkpointAge - s.ruinAge;

  if (s.role === "median") {
    parts.push(
      `${s.trials.toLocaleString("ja-JP")}本のうち、中央の帯にいちばん近い一本。${formatAge(s.endAge)}の残高は${formatManYen(s.terminal)}。`,
    );
    if (s.ruined) {
      parts.push(`この中央付近の経路でも${formatAge(s.ruinAge)}で条件に触れている。`);
    }
    if (s.fire10yCagr != null) {
      parts.push(`FIRE後10年の実質CAGRは${signedPct(s.fire10yCagr)}。`);
    }
    if (s.maxDrawdown <= -0.2 && s.maxDrawdown > -0.95) {
      parts.push(
        `途中、ピーク${formatManYen(s.peak)}から${formatPct(s.maxDrawdown, 0)}まで沈んだ。`,
      );
    }
    if (s.cumulativeWithdrawal > 0) {
      const taxBit = s.cumulativeTax > 0 ? `うち税が${formatManYen(s.cumulativeTax)}。` : "";
      parts.push(`終了年齢までに取り崩した額は${formatManYen(s.cumulativeWithdrawal)}。${taxBit}`);
    }
    return parts.join("");
  }

  if (!s.ruined) {
    parts.push(
      `この乱数では破綻条件に触れなかった。残った経路のうち、いちばん細った一本を拾っている。${formatAge(s.endAge)}時点の残高は${formatManYen(s.terminal)}。`,
    );
  } else if (s.ruinAge <= s.fireAge) {
    parts.push(
      `FIRE（${formatAge(s.fireAge)}）の前、${formatAge(s.ruinAge)}で資産が尽きた。積立期のまま相場に負けた経路。`,
    );
  } else if (s.terminal > 0) {
    parts.push(
      `${formatAge(s.ruinAge)}時点の残高は${formatManYen(s.terminal)}で、置いた条件に触れた。FIREからは${afterFire}年。`,
    );
  } else {
    parts.push(
      `${formatAge(s.currentAge)}から${s.yearsToRuin}年後、${formatAge(s.ruinAge)}で資産が尽きた。FIREからは${afterFire}年。`,
    );
    if (checkpointLag >= 2) {
      parts.push(`判定自体は${formatAge(s.checkpointAge)}の条件。`);
    }
    if (s.fire10yCagr != null && s.fire10yCagr < -0.01 && afterFire <= 18) {
      parts.push(
        `FIRE直後10年の実質CAGRは${signedPct(s.fire10yCagr)}。引退してすぐの逆風が効いている（シーケンスリスク）。`,
      );
    } else if (afterFire >= 20) {
      const cagrBit =
        s.fire10yCagr != null ? `FIRE後10年の実質CAGRは${signedPct(s.fire10yCagr)}。` : "";
      parts.push(`${cagrBit}運用の大崩れというより、長い取り崩しが残高を削った。`);
    }
  }

  if (s.maxDrawdown <= -0.35 && s.maxDrawdown > -0.95) {
    parts.push(`ピーク${formatManYen(s.peak)}から最大${formatPct(s.maxDrawdown, 0)}まで沈んだ。`);
  }

  if (s.ruined && s.preRuin5yAvg != null && s.preRuin5yAvg > 0 && s.worstYear > -0.25) {
    parts.push(
      `破綻直前5年の平均リターンは${signedPct(s.preRuin5yAvg)}。最後は大暴落というより、残った元本が支出に足りなくなった。`,
    );
  } else if (
    s.worstAge != null &&
    s.worstYear <= -0.22 &&
    (s.worstAge >= s.fireAge || s.ruinAge - s.worstAge <= 12)
  ) {
    parts.push(
      `最悪年は${formatAge(s.worstAge)}で${signedPct(s.worstYear)}。その年が残った資産を削った。`,
    );
  }

  if (s.cumulativeWithdrawal > 0) {
    const taxBit = s.cumulativeTax > 0 ? `うち税が${formatManYen(s.cumulativeTax)}。` : "";
    parts.push(`破綻までに取り崩した額は${formatManYen(s.cumulativeWithdrawal)}。${taxBit}`);
  }

  return parts.join("");
}

function signedPct(decimal: number): string {
  const body = formatPct(Math.abs(decimal), 1);
  return `${decimal < 0 ? "-" : "+"}${body}`;
}
