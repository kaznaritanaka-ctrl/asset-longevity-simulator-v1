import type { AssetClass } from "./types";

export type DataWindowId = "long" | "postwar" | "float";

export type SourcedAssetStats = {
  id: string;
  name: string;
  kind: AssetClass["kind"];
  arithPct: number;
  geomPct: number;
  volPct: number;
};

export type DataWindow = {
  id: DataWindowId;
  name: string;
  period: string;
  n: number;
  note: string;
  assets: SourcedAssetStats[];
  correlations: number[][];
};

/**
 * Real JPY annual total returns, Japan CPI deflator.
 * Equities/bonds/bills: Jordà–Schularick–Taylor Macrohistory Database R6 (1870–2020),
 *   local-currency total returns (Jordà, Knoll, Kuvshinov, Schularick, Taylor, QJE 2019).
 * US equities in JPY: (1 + US equity TR) × (1 + ΔJPY per USD) − 1, then Japan-CPI deflated.
 * Gold in JPY: World Bank Pink Sheet annual USD gold (1960–2020 portion) × JST JPY/USD,
 *   then Japan-CPI deflated. The repository does not include a reproducible source or build
 *   procedure for the pre-1960 gold portion used by the long and postwar windows; those gold
 *   statistics are provisional until that provenance is restored.
 *
 * Arithmetic mean is what the Monte Carlo engine uses. Geometric is the compounded path.
 */
export const DATA_WINDOWS: DataWindow[] = [
  {
    id: "long",
    name: "最長",
    period: "1886–2020",
    n: 129,
    note: "共通サンプルから1944–49年（戦時・占領期の超インフレ。現金・国債の実質が年−90%近く）を除く。東証閉鎖の1946–47年は元系列が欠測。",
    assets: [
      { id: "jp-equity", name: "日本株式", kind: "equity", arithPct: 9.6, geomPct: 6.8, volPct: 25.6 },
      { id: "us-equity", name: "米国株式", kind: "equity", arithPct: 7.9, geomPct: 5.6, volPct: 21.9 },
      { id: "bonds", name: "日本国債", kind: "bond", arithPct: 3.0, geomPct: 2.6, volPct: 8.4 },
      { id: "gold", name: "金", kind: "alt", arithPct: 1.6, geomPct: 0.3, volPct: 18.4 },
      { id: "cash", name: "現金・手形", kind: "cash", arithPct: 1.4, geomPct: 1.2, volPct: 6.1 },
    ],
    correlations: [
      [1, 0.19, 0.29, 0.11, 0.26],
      [0.19, 1, 0.36, 0.28, 0.3],
      [0.29, 0.36, 1, 0.17, 0.81],
      [0.11, 0.28, 0.17, 1, 0.18],
      [0.26, 0.3, 0.81, 0.18, 1],
    ],
  },
  {
    id: "postwar",
    name: "戦後",
    period: "1952–2020",
    n: 69,
    note: "講和後の現代市場。国債・現金のσが戦前・戦時を含まない分だけ低い。株–債相関はほぼゼロ。",
    assets: [
      { id: "jp-equity", name: "日本株式", kind: "equity", arithPct: 9.2, geomPct: 7.1, volPct: 22.0 },
      { id: "us-equity", name: "米国株式", kind: "equity", arithPct: 7.4, geomPct: 5.4, volPct: 20.4 },
      { id: "bonds", name: "日本国債", kind: "bond", arithPct: 3.0, geomPct: 2.8, volPct: 5.6 },
      { id: "gold", name: "金", kind: "alt", arithPct: 2.3, geomPct: 0.8, volPct: 19.0 },
      { id: "cash", name: "現金・手形", kind: "cash", arithPct: 1.3, geomPct: 1.2, volPct: 2.9 },
    ],
    correlations: [
      [1, 0.12, 0.01, -0.02, 0.18],
      [0.12, 1, 0.15, 0.06, 0.19],
      [0.01, 0.15, 1, -0.39, 0.4],
      [-0.02, 0.06, -0.39, 1, -0.21],
      [0.18, 0.19, 0.4, -0.21, 1],
    ],
  },
  {
    id: "float",
    name: "変動相場",
    period: "1972–2020",
    n: 49,
    note: "ブレトンウッズ体制崩壊後。米国株・金は為替が本格的に動く。日本株の実質算術平均はバブル崩壊を含み低下。",
    assets: [
      { id: "jp-equity", name: "日本株式", kind: "equity", arithPct: 6.0, geomPct: 4.0, volPct: 20.8 },
      { id: "us-equity", name: "米国株式", kind: "equity", arithPct: 8.0, geomPct: 5.5, volPct: 22.1 },
      { id: "bonds", name: "日本国債", kind: "bond", arithPct: 3.4, geomPct: 3.2, volPct: 6.4 },
      { id: "gold", name: "金", kind: "alt", arithPct: 5.2, geomPct: 3.2, volPct: 21.7 },
      { id: "cash", name: "現金・手形", kind: "cash", arithPct: 0.7, geomPct: 0.7, volPct: 2.5 },
    ],
    correlations: [
      [1, 0.22, 0, 0.02, 0.18],
      [0.22, 1, 0.12, 0.06, 0.23],
      [0, 0.12, 1, -0.47, 0.45],
      [0.02, 0.06, -0.47, 1, -0.25],
      [0.18, 0.23, 0.45, -0.25, 1],
    ],
  },
];

export const DEFAULT_WINDOW: DataWindowId = "long";

export const SOURCE_CITATION = {
  jst: {
    label: "Jordà–Schularick–Taylor Macrohistory Database R6",
    detail: "1870–2020年、18か国。株式・国債・手形は現地通貨トータルリターン。日本CPIと対ドル為替を含む。",
    papers: "Jordà, Knoll, Kuvshinov, Schularick, Taylor, “The Rate of Return on Everything, 1870–2015”, QJE 2019.",
  },
  gold: {
    label: "World Bank Pink Sheet（1960–2020年の年次金価格・USD）",
    detail:
      "World Bankの公式長期系列は1960年以降。1960年以前を含む現行の「最長」「戦後」の金統計は、接続元データと再生成手順が未同梱のため検証中。円換算は同年のJST 円/ドル。",
  },
};

const WEIGHTS: Record<string, { accum: number; withdraw: number }> = {
  "jp-equity": { accum: 25, withdraw: 20 },
  "us-equity": { accum: 45, withdraw: 35 },
  bonds: { accum: 15, withdraw: 30 },
  gold: { accum: 10, withdraw: 10 },
  cash: { accum: 5, withdraw: 5 },
};

export function windowById(id: DataWindowId): DataWindow {
  return DATA_WINDOWS.find((w) => w.id === id) ?? DATA_WINDOWS[0]!;
}

export function assetsFromWindow(window: DataWindow, prev?: AssetClass[]): AssetClass[] {
  return window.assets.map((a) => {
    const kept = prev?.find((p) => p.id === a.id);
    const w = WEIGHTS[a.id] ?? { accum: 0, withdraw: 0 };
    return {
      id: a.id,
      name: a.name,
      kind: a.kind,
      expectedReturnPct: a.arithPct,
      volatilityPct: a.volPct,
      accumWeight: kept?.accumWeight ?? w.accum,
      withdrawWeight: kept?.withdrawWeight ?? w.withdraw,
    };
  });
}
