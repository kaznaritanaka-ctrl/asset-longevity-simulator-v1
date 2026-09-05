import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as Trash2, r as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DA5D-Rb-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatManYen(man, digits = 0) {
	if (!Number.isFinite(man)) return "—";
	const sign = man < 0 ? "-" : "";
	const abs = Math.abs(man);
	if (abs >= 1e4) {
		const oku = abs / 1e4;
		const d = oku >= 100 ? 1 : 2;
		return `${sign}${oku.toLocaleString("ja-JP", {
			maximumFractionDigits: d,
			minimumFractionDigits: 0
		})}億円`;
	}
	return `${sign}${abs.toLocaleString("ja-JP", {
		maximumFractionDigits: digits,
		minimumFractionDigits: 0
	})}万円`;
}
function formatAxisYen(man) {
	if (!Number.isFinite(man)) return "";
	const sign = man < 0 ? "-" : "";
	const abs = Math.abs(man);
	if (abs >= 1e4) {
		const oku = abs / 1e4;
		const digits = oku >= 10 ? 0 : 1;
		return `${sign}${oku.toFixed(digits)}億`;
	}
	if (abs >= 100) return `${sign}${Math.round(abs).toLocaleString("ja-JP")}万`;
	return `${sign}${Math.round(abs)}万`;
}
function formatPct(decimal, digits = 1) {
	if (!Number.isFinite(decimal)) return "—";
	return `${(decimal * 100).toLocaleString("ja-JP", {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits
	})}%`;
}
function formatInt(n) {
	if (!Number.isFinite(n)) return "—";
	return Math.round(n).toLocaleString("ja-JP");
}
function formatAge(age) {
	return `${Math.round(age)}歳`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg shadow-[var(--shadow-border)] hover:bg-bg-sunken",
			ghost: "text-fg-muted hover:bg-bg-sunken hover:text-fg",
			outline: "border border-border bg-transparent text-fg hover:bg-bg-sunken",
			ruin: "bg-ruin text-ruin-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4 text-sm md:h-10",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5 text-sm",
			icon: "size-11 md:size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
/**
* Real JPY annual total returns, Japan CPI deflator.
* Equities/bonds/bills: Jordà–Schularick–Taylor Macrohistory Database R6 (1870–2020),
*   local-currency total returns (Jordà, Knoll, Kuvshinov, Schularick, Taylor, QJE 2019).
* US equities in JPY: (1 + US equity TR) × (1 + ΔJPY per USD) − 1, then Japan-CPI deflated.
* Gold in JPY: World Bank Pink Sheet annual USD gold × JST JPY/USD, then Japan-CPI deflated.
*
* Arithmetic mean is what the Monte Carlo engine uses. Geometric is the compounded path.
*/
var DATA_WINDOWS = [
	{
		id: "long",
		name: "最長",
		period: "1886–2020",
		n: 129,
		note: "共通サンプルから1944–49年（戦時・占領期の超インフレ。現金・国債の実質が年−90%近く）を除く。東証閉鎖の1946–47年は元系列が欠測。",
		assets: [
			{
				id: "jp-equity",
				name: "日本株式",
				kind: "equity",
				arithPct: 9.6,
				geomPct: 6.8,
				volPct: 25.6
			},
			{
				id: "us-equity",
				name: "米国株式",
				kind: "equity",
				arithPct: 7.9,
				geomPct: 5.6,
				volPct: 21.9
			},
			{
				id: "bonds",
				name: "日本国債",
				kind: "bond",
				arithPct: 3,
				geomPct: 2.6,
				volPct: 8.4
			},
			{
				id: "gold",
				name: "金",
				kind: "alt",
				arithPct: 1.6,
				geomPct: .3,
				volPct: 18.4
			},
			{
				id: "cash",
				name: "現金・手形",
				kind: "cash",
				arithPct: 1.4,
				geomPct: 1.2,
				volPct: 6.1
			}
		],
		correlations: [
			[
				1,
				.19,
				.29,
				.11,
				.26
			],
			[
				.19,
				1,
				.36,
				.28,
				.3
			],
			[
				.29,
				.36,
				1,
				.17,
				.81
			],
			[
				.11,
				.28,
				.17,
				1,
				.18
			],
			[
				.26,
				.3,
				.81,
				.18,
				1
			]
		]
	},
	{
		id: "postwar",
		name: "戦後",
		period: "1952–2020",
		n: 69,
		note: "講和後の現代市場。国債・現金のσが戦前・戦時を含まない分だけ低い。株–債相関はほぼゼロ。",
		assets: [
			{
				id: "jp-equity",
				name: "日本株式",
				kind: "equity",
				arithPct: 9.2,
				geomPct: 7.1,
				volPct: 22
			},
			{
				id: "us-equity",
				name: "米国株式",
				kind: "equity",
				arithPct: 7.4,
				geomPct: 5.4,
				volPct: 20.4
			},
			{
				id: "bonds",
				name: "日本国債",
				kind: "bond",
				arithPct: 3,
				geomPct: 2.8,
				volPct: 5.6
			},
			{
				id: "gold",
				name: "金",
				kind: "alt",
				arithPct: 2.3,
				geomPct: .8,
				volPct: 19
			},
			{
				id: "cash",
				name: "現金・手形",
				kind: "cash",
				arithPct: 1.3,
				geomPct: 1.2,
				volPct: 2.9
			}
		],
		correlations: [
			[
				1,
				.12,
				.01,
				-.02,
				.18
			],
			[
				.12,
				1,
				.15,
				.06,
				.19
			],
			[
				.01,
				.15,
				1,
				-.39,
				.4
			],
			[
				-.02,
				.06,
				-.39,
				1,
				-.21
			],
			[
				.18,
				.19,
				.4,
				-.21,
				1
			]
		]
	},
	{
		id: "float",
		name: "変動相場",
		period: "1972–2020",
		n: 49,
		note: "ブレトンウッズ体制崩壊後。米国株・金は為替が本格的に動く。日本株の実質算術平均はバブル崩壊を含み低下。",
		assets: [
			{
				id: "jp-equity",
				name: "日本株式",
				kind: "equity",
				arithPct: 6,
				geomPct: 4,
				volPct: 20.8
			},
			{
				id: "us-equity",
				name: "米国株式",
				kind: "equity",
				arithPct: 8,
				geomPct: 5.5,
				volPct: 22.1
			},
			{
				id: "bonds",
				name: "日本国債",
				kind: "bond",
				arithPct: 3.4,
				geomPct: 3.2,
				volPct: 6.4
			},
			{
				id: "gold",
				name: "金",
				kind: "alt",
				arithPct: 5.2,
				geomPct: 3.2,
				volPct: 21.7
			},
			{
				id: "cash",
				name: "現金・手形",
				kind: "cash",
				arithPct: .7,
				geomPct: .7,
				volPct: 2.5
			}
		],
		correlations: [
			[
				1,
				.22,
				0,
				.02,
				.18
			],
			[
				.22,
				1,
				.12,
				.06,
				.23
			],
			[
				0,
				.12,
				1,
				-.47,
				.45
			],
			[
				.02,
				.06,
				-.47,
				1,
				-.25
			],
			[
				.18,
				.23,
				.45,
				-.25,
				1
			]
		]
	}
];
var DEFAULT_WINDOW = "long";
var SOURCE_CITATION = {
	jst: {
		label: "Jordà–Schularick–Taylor Macrohistory Database R6",
		detail: "1870–2020年、18か国。株式・国債・手形は現地通貨トータルリターン。日本CPIと対ドル為替を含む。",
		papers: "Jordà, Knoll, Kuvshinov, Schularick, Taylor, “The Rate of Return on Everything, 1870–2015”, QJE 2019."
	},
	gold: {
		label: "World Bank Pink Sheet（年次金価格・USD）",
		detail: "1833年以降の年平均ドル建て金価格。円換算は同年のJST 円/ドル。"
	}
};
var WEIGHTS = {
	"jp-equity": {
		accum: 25,
		withdraw: 20
	},
	"us-equity": {
		accum: 45,
		withdraw: 35
	},
	bonds: {
		accum: 15,
		withdraw: 30
	},
	gold: {
		accum: 10,
		withdraw: 10
	},
	cash: {
		accum: 5,
		withdraw: 5
	}
};
function windowById(id) {
	return DATA_WINDOWS.find((w) => w.id === id) ?? DATA_WINDOWS[0];
}
function assetsFromWindow(window, prev) {
	return window.assets.map((a) => {
		const kept = prev?.find((p) => p.id === a.id);
		const w = WEIGHTS[a.id] ?? {
			accum: 0,
			withdraw: 0
		};
		return {
			id: a.id,
			name: a.name,
			kind: a.kind,
			expectedReturnPct: a.arithPct,
			volatilityPct: a.volPct,
			accumWeight: kept?.accumWeight ?? w.accum,
			withdrawWeight: kept?.withdrawWeight ?? w.withdraw
		};
	});
}
var ASSET_COLORS = {
	"jp-equity": "#2f4f45",
	"us-equity": "#3d5a80",
	bonds: "#7a7468",
	gold: "#8b7355",
	cash: "#b3ad9f"
};
function defaultRuinRules() {
	return [{
		id: "depleted-0",
		type: "depleted",
		threshold: 0
	}];
}
function createDefaultPlan() {
	const win = windowById(DEFAULT_WINDOW);
	return {
		currentAge: 40,
		fireAge: 55,
		endAge: 100,
		sex: "male",
		currentAssets: 8e3,
		annualContribution: 240,
		annualSpend: 420,
		pensionAge: 65,
		annualPension: 180,
		inflationPct: 2,
		taxRatePct: 20,
		returnsAreNominal: false,
		dataWindow: win.id,
		assets: assetsFromWindow(win),
		correlations: win.correlations.map((row) => row.slice()),
		trials: 3e3,
		seed: 20260831,
		ruinRules: defaultRuinRules()
	};
}
var PRESETS = [
	{
		id: "conservative",
		name: "保守型",
		hint: "取崩期は債券・現金を厚く。シーケンスリスクを抑える",
		apply: (plan) => ({
			...plan,
			assets: plan.assets.map((a) => {
				if (a.id === "jp-equity") return {
					...a,
					accumWeight: 20,
					withdrawWeight: 10
				};
				if (a.id === "us-equity") return {
					...a,
					accumWeight: 35,
					withdrawWeight: 20
				};
				if (a.id === "bonds") return {
					...a,
					accumWeight: 25,
					withdrawWeight: 45
				};
				if (a.id === "gold") return {
					...a,
					accumWeight: 10,
					withdrawWeight: 10
				};
				return {
					...a,
					accumWeight: 10,
					withdrawWeight: 15
				};
			})
		})
	},
	{
		id: "balanced",
		name: "バランス型",
		hint: "形成期は株式7割、取崩期は株式55%",
		apply: (plan) => ({
			...plan,
			assets: assetsFromWindow(windowById(plan.dataWindow))
		})
	},
	{
		id: "equity",
		name: "株式重視",
		hint: "取崩期も株式8割。期待値は高いが破綻尾が厚い",
		apply: (plan) => ({
			...plan,
			assets: plan.assets.map((a) => {
				if (a.id === "jp-equity") return {
					...a,
					accumWeight: 30,
					withdrawWeight: 25
				};
				if (a.id === "us-equity") return {
					...a,
					accumWeight: 55,
					withdrawWeight: 55
				};
				if (a.id === "bonds") return {
					...a,
					accumWeight: 5,
					withdrawWeight: 10
				};
				if (a.id === "gold") return {
					...a,
					accumWeight: 7,
					withdrawWeight: 7
				};
				return {
					...a,
					accumWeight: 3,
					withdrawWeight: 3
				};
			})
		})
	},
	{
		id: "all-equity",
		name: "株式100%",
		hint: "日本株40・米国株60。債券・金・現金はゼロ",
		apply: (plan) => ({
			...plan,
			assets: plan.assets.map((a) => {
				if (a.id === "jp-equity") return {
					...a,
					accumWeight: 40,
					withdrawWeight: 40
				};
				if (a.id === "us-equity") return {
					...a,
					accumWeight: 60,
					withdrawWeight: 60
				};
				return {
					...a,
					accumWeight: 0,
					withdrawWeight: 0
				};
			})
		})
	}
];
function matchingPresetId(plan) {
	const key = (assets) => assets.map((a) => `${a.id}:${a.accumWeight}:${a.withdrawWeight}`).sort().join("|");
	const current = key(plan.assets);
	for (const p of PRESETS) if (key(p.apply(plan).assets) === current) return p.id;
	return null;
}
var worker = null;
var workerFailed = false;
var seq = 0;
var inflight = null;
var queued = null;
function abandon(job) {
	if (!job) return;
	job.reject(new DOMException("superseded", "AbortError"));
}
function finish(id, result) {
	const job = inflight;
	inflight = null;
	if (job && job.id === id) job.resolve(result);
	const next = queued;
	queued = null;
	if (next) dispatch(next);
}
function finishError(id, err) {
	const job = inflight;
	inflight = null;
	if (job && job.id === id) job.reject(err);
	const next = queued;
	queued = null;
	if (next) dispatch(next);
}
function dispatch(job) {
	inflight = job;
	if (ensureWorker()) {
		worker.postMessage({
			id: job.id,
			plan: job.plan,
			storyNonce: job.storyNonce
		});
		return;
	}
	import("./engine-DDnXJ3aj.mjs").then(({ simulate }) => {
		const run = () => {
			try {
				finish(job.id, simulate(job.plan, job.storyNonce));
			} catch (err) {
				finishError(job.id, err);
			}
		};
		if (typeof window === "undefined") run();
		else window.setTimeout(run, 0);
	});
}
function ensureWorker() {
	if (typeof window === "undefined" || workerFailed) return false;
	if (worker) return true;
	try {
		worker = new Worker(new URL("./sim.worker.ts", import.meta.url), { type: "module" });
		worker.onmessage = (event) => {
			const data = event.data;
			if (data.ok && data.result) finish(data.id, data.result);
			else finishError(data.id, new Error(data.error || "simulate failed"));
		};
		worker.onerror = () => {
			workerFailed = true;
			worker?.terminate();
			worker = null;
			if (inflight) {
				const job = inflight;
				inflight = null;
				dispatch(job);
			}
		};
		return true;
	} catch {
		workerFailed = true;
		worker = null;
		return false;
	}
}
function warmupWorker() {
	ensureWorker();
}
function runSimAsync(plan, storyNonce) {
	const id = ++seq;
	return new Promise((resolve, reject) => {
		const job = {
			id,
			plan,
			storyNonce,
			resolve,
			reject
		};
		if (!inflight) {
			dispatch(job);
			return;
		}
		abandon(queued);
		queued = job;
	});
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a = a + 1831565813 >>> 0;
		let t = a;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function gaussian(rng) {
	let u = 0;
	let v = 0;
	while (u === 0) u = rng();
	while (v === 0) v = rng();
	return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function cholesky(matrix) {
	const n = matrix.length;
	const L = Array.from({ length: n }, () => Array(n).fill(0));
	for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
		let sum = 0;
		for (let k = 0; k < j; k++) sum += L[i][k] * L[j][k];
		if (i === j) L[i][j] = Math.sqrt(Math.max(matrix[i][i] - sum, 1e-12));
		else {
			const denom = L[j][j] || 1e-12;
			L[i][j] = (matrix[i][j] - sum) / denom;
		}
	}
	return L;
}
/** Ridge the diagonal until Cholesky is numerically stable. */
function makePositiveDefinite(corr) {
	const n = corr.length;
	const A = corr.map((row, i) => row.map((v, j) => {
		if (i === j) return 1;
		return Math.max(-.99, Math.min(.99, Number.isFinite(v) ? v : 0));
	}));
	for (let ridge = 0; ridge <= 8; ridge++) {
		const eps = ridge === 0 ? 0 : 1e-4 * Math.pow(4, ridge - 1);
		const M = A.map((row, i) => row.map((v, j) => i === j ? 1 + eps : v));
		try {
			if (cholesky(M).every((row, i) => Number.isFinite(row[i]) && row[i] > 0)) return M;
		} catch {}
	}
	return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
}
function normalizeWeights(weights) {
	const clipped = weights.map((w) => Math.max(0, w));
	const sum = clipped.reduce((a, b) => a + b, 0);
	if (sum <= 0) return clipped.map(() => 1 / Math.max(clipped.length, 1));
	return clipped.map((w) => w / sum);
}
function percentile(sorted, p) {
	if (sorted.length === 0) return 0;
	const idx = (sorted.length - 1) * p;
	const lo = Math.floor(idx);
	const hi = Math.ceil(idx);
	if (lo === hi) return sorted[lo];
	const t = idx - lo;
	return sorted[lo] * (1 - t) + sorted[hi] * t;
}
function portfolioMoments(mu, sigma, weights, corr) {
	const w = normalizeWeights(weights);
	let mean = 0;
	for (let i = 0; i < w.length; i++) mean += w[i] * mu[i];
	let varSum = 0;
	for (let i = 0; i < w.length; i++) for (let j = 0; j < w.length; j++) {
		const rho = corr[i]?.[j] ?? (i === j ? 1 : 0);
		varSum += w[i] * w[j] * sigma[i] * sigma[j] * rho;
	}
	return {
		mu: mean,
		sigma: Math.sqrt(Math.max(varSum, 0))
	};
}
function resizeCorrelations(current, nextLen, fill = .2) {
	const n = Math.max(0, nextLen);
	const out = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : fill));
	const m = Math.min(current.length, n);
	for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) out[i][j] = i === j ? 1 : current[i]?.[j] ?? fill;
	return out;
}
var WINDOW_CODE = {
	long: "l",
	postwar: "p",
	float: "f"
};
var WINDOW_FROM = {
	l: "long",
	p: "postwar",
	f: "float"
};
var PRESET_CODE = {
	equity: "e",
	conservative: "c",
	"all-equity": "q"
};
var PRESET_FROM = {
	e: "equity",
	c: "conservative",
	q: "all-equity"
};
var KIND_CODE = {
	equity: "e",
	bond: "b",
	cash: "c",
	alt: "a"
};
var KIND_FROM = {
	e: "equity",
	b: "bond",
	c: "cash",
	a: "alt"
};
function nearly(a, b) {
	return Math.abs(a - b) < 1e-6;
}
function sameCorr(a, b) {
	if (a.length !== b.length) return false;
	return a.every((row, i) => row.length === b[i].length && row.every((v, j) => nearly(v, b[i][j])));
}
function catalogAssets(plan) {
	return assetsFromWindow(windowById(plan.dataWindow));
}
function statsMatchCatalog(plan) {
	const cat = catalogAssets(plan);
	if (plan.assets.length !== cat.length) return false;
	return plan.assets.every((a, i) => {
		const c = cat[i];
		return a.id === c.id && a.kind === c.kind && a.name === c.name && nearly(a.expectedReturnPct, c.expectedReturnPct) && nearly(a.volatilityPct, c.volatilityPct);
	});
}
function weightsMatch(plan, other) {
	if (plan.assets.length !== other.length) return false;
	return plan.assets.every((a, i) => nearly(a.accumWeight, other[i].accumWeight) && nearly(a.withdrawWeight, other[i].withdrawWeight));
}
function defaultRuin() {
	return createDefaultPlan().ruinRules;
}
function ruinSignature(rules) {
	return rules.map((r) => {
		if (r.type === "depleted") return `d:${r.threshold}`;
		if (r.type === "below_at_age") return `b:${r.age}:${r.amount}`;
		return `y:${r.years}`;
	}).join("|");
}
function packRuin(rules) {
	return rules.map((r) => {
		if (r.type === "depleted") return ["d", r.threshold];
		if (r.type === "below_at_age") return [
			"b",
			r.age,
			r.amount
		];
		return ["y", r.years];
	});
}
function unpackRuin(rows) {
	return rows.map((row, i) => {
		const [type, ...nums] = row;
		if (type === "b") return {
			id: `b-${i}`,
			type: "below_at_age",
			age: nums[0] ?? 100,
			amount: nums[1] ?? 0
		};
		if (type === "y") return {
			id: `y-${i}`,
			type: "years_of_spend",
			years: nums[0] ?? 1
		};
		return {
			id: `d-${i}`,
			type: "depleted",
			threshold: nums[0] ?? 0
		};
	});
}
function compactPlan(plan) {
	const def = createDefaultPlan();
	const out = {};
	if (plan.currentAge !== def.currentAge) out.a = plan.currentAge;
	if (plan.fireAge !== def.fireAge) out.f = plan.fireAge;
	if (plan.endAge !== def.endAge) out.h = plan.endAge;
	if (plan.sex === "female") out.x = 1;
	if (plan.currentAssets !== def.currentAssets) out.k = plan.currentAssets;
	if (plan.annualContribution !== def.annualContribution) out.c = plan.annualContribution;
	if (plan.annualSpend !== def.annualSpend) out.d = plan.annualSpend;
	if (plan.pensionAge !== def.pensionAge) out.g = plan.pensionAge;
	if (plan.annualPension !== def.annualPension) out.n = plan.annualPension;
	if (plan.inflationPct !== def.inflationPct) out.i = plan.inflationPct;
	if (plan.taxRatePct !== def.taxRatePct) out.t = plan.taxRatePct;
	if (plan.returnsAreNominal) out.m = 1;
	if (plan.dataWindow !== def.dataWindow) out.w = WINDOW_CODE[plan.dataWindow] ?? plan.dataWindow;
	const cat = catalogAssets(plan);
	if (statsMatchCatalog(plan)) {
		const preset = matchingPresetId(plan);
		if (preset && preset !== "balanced") out.p = PRESET_CODE[preset];
		else if (!weightsMatch(plan, cat)) out.wt = plan.assets.flatMap((a) => [a.accumWeight, a.withdrawWeight]);
	} else out.as = plan.assets.map((a) => [
		a.id,
		KIND_CODE[a.kind],
		a.name,
		a.expectedReturnPct,
		a.volatilityPct,
		a.accumWeight,
		a.withdrawWeight
	]);
	const win = windowById(plan.dataWindow);
	if (!sameCorr(plan.correlations, win.correlations)) out.co = plan.correlations;
	if (ruinSignature(plan.ruinRules) !== ruinSignature(defaultRuin())) out.ru = packRuin(plan.ruinRules);
	return out;
}
function expandPlan(raw) {
	let plan = createDefaultPlan();
	const windowId = raw.w && WINDOW_FROM[raw.w] || raw.w;
	if (windowId === "long" || windowId === "postwar" || windowId === "float") {
		const win = windowById(windowId);
		plan = {
			...plan,
			dataWindow: windowId,
			assets: assetsFromWindow(win),
			correlations: win.correlations.map((row) => row.slice())
		};
	}
	const presetId = raw.p ? PRESET_FROM[raw.p] : void 0;
	if (presetId) {
		const preset = PRESETS.find((p) => p.id === presetId);
		if (preset) plan = preset.apply(plan);
	} else if (raw.wt && raw.wt.length >= 2) plan = {
		...plan,
		assets: plan.assets.map((a, i) => ({
			...a,
			accumWeight: raw.wt[i * 2] ?? a.accumWeight,
			withdrawWeight: raw.wt[i * 2 + 1] ?? a.withdrawWeight
		}))
	};
	if (raw.as?.length) plan = {
		...plan,
		assets: raw.as.map((row, i) => ({
			id: row[0] || `a-${i}`,
			kind: KIND_FROM[row[1]] ?? "alt",
			name: row[2] || `資産${i + 1}`,
			expectedReturnPct: row[3] ?? 0,
			volatilityPct: row[4] ?? 0,
			accumWeight: row[5] ?? 0,
			withdrawWeight: row[6] ?? 0
		}))
	};
	if (raw.co) plan = {
		...plan,
		correlations: raw.co
	};
	if (raw.ru) plan = {
		...plan,
		ruinRules: unpackRuin(raw.ru)
	};
	if (raw.a != null) plan.currentAge = raw.a;
	if (raw.f != null) plan.fireAge = raw.f;
	if (raw.h != null) plan.endAge = raw.h;
	if (raw.x === 1) plan.sex = "female";
	if (raw.k != null) plan.currentAssets = raw.k;
	if (raw.c != null) plan.annualContribution = raw.c;
	if (raw.d != null) plan.annualSpend = raw.d;
	if (raw.g != null) plan.pensionAge = raw.g;
	if (raw.n != null) plan.annualPension = raw.n;
	if (raw.i != null) plan.inflationPct = raw.i;
	if (raw.t != null) plan.taxRatePct = raw.t;
	if (raw.m === 1) plan.returnsAreNominal = true;
	return plan;
}
function toB64url(bytes) {
	let bin = "";
	for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
	return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(raw) {
	const pad = raw.length % 4 === 0 ? "" : "=".repeat(4 - raw.length % 4);
	const b64 = raw.replace(/-/g, "+").replace(/_/g, "/") + pad;
	const bin = atob(b64);
	const out = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
	return out;
}
function sanitizePlan(parsed) {
	if (!parsed || !Array.isArray(parsed.assets) || parsed.assets.length === 0) return null;
	const plan = {
		...createDefaultPlan(),
		...parsed
	};
	if (!plan.dataWindow) plan.dataWindow = "long";
	if (plan.taxRatePct == null) plan.taxRatePct = 20;
	if (plan.sex !== "female" && plan.sex !== "male") plan.sex = "male";
	return plan;
}
function encodePlan(plan) {
	const json = JSON.stringify(compactPlan(plan));
	return `c1.${toB64url(new TextEncoder().encode(json))}`;
}
function decodePlan(token) {
	try {
		if (token.startsWith("c1.")) {
			const json = new TextDecoder().decode(fromB64url(token.slice(3)));
			return expandPlan(JSON.parse(json));
		}
		const json = new TextDecoder().decode(fromB64url(token));
		return sanitizePlan(JSON.parse(json));
	} catch {
		return null;
	}
}
function readPlanFromLocation() {
	if (typeof window === "undefined") return null;
	const fromQuery = new URLSearchParams(window.location.search).get("p");
	const hashRaw = window.location.hash.replace(/^#/, "");
	const fromHash = hashRaw.startsWith("p=") ? hashRaw.slice(2) : new URLSearchParams(hashRaw.includes("=") ? hashRaw : "").get("p");
	const token = fromQuery || fromHash;
	if (!token) return null;
	return decodePlan(token);
}
function buildShareUrl(plan) {
	const url = new URL(window.location.href);
	url.hash = "";
	url.searchParams.set("p", encodePlan(plan));
	return url.toString();
}
function buildTweetText(plan, result, url) {
	const rate = result ? formatPct(result.successRate, 1) : "—";
	return [`資産寿命シミュレーターあなたの${plan.endAge}歳までのFIRE生存率は${rate}です`, url].join("\n");
}
function tweetIntentUrl(text) {
	return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
var STORAGE_KEY = "shisan-jumyou-plan-v2";
var initialPlan = createDefaultPlan();
function persist(plan) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
	} catch {}
}
function newId(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
var runGen = 0;
var skipAutoRun = false;
function consumeSkipAutoRun() {
	if (!skipAutoRun) return false;
	skipAutoRun = false;
	return true;
}
var usePlanStore = create((set, get) => ({
	plan: initialPlan,
	result: null,
	status: "idle",
	hydrated: false,
	activated: false,
	fromShare: false,
	storyNonce: 0,
	patchPlan: (patch) => {
		const plan = {
			...get().plan,
			...patch
		};
		persist(plan);
		set({ plan });
	},
	replacePlan: (plan) => {
		persist(plan);
		set({ plan });
	},
	updateAsset: (id, patch) => {
		const plan = {
			...get().plan,
			assets: get().plan.assets.map((a) => a.id === id ? {
				...a,
				...patch
			} : a)
		};
		persist(plan);
		set({ plan });
	},
	addAsset: () => {
		const { plan } = get();
		if (plan.assets.length >= 8) return;
		const asset = {
			id: newId("asset"),
			name: "新規クラス",
			kind: "equity",
			expectedReturnPct: 6,
			volatilityPct: 15,
			accumWeight: 0,
			withdrawWeight: 0
		};
		const assets = [...plan.assets, asset];
		const next = {
			...plan,
			assets,
			correlations: resizeCorrelations(plan.correlations, assets.length, .25)
		};
		persist(next);
		set({ plan: next });
	},
	removeAsset: (id) => {
		const { plan } = get();
		if (plan.assets.length <= 1) return;
		const idx = plan.assets.findIndex((a) => a.id === id);
		if (idx < 0) return;
		const assets = plan.assets.filter((a) => a.id !== id);
		const correlations = plan.correlations.filter((_, i) => i !== idx).map((row) => row.filter((_, j) => j !== idx));
		const next = {
			...plan,
			assets,
			correlations
		};
		persist(next);
		set({ plan: next });
	},
	setCorrelation: (i, j, value) => {
		const { plan } = get();
		const n = plan.correlations.length;
		if (i === j || i < 0 || j < 0 || i >= n || j >= n) return;
		const correlations = plan.correlations.map((row) => row.slice());
		const v = Math.max(-.99, Math.min(.99, value));
		correlations[i][j] = v;
		correlations[j][i] = v;
		const next = {
			...plan,
			correlations
		};
		persist(next);
		set({ plan: next });
	},
	updateRuinRule: (id, rule) => {
		const plan = {
			...get().plan,
			ruinRules: get().plan.ruinRules.map((r) => r.id === id ? rule : r)
		};
		persist(plan);
		set({ plan });
	},
	addRuinRule: (type) => {
		const { plan } = get();
		const id = newId("ruin");
		let rule;
		if (type === "depleted") rule = {
			id,
			type,
			threshold: 0
		};
		else if (type === "below_at_age") rule = {
			id,
			type,
			age: plan.endAge,
			amount: 0
		};
		else rule = {
			id,
			type,
			years: 3
		};
		const next = {
			...plan,
			ruinRules: [...plan.ruinRules, rule]
		};
		persist(next);
		set({ plan: next });
	},
	removeRuinRule: (id) => {
		const plan = {
			...get().plan,
			ruinRules: get().plan.ruinRules.filter((r) => r.id !== id)
		};
		persist(plan);
		set({ plan });
	},
	applyPreset: (id) => {
		const preset = PRESETS.find((p) => p.id === id);
		if (!preset) return;
		const plan = preset.apply(get().plan);
		persist(plan);
		set({ plan });
	},
	applyDataWindow: (id) => {
		const win = windowById(id);
		const { plan } = get();
		const sourced = assetsFromWindow(win, plan.assets);
		const extras = plan.assets.filter((a) => !win.assets.some((s) => s.id === a.id));
		const assets = [...sourced, ...extras];
		const next = {
			...plan,
			dataWindow: win.id,
			returnsAreNominal: false,
			assets,
			correlations: resizeCorrelations(win.correlations, assets.length, .2)
		};
		persist(next);
		set({ plan: next });
	},
	reroll: () => {
		const plan = {
			...get().plan,
			seed: Math.random() * 4294967295 >>> 0
		};
		persist(plan);
		skipAutoRun = true;
		set({
			plan,
			storyNonce: 0
		});
		get().run();
	},
	drawAnotherStory: () => {
		set({ storyNonce: get().storyNonce + 1 });
		get().run();
	},
	reset: () => {
		const plan = createDefaultPlan();
		persist(plan);
		set({ plan });
	},
	run: () => {
		const id = ++runGen;
		const { plan, storyNonce } = get();
		set({
			status: "running",
			activated: true
		});
		runSimAsync(plan, storyNonce).then((result) => {
			if (id !== runGen) return;
			set({
				result,
				status: "done"
			});
		}).catch((err) => {
			if (id !== runGen) return;
			if (err instanceof DOMException && err.name === "AbortError") return;
			set({ status: get().result ? "done" : "idle" });
		});
	},
	hydrate: () => {
		if (get().hydrated) return;
		if (typeof window === "undefined") {
			set({ hydrated: true });
			return;
		}
		warmupWorker();
		const shared = readPlanFromLocation();
		if (shared) {
			persist(shared);
			set({
				plan: shared,
				hydrated: true,
				status: "idle",
				fromShare: true
			});
			return;
		}
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const plan = sanitizePlan(JSON.parse(raw));
				if (plan) {
					set({
						plan,
						hydrated: true,
						status: "idle"
					});
					return;
				}
			}
		} catch {}
		set({ hydrated: true });
	}
}));
function AppHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-border bg-surface/80 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-[1200px] min-w-0 items-center justify-between gap-3 px-3 py-3.5 sm:px-4 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "28",
					height: "28",
					viewBox: "0 0 32 32",
					"aria-hidden": "true",
					className: "shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							width: "32",
							height: "32",
							rx: "8",
							className: "fill-accent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M6 21c5-9 15-9 20 0",
							fill: "none",
							stroke: "currentColor",
							className: "text-accent-fg",
							strokeWidth: "1.8",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "11",
							cy: "16.2",
							r: "1.6",
							className: "fill-accent-fg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "16",
							cy: "13.4",
							r: "1.8",
							className: "fill-accent-fg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "22.5",
							cy: "16.6",
							r: "1.3",
							fill: "none",
							className: "stroke-accent-fg",
							strokeWidth: "1.4"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg leading-none tracking-tight text-fg",
					children: "資産寿命"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-[11px] tracking-wide text-fg-subtle",
					children: "FIRE破綻シミュレーター"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hidden max-w-xs text-right text-[11px] leading-relaxed text-fg-subtle sm:block",
				children: "形成期と取り崩し期を分け、資産クラスごとにリターンとリスクを置いて破綻確率を測る"
			})]
		})
	});
}
function Field({ label, hint, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("grid min-w-0 gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-h-4 items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium tracking-wide text-fg-muted",
				children: label
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 text-xs tabular-nums text-fg-subtle",
				children: hint
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "invisible text-xs",
				children: "."
			})]
		}), children]
	});
}
function SectionCard({ title, kicker, action, children, collapsible = false, defaultOpen = true, preview, titleNowrap = false }) {
	const [open, setOpen] = (0, import_react.useState)(defaultOpen);
	const heading = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: titleNowrap ? "shrink-0" : "min-w-0",
		children: [kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] font-medium tracking-[0.08em] text-fg-subtle",
			children: kicker
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: cn("flex items-center gap-2 font-display text-lg leading-snug text-fg", titleNowrap && "whitespace-nowrap"),
			children: [title, collapsible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "text-[10px] leading-none text-fg-subtle transition-transform duration-150 group-open:rotate-180",
				children: "▼"
			}) : null]
		})]
	});
	if (!collapsible) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "min-w-0 max-w-full rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: cn("mb-4 flex items-center justify-between gap-2", titleNowrap && "flex-nowrap"),
			children: [heading, action]
		}), children]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "min-w-0 max-w-full rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "group",
			open,
			onToggle: (e) => setOpen(e.currentTarget.open),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
				className: "flex cursor-pointer list-none flex-col [&::-webkit-details-marker]:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-start justify-between gap-3",
					children: [heading, action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden group-open:flex",
						onClick: (e) => e.stopPropagation(),
						onPointerDown: (e) => e.stopPropagation(),
						children: action
					}) : null]
				}), preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-4",
					onClick: (e) => e.stopPropagation(),
					onPointerDown: (e) => e.stopPropagation(),
					children: preview
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: preview ? "mt-3" : "mt-4",
				children
			})]
		})
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		suppressHydrationWarning: true,
		className: cn("h-11 w-full min-w-0 rounded-md border border-border bg-surface-2 px-2.5 text-fg tabular-nums outline-none transition-[border-color,box-shadow] duration-150 sm:px-3 md:h-10", "placeholder:text-fg-subtle focus:border-accent", "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none", className),
		...props
	});
}
function Select({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		suppressHydrationWarning: true,
		className: cn("h-11 w-full min-w-0 rounded-md border border-border bg-surface-2 px-2.5 text-fg outline-none transition-[border-color] duration-150 sm:px-3 md:h-10", "focus:border-accent", className),
		...props,
		children
	});
}
var KIND_LABEL = {
	equity: "株式",
	bond: "債券",
	cash: "現金",
	alt: "オルタナ"
};
var RUIN_TYPE_LABEL = {
	depleted: "期間中に閾値割れ",
	below_at_age: "指定年齢で閾値割れ",
	years_of_spend: "支出N年分を下回る"
};
function CorrelationEditor() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const plan = usePlanStore((s) => s.plan);
	const setCorrelation = usePlanStore((s) => s.setCorrelation);
	const n = plan.assets.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 border-t border-border pt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex w-full items-center justify-between text-sm text-fg",
			onClick: () => setOpen((v) => !v),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "相関係数" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-fg-subtle",
				children: open ? "閉じる" : "開く"
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 max-w-full overflow-x-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs leading-relaxed text-fg-subtle",
				children: "対角は1で固定。対称行列として両方を同時に更新する。非正定値なら計算側で微小なリッジを足す。"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "min-w-full border-collapse text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "p-1 text-left font-medium text-fg-muted",
					children: " "
				}), plan.assets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "p-1 font-medium text-fg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block max-w-16 truncate",
						children: a.name
					})
				}, a.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: plan.assets.map((rowAsset, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "whitespace-nowrap p-1 text-left font-medium text-fg-muted",
					children: rowAsset.name
				}), Array.from({ length: n }, (_, j) => {
					const v = plan.correlations[i]?.[j] ?? (i === j ? 1 : 0);
					if (i === j) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-1 text-center tabular-nums text-fg-subtle",
						children: "1"
					}, j);
					if (j < i) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-1 text-center tabular-nums text-fg-subtle",
						children: v.toFixed(2)
					}, j);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							step: .05,
							min: -.99,
							max: .99,
							value: Number(v.toFixed(2)),
							onChange: (e) => setCorrelation(i, j, Number(e.target.value)),
							className: "h-8 px-1 text-center md:h-8"
						})
					}, j);
				})] }, rowAsset.id)) })]
			})]
		}) : null]
	});
}
var KINDS = [
	"equity",
	"bond",
	"cash",
	"alt"
];
function weightSum(values) {
	return values.reduce((a, b) => a + b, 0);
}
function WeightBar({ items }) {
	const sum = weightSum(items.map((i) => i.weight)) || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-2.5 overflow-hidden rounded-full bg-bg-sunken",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			title: `${item.name} ${(item.weight / sum * 100).toFixed(0)}%`,
			className: "h-full",
			style: {
				width: `${item.weight / sum * 100}%`,
				background: ASSET_COLORS[item.id] ?? "var(--color-fg-muted)"
			}
		}, item.id))
	});
}
function AssetEditor() {
	const plan = usePlanStore((s) => s.plan);
	const patchPlan = usePlanStore((s) => s.patchPlan);
	const applyPreset = usePlanStore((s) => s.applyPreset);
	const updateAsset = usePlanStore((s) => s.updateAsset);
	const addAsset = usePlanStore((s) => s.addAsset);
	const removeAsset = usePlanStore((s) => s.removeAsset);
	const result = usePlanStore((s) => s.result);
	const accumSum = weightSum(plan.assets.map((a) => a.accumWeight));
	const wdSum = weightSum(plan.assets.map((a) => a.withdrawWeight));
	const activePreset = matchingPresetId(plan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
		title: "資産配分タイプ",
		collapsible: true,
		defaultOpen: false,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "ghost",
			size: "sm",
			onClick: addAsset,
			className: "pr-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "追加"]
		}),
		preview: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => applyPreset(p.id),
						title: p.hint,
						className: cn("rounded-md border px-3 py-2.5 text-left text-sm leading-tight transition-colors duration-150", activePreset === p.id ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface-2 text-fg hover:bg-bg-sunken"),
						children: p.name
					}, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[11px] text-fg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"形成期 ",
								accumSum.toFixed(0),
								"%"
							] }), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									"実質 ",
									formatPct(result.portfolio.accum.mu),
									" · σ ",
									formatPct(result.portfolio.accum.sigma)
								]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeightBar, { items: plan.assets.map((a) => ({
							id: a.id,
							name: a.name,
							weight: a.accumWeight
						})) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[11px] text-fg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"取崩期 ",
								wdSum.toFixed(0),
								"%"
							] }), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [
									"実質 ",
									formatPct(result.portfolio.withdraw.mu),
									" · σ ",
									formatPct(result.portfolio.withdraw.sigma)
								]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeightBar, { items: plan.assets.map((a) => ({
							id: a.id,
							name: a.name,
							weight: a.withdrawWeight
						})) })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "試行回数",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: plan.trials,
						onChange: (e) => patchPlan({ trials: Number(e.target.value) }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 1e3,
								children: "1,000（速い）"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 3e3,
								children: "3,000（標準）"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 5e3,
								children: "5,000"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 1e4,
								children: "10,000（精密）"
							})
						]
					})
				})
			]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs leading-relaxed text-fg-subtle",
				children: "期待リターンとリスク（年率標準偏差）をクラスごとに指定。配分は形成期 / 取崩期で別々。合計が100%でなくても計算時に正規化する。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: plan.assets.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg bg-surface-2 p-3 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex min-w-0 items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2.5 shrink-0 rounded-full",
								style: { background: ASSET_COLORS[asset.id] ?? "var(--color-fg-muted)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: asset.name,
								onChange: (e) => updateAsset(asset.id, { name: e.target.value }),
								className: "h-9 min-w-0 border-0 bg-transparent px-0 shadow-none md:h-9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: asset.kind,
								onChange: (e) => updateAsset(asset.id, { kind: e.target.value }),
								className: "h-9 w-20 shrink-0 px-1.5 text-xs sm:w-28 md:h-9",
								children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: k,
									children: KIND_LABEL[k]
								}, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `${asset.name}を削除`,
								className: "grid size-9 shrink-0 place-items-center rounded-md text-fg-subtle hover:bg-ruin-soft hover:text-ruin",
								onClick: () => removeAsset(asset.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniField, {
								label: "リターン %",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: .1,
									value: asset.expectedReturnPct,
									onChange: (e) => updateAsset(asset.id, { expectedReturnPct: Number(e.target.value) }),
									className: "h-9 md:h-9"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniField, {
								label: "リスク %",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: .1,
									min: 0,
									value: asset.volatilityPct,
									onChange: (e) => updateAsset(asset.id, { volatilityPct: Number(e.target.value) }),
									className: "h-9 md:h-9"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniField, {
								label: "形成期 %",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: 1,
									min: 0,
									value: asset.accumWeight,
									onChange: (e) => updateAsset(asset.id, { accumWeight: Number(e.target.value) }),
									className: "h-9 md:h-9"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniField, {
								label: "取崩期 %",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: 1,
									min: 0,
									value: asset.withdrawWeight,
									onChange: (e) => updateAsset(asset.id, { withdrawWeight: Number(e.target.value) }),
									className: "h-9 md:h-9"
								})
							})
						]
					})]
				}, asset.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorrelationEditor, {})
		]
	});
}
function MiniField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] font-medium tracking-wide text-fg-subtle",
			children: label
		}), children]
	});
}
var AGE_MIN = 18;
var AGE_MAX = 110;
function pct(age) {
	return (age - AGE_MIN) / 92 * 100;
}
function ageFromX(clientX, rect) {
	const t = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
	return Math.round(AGE_MIN + t * 92);
}
/** 現在 ≦ FIRE ＜ 終了年齢 */
function clampTrio(currentAge, fireAge, endAge, edited) {
	let now = Math.round(currentAge);
	let fire = Math.round(fireAge);
	let end = Math.round(endAge);
	now = Math.min(109, Math.max(AGE_MIN, now));
	fire = Math.min(109, Math.max(AGE_MIN, fire));
	end = Math.min(AGE_MAX, Math.max(19, end));
	if (edited === "now") {
		if (now > fire) fire = now;
		if (fire >= end) end = fire + 1;
	} else if (edited === "fire") {
		if (fire < now) fire = now;
		if (fire >= end) end = fire + 1;
	} else {
		if (end <= fire) fire = end - 1;
		if (fire < now) now = fire;
	}
	if (end > AGE_MAX) {
		end = AGE_MAX;
		fire = Math.min(fire, end - 1);
		now = Math.min(now, fire);
	}
	return {
		currentAge: now,
		fireAge: fire,
		endAge: end
	};
}
function AgeSlider() {
	const plan = usePlanStore((s) => s.plan);
	const patchPlan = usePlanStore((s) => s.patchPlan);
	const status = usePlanStore((s) => s.status);
	const reroll = usePlanStore((s) => s.reroll);
	const run = usePlanStore((s) => s.run);
	const trackRef = (0, import_react.useRef)(null);
	const planRef = (0, import_react.useRef)(plan);
	planRef.current = plan;
	const dragRef = (0, import_react.useRef)(null);
	const now = Math.round(plan.currentAge);
	const fire = Math.round(plan.fireAge);
	const end = Math.round(plan.endAge);
	const pension = Math.round(plan.pensionAge);
	const accumYears = Math.max(0, fire - now);
	const wdYears = Math.max(0, end - fire);
	const apply = (thumb, raw) => {
		const p = planRef.current;
		const next = clampTrio(thumb === "now" ? raw : p.currentAge, thumb === "fire" ? raw : p.fireAge, thumb === "end" ? raw : p.endAge, thumb);
		patchPlan(next);
	};
	const onPointerDown = (thumb, e) => {
		e.preventDefault();
		e.stopPropagation();
		dragRef.current = thumb;
		e.currentTarget.setPointerCapture(e.pointerId);
		const rect = trackRef.current?.getBoundingClientRect();
		if (rect) apply(thumb, ageFromX(e.clientX, rect));
	};
	const onPointerMove = (e) => {
		if (!dragRef.current) return;
		const rect = trackRef.current?.getBoundingClientRect();
		if (rect) apply(dragRef.current, ageFromX(e.clientX, rect));
	};
	const onPointerUp = () => {
		dragRef.current = null;
	};
	const onTrackPointerDown = (e) => {
		if (e.target !== e.currentTarget && !e.target.dataset.track) return;
		const rect = trackRef.current?.getBoundingClientRect();
		if (!rect) return;
		const age = ageFromX(e.clientX, rect);
		const dist = [
			["now", Math.abs(age - now)],
			["fire", Math.abs(age - fire)],
			["end", Math.abs(age - end)]
		];
		dist.sort((a, b) => a[1] - b[1]);
		const thumb = dist[0][0];
		dragRef.current = thumb;
		e.currentTarget.setPointerCapture(e.pointerId);
		apply(thumb, age);
	};
	const overlap = now === fire;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base text-fg",
					children: "人生の区切り"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tabular-nums text-fg-subtle",
					children: [
						"形成 ",
						accumYears,
						"年 · 取崩 ",
						wdYears,
						"年"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: trackRef,
				"data-track": "1",
				className: "relative mt-4 h-11 cursor-pointer touch-none select-none",
				onPointerDown: onTrackPointerDown,
				onPointerMove,
				onPointerUp,
				onPointerCancel: onPointerUp,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-track": "1",
						className: "pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-bg-sunken"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute top-1/2 h-2 -translate-y-1/2 rounded-l-full bg-accent-soft",
						style: {
							left: `${pct(now)}%`,
							width: `${Math.max(0, pct(fire) - pct(now))}%`
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute top-1/2 h-2 -translate-y-1/2 rounded-r-full bg-phase-withdraw",
						style: {
							left: `${pct(fire)}%`,
							width: `${Math.max(0, pct(end) - pct(fire))}%`
						}
					}),
					plan.annualPension > 0 && pension >= now && pension < end ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fire",
						style: { left: `${pct(pension)}%` },
						title: `年金 ${formatAge(pension)}`
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbHandle, {
						thumb: "now",
						age: now,
						label: "今",
						className: "bg-fg z-20",
						nudge: overlap ? -6 : 0,
						onPointerDown,
						onPointerMove,
						onPointerUp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbHandle, {
						thumb: "fire",
						age: fire,
						label: "FIRE",
						className: "bg-fire z-30",
						nudge: overlap ? 6 : 0,
						onPointerDown,
						onPointerMove,
						onPointerUp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbHandle, {
						thumb: "end",
						age: end,
						label: "終了",
						className: "bg-fg-muted z-20",
						nudge: 0,
						onPointerDown,
						onPointerMove,
						onPointerUp
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex justify-between text-[11px] text-fg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: AGE_MIN }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: AGE_MAX })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-nowrap items-end gap-2 sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeField, {
						label: "現在",
						value: now,
						onCommit: (v) => apply("now", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeField, {
						label: "FIRE",
						value: fire,
						onCommit: (v) => apply("fire", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeField, {
						label: "シミュレーション\n終了年齢",
						value: end,
						onCommit: (v) => apply("end", v),
						wide: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex shrink-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							size: "sm",
							className: "px-2.5 text-xs sm:px-3 sm:text-sm",
							onClick: reroll,
							children: "乱数を引き直す"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							className: "px-2.5 text-xs sm:px-3 sm:text-sm",
							onClick: run,
							children: status === "running" ? "計算中" : "再計算"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-relaxed text-fg-subtle",
				children: "現在 ≦ FIRE ＜ シミュレーション終了年齢。すでに取り崩し中なら現在＝FIRE。数字は書き終わって欄を出たときに反映する。"
			})
		]
	});
}
function AgeField({ label, value, onCommit, wide }) {
	const [text, setText] = (0, import_react.useState)(String(value));
	const [focused, setFocused] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!focused) setText(String(value));
	}, [value, focused]);
	const commit = () => {
		const n = Number(text);
		if (!Number.isFinite(n) || text.trim() === "") {
			setText(String(value));
			return;
		}
		onCommit(Math.round(n));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("flex shrink-0 flex-col gap-1.5", wide ? "w-[6.75rem]" : "w-14"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-8 items-end text-xs font-medium leading-tight whitespace-pre-line text-fg-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "text",
			inputMode: "numeric",
			pattern: "[0-9]*",
			autoComplete: "off",
			className: "w-14 px-1 text-center",
			value: focused ? text : String(value),
			onFocus: (e) => {
				setFocused(true);
				setText(String(value));
				e.currentTarget.select();
			},
			onChange: (e) => setText(e.target.value.replace(/[^\d]/g, "").slice(0, 3)),
			onBlur: () => {
				setFocused(false);
				commit();
			},
			onKeyDown: (e) => {
				if (e.key === "Enter") e.currentTarget.blur();
			}
		})]
	});
}
function ThumbHandle({ thumb, age, label, className, nudge, onPointerDown, onPointerMove, onPointerUp }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-label": `${label} ${formatAge(age)}`,
		className: "absolute top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 touch-none items-center justify-center",
		style: { left: `calc(${pct(age)}% + ${nudge}px)` },
		onPointerDown: (e) => onPointerDown(thumb, e),
		onPointerMove,
		onPointerUp,
		onPointerCancel: onPointerUp,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block size-3.5 rounded-full shadow-[var(--shadow-border)]", className) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "pointer-events-none absolute -top-4 whitespace-nowrap text-[10px] font-medium tabular-nums text-fg",
			children: formatAge(age)
		})]
	});
}
function ShareButtons() {
	const plan = usePlanStore((s) => s.plan);
	const result = usePlanStore((s) => s.result);
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
			children: "X"
		})]
	});
}
function KpiHero() {
	const result = usePlanStore((s) => s.result);
	const status = usePlanStore((s) => s.status);
	const rate = result?.successRate ?? null;
	const tone = rate == null ? "mid" : rate >= .95 ? "survive" : rate >= .8 ? "mid" : "ruin";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rise-in min-w-0 rounded-xl bg-surface px-4 py-5 shadow-[var(--shadow-border)] sm:px-5 sm:py-6 md:px-8 md:py-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] font-medium tracking-[0.16em] text-fg-subtle uppercase",
					children: ["生存率", result ? ` · ${formatInt(result.trials)}経路` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareButtons, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("font-display text-4xl leading-none tracking-tight tabular-nums sm:text-5xl md:text-6xl", tone === "survive" && "text-survive", tone === "mid" && "text-fg", tone === "ruin" && "text-ruin"),
					children: rate == null ? "—" : formatPct(rate, 1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm leading-relaxed text-fg-muted",
					children: result ? `${formatInt(result.trials)}回のうち破綻は ${formatInt(result.ruinCount)}回。${result.medianRuinAge != null ? ` 破綻した経路の中央年齢は ${Math.round(result.medianRuinAge)}歳。` : " この条件では破綻経路が出ていない。"}` : status === "running" ? "計算中です。" : "条件を確認してから、再計算で経路を回す。"
				})] }), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 sm:gap-x-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: `${result.endAge}歳 中央値`,
							value: formatManYen(result.terminal.p50)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "下位5%",
							value: formatManYen(result.terminal.p5)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "生存経路の中央",
							value: result.terminal.survivorMedian != null ? formatManYen(result.terminal.survivorMedian) : "—"
						})
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 border-t border-border pt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeSlider, {})
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[11px] text-fg-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "font-display text-xl tabular-nums tracking-tight text-fg",
		children: value
	})] });
}
function PlanPanel() {
	const plan = usePlanStore((s) => s.plan);
	const patchPlan = usePlanStore((s) => s.patchPlan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-w-0 flex-col gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			title: "条件設定",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 items-start gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "金融資産",
							hint: "万円",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								step: 100,
								value: plan.currentAssets,
								onChange: (e) => patchPlan({ currentAssets: Number(e.target.value) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "年間積立",
							hint: "万円 / 年",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								step: 10,
								value: plan.annualContribution,
								onChange: (e) => patchPlan({ annualContribution: Number(e.target.value) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "年間支出",
							hint: "万円 / 年",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								step: 10,
								value: plan.annualSpend,
								onChange: (e) => patchPlan({ annualSpend: Number(e.target.value) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "年金額",
							hint: "万円 / 年",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								step: 10,
								value: plan.annualPension,
								onChange: (e) => patchPlan({ annualPension: Number(e.target.value) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "年金開始",
							hint: "歳",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 40,
								max: 80,
								value: plan.pensionAge,
								onChange: (e) => patchPlan({ pensionAge: Number(e.target.value) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "インフレ率",
							hint: "% / 年",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: -2,
								max: 10,
								step: .1,
								value: plan.inflationPct,
								onChange: (e) => patchPlan({ inflationPct: Number(e.target.value) })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "売却税率",
							hint: "%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								max: 50,
								step: .1,
								value: plan.taxRatePct,
								onChange: (e) => patchPlan({ taxRatePct: Number(e.target.value) })
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 flex items-start gap-2 text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						suppressHydrationWarning: true,
						className: "mt-0.5 size-4 accent-accent",
						checked: plan.returnsAreNominal,
						onChange: (e) => patchPlan({ returnsAreNominal: e.target.checked })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "入力は名目（チェック時のみインフレで実質化）。出典ボタンで入れた系列はすでに日本CPI済みなので、通常は外す。" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs leading-relaxed text-fg-subtle",
					children: "税率は取崩期に支出を賄う売却額へかける。手取り支出を保つため、売却は 1 / (1−税率) に上乗せ。取得費・NISA・配当は見ていない。非課税なら 0。"
				})
			]
		})
	});
}
function RuinEditor() {
	const plan = usePlanStore((s) => s.plan);
	const addRuinRule = usePlanStore((s) => s.addRuinRule);
	const updateRuinRule = usePlanStore((s) => s.updateRuinRule);
	const removeRuinRule = usePlanStore((s) => s.removeRuinRule);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
		title: "破綻条件の設定",
		titleNowrap: true,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			className: "h-8 w-[7.75rem] shrink-0 px-1.5 text-xs md:h-8",
			value: "",
			onChange: (e) => {
				const t = e.target.value;
				if (t) addRuinRule(t);
				e.target.value = "";
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "条件を追加"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "depleted",
					children: "期間中に閾値割れ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "below_at_age",
					children: "指定年齢で閾値割れ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "years_of_spend",
					children: "支出N年分を下回る"
				})
			]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs leading-relaxed text-fg-subtle",
				children: "どれか一つに該当した経路を破綻とみなす（論理和）。初期値は「期間中に資産が0円以下」。100歳時点の残額で判定したい場合はチェックポイントを足す。"
			}),
			plan.ruinRules.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md bg-ruin-soft px-3 py-2 text-sm text-ruin",
				children: "条件が空です。このままだとすべての経路が生存になります。"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: plan.ruinRules.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-2 rounded-lg bg-surface-2 p-3 shadow-[var(--shadow-border)] sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-fg sm:min-w-40",
							children: RUIN_TYPE_LABEL[rule.type]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-wrap items-center gap-2",
							children: [
								rule.type === "depleted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "閾値（万円）",
									value: rule.threshold,
									onChange: (threshold) => updateRuinRule(rule.id, {
										...rule,
										threshold
									})
								}) : null,
								rule.type === "below_at_age" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "年齢",
									value: rule.age,
									onChange: (age) => updateRuinRule(rule.id, {
										...rule,
										age
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "金額（万円）",
									value: rule.amount,
									onChange: (amount) => updateRuinRule(rule.id, {
										...rule,
										amount
									})
								})] }) : null,
								rule.type === "years_of_spend" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
									label: "年数",
									value: rule.years,
									onChange: (years) => updateRuinRule(rule.id, {
										...rule,
										years
									})
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "条件を削除",
							onClick: () => removeRuinRule(rule.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})
					]
				}, rule.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				className: "mt-3",
				onClick: () => addRuinRule("below_at_age"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
					plan.endAge,
					"歳時点で0円なら破綻"
				]
			})
		]
	});
}
function Num({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-2 text-xs text-fg-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "h-9 w-24 md:h-9"
		})]
	});
}
function SourceCard() {
	const plan = usePlanStore((s) => s.plan);
	const applyDataWindow = usePlanStore((s) => s.applyDataWindow);
	const win = windowById(plan.dataWindow ?? "long");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
		title: "使用するデータの選択",
		collapsible: true,
		defaultOpen: false,
		preview: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-1.5 sm:gap-2",
			children: DATA_WINDOWS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => applyDataWindow(w.id),
				className: cn("min-w-0 rounded-md border px-1.5 py-2 text-center leading-tight transition-colors duration-150 sm:px-2", plan.dataWindow === w.id ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface-2 text-fg hover:bg-bg-sunken"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs font-medium sm:text-sm",
					children: w.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("mt-0.5 block text-[10px] tabular-nums sm:text-xs", plan.dataWindow === w.id ? "text-accent-fg/80" : "text-fg-subtle"),
					children: [w.n, "年"]
				})]
			}, w.id))
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs leading-relaxed text-fg-muted",
				children: ["円建て長期実データ。", win.note]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-left text-fg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1.5 pr-2 font-medium",
								children: "クラス"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1.5 pr-2 font-medium",
								children: "算術"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1.5 pr-2 font-medium",
								children: "幾何"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-1.5 font-medium",
								children: "σ"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: win.assets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-1.5 pr-2 text-fg",
								children: a.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-1.5 pr-2 tabular-nums text-fg",
								children: [a.arithPct.toFixed(1), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-1.5 pr-2 tabular-nums text-fg-muted",
								children: [a.geomPct.toFixed(1), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-1.5 tabular-nums text-fg",
								children: [a.volPct.toFixed(1), "%"]
							})
						]
					}, a.id)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 grid gap-2 text-xs leading-relaxed text-fg-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-fg-muted",
							children: [SOURCE_CITATION.jst.label, "。"]
						}),
						" ",
						SOURCE_CITATION.jst.detail,
						" ",
						SOURCE_CITATION.jst.papers
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-fg-muted",
							children: [SOURCE_CITATION.gold.label, "。"]
						}),
						" ",
						SOURCE_CITATION.gold.detail
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "米国株式はヘッジなし円建て。金もドル価格×円ドル。債券は円建て最長を取るため日本国債（世界国債の超長期円系列がない）。" })
				]
			})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
