import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as formatManYen, a as buildTweetText, g as formatAxisYen, h as formatAge, i as buildShareUrl, n as Button, o as tweetIntentUrl, r as usePlanStore, v as formatPct, y as cn } from "./routes-BbTeEfmE.mjs";
import { a as Area, c as ReferenceArea, d as Tooltip, i as XAxis, l as ReferenceLine, n as LineChart, o as Line, r as YAxis, s as CartesianGrid, t as ComposedChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/results-panel-DL552BgE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SegmentedControl({ value, onChange, options, ariaLabel, className }) {
	const index = options[0].id === value ? 0 : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "tablist",
		"aria-label": ariaLabel,
		className: cn("relative grid h-9 w-[11.5rem] shrink-0 grid-cols-2 rounded-full bg-bg-sunken p-0.5 type-caption font-medium", className),
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
function FanChart({ result, scale, featured, pathKind, deathAge, fill = false }) {
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
		className: fill ? "h-full min-h-0 w-full overflow-hidden" : "h-64 w-full overflow-hidden sm:h-80",
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
							fontSize: 12
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
							fontSize: 12
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
									children: ["このシナリオ ", formatManYen(rawFeat)]
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
function clampProbability(value) {
	if (!Number.isFinite(value)) return 0;
	return Math.max(0, Math.min(1, value));
}
function survivalAt(result, age) {
	const index = result.ages.findIndex((candidate) => candidate >= age);
	if (index < 0) return clampProbability(result.survival.at(-1) ?? 1);
	return clampProbability(result.survival[index] ?? 1);
}
function buildRuinRiskBreakdown(result) {
	const afterAge80 = survivalAt(result, 80);
	const afterAge100 = survivalAt(result, 100);
	const survived = clampProbability(result.successRate);
	return {
		throughAge80: clampProbability(1 - afterAge80),
		age81To100: clampProbability(afterAge80 - afterAge100),
		afterAge100: clampProbability(afterAge100 - survived),
		survived
	};
}
function ShareButtons() {
	const plan = usePlanStore((s) => s.plan);
	const result = usePlanStore((s) => s.result);
	const resultStale = usePlanStore((s) => s.resultStale);
	const error = usePlanStore((s) => s.error);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copyLink = async () => {
		const url = buildShareUrl(plan);
		try {
			await navigator.clipboard.writeText(url);
		} catch {
			window.prompt("このリンクをコピー", url);
		}
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1600);
	};
	const shareX = () => {
		const url = buildShareUrl(plan);
		const intent = tweetIntentUrl(buildTweetText(plan, result, url));
		window.open(intent, "_blank", "noopener,noreferrer");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex shrink-0 items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			className: "h-8 px-2.5 text-xs",
			onClick: copyLink,
			children: copied ? "コピーした" : "リンク"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			className: "h-8 px-2.5 text-xs",
			onClick: shareX,
			disabled: resultStale || error != null,
			title: resultStale || error ? "新しい計算結果が出てから共有できます" : void 0,
			children: "X"
		})]
	});
}
function RuinRiskSummary({ result, selected, onSelect }) {
	const resultStale = usePlanStore((s) => s.resultStale);
	const status = usePlanStore((s) => s.status);
	const error = usePlanStore((s) => s.error);
	const breakdown = buildRuinRiskBreakdown(result);
	const totalRuin = 1 - breakdown.survived;
	const rate = result.successRate;
	const tone = rate >= .95 ? "survive" : rate >= .8 ? "mid" : "ruin";
	const segments = [
		{
			id: "throughAge80",
			label: "80歳まで",
			full: "80歳までに資産枯渇",
			value: breakdown.throughAge80,
			color: "bg-ruin"
		},
		{
			id: "age81To100",
			label: "81–100歳",
			full: "81〜100歳で資産枯渇",
			value: breakdown.age81To100,
			color: "bg-fire"
		},
		{
			id: "afterAge100",
			label: "101歳以降",
			full: "101歳以降に資産枯渇",
			value: breakdown.afterAge100,
			color: "bg-ruin/50"
		},
		{
			id: "survived",
			label: `${result.endAge}歳生存`,
			full: `${formatAge(result.endAge)}まで生存`,
			value: breakdown.survived,
			color: "bg-survive"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "type-title text-fg",
						children: [
							result.endAge,
							"歳まで資産が持つ割合",
							resultStale ? " · 前回" : ""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("type-hero mt-1", tone === "survive" && "text-survive", tone === "mid" && "text-fg", tone === "ruin" && "text-ruin"),
						children: formatPct(rate, 1)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButtons, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 grid shrink-0 grid-cols-2 gap-x-4 gap-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: `${result.endAge}歳時点　中央値`,
						value: formatManYen(result.terminal.p50)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "下振れ5%",
						value: formatManYen(result.terminal.p5)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "資産が足りたシナリオの中央値",
						value: result.terminal.survivorMedian != null ? formatManYen(result.terminal.survivorMedian) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "資産枯渇",
						value: formatPct(totalRuin, 1)
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-ruin",
				children: error
			}) : resultStale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-fg-muted",
				children: status === "running" ? "新しい条件を計算中。表示は前回結果。" : "条件が変わっています。表示は前回結果。"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex h-2 shrink-0 overflow-hidden rounded-full bg-bg-sunken",
				role: "img",
				"aria-label": `資産枯渇確率 ${formatPct(totalRuin, 1)}。${segments.map((segment) => `${segment.full} ${formatPct(segment.value, 1)}`).join("、")}`,
				children: segments.map((segment) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: segment.color,
					style: { width: `${segment.value * 100}%` },
					title: `${segment.full} ${formatPct(segment.value, 1)}`
				}, segment.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex shrink-0 gap-1",
				children: segments.map((segment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !result.periodStories[segment.id],
					"aria-pressed": selected === segment.id,
					onClick: () => onSelect(segment.id),
					className: cn("min-w-0 flex-1 rounded-md border px-1 py-1 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40", selected === segment.id ? "border-accent bg-accent/10" : "border-border bg-surface-2 hover:bg-bg-sunken"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center justify-center gap-1 text-xs leading-tight text-fg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: `inline-block size-1.5 shrink-0 rounded-full ${segment.color}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: segment.label
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "type-body mt-0.5 block font-medium tabular-nums text-fg",
						children: formatPct(segment.value, 1)
					})]
				}, segment.id))
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "type-caption text-fg-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "type-metric text-fg",
			children: value
		})]
	});
}
function signedPct(decimal, digits = 1) {
	if (decimal == null || !Number.isFinite(decimal)) return "—";
	const body = formatPct(Math.abs(decimal), digits);
	return `${decimal < 0 ? "−" : "+"}${body}`;
}
function RuinStoryCard({ story, fireAge, embedded = false, compact = false, heading = "代表シナリオ" }) {
	const drawAnotherStory = usePlanStore((s) => s.drawAnotherStory);
	if (!story) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-0 flex-1 items-center text-sm text-fg-muted",
		children: "この区分に該当するシナリオはありません。"
	});
	const isMedian = story.role === "median";
	const canDrawAnother = !isMedian && story.ruinCount > 1;
	const headline = isMedian ? `${formatAge(story.years.at(-1)?.age ?? story.ruinAge)}で${formatManYen(story.terminal)}` : story.ruined ? story.terminal <= 0 ? `${formatAge(story.ruinAge)}で折れた` : `${formatAge(story.ruinAge)}時点で${formatManYen(story.terminal)}` : `${formatAge(story.years.at(-1)?.age ?? story.ruinAge)}まで持った`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex min-h-0 min-w-0 max-w-full flex-1 flex-col", !compact && !embedded && "rounded-xl p-3.5 shadow-[var(--shadow-border)] sm:p-5", !compact && !embedded && (isMedian ? "bg-surface" : story.ruined ? "bg-ruin-soft" : "bg-surface"), !compact && embedded && "mt-5 border-t border-border pt-4"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "type-title text-fg",
					children: heading
				}), canDrawAnother ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					size: "sm",
					className: "shrink-0 text-xs",
					onClick: drawAnotherStory,
					children: "別の資産枯渇シナリオを見る"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "type-metric mt-1.5 shrink-0 text-fg",
				children: headline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1.5 shrink-0 text-sm leading-relaxed text-fg", compact && "line-clamp-2 text-xs text-fg-muted"),
				children: story.narrative
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {
				story,
				fireAge,
				isMedian,
				fill: compact
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: cn("mt-2 shrink-0 grid gap-x-3 gap-y-2", compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-3"),
				children: [
					isMedian ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "終価",
						value: formatManYen(story.terminal),
						compact
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "枯渇年齢",
						value: story.ruined ? formatAge(story.ruinAge) : "—",
						compact
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: isMedian ? "期間" : "枯渇まで",
						value: `${story.yearsToRuin}年`,
						compact
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "最大DD",
						value: formatPct(story.maxDrawdown, 0),
						warn: story.maxDrawdown <= -.3,
						compact
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "最悪年",
						value: story.worstAge != null ? `${signedPct(story.worstYear, 0)}（${formatAge(story.worstAge)}）` : signedPct(story.worstYear, 0),
						warn: story.worstYear <= -.2,
						compact
					}),
					compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: "FIRE後10年の実質CAGR",
							value: signedPct(story.fire10yCagr),
							warn: (story.fire10yCagr ?? 0) < 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
							label: isMedian ? "終盤5年の平均リターン" : "枯渇直前5年の平均リターン",
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
					] })
				]
			})
		]
	});
}
function Metric({ label, value, warn, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "type-caption leading-snug break-words text-fg-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: cn("mt-0.5 font-display text-lg tabular-nums tracking-tight", warn ? "text-ruin" : "text-fg"),
			children: value
		})]
	});
}
function Spark({ story, fireAge, isMedian, fill }) {
	const vals = story.years.map((y) => y.wealth);
	const n = vals.length;
	if (n < 2) return null;
	const max = Math.max(...vals, 1);
	const w = 640;
	const h = fill ? 160 : 72;
	const pad = 4;
	const x = (i) => i / (n - 1) * w;
	const y = (v) => pad + (1 - v / max) * (h - 8);
	const d = vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
	const fireI = story.years.findIndex((yr) => yr.age >= fireAge);
	const ruinI = story.years.findIndex((yr) => yr.age >= story.ruinAge);
	const stroke = isMedian ? "var(--color-median)" : "var(--color-ruin)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("min-h-0 w-full", fill ? "mt-2 flex-1" : "mt-4 h-16"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${w} ${h}`,
			preserveAspectRatio: fill ? "none" : "xMidYMid meet",
			className: "h-full w-full overflow-visible",
			role: "img",
			"aria-label": "このシナリオの資産の推移",
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
					strokeWidth: "2.4",
					strokeLinejoin: "round"
				}),
				!isMedian && story.ruined && ruinI >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: x(ruinI),
					cy: y(vals[ruinI] ?? 0),
					r: "5",
					fill: "var(--color-ruin)"
				}) : null
			]
		})
	});
}
function survivalAtAge(result, age) {
	const { ages, survival } = result;
	if (ages.length === 0) return 1;
	if (age <= (ages[0] ?? 0)) return survival[0] ?? 1;
	for (let i = ages.length - 1; i >= 0; i--) if ((ages[i] ?? 0) <= age) return survival[i] ?? 1;
	return survival.at(-1) ?? 1;
}
function SurvivalChart({ result, compact = false }) {
	const sex = usePlanStore((s) => s.plan.sex === "female" ? "female" : "male");
	const ex = remainingLife(result.currentAge, sex);
	const deathAge = expectedDeathAge(result.currentAge, sex);
	const survAtDeath = survivalAtAge(result, deathAge);
	const survAtEnd = result.survival.at(-1) ?? result.successRate;
	const sexLabel = sex === "female" ? "女性" : "男性";
	const data = result.ages.map((age, i) => ({
		age,
		asset: result.survival[i] ?? 1,
		life: lifeSurvival(result.currentAge, age, sex)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-0 min-w-0 flex-1 flex-col", compact && "h-full"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: cn("grid grid-cols-2 gap-2", compact ? "mb-2 shrink-0" : "mb-4 gap-3"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareStat, {
					label: `${sexLabel}の平均余命`,
					value: `${ex.toFixed(1)}年`,
					sub: `${formatAge(result.currentAge)} → ${formatAge(Math.round(deathAge))}`,
					fill: Math.min(1, ex / Math.max(1, result.endAge - result.currentAge)),
					tone: "life",
					compact
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareStat, {
					label: `${formatAge(Math.round(deathAge))}時点の残存`,
					value: formatPct(survAtDeath, 1),
					sub: `終了時 ${formatPct(survAtEnd, 1)}（シミュレーション）`,
					fill: survAtDeath,
					tone: "asset",
					compact
				})]
			}),
			compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 text-sm leading-relaxed text-fg-muted",
				children: [
					"資産の線は今回回した",
					result.trials.toLocaleString("ja-JP"),
					"本のうち、その年齢まで資産が残った割合。生命は生命表。"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("min-h-0 w-full", compact ? "flex-1" : "h-48 sm:h-56"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					minHeight: 120,
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
									fontSize: 12
								},
								axisLine: { stroke: "var(--color-border)" },
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: [0, 1],
								tickFormatter: (v) => `${Math.round(Number(v) * 100)}%`,
								tick: {
									fill: "var(--color-fg-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false,
								width: 44
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
								if (!active || !payload?.length) return null;
								const asset = payload.find((p) => p.dataKey === "asset")?.value;
								const life = payload.find((p) => p.dataKey === "life")?.value;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-surface-2 px-3 py-2 text-sm shadow-[var(--shadow-border)]",
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
								strokeWidth: 2.5,
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
				className: "mt-1.5 flex shrink-0 flex-wrap items-center gap-x-3 text-xs text-fg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-0.5 w-3 bg-accent" }), "シミュレーション（資産が残る割合）"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "inline-block h-0.5 w-3 bg-fire" }),
						sexLabel,
						"の生命表"
					]
				})]
			}),
			compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs leading-relaxed text-fg-subtle",
				children: [
					"生命は",
					LIFE_TABLE.publisher,
					LIFE_TABLE.name,
					"（",
					LIFE_TABLE.year,
					"年）の",
					sexLabel,
					"、現在年齢から条件付き。資産は今回の乱数。死亡では打ち切らない。"
				]
			})
		]
	});
}
function CompareStat({ label, value, sub, fill, tone, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("min-w-0 rounded-lg bg-surface-2 shadow-[var(--shadow-border)]", compact ? "px-2 py-1.5" : "px-3 py-2.5"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "type-caption text-fg-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "type-metric text-fg",
				children: value
			}),
			compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-fg-muted",
				children: sub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("overflow-hidden rounded-full bg-bg-sunken", compact ? "mt-1 h-1" : "mt-2 h-1.5"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full rounded-full", tone === "asset" ? "bg-accent" : "bg-fire"),
					style: { width: `${Math.min(100, Math.max(4, fill * 100))}%` }
				})
			})
		]
	});
}
function ClientChart({ children }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full min-h-40 w-full flex-1 rounded-lg bg-bg-sunken/70" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full min-h-0 w-full flex-1",
		children
	});
}
function ResultsPanel() {
	const result = usePlanStore((s) => s.result);
	const status = usePlanStore((s) => s.status);
	const sex = usePlanStore((s) => s.plan.sex === "female" ? "female" : "male");
	const patchPlan = usePlanStore((s) => s.patchPlan);
	const [scale, setScale] = (0, import_react.useState)("log");
	const [selectedPeriod, setSelectedPeriod] = (0, import_react.useState)("throughAge80");
	if (!result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-0 flex-1 items-center rounded-xl bg-surface px-5 py-10 text-sm text-fg-muted shadow-[var(--shadow-border)]",
		children: status === "running" ? "計算中です。" : "まだ計算していません。再計算を押すとシナリオが出る。"
	});
	const firstAvailablePeriod = [
		"throughAge80",
		"age81To100",
		"afterAge100",
		"survived"
	].find((period) => result.periodStories[period]);
	const activePeriod = result.periodStories[selectedPeriod] ? selectedPeriod : firstAvailablePeriod ?? "survived";
	const featured = result.periodStories[activePeriod];
	const pathKind = featured?.role ?? "ruin";
	const deathAge = expectedDeathAge(result.currentAge, sex);
	const storyHeading = activePeriod === "survived" ? `${result.endAge}歳まで生存の代表シナリオ` : activePeriod === "throughAge80" ? "80歳までに資産枯渇の代表シナリオ" : activePeriod === "age81To100" ? "81〜100歳で資産枯渇の代表シナリオ" : "101歳以降に資産枯渇の代表シナリオ";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-2 lg:grid-rows-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quad, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuinRiskSummary, {
				result,
				selected: activePeriod,
				onSelect: setSelectedPeriod
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quad, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuinStoryCard, {
				story: featured,
				fireAge: result.fireAge,
				compact: true,
				heading: storyHeading
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quad, {
				title: "資産の推移",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
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
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FanChart, {
					result,
					scale,
					featured,
					pathKind,
					deathAge,
					fill: true
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quad, {
				title: "資産寿命と生命寿命の比較",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
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
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurvivalChart, {
					result,
					compact: true
				}) })
			})
		]
	});
}
function Quad({ title, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-0 flex-col overflow-hidden rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-3.5",
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-2 flex shrink-0 items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "type-title min-w-0 text-fg",
				children: title
			}), action]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1 flex-col overflow-hidden",
			children
		})]
	});
}
//#endregion
export { ResultsPanel };
