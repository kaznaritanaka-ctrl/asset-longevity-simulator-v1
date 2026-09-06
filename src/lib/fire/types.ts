export type Sex = "male" | "female";

export type AssetKind = "equity" | "bond" | "cash" | "alt";

export type AssetClass = {
  id: string;
  name: string;
  kind: AssetKind;
  expectedReturnPct: number;
  volatilityPct: number;
  accumWeight: number;
  withdrawWeight: number;
};

export type RuinRule =
  | { id: string; type: "depleted"; threshold: number }
  | { id: string; type: "below_at_age"; age: number; amount: number }
  | { id: string; type: "years_of_spend"; years: number };

export type Plan = {
  currentAge: number;
  fireAge: number;
  endAge: number;
  sex: Sex;
  currentAssets: number;
  annualContribution: number;
  annualSpend: number;
  pensionAge: number;
  annualPension: number;
  inflationPct: number;
  taxRatePct: number;
  returnsAreNominal: boolean;
  dataWindow: "long" | "postwar" | "float";
  assets: AssetClass[];
  correlations: number[][];
  trials: number;
  seed: number;
  ruinRules: RuinRule[];
};

export type PercentileBands = {
  p5: number[];
  p10: number[];
  p25: number[];
  p50: number[];
  p75: number[];
  p90: number[];
  p95: number[];
};

export type TerminalStats = {
  mean: number;
  p5: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  survivorMedian: number | null;
};

export type SamplePath = {
  values: number[];
  ruined: boolean;
};

export type StoryYear = {
  age: number;
  wealth: number;
  portR: number;
  withdrawn: number;
  tax: number;
};

export type StoryRole = "ruin" | "median";

export type RuinPeriod = "throughAge80" | "age81To100" | "afterAge100" | "survived";
export type FailurePeriod = Exclude<RuinPeriod, "survived">;
export type FailureMode = "depletion" | "custom";

export type BalanceDrawdownSummary = {
  median: number;
  experienced30Pct: number;
  experienced50Pct: number;
};

export type RuinStory = {
  trialIndex: number;
  role: StoryRole;
  ruined: boolean;
  ruinAge: number;
  yearsToRuin: number;
  maxDrawdown: number;
  marketMaxDrawdown: number;
  fire10yCagr: number | null;
  worstYear: number;
  worstAge: number | null;
  preRuin5yAvg: number | null;
  cumulativeWithdrawal: number;
  cumulativeTax: number;
  peak: number;
  terminal: number;
  narrative: string;
  years: StoryYear[];
  ruinCount: number;
  trials: number;
};

export type SimResult = {
  trials: number;
  years: number;
  ages: number[];
  ruinCount: number;
  periodFailureCounts: Record<FailurePeriod, number>;
  successRate: number;
  failureMode: FailureMode;
  balanceDrawdown: BalanceDrawdownSummary;
  percentiles: PercentileBands;
  survival: number[];
  terminal: TerminalStats;
  samplePaths: SamplePath[];
  ruinStory: RuinStory | null;
  medianStory: RuinStory | null;
  periodStories: Record<RuinPeriod, RuinStory | null>;
  medianRuinAge: number | null;
  fireAge: number;
  currentAge: number;
  endAge: number;
  portfolio: {
    accum: { mu: number; sigma: number };
    withdraw: { mu: number; sigma: number };
  };
};

export const KIND_LABEL: Record<AssetKind, string> = {
  equity: "株式",
  bond: "債券",
  cash: "現金",
  alt: "オルタナ",
};

export const RUIN_TYPE_LABEL: Record<RuinRule["type"], string> = {
  depleted: "期間中に閾値割れ",
  below_at_age: "指定年齢で閾値割れ",
  years_of_spend: "支出N年分を下回る",
};