var ResultsPanel = (0, import_react.lazy)(() => import("./results-panel-kC2h1YwA.mjs").then((m) => ({ default: m.ResultsPanel })));
function Home() {
	const hydrate = usePlanStore((s) => s.hydrate);
	const hydrated = usePlanStore((s) => s.hydrated);
	const plan = usePlanStore((s) => s.plan);
	const run = usePlanStore((s) => s.run);
	const activated = usePlanStore((s) => s.activated);
	const result = usePlanStore((s) => s.result);
	const status = usePlanStore((s) => s.status);
	const fromShare = usePlanStore((s) => s.fromShare);
	const [tab, setTab] = (0, import_react.useState)("setup");
	const planRef = (0, import_react.useRef)(plan);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (!hydrated || !fromShare) return;
		setTab("results");
		run();
	}, [
		hydrated,
		fromShare,
		run
	]);
	(0, import_react.useEffect)(() => {
		if (!hydrated || !activated) {
			planRef.current = plan;
			return;
		}
		if (consumeSkipAutoRun()) {
			planRef.current = plan;
			return;
		}
		if (planRef.current === plan) return;
		planRef.current = plan;
		const id = window.setTimeout(() => run(), 280);
		return () => window.clearTimeout(id);
	}, [
		hydrated,
		plan,
		activated,
		run
	]);
	const showResults = tab === "results" || result != null || status === "running";
	const openResults = () => {
		setTab("results");
		if (status === "idle") run();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh overflow-x-hidden bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-6xl min-w-0 overflow-x-hidden px-3 pb-28 pt-5 sm:px-4 md:px-6 md:pb-16 md:pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiHero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-1 rounded-lg bg-bg-sunken p-1 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
						active: tab === "setup",
						onClick: () => setTab("setup"),
						children: "条件"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
						active: tab === "results",
						onClick: openResults,
						children: "結果"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid w-full min-w-0 items-start gap-5 lg:grid-cols-12 lg:gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn(tab === "setup" ? "block" : "hidden", "min-w-0 max-w-full lg:col-span-4 lg:block"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanPanel, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetEditor, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuinEditor, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceCard, {})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn(tab === "results" ? "block" : "hidden", "min-w-0 max-w-full lg:col-span-8 lg:block"),
						children: showResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleResults, { running: true }),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsPanel, {})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleResults, {
							running: false,
							onRun: run
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-center text-xs leading-relaxed text-fg-subtle",
					children: "金額の単位は万円。計算は端末内のみ。投資助言ではない。"
				})
			]
		})]
	});
}
function IdleResults({ running, onRun }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl bg-surface px-5 py-10 text-sm text-fg-muted shadow-[var(--shadow-border)]",
		children: running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "計算中です。" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "条件を確認してから計算を開始する。初期表示では経路を回していない。" }), onRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onRun,
				className: "h-10 rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
				children: "計算する"
			}) : null]
		})
	});
}
function TabButton({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 rounded-md text-sm font-medium transition-colors duration-150", active ? "bg-surface text-fg shadow-[var(--shadow-border)]" : "text-fg-muted"),
		children
	});
}
//#endregion
export { makePositiveDefinite as a, percentile as c, formatAge as d, formatAxisYen as f, cn as h, gaussian as i, portfolioMoments as l, formatPct as m, usePlanStore as n, mulberry32 as o, formatManYen as p, cholesky as r, normalizeWeights as s, routes_exports as t, Button as u };
