import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as Trash2, r as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BbTeEfmE.js
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
var ASSET_LABELS = {
	"jp-equity": "日本株",
	"us-equity": "米国株",
	bonds: "債券",
	gold: "金",
	cash: "現金"
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
var CONSERVATIVE_WEIGHTS = {
	"jp-equity": {
		accum: 20,
		withdraw: 10
	},
	"us-equity": {
		accum: 35,
		withdraw: 20
	},
	bonds: {
		accum: 25,
		withdraw: 45
	},
	gold: {
		accum: 10,
		withdraw: 10
	},
	cash: {
		accum: 10,
		withdraw: 15
	}
};
var BALANCED_WEIGHTS = {
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
var EQUITY_WEIGHTS = {
	"jp-equity": {
		accum: 30,
		withdraw: 25
	},
	"us-equity": {
		accum: 55,
		withdraw: 55
	},
	bonds: {
		accum: 5,
		withdraw: 10
	},
	gold: {
		accum: 7,
		withdraw: 7
	},
	cash: {
		accum: 3,
		withdraw: 3
	}
};
var ALL_EQUITY_WEIGHTS = {
	"jp-equity": {
		accum: 40,
		withdraw: 40
	},
	"us-equity": {
		accum: 60,
		withdraw: 60
	}
};
function applyAllocationPreset(plan, weights, phase) {
	return {
		...plan,
		assets: plan.assets.map((asset) => {
			const weight = weights[asset.id];
			if (phase === "accum") return {
				...asset,
				accumWeight: weight?.accum ?? 0
			};
			if (phase === "withdraw") return {
				...asset,
				withdrawWeight: weight?.withdraw ?? 0
			};
			return {
				...asset,
				accumWeight: weight?.accum ?? 0,
				withdrawWeight: weight?.withdraw ?? 0
			};
		})
	};
}
var PRESETS = [
	{
		id: "conservative",
		name: "保守型",
		hint: "取崩期は債券・現金を厚く。シーケンスリスクを抑える",
		weights: CONSERVATIVE_WEIGHTS,
		apply: (plan, phase) => applyAllocationPreset(plan, CONSERVATIVE_WEIGHTS, phase)
	},
	{
		id: "balanced",
		name: "バランス型",
		hint: "形成期は株式7割、取崩期は株式55%",
		weights: BALANCED_WEIGHTS,
		apply: (plan, phase) => applyAllocationPreset(plan, BALANCED_WEIGHTS, phase)
	},
	{
		id: "equity",
		name: "株式重視",
		hint: "取崩期も株式8割。期待値は高いが資産枯渇の尾が厚い",
		weights: EQUITY_WEIGHTS,
		apply: (plan, phase) => applyAllocationPreset(plan, EQUITY_WEIGHTS, phase)
	},
	{
		id: "all-equity",
		name: "株式100%",
		hint: "日本株40・米国株60。債券・金・現金はゼロ",
		weights: ALL_EQUITY_WEIGHTS,
		apply: (plan, phase) => applyAllocationPreset(plan, ALL_EQUITY_WEIGHTS, phase)
	}
];
function phaseKey(assets, phase) {
	return assets.map((a) => `${a.id}:${phase === "accum" ? a.accumWeight : a.withdrawWeight}`).sort().join("|");
}
function matchingPhasePresetId(plan, phase) {
	const current = phaseKey(plan.assets, phase);
	for (const p of PRESETS) if (phaseKey(p.apply(plan, phase).assets, phase) === current) return p.id;
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
	import("./engine-D4QVeWYu.mjs").then(({ simulate }) => {
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
		if (i === j) {
			const diagonal = (matrix[i]?.[i] ?? NaN) - sum;
			if (!Number.isFinite(diagonal) || diagonal <= 1e-12) throw new Error("Matrix is not positive definite");
			L[i][j] = Math.sqrt(diagonal);
		} else {
			const value = matrix[i]?.[j];
			const denom = L[j][j];
			if (!Number.isFinite(value) || !Number.isFinite(denom) || denom <= 0) throw new Error("Matrix is not positive definite");
			L[i][j] = (value - sum) / denom;
		}
	}
	return L;
}
/** Symmetrize, resize and shrink correlations toward identity until Cholesky succeeds. */
function makePositiveDefinite(corr, size = corr.length) {
	const n = Math.max(0, Math.round(size));
	const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => {
		if (i === j) return 1;
		const values = [corr[i]?.[j], corr[j]?.[i]].filter((v) => Number.isFinite(v));
		const value = values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;
		return Math.max(-.99, Math.min(.99, value));
	}));
	for (let attempt = 0; attempt <= 16; attempt++) {
		const scale = 1 / (1 + (attempt === 0 ? 0 : 1e-8 * Math.pow(4, attempt - 1)));
		const M = A.map((row, i) => row.map((value, j) => i === j ? 1 : value * scale));
		try {
			cholesky(M);
			return M;
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
var ASSET_KINDS = [
	"equity",
	"bond",
	"cash",
	"alt"
];
var MAX_AMOUNT = 0xe8d4a51000;
function isRecord(value) {
	return typeof value === "object" && value !== null;
}
function finiteNumber(value, fallback) {
	const candidate = value == null ? fallback : value;
	return typeof candidate === "number" && Number.isFinite(candidate) ? candidate : null;
}
function readAsset(value) {
	if (!isRecord(value)) return null;
	const expectedReturnPct = finiteNumber(value.expectedReturnPct, NaN);
	const volatilityPct = finiteNumber(value.volatilityPct, NaN);
	const accumWeight = finiteNumber(value.accumWeight, NaN);
	const withdrawWeight = finiteNumber(value.withdrawWeight, NaN);
	if (typeof value.id !== "string" || typeof value.name !== "string" || !ASSET_KINDS.includes(value.kind) || expectedReturnPct == null || volatilityPct == null || accumWeight == null || withdrawWeight == null) return null;
	return {
		id: value.id,
		name: value.name,
		kind: value.kind,
		expectedReturnPct,
		volatilityPct,
		accumWeight,
		withdrawWeight
	};
}
function readRuinRule(value, index) {
	if (!isRecord(value) || typeof value.type !== "string") return null;
	const id = typeof value.id === "string" && value.id ? value.id : `rule-${index}`;
	if (value.type === "depleted") {
		const threshold = finiteNumber(value.threshold, NaN);
		return threshold == null ? null : {
			id,
			type: "depleted",
			threshold
		};
	}
	if (value.type === "below_at_age") {
		const age = finiteNumber(value.age, NaN);
		const amount = finiteNumber(value.amount, NaN);
		return age == null || amount == null ? null : {
			id,
			type: "below_at_age",
			age: Math.round(age),
			amount
		};
	}
	if (value.type === "years_of_spend") {
		const years = finiteNumber(value.years, NaN);
		return years == null ? null : {
			id,
			type: "years_of_spend",
			years
		};
	}
	return null;
}
function validatePlan(plan) {
	const issues = [];
	const add = (field, message) => issues.push({
		field,
		message
	});
	for (const [field, label] of [
		["currentAssets", "金融資産"],
		["annualContribution", "年間積立"],
		["annualSpend", "年間支出"],
		["annualPension", "年金額"]
	]) {
		const value = plan[field];
		if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > MAX_AMOUNT) add(String(field), `${label}は0以上の有限な金額で入力してください。`);
	}
	if (!Number.isInteger(plan.currentAge) || plan.currentAge < 18 || plan.currentAge > 109) add("currentAge", "現在年齢は18〜109歳の整数で入力してください。");
	if (!Number.isInteger(plan.fireAge) || plan.fireAge < plan.currentAge || plan.fireAge > 109) add("fireAge", "FIRE年齢は現在年齢以上、109歳以下で入力してください。");
	if (!Number.isInteger(plan.endAge) || plan.endAge < plan.fireAge || plan.endAge > 110) add("endAge", "終了年齢はFIRE年齢以上、110歳以下で入力してください。");
	if (!Number.isInteger(plan.pensionAge) || plan.pensionAge < 18 || plan.pensionAge > 110) add("pensionAge", "年金開始年齢は18〜110歳の整数で入力してください。");
	if (!Number.isFinite(plan.inflationPct) || plan.inflationPct <= -100 || plan.inflationPct > 100) add("inflationPct", "インフレ率は−100%より大きく、100%以下で入力してください。");
	if (!Number.isFinite(plan.taxRatePct) || plan.taxRatePct < 0 || plan.taxRatePct > 90) add("taxRatePct", "売却税率は0〜90%で入力してください。");
	if (!Number.isInteger(plan.trials) || plan.trials < 200 || plan.trials > 2e4) add("trials", "試行回数は200〜20,000回の整数で入力してください。");
	if (!Number.isInteger(plan.seed) || plan.seed < 0 || plan.seed > 4294967295) add("seed", "乱数シードが不正です。");
	if (!Array.isArray(plan.assets) || plan.assets.length < 1 || plan.assets.length > 8) add("assets", "資産クラスは1〜8件にしてください。");
	else {
		const ids = /* @__PURE__ */ new Set();
		for (const [index, asset] of plan.assets.entries()) {
			const prefix = `assets.${index}`;
			if (!asset.id || ids.has(asset.id)) add(prefix, "資産クラスのIDが空または重複しています。");
			ids.add(asset.id);
			if (!asset.name.trim()) add(prefix, "資産クラス名を入力してください。");
			if (!Number.isFinite(asset.expectedReturnPct) || asset.expectedReturnPct < -95 || asset.expectedReturnPct > 500) add(prefix, `${asset.name || "資産"}の期待リターンは−95〜500%で入力してください。`);
			if (!Number.isFinite(asset.volatilityPct) || asset.volatilityPct < 0 || asset.volatilityPct > 300) add(prefix, `${asset.name || "資産"}のリスクは0〜300%で入力してください。`);
			if (!Number.isFinite(asset.accumWeight) || asset.accumWeight < 0) add(prefix, `${asset.name || "資産"}の形成期配分は0以上で入力してください。`);
			if (!Number.isFinite(asset.withdrawWeight) || asset.withdrawWeight < 0) add(prefix, `${asset.name || "資産"}の取り崩し期配分は0以上で入力してください。`);
		}
		if (plan.assets.every((asset) => asset.accumWeight === 0)) add("assets.accumWeight", "形成期配分を少なくとも1つ設定してください。");
		if (plan.assets.every((asset) => asset.withdrawWeight === 0)) add("assets.withdrawWeight", "取り崩し期配分を少なくとも1つ設定してください。");
	}
	if (plan.correlations.length !== plan.assets.length || plan.correlations.some((row) => row.length !== plan.assets.length)) add("correlations", "相関行列と資産クラスの数が一致していません。");
	for (const rule of plan.ruinRules) if (rule.type === "depleted" && (!Number.isFinite(rule.threshold) || rule.threshold < 0)) add(`ruinRules.${rule.id}`, "資産枯渇の閾値は0以上で入力してください。");
	else if (rule.type === "below_at_age") {
		if (!Number.isInteger(rule.age) || rule.age < plan.currentAge || rule.age > plan.endAge) add(`ruinRules.${rule.id}`, "チェックポイント年齢は計算期間内の整数にしてください。");
		if (!Number.isFinite(rule.amount) || rule.amount < 0) add(`ruinRules.${rule.id}`, "チェックポイント金額は0以上で入力してください。");
	} else if (rule.type === "years_of_spend" && (!Number.isFinite(rule.years) || rule.years <= 0 || rule.years > 100)) add(`ruinRules.${rule.id}`, "支出年数は0より大きく100以下で入力してください。");
	return issues;
}
function sanitizePlan(value) {
	if (!isRecord(value) || !Array.isArray(value.assets) || value.assets.length === 0) return null;
	const defaults = createDefaultPlan();
	const assets = value.assets.map(readAsset);
	if (assets.some((asset) => asset == null)) return null;
	const ruinInput = value.ruinRules == null ? defaults.ruinRules : value.ruinRules;
	if (!Array.isArray(ruinInput)) return null;
	const ruinRules = ruinInput.map(readRuinRule);
	if (ruinRules.some((rule) => rule == null)) return null;
	const number = (field, round = false) => {
		const result = finiteNumber(value[field], defaults[field]);
		return result == null ? null : round ? Math.round(result) : result;
	};
	const currentAge = number("currentAge", true);
	const fireAge = number("fireAge", true);
	const endAge = number("endAge", true);
	const pensionAge = number("pensionAge", true);
	const currentAssets = number("currentAssets");
	const annualContribution = number("annualContribution");
	const annualSpend = number("annualSpend");
	const annualPension = number("annualPension");
	const inflationPct = number("inflationPct");
	const taxRatePct = number("taxRatePct");
	const trials = number("trials", true);
	const seed = number("seed", true);
	if ([
		currentAge,
		fireAge,
		endAge,
		pensionAge,
		currentAssets,
		annualContribution,
		annualSpend,
		annualPension,
		inflationPct,
		taxRatePct,
		trials,
		seed
	].some((candidate) => candidate == null)) return null;
	const correlationInput = Array.isArray(value.correlations) ? value.correlations.map((row) => Array.isArray(row) ? row : []) : defaults.correlations;
	const plan = {
		...defaults,
		currentAge,
		fireAge,
		endAge,
		sex: value.sex === "female" ? "female" : "male",
		currentAssets,
		annualContribution,
		annualSpend,
		pensionAge,
		annualPension,
		inflationPct,
		taxRatePct,
		returnsAreNominal: typeof value.returnsAreNominal === "boolean" ? value.returnsAreNominal : defaults.returnsAreNominal,
		dataWindow: value.dataWindow === "postwar" || value.dataWindow === "float" ? value.dataWindow : "long",
		assets,
		correlations: makePositiveDefinite(correlationInput, assets.length),
		trials,
		seed,
		ruinRules
	};
	return validatePlan(plan).length === 0 ? plan : null;
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
	balanced: "b",
	equity: "e",
	conservative: "c",
	"all-equity": "q"
};
var PRESET_FROM = {
	b: "balanced",
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
		const accumPreset = matchingPhasePresetId(plan, "accum");
		const withdrawPreset = matchingPhasePresetId(plan, "withdraw");
		if (accumPreset && withdrawPreset) {
			if (accumPreset === withdrawPreset) {
				if (accumPreset !== "balanced") out.p = PRESET_CODE[accumPreset];
			} else out.p = `${PRESET_CODE[accumPreset] ?? accumPreset}:${PRESET_CODE[withdrawPreset] ?? withdrawPreset}`;
		} else if (!weightsMatch(plan, cat)) out.wt = plan.assets.flatMap((a) => [a.accumWeight, a.withdrawWeight]);
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
	if (raw.p) {
		const parts = raw.p.split(":");
		if (parts.length === 2) {
			const accum = PRESETS.find((p) => p.id === PRESET_FROM[parts[0]] || p.id === parts[0]);
			const withdraw = PRESETS.find((p) => p.id === PRESET_FROM[parts[1]] || p.id === parts[1]);
			if (accum) plan = accum.apply(plan, "accum");
			if (withdraw) plan = withdraw.apply(plan, "withdraw");
		} else {
			const presetId = PRESET_FROM[raw.p];
			const preset = PRESETS.find((p) => p.id === presetId);
			if (preset) plan = preset.apply(plan);
		}
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
function encodePlan(plan) {
	const json = JSON.stringify(compactPlan(plan));
	return `c1.${toB64url(new TextEncoder().encode(json))}`;
}
function decodePlan(token) {
	try {
		if (token.startsWith("c1.")) {
			const json = new TextDecoder().decode(fromB64url(token.slice(3)));
			return sanitizePlan(expandPlan(JSON.parse(json)));
		}
		const json = new TextDecoder().decode(fromB64url(token));
		return sanitizePlan(JSON.parse(json));
	} catch {
		return null;
	}
}
function hasPlanInLocation() {
	if (typeof window === "undefined") return false;
	return new URLSearchParams(window.location.search).has("p") || window.location.hash.includes("p=");
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
function updatedPlanState(plan, result) {
	persist(plan);
	return {
		plan,
		resultStale: result !== null,
		error: null,
		validationIssues: validatePlan(plan)
	};
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
/** シミュレーションに効かない表示用フィールドを除いた指紋。性別は生命表だけ。 */
function simSignature(plan) {
	return JSON.stringify({
		...plan,
		sex: void 0
	});
}
var usePlanStore = create((set, get) => ({
	plan: initialPlan,
	result: null,
	status: "idle",
	hydrated: false,
	activated: false,
	fromShare: false,
	storyNonce: 0,
	resultStale: false,
	error: null,
	validationIssues: [],
	patchPlan: (patch) => {
		set(updatedPlanState({
			...get().plan,
			...patch
		}, get().result));
	},
	replacePlan: (plan) => {
		set(updatedPlanState(plan, get().result));
	},
	updateAsset: (id, patch) => {
		set(updatedPlanState({
			...get().plan,
			assets: get().plan.assets.map((a) => a.id === id ? {
				...a,
				...patch
			} : a)
		}, get().result));
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
		set(updatedPlanState({
			...plan,
			assets,
			correlations: resizeCorrelations(plan.correlations, assets.length, .25)
		}, get().result));
	},
	removeAsset: (id) => {
		const { plan } = get();
		if (plan.assets.length <= 1) return;
		const idx = plan.assets.findIndex((a) => a.id === id);
		if (idx < 0) return;
		const assets = plan.assets.filter((a) => a.id !== id);
		const correlations = plan.correlations.filter((_, i) => i !== idx).map((row) => row.filter((_, j) => j !== idx));
		set(updatedPlanState({
			...plan,
			assets,
			correlations
		}, get().result));
	},
	setCorrelation: (i, j, value) => {
		const { plan } = get();
		const n = plan.correlations.length;
		if (i === j || i < 0 || j < 0 || i >= n || j >= n) return;
		const correlations = plan.correlations.map((row) => row.slice());
		const v = Math.max(-.99, Math.min(.99, value));
		correlations[i][j] = v;
		correlations[j][i] = v;
		set(updatedPlanState({
			...plan,
			correlations
		}, get().result));
	},
	updateRuinRule: (id, rule) => {
		set(updatedPlanState({
			...get().plan,
			ruinRules: get().plan.ruinRules.map((r) => r.id === id ? rule : r)
		}, get().result));
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
		set(updatedPlanState({
			...plan,
			ruinRules: [...plan.ruinRules, rule]
		}, get().result));
	},
	removeRuinRule: (id) => {
		set(updatedPlanState({
			...get().plan,
			ruinRules: get().plan.ruinRules.filter((r) => r.id !== id)
		}, get().result));
	},
	applyPreset: (id, phase) => {
		const preset = PRESETS.find((p) => p.id === id);
		if (!preset) return;
		set(updatedPlanState(preset.apply(get().plan, phase), get().result));
	},
	applyDataWindow: (id) => {
		const win = windowById(id);
		const { plan } = get();
		const sourced = assetsFromWindow(win, plan.assets);
		const extras = plan.assets.filter((a) => !win.assets.some((s) => s.id === a.id));
		const assets = [...sourced, ...extras];
		set(updatedPlanState({
			...plan,
			dataWindow: win.id,
			returnsAreNominal: false,
			assets,
			correlations: resizeCorrelations(win.correlations, assets.length, .2)
		}, get().result));
	},
	reroll: () => {
		const plan = {
			...get().plan,
			seed: Math.random() * 4294967295 >>> 0
		};
		skipAutoRun = true;
		set({
			...updatedPlanState(plan, get().result),
			storyNonce: 0
		});
		get().run();
	},
	drawAnotherStory: () => {
		set({ storyNonce: get().storyNonce + 1 });
		get().run();
	},
	reset: () => {
		set(updatedPlanState(createDefaultPlan(), get().result));
	},
	run: () => {
		const id = ++runGen;
		const { plan, storyNonce, result } = get();
		const validationIssues = validatePlan(plan);
		if (validationIssues.length > 0) {
			set({
				status: result ? "done" : "idle",
				activated: true,
				resultStale: result !== null,
				error: "入力条件を確認してください。修正後に自動で再計算します。",
				validationIssues
			});
			return;
		}
		set({
			status: "running",
			activated: true,
			resultStale: result !== null,
			error: null,
			validationIssues: []
		});
		runSimAsync(plan, storyNonce).then((next) => {
			if (id !== runGen) return;
			set({
				result: next,
				status: "done",
				resultStale: false,
				error: null,
				validationIssues: []
			});
		}).catch((err) => {
			if (id !== runGen) return;
			if (err instanceof DOMException && err.name === "AbortError") return;
			set({
				status: get().result ? "done" : "idle",
				resultStale: get().result !== null,
				error: err instanceof Error ? err.message : "計算中にエラーが発生しました。"
			});
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
				fromShare: true,
				validationIssues: [],
				error: null
			});
			return;
		}
		if (hasPlanInLocation()) {
			set({
				hydrated: true,
				error: "共有リンクの条件を読み込めませんでした。URLが壊れている可能性があります。"
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
						status: "idle",
						validationIssues: [],
						error: null
					});
					return;
				}
				set({
					hydrated: true,
					error: "保存されていた条件が不正なため、初期値を使用しています。"
				});
				return;
			}
		} catch {
			set({
				hydrated: true,
				error: "保存されていた条件を読み込めないため、初期値を使用しています。"
			});
			return;
		}
		set({ hydrated: true });
	}
}));
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
function Field({ label, hint, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("grid min-w-0 gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-h-4 items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "type-caption whitespace-nowrap font-medium tracking-wide text-fg-muted",
				children: label
			}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "type-caption shrink-0 whitespace-nowrap tabular-nums text-fg-subtle",
				children: hint
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "type-caption invisible",
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
			className: "type-caption font-medium tracking-[0.08em] text-fg-subtle",
			children: kicker
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: cn("type-title flex items-center gap-2 text-fg", titleNowrap && "whitespace-nowrap"),
			children: [title, collapsible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "type-caption leading-none text-fg-subtle transition-transform duration-150 group-open:rotate-180",
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
function PresetRow({ phase, label }) {
	const plan = usePlanStore((s) => s.plan);
	const applyPreset = usePlanStore((s) => s.applyPreset);
	const result = usePlanStore((s) => s.result);
	const active = matchingPhasePresetId(plan, phase);
	const sum = weightSum(plan.assets.map((a) => phase === "accum" ? a.accumWeight : a.withdrawWeight));
	const moments = result ? phase === "accum" ? result.portfolio.accum : result.portfolio.withdraw : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-w-0 gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 text-xs text-fg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0",
					children: label
				}), moments ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate tabular-nums",
					children: [
						"実質 ",
						formatPct(moments.mu),
						" · σ ",
						formatPct(moments.sigma)
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [sum.toFixed(0), "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1",
				children: PRESETS.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => applyPreset(p.id, phase),
					className: cn("group relative min-w-0 whitespace-nowrap rounded-md border px-0.5 py-1.5 text-center text-xs leading-none tracking-tight transition-colors duration-150", active === p.id ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface-2 text-fg hover:bg-bg-sunken"),
					children: [p.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("pointer-events-none absolute bottom-full z-30 mb-1 hidden w-40 rounded-md bg-surface-2 px-2.5 py-2 text-left text-xs leading-relaxed text-fg shadow-[var(--shadow-border)] group-hover:block group-focus-visible:block", index >= 2 ? "right-0" : "left-0"),
						children: Object.entries(p.weights).filter(([, w]) => (phase === "accum" ? w.accum : w.withdraw) > 0).map(([id, w]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ASSET_LABELS[id] ?? id }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [phase === "accum" ? w.accum : w.withdraw, "%"]
							})]
						}, id))
					})]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeightBar, { items: plan.assets.map((a) => ({
				id: a.id,
				name: a.name,
				weight: phase === "accum" ? a.accumWeight : a.withdrawWeight
			})) })
		]
	});
}
function AssetEditor() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		title: "資産配分タイプ",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetRow, {
				phase: "accum",
				label: "形成期"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetRow, {
				phase: "withdraw",
				label: "取崩期"
			})]
		})
	});
}
function AssetClassList() {
	const plan = usePlanStore((s) => s.plan);
	const updateAsset = usePlanStore((s) => s.updateAsset);
	const addAsset = usePlanStore((s) => s.addAsset);
	const removeAsset = usePlanStore((s) => s.removeAsset);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium text-fg",
				children: "リスクリターン"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: addAsset,
				className: "pr-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "追加"]
			})]
		}),
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
		})
	] });
}
function MiniField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "type-caption font-medium tracking-wide text-fg-subtle",
			children: label
		}), children]
	});
}
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
				className: "type-caption min-w-full border-collapse",
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
function RuinEditor({ embedded = false, plain = false }) {
	const plan = usePlanStore((s) => s.plan);
	const addRuinRule = usePlanStore((s) => s.addRuinRule);
	const updateRuinRule = usePlanStore((s) => s.updateRuinRule);
	const removeRuinRule = usePlanStore((s) => s.removeRuinRule);
	const addControl = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
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
	});
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-xs leading-relaxed text-fg-subtle",
			children: "どれか一つに該当した経路を資産枯渇とみなす（論理和）。初期値は「期間中に資産が0円以下」。100歳時点の残額で判定したい場合はチェックポイントを足す。"
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
				"歳時点で0円なら資産枯渇"
			]
		})
	] });
	if (plain) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-medium text-fg",
			children: "資産枯渇条件"
		}), addControl]
	}), content] });
	if (embedded) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "group mt-4 rounded-lg border border-border bg-bg-sunken/45 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-fg [&::-webkit-details-marker]:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "資産枯渇条件" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 text-xs text-fg-muted",
				children: [
					plan.ruinRules.length,
					"件",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						className: "type-caption not-italic transition-transform group-open:rotate-180",
						children: "▼"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 border-t border-border pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex justify-end",
				children: addControl
			}), content]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		title: "資産枯渇条件の設定",
		titleNowrap: true,
		action: addControl,
		children: content
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
function SourceCard({ embedded = false, plain = false }) {
	const plan = usePlanStore((s) => s.plan);
	const applyDataWindow = usePlanStore((s) => s.applyDataWindow);
	const win = windowById(plan.dataWindow ?? "long");
	const selector = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-1.5 sm:gap-2",
		children: DATA_WINDOWS.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => applyDataWindow(w.id),
			className: cn("min-w-0 rounded-md border px-1.5 py-2 text-center leading-tight transition-colors duration-150 sm:px-2", plan.dataWindow === w.id ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface-2 text-fg hover:bg-bg-sunken"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs font-medium sm:text-sm",
				children: w.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("mt-0.5 block type-caption tabular-nums", plan.dataWindow === w.id ? "text-accent-fg/80" : "text-fg-subtle"),
				children: [w.n, "年"]
			})]
		}, w.id))
	});
	const detail = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
	] });
	if (plain) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-2 text-sm font-medium text-fg",
			children: "使用データ"
		}),
		selector,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: detail
		})
	] });
	if (embedded) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "group rounded-lg border border-border bg-bg-sunken/45 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
			className: "flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-fg [&::-webkit-details-marker]:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "使用データ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 text-xs text-fg-muted",
				children: [
					win.name,
					" · ",
					win.period,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						className: "type-caption not-italic transition-transform group-open:rotate-180",
						children: "▼"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 border-t border-border pt-3",
			children: [selector, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: detail
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		title: "使用するデータの選択",
		collapsible: true,
		defaultOpen: false,
		preview: selector,
		children: detail
	});
}
function AdvancedSettings() {
	const plan = usePlanStore((s) => s.plan);
	const patchPlan = usePlanStore((s) => s.patchPlan);
	const win = windowById(plan.dataWindow ?? "long");
	const previewBits = [
		`${formatInt(plan.trials)}シナリオ`,
		`税率${plan.taxRatePct}%`,
		plan.returnsAreNominal ? "名目入力" : "実質入力",
		`資産枯渇${plan.ruinRules.length}件`,
		win.name
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
		title: "詳細設定",
		collapsible: true,
		defaultOpen: false,
		preview: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs leading-relaxed text-fg-muted",
			children: previewBits.join(" · ")
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-sm font-medium text-fg",
					children: "試行と税"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 items-start gap-x-2 gap-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "売却税率",
						hint: "%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 0,
							max: 50,
							step: .1,
							value: plan.taxRatePct,
							onChange: (e) => {
								const n = Number(e.target.value);
								if (Number.isFinite(n)) patchPlan({ taxRatePct: n });
							}
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "試行回数",
						hint: "経路",
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
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-sm font-medium text-fg",
						children: "リターン・税の扱い"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-2 text-sm text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							suppressHydrationWarning: true,
							className: "mt-0.5 size-4 accent-accent",
							checked: plan.returnsAreNominal,
							onChange: (e) => patchPlan({ returnsAreNominal: e.target.checked })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "入力は名目（チェック時のみインフレで実質化）。出典データは日本CPI調整済みなので、通常は外す。" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs leading-relaxed text-fg-subtle",
						children: "税率は取崩期の売却額へかける。手取り支出を保つため、売却は 1 / (1−税率) に上乗せ。取得費・NISA・配当は見ていない。"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuinEditor, { plain: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceCard, { plain: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetClassList, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorrelationEditor, {})
			]
		})
	});
}
function AppHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "border-b border-border bg-surface/80 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full min-w-0 items-center justify-between gap-4 px-3 py-2.5 sm:px-4 lg:px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 shrink-0 items-center gap-3",
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "type-title leading-none text-fg",
					children: "資産寿命シミュレータ"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden min-w-0 text-right text-xs leading-snug text-fg-subtle sm:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate whitespace-nowrap",
					children: "形成期と取り崩し期を分け、資産クラスごとにリターンとリスクを置いて資産枯渇確率を測る"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 truncate whitespace-nowrap",
					children: "金額の単位は万円。計算は端末内のみ。投資助言ではない。"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 pb-2 text-xs leading-snug text-fg-subtle sm:hidden",
			children: "形成期と取り崩し期を分け、資産クラスごとにリターンとリスクを置いて資産枯渇確率を測る。金額の単位は万円。計算は端末内のみ。投資助言ではない。"
		})]
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
function AgeSlider({ compact = false }) {
	const plan = usePlanStore((s) => s.plan);
	const patchPlan = usePlanStore((s) => s.patchPlan);
	const status = usePlanStore((s) => s.status);
	const error = usePlanStore((s) => s.error);
	const validationIssues = usePlanStore((s) => s.validationIssues);
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
				ref: trackRef,
				"data-track": "1",
				className: cn("relative h-11 cursor-pointer touch-none select-none", compact && "hidden"),
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
				className: cn("mt-1 flex justify-between text-xs text-fg-muted", compact && "hidden"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: AGE_MIN }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: AGE_MAX })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-3", compact ? "grid grid-cols-3 items-end gap-2" : "flex flex-nowrap items-end gap-2 sm:gap-4"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeField, {
						compact,
						label: "現在",
						value: now,
						onCommit: (v) => apply("now", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeField, {
						compact,
						label: "FIRE",
						value: fire,
						onCommit: (v) => apply("fire", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeField, {
						compact,
						label: "シミュレーション\n終了年齢",
						value: end,
						onCommit: (v) => apply("end", v),
						wide: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					className: "h-11 min-w-0 px-3 text-sm",
					disabled: status === "running",
					onClick: reroll,
					children: compact ? "乱数変更" : "乱数を引き直す"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "default",
					className: "h-11 min-w-0 px-3 text-sm",
					disabled: status === "running",
					onClick: run,
					children: status === "running" ? "計算中" : compact ? "計算" : "再計算"
				})]
			}),
			error || validationIssues.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 rounded-lg bg-ruin-soft px-3 py-2 text-xs leading-relaxed text-ruin",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: error ?? "入力条件を確認してください。"
				}), validationIssues.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc pl-4",
					children: validationIssues.slice(0, 3).map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: issue.message }, `${issue.field}:${issue.message}`))
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-relaxed text-fg-subtle",
				children: compact ? "現在 ≦ FIRE ＜ 終了年齢。数字は欄を出たときに反映する。" : "現在 ≦ FIRE ＜ シミュレーション終了年齢。すでに取り崩し中なら現在＝FIRE。数字は書き終わって欄を出たときに反映する。"
			})
		]
	});
}
function AgeField({ label, value, onCommit, wide, compact }) {
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
		className: cn("flex min-w-0 flex-col gap-1.5", compact ? "w-full" : wide ? "w-[6.75rem] shrink-0" : "w-14 shrink-0"),
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
			className: "pointer-events-none absolute -top-4 whitespace-nowrap text-xs font-medium tabular-nums text-fg",
			children: formatAge(age)
		})]
	});
}
function PlanPanel() {
	const plan = usePlanStore((s) => s.plan);
	const patchPlan = usePlanStore((s) => s.patchPlan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-w-0 flex-col gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
			title: "条件設定",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeSlider, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-4 border-t border-border" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							onChange: (e) => {
								const n = Number(e.target.value);
								if (Number.isFinite(n)) patchPlan({ currentAssets: n });
							}
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
							onChange: (e) => {
								const n = Number(e.target.value);
								if (Number.isFinite(n)) patchPlan({ annualContribution: n });
							}
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
							onChange: (e) => {
								const n = Number(e.target.value);
								if (Number.isFinite(n)) patchPlan({ annualSpend: n });
							}
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
							onChange: (e) => {
								const n = Number(e.target.value);
								if (Number.isFinite(n)) patchPlan({ annualPension: n });
							}
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
							onChange: (e) => {
								const n = Number(e.target.value);
								if (Number.isFinite(n)) patchPlan({ pensionAge: Math.round(n) });
							}
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
							onChange: (e) => {
								const n = Number(e.target.value);
								if (Number.isFinite(n)) patchPlan({ inflationPct: n });
							}
						})
					})
				]
			})]
		})
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
var ResultsPanel = (0, import_react.lazy)(() => import("./results-panel-DL552BgE.mjs").then((m) => ({ default: m.ResultsPanel })));
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
	const sigRef = (0, import_react.useRef)(simSignature(plan));
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
			sigRef.current = simSignature(plan);
			return;
		}
		if (consumeSkipAutoRun()) {
			planRef.current = plan;
			sigRef.current = simSignature(plan);
			return;
		}
		const sig = simSignature(plan);
		if (sigRef.current === sig) {
			planRef.current = plan;
			return;
		}
		planRef.current = plan;
		sigRef.current = sig;
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
		className: "flex min-h-dvh flex-col overflow-x-hidden bg-bg text-fg lg:h-dvh lg:overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full min-w-0 flex-1 flex-col overflow-x-hidden px-3 py-3 sm:px-4 lg:min-h-0 lg:flex-row lg:gap-4 lg:overflow-hidden lg:px-4 lg:py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-1 rounded-lg bg-bg-sunken p-1 lg:hidden",
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
					className: cn(tab === "setup" ? "mt-3 block" : "hidden", "min-w-0 lg:mt-0 lg:block lg:w-[22.5rem] lg:shrink-0 lg:overflow-y-auto xl:w-[24rem]"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanPanel, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetEditor, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 min-w-0 pb-6 lg:pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdvancedSettings, {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn(tab === "results" ? "mt-3 flex" : "hidden", "min-w-0 flex-1 flex-col gap-3 lg:mt-0 lg:flex lg:min-h-0 lg:overflow-hidden"),
					children: showResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleResults, { running: true }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsPanel, {})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleResults, {
						running: false,
						onRun: run
					})
				})
			]
		})]
	});
}
function IdleResults({ running, onRun }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-0 flex-1 items-center rounded-xl bg-surface px-5 py-10 text-sm text-fg-muted shadow-[var(--shadow-border)]",
		children: running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "計算中です。" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "条件を確認してから計算を開始する。初期表示ではシナリオを回していない。" }), onRun ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
export { formatManYen as _, buildTweetText as a, cholesky as c, mulberry32 as d, normalizeWeights as f, formatAxisYen as g, formatAge as h, buildShareUrl as i, gaussian as l, portfolioMoments as m, Button as n, tweetIntentUrl as o, percentile as p, usePlanStore as r, validatePlan as s, routes_exports as t, makePositiveDefinite as u, formatPct as v, cn as y };
