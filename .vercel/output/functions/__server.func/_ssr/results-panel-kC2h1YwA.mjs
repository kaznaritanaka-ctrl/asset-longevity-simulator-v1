import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as formatAge, f as formatAxisYen, h as cn, m as formatPct, n as usePlanStore, p as formatManYen, u as Button } from "./routes-DA5D-Rb-.mjs";
import { a as Area, c as ReferenceArea, d as Tooltip, i as XAxis, l as ReferenceLine, n as LineChart, o as Line, r as YAxis, s as CartesianGrid, t as ComposedChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/results-panel-kC2h1YwA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SegmentedControl({ value, onChange, options, ariaLabel, className }) {
	const index = options[0].id === value ? 0 : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "tablist",
		"aria-label": ariaLabel,
		className: cn("relative grid h-9 w-[11.5rem] shrink-0 grid-cols-2 rounded-full bg-bg-sunken p-0.5 text-xs font-medium", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "pointer-events-none absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-surface shadow-[var(--shadow-border)] transition-[left] duration-200 ease-out",
			style: { left: index === 0 ? 2 : "50%" }
		}), options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "tab",
			"aria-selected": value === opt.id,
			onClick: () => onChange(opt.id),
			className: cn("relative z-10 rounded-full px-2 text-center transition-colors duration-150", value === opt.id ? "text-fg" : "text-fg-muted hover:text-fg"),
			children: opt.label
		}, opt.id))]
	});
}
var LIFE_TABLE = {
	publisher: "厚生労働省",
	name: "令和7年簡易生命表",
	year: 2025,
	url: "https://www.mhlw.go.jp/toukei/saikin/hw/life/life25/index.html"
};
var EX_MALE = [
	81.35,
	80.51,
	79.53,
	78.55,
	77.56,
	76.57,
	75.58,
	74.58,
	73.59,
	72.59,
	71.6,
	70.6,
	69.61,
	68.61,
	67.62,
	66.63,
	65.64,
	64.66,
	63.67,
	62.69,
	61.72,
	60.74,
	59.77,
	58.8,
	57.82,
	56.85,
	55.88,
	54.9,
	53.93,
	52.96,
	51.98,
	51.01,
	50.04,
	49.06,
	48.09,
	47.12,
	46.16,
	45.19,
	44.22,
	43.26,
	42.29,
	41.33,
	40.38,
	39.42,
	38.47,
	37.52,
	36.57,
	35.63,
	34.69,
	33.75,
	32.82,
	31.9,
	30.98,
	30.06,
	29.16,
	28.26,
	27.36,
	26.47,
	25.59,
	24.72,
	23.86,
	23.01,
	22.16,
	21.32,
	20.5,
	19.68,
	18.88,
	18.09,
	17.31,
	16.54,
	15.78,
	15.04,
	14.31,
	13.6,
	12.91,
	12.24,
	11.58,
	10.94,
	10.31,
	9.69,
	9.1,
	8.53,
	7.98,
	7.45,
	6.94,
	6.44,
	5.97,
	5.53,
	5.11,
	4.73,
	4.38,
	4.06,
	3.74,
	3.45,
	3.16,
	2.9,
	2.65,
	2.42,
	2.2,
	2,
	1.81,
	1.64,
	1.48,
	1.34,
	1.21,
	1.08
];
var EX_FEMALE = [
	87.33,
	86.48,
	85.51,
	84.52,
	83.53,
	82.54,
	81.54,
	80.55,
	79.55,
	78.56,
	77.56,
	76.57,
	75.57,
	74.58,
	73.59,
	72.6,
	71.61,
	70.62,
	69.64,
	68.66,
	67.67,
	66.69,
	65.71,
	64.73,
	63.75,
	62.77,
	61.78,
	60.8,
	59.82,
	58.83,
	57.85,
	56.87,
	55.88,
	54.9,
	53.92,
	52.94,
	51.96,
	50.98,
	50,
	49.03,
	48.05,
	47.08,
	46.11,
	45.14,
	44.17,
	43.2,
	42.24,
	41.28,
	40.32,
	39.36,
	38.41,
	37.46,
	36.51,
	35.57,
	34.64,
	33.7,
	32.77,
	31.84,
	30.91,
	29.99,
	29.07,
	28.15,
	27.24,
	26.33,
	25.42,
	24.52,
	23.63,
	22.74,
	21.85,
	20.97,
	20.1,
	19.24,
	18.39,
	17.54,
	16.7,
	15.88,
	15.07,
	14.27,
	13.48,
	12.71,
	11.95,
	11.21,
	10.49,
	9.8,
	9.12,
	8.47,
	7.85,
	7.26,
	6.69,
	6.16,
	5.66,
	5.18,
	4.75,
	4.34,
	3.95,
	3.58,
	3.23,
	2.9,
	2.59,
	2.31,
	2.05,
	1.81,
	1.59,
	1.39,
	1.22,
	1.06
];
var LX_MALE = [
	1e5,
	99800,
	99770,
	99748,
	99733,
	99721,
	99712,
	99704,
	99697,
	99691,
	99686,
	99680,
	99673,
	99664,
	99652,
	99637,
	99618,
	99597,
	99571,
	99540,
	99504,
	99463,
	99419,
	99372,
	99325,
	99278,
	99231,
	99185,
	99138,
	99089,
	99038,
	98987,
	98934,
	98878,
	98818,
	98754,
	98687,
	98617,
	98543,
	98463,
	98377,
	98284,
	98184,
	98075,
	97957,
	97829,
	97690,
	97538,
	97372,
	97188,
	96984,
	96757,
	96506,
	96232,
	95932,
	95603,
	95241,
	94843,
	94403,
	93918,
	93387,
	92811,
	92183,
	91495,
	90733,
	89892,
	88971,
	87973,
	86896,
	85729,
	84453,
	83051,
	81511,
	79824,
	77986,
	75991,
	73836,
	71531,
	69079,
	66461,
	63651,
	60631,
	57407,
	54005,
	50468,
	46795,
	42972,
	39003,
	34918,
	30790,
	26705,
	22749,
	19076,
	15686,
	12616,
	9897,
	7546,
	5572,
	3968,
	2712,
	1770,
	1095,
	639,
	348,
	176,
	82
];
var LX_FEMALE = [
	1e5,
	99827,
	99800,
	99782,
	99771,
	99763,
	99757,
	99750,
	99744,
	99738,
	99731,
	99725,
	99718,
	99710,
	99699,
	99685,
	99668,
	99649,
	99626,
	99601,
	99574,
	99544,
	99514,
	99486,
	99459,
	99432,
	99404,
	99376,
	99349,
	99323,
	99297,
	99269,
	99240,
	99209,
	99175,
	99138,
	99099,
	99056,
	99011,
	98964,
	98913,
	98858,
	98799,
	98735,
	98665,
	98588,
	98504,
	98413,
	98314,
	98207,
	98088,
	97957,
	97811,
	97651,
	97479,
	97293,
	97095,
	96884,
	96658,
	96416,
	96157,
	95880,
	95581,
	95260,
	94912,
	94533,
	94119,
	93673,
	93190,
	92664,
	92083,
	91440,
	90733,
	89956,
	89100,
	88149,
	87087,
	85906,
	84596,
	83140,
	81514,
	79692,
	77646,
	75351,
	72795,
	69950,
	66786,
	63284,
	59444,
	55282,
	50819,
	46087,
	41153,
	36124,
	31136,
	26352,
	21769,
	17482,
	13575,
	10130,
	7212,
	4856,
	3060,
	1783,
	947,
	451
];
var LAST = EX_MALE.length - 1;
function clampAge(age) {
	return Math.min(LAST, Math.max(0, Math.round(age)));
}
function remainingLife(age, sex) {
	const i = clampAge(age);
	return (sex === "female" ? EX_FEMALE : EX_MALE)[i] ?? 0;
}
function expectedDeathAge(age, sex) {
	return age + remainingLife(age, sex);
}
function lifeSurvival(fromAge, atAge, sex) {
	if (atAge <= fromAge) return 1;
	const lx = sex === "female" ? LX_FEMALE : LX_MALE;
	const base = lx[clampAge(fromAge)] ?? 1;
	if (base <= 0) return 0;
	if (atAge > LAST) return 0;
	const a1 = clampAge(atAge);
	return Math.min(1, Math.max(0, (lx[a1] ?? 0) / base));
}
function assetHalfLifeAge(ages, survival) {
	for (let i = 0; i < ages.length; i++) if ((survival[i] ?? 1) <= .5) return ages[i] ?? null;
	return null;
}
/** 生存曲線の下の面積。地平で打ち切りなら下限。 */
function meanAssetYears(survival) {
	if (survival.length === 0) return 0;
	let area = 0;
	for (let i = 0; i < survival.length - 1; i++) area += ((survival[i] ?? 0) + (survival[i + 1] ?? 0)) / 2;
	return area;
}
var LOG_FLOOR = 1;
function logTicks(min, max) {
	const ticks = [];
	const start = Math.pow(10, Math.floor(Math.log10(Math.max(min, LOG_FLOOR))));
	for (let t = start; t <= max * 1.05; t *= 10) ticks.push(t);
	return ticks.length ? ticks : [
		1,
		10,
		100,
		1e3,
		1e4
	];
}
function niceLogMax(v) {
	const exp = Math.floor(Math.log10(Math.max(v, LOG_FLOOR)));
	const mant = v / 10 ** exp;
	return (mant <= 2 ? 2 : mant <= 5 ? 5 : 10) * 10 ** exp;
}
function FanChart({ result, scale, featured, pathKind, deathAge }) {
	const isLog = scale === "log";
	const clamp = (v) => isLog ? Math.max(LOG_FLOOR, v) : v;
	const featColor = pathKind === "median" ? "var(--color-median)" : "var(--color-ruin)";
	const data = result.ages.map((age, i) => {
		const p5 = clamp(result.percentiles.p5[i] ?? 0);
		const p25 = clamp(result.percentiles.p25[i] ?? 0);
		const p50 = clamp(result.percentiles.p50[i] ?? 0);
		const p75 = clamp(result.percentiles.p75[i] ?? 0);
		const p95 = clamp(result.percentiles.p95[i] ?? 0);
		const featuredRaw = featured?.years[i]?.wealth;
		return {
			age,
			p5,
			p25,
			p50,
			p75,
			p95,
			featured: featuredRaw == null ? null : clamp(featuredRaw),
			outerBase: p5,
			outerSpan: Math.max(0, p95 - p5),
			innerBase: p25,
			innerSpan: Math.max(0, p75 - p25)
		};
	});
	const yVals = data.flatMap((d) => [
		d.p5,
		d.p25,
		d.p50,
		d.p75,
		d.p95,
		d.featured ?? 0
	].filter((v) => v >= LOG_FLOOR));
	const rawMin = yVals.length ? Math.min(...yVals) : LOG_FLOOR;
	const rawMax = yVals.length ? Math.max(...yVals) : 10;
	const yMin = isLog ? Math.pow(10, Math.floor(Math.log10(rawMin))) : 0;
	const yMax = isLog ? niceLogMax(rawMax) : rawMax;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full overflow-hidden sm:h-80",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-border)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "age",
						type: "number",
						domain: ["dataMin", "dataMax"],
						tickFormatter: (v) => String(v),
						tick: {
							fill: "var(--color-fg-muted)",
							fontSize: 11
						},
						axisLine: { stroke: "var(--color-border)" },
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						scale: isLog ? "log" : "auto",
						domain: isLog ? [yMin, yMax] : [0, "auto"],
						ticks: isLog ? logTicks(yMin, yMax) : void 0,
						allowDataOverflow: true,
						tickFormatter: formatAxisYen,
						tick: {
							fill: "var(--color-fg-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						width: 52
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						const i = result.ages.indexOf(Number(label));
						const rawP5 = result.percentiles.p5[i] ?? 0;
						const rawP25 = result.percentiles.p25[i] ?? 0;
						const rawP50 = result.percentiles.p50[i] ?? 0;
						const rawP75 = result.percentiles.p75[i] ?? 0;
						const rawP95 = result.percentiles.p95[i] ?? 0;
						const rawFeat = featured?.years[i]?.wealth;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-surface-2 px-3 py-2 text-xs shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-1 font-medium text-fg",
									children: formatAge(Number(label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular-nums text-fg-muted",
									children: ["5% ", formatManYen(rawP5)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular-nums text-fg-muted",
									children: ["25% ", formatManYen(rawP25)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular-nums text-fg",
									children: ["中央 ", formatManYen(rawP50)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular-nums text-fg-muted",
									children: ["75% ", formatManYen(rawP75)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular-nums text-fg-muted",
									children: ["95% ", formatManYen(rawP95)]
								}),
								rawFeat != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "tabular-nums text-ruin",
									children: ["この経路 ", formatManYen(rawFeat)]
								}) : null
							]
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceArea, {
						x1: result.currentAge,
						x2: result.fireAge,
						fill: "var(--color-phase-accum)",
						fillOpacity: .55,
						ifOverflow: "extendDomain"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceArea, {
						x1: result.fireAge,
						x2: result.endAge,
						fill: "var(--color-phase-withdraw)",
						fillOpacity: .55,
						ifOverflow: "extendDomain"
					}),
					!isLog ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "p95",
							stroke: "none",
							fill: "var(--color-band-outer)",
							fillOpacity: .55,
							isAnimationActive: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "p5",
							stroke: "none",
							fill: "var(--color-surface)",
							fillOpacity: 1,
							isAnimationActive: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "p75",
							stroke: "none",
							fill: "var(--color-band-inner)",
							fillOpacity: .45,
							isAnimationActive: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "p25",
							stroke: "none",
							fill: "var(--color-surface)",
							fillOpacity: 1,
							isAnimationActive: false
						})
					] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "p5",
						stroke: "var(--color-fg-muted)",
						strokeOpacity: .55,
						strokeWidth: 1,
						strokeDasharray: "4 3",
						dot: false,
						isAnimationActive: false,
						legendType: "none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "p95",
						stroke: "var(--color-fg-muted)",
						strokeOpacity: .55,
						strokeWidth: 1,
						strokeDasharray: "4 3",
						dot: false,
						isAnimationActive: false,
						legendType: "none"
					}),
					isLog ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "p25",
						stroke: "var(--color-band-inner)",
						strokeWidth: 1,
						strokeOpacity: .8,
						dot: false,
						isAnimationActive: false,
						legendType: "none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "p75",
						stroke: "var(--color-band-inner)",
						strokeWidth: 1,
						strokeOpacity: .8,
						dot: false,
						isAnimationActive: false,
						legendType: "none"
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "p50",
						stroke: "var(--color-median)",
						strokeWidth: 2,
						dot: false,
						isAnimationActive: false
					}),
					featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "featured",
						stroke: featColor,
						strokeWidth: 1.6,
						dot: false,
						isAnimationActive: false,
						connectNulls: true
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
						x: result.fireAge,
						stroke: "var(--color-fire)",
						strokeDasharray: "4 4"
					}),
					deathAge != null && deathAge > result.currentAge && deathAge < result.endAge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
						x: deathAge,
						stroke: "var(--color-fg-muted)",
						strokeDasharray: "2 4"
					}) : null
				]
			}, scale)
		})
	});
}
function ModelNotes() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "min-w-0 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5 md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "group",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
					className: "flex cursor-pointer list-none flex-col [&::-webkit-details-marker]:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium tracking-[0.16em] text-fg-subtle uppercase",
						children: "Model"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-1 flex items-center gap-2 font-display text-2xl text-fg",
						children: ["設計", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "text-xs leading-none text-fg-subtle transition-transform duration-150 group-open:rotate-180",
							children: "▼"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted",
					children: "この計算機は、資産形成期と取り崩し期を別の配分・別のキャッシュフローとして扱い、資産クラスごとの期待リターンとリスク、クラス間の相関を乗せてモンテカルロ経路を描く。破綻は「資産がゼロ」に限らず、自分で置いた条件で判定する。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-6 grid gap-5 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
							n: "1",
							title: "二段階のライフサイクル",
							children: "現在年齢からFIRE年齢までを形成期（積立）、その後シミュレーション終了年齢までを取り崩し期（支出）とする。年金は指定年齢から毎年生える。配分は期ごとに変えられるので、取崩期だけ債券を厚くする、といったグライドパスを表現できる。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
							n: "2",
							title: "資産クラスのリターンとリスク",
							children: "既定値は JST Macrohistory（株式・国債・手形）と World Bank 金価格を、日本CPIと円ドルで実質円建てにしたもの。算術平均と年率σをクラスごとに置き、相関付き正規乱数（コレスキー）で年次リターンを振る。年1回リバランス。出典ウィンドウ（最長／戦後／変動相場制）で差し替えられる。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
							n: "3",
							title: "ユーザー定義の破綻",
							children: "期間中の閾値割れ、指定年齢での残額、支出のN年分を下回る、の三つ。複数条件は論理和。例:「100歳時点で資産ゼロなら破綻」はチェックポイント条件として足す。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
							n: "4",
							title: "経路の数え方",
							children: "毎年、年初にキャッシュフローを適用し、その後リターンを乗せる。取崩期は手取り支出を保つため、売却額 = 不足分 / (1−税率)。負の資産は0に切り上げ、条件に触れれば破綻フラグを立てて経路は続ける。破綻した経路から無作為に一本、中央の帯にいちばん近い一本、をそれぞれ拾って語る。"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
							n: "5",
							title: "資産寿命と平均余命",
							children: "厚生労働省「令和7年簡易生命表」の男女別 e_x・l_x を、現在年齢からの条件付きで重ねる。資産の生存曲線はモンテカルロ、生命の曲線は生命表。経路自体は死亡で打ち切らない。性別は比較欄のトグルで切り替える。"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 rounded-lg bg-bg-sunken/80 px-4 py-3 text-xs leading-relaxed text-fg-muted",
					children: "入っていないもの: 取得費ベースの譲渡税・NISA枠・配当課税、手数料、ファットテール（正規乱数）、インフレの確率過程、柔軟な取崩ルール、死亡による経路の打ち切り。過去の平均は将来の保証ではない。数値は判断材料であり、助言ではない。"
				})
			]
		})
	});
}
function Note({ n, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-lg bg-surface-2 p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tabular-nums text-fg-subtle",
				children: n
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-lg text-fg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-fg-muted",
				children
			})
		]
	});
}
function PercentileTable({ result }) {
	const marks = [
		result.currentAge,
		result.fireAge,
		Math.round((result.fireAge + result.endAge) / 2),
		result.endAge
	].filter((v, i, arr) => arr.indexOf(v) === i);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full border-collapse text-xs sm:text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border text-left text-xs text-fg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-2 pr-3 font-medium",
					children: "分位"
				}), marks.map((age) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
					className: "py-2 pr-3 font-medium tabular-nums",
					children: [age, "歳"]
				}, age))]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
				{
					key: "p5",
					label: "5%"
				},
				{
					key: "p25",
					label: "25%"
				},
				{
					key: "p50",
					label: "中央"
				},
				{
					key: "p75",
					label: "75%"
				},
				{
					key: "p95",
					label: "95%"
				}
			].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-2 pr-3 text-left font-medium text-fg-muted",
					children: row.label
				}), marks.map((age) => {
					const idx = result.ages.indexOf(age);
					const v = idx >= 0 ? result.percentiles[row.key][idx] : void 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 pr-3 tabular-nums text-fg",
						children: v == null ? "—" : formatManYen(v)
					}, age);
				})]
			}, row.key)) })]
		})
	});
}
function signedPct(decimal, digits = 1) {
	if (decimal == null || !Number.isFinite(decimal)) return "—";
	const body = formatPct(Math.abs(decimal), digits);
	return `${decimal < 0 ? "−" : "+"}${body}`;
}
function RuinStoryCard({ story, pathKind, onPathKindChange, fireAge }) {
	const drawAnotherStory = usePlanStore((s) => s.drawAnotherStory);
	if (!story) return null;
	const isMedian = pathKind === "median";
	const canDrawAnother = !isMedian && story.ruinCount > 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("min-w-0 max-w-full rounded-xl p-3.5 shadow-[var(--shadow-border)] sm:p-5 md:p-6", isMedian ? "bg-surface" : story.ruined ? "bg-ruin-soft" : "bg-surface"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg text-fg",
					children: "シナリオ別表示"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
						ariaLabel: "シナリオ",
						value: pathKind,
						onChange: onPathKindChange,
						options: [{
							id: "ruin",
							label: "破綻"
						}, {
							id: "median",
							label: "中央値"
						}]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-end justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-fg",
					children: isMedian ? `${formatAge(story.years.at(-1)?.age ?? story.ruinAge)}で${formatManYen(story.terminal)}` : story.ruined ? story.terminal <= 0 ? `${formatAge(story.ruinAge)}で折れた` : `${formatAge(story.ruinAge)}時点で${formatManYen(story.terminal)}` : `${formatAge(story.years.at(-1)?.age ?? story.ruinAge)}まで持った`
				}), canDrawAnother ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					size: "sm",
					onClick: drawAnotherStory,
					children: "別の破綻を見る"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-3xl text-sm leading-relaxed text-fg",
				children: story.narrative
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {
				story,
				fireAge,
				isMedian
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4 sm:gap-x-4",
				children: [
					isMedian ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "終価",
						value: formatManYen(story.terminal)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "破綻年齢",
						value: story.ruined ? formatAge(story.ruinAge) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: isMedian ? "期間" : "破綻まで",
						value: `${story.yearsToRuin}年`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "最大ドローダウン",
						value: formatPct(story.maxDrawdown, 0),
						warn: story.maxDrawdown <= -.3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "FIRE後10年の実質CAGR",
						value: signedPct(story.fire10yCagr),
						warn: (story.fire10yCagr ?? 0) < 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "最悪年",
						value: story.worstAge != null ? `${signedPct(story.worstYear, 0)}（${formatAge(story.worstAge)}）` : signedPct(story.worstYear, 0),
						warn: story.worstYear <= -.2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: isMedian ? "終盤5年の平均リターン" : "破綻直前5年の平均リターン",
						value: signedPct(story.preRuin5yAvg)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "累計取り崩し額",
						value: formatManYen(story.cumulativeWithdrawal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "累計税負担",
						value: formatManYen(story.cumulativeTax)
					})
				]
			})
		]
	});
}
function Metric({ label, value, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] leading-snug break-words text-fg-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("mt-0.5 font-display text-base tabular-nums tracking-tight sm:text-lg", warn ? "text-ruin" : "text-fg"),
			children: value
		})]
	});
}
function Spark({ story, fireAge, isMedian }) {
	const vals = story.years.map((y) => y.wealth);
	const n = vals.length;
	if (n < 2) return null;
	const max = Math.max(...vals, 1);
	const w = 640;
	const h = 72;
	const pad = 2;
	const x = (i) => i / (n - 1) * w;
	const y = (v) => pad + (1 - v / max) * 68;
	const d = vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
	const fireI = story.years.findIndex((yr) => yr.age >= fireAge);
	const ruinI = story.years.findIndex((yr) => yr.age >= story.ruinAge);
	const stroke = isMedian ? "var(--color-median)" : "var(--color-ruin)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: "mt-4 h-16 w-full max-w-full overflow-visible",
		role: "img",
		"aria-label": "この経路の資産の推移",
		children: [
			fireI >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: x(fireI),
				x2: x(fireI),
				y1: 0,
				y2: h,
				stroke: "var(--color-fire)",
				strokeDasharray: "3 3",
				strokeWidth: "1"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d,
				fill: "none",
				stroke,
				strokeWidth: "2",
				strokeLinejoin: "round"
			}),
			!isMedian && story.ruined && ruinI >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: x(ruinI),
				cy: y(vals[ruinI] ?? 0),
				r: "4",
				fill: "var(--color-ruin)"
			}) : null
		]
	});
}
function SurvivalChart({ result }) {
	const sex = usePlanStore((s) => s.plan.sex === "female" ? "female" : "male");
	const ex = remainingLife(result.currentAge, sex);
	const deathAge = expectedDeathAge(result.currentAge, sex);
	const halfAge = assetHalfLifeAge(result.ages, result.survival);
	const meanYears = meanAssetYears(result.survival);
	const horizonYears = Math.max(1, result.endAge - result.currentAge);
	const assetYears = halfAge != null ? halfAge - result.currentAge : horizonYears;
	const censored = halfAge == null;
	const barMax = Math.max(ex, assetYears, 1);
	const sexLabel = sex === "female" ? "女性" : "男性";
	const data = result.ages.map((age, i) => ({
		age,
		asset: result.survival[i] ?? 1,
		life: lifeSurvival(result.currentAge, age, sex)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mb-4 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareStat, {
					label: `${sexLabel}の平均余命`,
					value: `${ex.toFixed(1)}年`,
					sub: `${formatAge(result.currentAge)} → ${formatAge(Math.round(deathAge))}`,
					fill: ex / barMax,
					tone: "life"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareStat, {
					label: "資産寿命（半数）",
					value: censored ? `${horizonYears}年+` : `${assetYears}年`,
					sub: censored ? `終了年齢（${formatAge(result.endAge)}）まで半分は持つ` : `${formatAge(result.currentAge)} → ${formatAge(halfAge)}`,
					fill: assetYears / barMax,
					tone: "asset"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs leading-relaxed text-fg-muted",
				children: censored ? `平均余命は${ex.toFixed(1)}年（${formatAge(Math.round(deathAge))}）。この条件では資産の半分が尽きる前にシミュレーション終了年齢へ達する。曲線の平均は${meanYears.toFixed(0)}年（打ち切り）。` : `平均余命${ex.toFixed(1)}年に対し、経路の半数が${formatAge(halfAge)}で破綻する。`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-48 w-full overflow-hidden sm:h-56",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "age",
								type: "number",
								domain: ["dataMin", "dataMax"],
								tick: {
									fill: "var(--color-fg-muted)",
									fontSize: 11
								},
								axisLine: { stroke: "var(--color-border)" },
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: [0, 1],
								tickFormatter: (v) => `${Math.round(v * 100)}%`,
								tick: {
									fill: "var(--color-fg-muted)",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false,
								width: 40
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
								if (!active || !payload?.length) return null;
								const asset = payload.find((p) => p.dataKey === "asset")?.value;
								const life = payload.find((p) => p.dataKey === "life")?.value;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-surface-2 px-3 py-2 text-xs shadow-[var(--shadow-border)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-fg",
											children: formatAge(Number(label))
										}),
										asset != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "tabular-nums text-accent",
											children: ["資産 ", formatPct(asset)]
										}) : null,
										life != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "tabular-nums text-fire",
											children: ["生命 ", formatPct(life)]
										}) : null
									]
								});
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								x: result.fireAge,
								stroke: "var(--color-fire)",
								strokeDasharray: "4 4"
							}),
							deathAge > result.currentAge && deathAge < result.endAge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								x: deathAge,
								stroke: "var(--color-fg-muted)",
								strokeDasharray: "2 4"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "stepAfter",
								dataKey: "asset",
								name: "資産",
								stroke: "var(--color-accent)",
								strokeWidth: 2,
								dot: false,
								isAnimationActive: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "life",
								name: "生命",
								stroke: "var(--color-fire)",
								strokeWidth: 2,
								dot: false,
								isAnimationActive: false
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-fg-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-0.5 w-3 bg-accent" }), "資産が持つ割合"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-0.5 w-3 bg-fire" }),
							sexLabel,
							"が生きている割合"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "点線はFIREと平均余命の到達年齢" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-[11px] leading-relaxed text-fg-subtle",
				children: [
					"生命は",
					LIFE_TABLE.publisher,
					LIFE_TABLE.name,
					"（",
					LIFE_TABLE.year,
					"年）の",
					sexLabel,
					"、現在年齢から条件付き。経路は死なない。比較用。"
				]
			})
		]
	});
}
function CompareStat({ label, value, sub, fill, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 rounded-lg bg-surface-2 px-3 py-2.5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-[11px] text-fg-subtle",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "font-display text-xl tabular-nums tracking-tight text-fg",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-[11px] text-fg-muted",
				children: sub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-1.5 overflow-hidden rounded-full bg-bg-sunken",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full rounded-full", tone === "asset" ? "bg-accent" : "bg-fire"),
					style: { width: `${Math.min(100, Math.max(4, fill * 100))}%` }
				})
			})
		]
	});
}
function ClientChart({ children, heightClass }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `${heightClass} w-full min-w-0 rounded-lg bg-bg-sunken/70` });
	return children;
}
function ResultsPanel() {
	const result = usePlanStore((s) => s.result);
	const status = usePlanStore((s) => s.status);
	const sex = usePlanStore((s) => s.plan.sex === "female" ? "female" : "male");
	const patchPlan = usePlanStore((s) => s.patchPlan);
	const [scale, setScale] = (0, import_react.useState)("log");
	const [pathKind, setPathKind] = (0, import_react.useState)("ruin");
	if (!result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl bg-surface px-5 py-10 text-sm text-fg-muted shadow-[var(--shadow-border)]",
		children: status === "running" ? "計算中です。" : "まだ計算していません。再計算を押すと経路が出る。"
	});
	const featured = pathKind === "median" ? result.medianStory : result.ruinStory;
	const deathAge = expectedDeathAge(result.currentAge, sex);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-3 flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-fg",
						children: "資産の経路"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "hidden text-xs text-fg-subtle sm:block",
							children: [scale === "log" ? "縦軸は対数" : "帯は25–75% · 点線は5%と95%", pathKind === "median" ? " · 緑線は中央値の一本" : " · 赤線は破綻の一本"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
							ariaLabel: "縦軸のスケール",
							value: scale,
							onChange: setScale,
							options: [{
								id: "log",
								label: "片対数"
							}, {
								id: "linear",
								label: "線形"
							}]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, {
					heightClass: "h-64 sm:h-80",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FanChart, {
						result,
						scale,
						featured,
						pathKind,
						deathAge
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuinStoryCard, {
				story: featured,
				pathKind,
				onPathKindChange: setPathKind,
				fireAge: result.fireAge
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-3 flex flex-wrap items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-fg",
						children: "資産寿命と寿命の比較"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-fg-muted",
						children: "資産が持つ経路の割合と、生命表上でその年齢まで生きている割合"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
						ariaLabel: "性別",
						className: "w-[7.5rem]",
						value: sex,
						onChange: (v) => patchPlan({ sex: v }),
						options: [{
							id: "male",
							label: "男性"
						}, {
							id: "female",
							label: "女性"
						}]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, {
					heightClass: "h-48 sm:h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurvivalChart, { result })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg text-fg",
						children: "分位表"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PercentileTable, { result })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelNotes, {})
		]
	});
}
//#endregion
export { ResultsPanel };
