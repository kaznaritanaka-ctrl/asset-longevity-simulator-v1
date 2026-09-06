import { _ as formatManYen, c as cholesky, d as mulberry32, f as normalizeWeights, h as formatAge, l as gaussian, m as portfolioMoments, p as percentile, s as validatePlan, u as makePositiveDefinite, v as formatPct } from "./routes-BPd-Igsl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engine-Dec3XYOv.js
function buildRuinStory(args) {
	const { wealth, returns, sold, taxPaid, ruined, currentAge, fireAge, endAge, trialIndex } = args;
	const role = args.role ?? "ruin";
	const officialAge = args.ruinAge ?? endAge;
	const depletedIdx = wealth.findIndex((w) => w <= 0);
	const officialIdx = Math.max(0, Math.min(wealth.length - 1, officialAge - currentAge));
	const ecoIdx = depletedIdx >= 0 ? Math.min(depletedIdx, officialIdx) : officialIdx;
	const ruinAge = currentAge + ecoIdx;
	const horizonIdx = role === "median" || !ruined ? wealth.length - 1 : ecoIdx;
	const yearsToRuin = (role === "median" ? endAge : ruinAge) - currentAge;
	const years = wealth.map((w, i) => ({
		age: currentAge + i,
		wealth: w,
		portR: i === 0 ? 0 : returns[i - 1] ?? 0,
		withdrawn: i === 0 ? 0 : sold[i - 1] ?? 0,
		tax: i === 0 ? 0 : taxPaid[i - 1] ?? 0
	}));
	let peak = wealth[0] ?? 0;
	let maxDrawdown = 0;
	for (let i = 0; i <= horizonIdx; i++) {
		const w = wealth[i] ?? 0;
		if (w > peak) peak = w;
		if (peak > 0) {
			const dd = w / peak - 1;
			if (dd < maxDrawdown) maxDrawdown = dd;
		}
	}
	const fireYear = fireAge - currentAge;
	const fireSlice = returns.slice(Math.max(0, fireYear), Math.min(returns.length, Math.max(fireYear, 0) + 10, horizonIdx));
	const fire10yCagr = fireSlice.length >= 3 ? geomMean(fireSlice) : null;
	const retToHorizon = returns.slice(0, horizonIdx);
	let worstYear = 0;
	let worstAge = null;
	if (retToHorizon.length) {
		worstYear = Math.min(...retToHorizon);
		worstAge = currentAge + retToHorizon.indexOf(worstYear) + 1;
	}
	const preStart = Math.max(0, horizonIdx - 5);
	const preSlice = returns.slice(preStart, horizonIdx);
	const preRuin5yAvg = preSlice.length ? preSlice.reduce((a, b) => a + b, 0) / preSlice.length : null;
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
		worstYear,
		worstAge,
		preRuin5yAvg,
		cumulativeWithdrawal,
		cumulativeTax,
		peak,
		terminal,
		trials: args.trials,
		checkpointAge: officialAge
	});
	return {
		trialIndex,
		role,
		ruined,
		ruinAge,
		yearsToRuin,
		maxDrawdown,
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
		trials: args.trials
	};
}
function geomMean(rs) {
	if (rs.length === 0) return null;
	let log = 0;
	for (const r of rs) log += Math.log(Math.max(1e-9, 1 + r));
	return Math.exp(log / rs.length) - 1;
}
function narrate(s) {
	const parts = [];
	const afterFire = (s.role === "median" ? s.endAge : s.ruinAge) - s.fireAge;
	const checkpointLag = s.checkpointAge - s.ruinAge;
	if (s.role === "median") {
		parts.push(`${s.trials.toLocaleString("ja-JP")}本のうち、中央の帯にいちばん近い一本。${formatAge(s.endAge)}の残高は${formatManYen(s.terminal)}。`);
		if (s.ruined) parts.push(`この中央付近のシナリオでも${formatAge(s.ruinAge)}で条件に触れている。`);
		if (s.fire10yCagr != null) parts.push(`FIRE後10年の実質CAGRは${signedPct(s.fire10yCagr)}。`);
		if (s.maxDrawdown <= -.2 && s.maxDrawdown > -.95) parts.push(`途中、ピーク${formatManYen(s.peak)}から${formatPct(s.maxDrawdown, 0)}まで沈んだ。`);
		if (s.cumulativeWithdrawal > 0) {
			const taxBit = s.cumulativeTax > 0 ? `うち税が${formatManYen(s.cumulativeTax)}。` : "";
			parts.push(`終了年齢までに取り崩した額は${formatManYen(s.cumulativeWithdrawal)}。${taxBit}`);
		}
		return parts.join("");
	}
	if (!s.ruined) parts.push(`この乱数では資産枯渇条件に触れなかった。残ったシナリオのうち、いちばん細った一本を拾っている。${formatAge(s.endAge)}時点の残高は${formatManYen(s.terminal)}。`);
	else if (s.ruinAge <= s.fireAge) parts.push(`FIRE（${formatAge(s.fireAge)}）の前、${formatAge(s.ruinAge)}で資産が尽きた。積立期のまま相場に負けたシナリオ。`);
	else if (s.terminal > 0) parts.push(`${formatAge(s.ruinAge)}時点の残高は${formatManYen(s.terminal)}で、置いた条件に触れた。FIREからは${afterFire}年。`);
	else {
		parts.push(`${formatAge(s.currentAge)}から${s.yearsToRuin}年後、${formatAge(s.ruinAge)}で資産が尽きた。FIREからは${afterFire}年。`);
		if (checkpointLag >= 2) parts.push(`判定自体は${formatAge(s.checkpointAge)}の条件。`);
		if (s.fire10yCagr != null && s.fire10yCagr < -.01 && afterFire <= 18) parts.push(`FIRE直後10年の実質CAGRは${signedPct(s.fire10yCagr)}。引退してすぐの逆風が効いている（シーケンスリスク）。`);
		else if (afterFire >= 20) {
			const cagrBit = s.fire10yCagr != null ? `FIRE後10年の実質CAGRは${signedPct(s.fire10yCagr)}。` : "";
			parts.push(`${cagrBit}運用の大崩れというより、長い取り崩しが残高を削った。`);
		}
	}
	if (s.maxDrawdown <= -.35 && s.maxDrawdown > -.95) parts.push(`ピーク${formatManYen(s.peak)}から最大${formatPct(s.maxDrawdown, 0)}まで沈んだ。`);
	if (s.ruined && s.preRuin5yAvg != null && s.preRuin5yAvg > 0 && s.worstYear > -.25) parts.push(`資産枯渇直前5年の平均リターンは${signedPct(s.preRuin5yAvg)}。最後は大暴落というより、残った元本が支出に足りなくなった。`);
	else if (s.worstAge != null && s.worstYear <= -.22 && (s.worstAge >= s.fireAge || s.ruinAge - s.worstAge <= 12)) parts.push(`最悪年は${formatAge(s.worstAge)}で${signedPct(s.worstYear)}。その年が残った資産を削った。`);
	if (s.cumulativeWithdrawal > 0) {
		const taxBit = s.cumulativeTax > 0 ? `うち税が${formatManYen(s.cumulativeTax)}。` : "";
		parts.push(`資産枯渇までに取り崩した額は${formatManYen(s.cumulativeWithdrawal)}。${taxBit}`);
	}
	return parts.join("");
}
function signedPct(decimal) {
	const body = formatPct(Math.abs(decimal), 1);
	return `${decimal < 0 ? "-" : "+"}${body}`;
}
function hitsRuin(rules, wealth, age, annualSpend) {
	for (const rule of rules) if (rule.type === "depleted") {
		if (wealth <= rule.threshold) return true;
	} else if (rule.type === "below_at_age") {
		if (age === rule.age && wealth <= rule.amount) return true;
	} else if (rule.type === "years_of_spend") {
		if (wealth < Math.max(0, annualSpend) * rule.years) return true;
	}
	return false;
}
function realReturn(nominal, inflation, returnsAreNominal) {
	if (!returnsAreNominal) return nominal;
	return (1 + nominal) / (1 + inflation) - 1;
}
function simulate(plan, storyNonce = 0) {
	const validationIssues = validatePlan(plan);
	if (validationIssues.length > 0) throw new Error(validationIssues[0].message);
	const currentAge = Math.round(plan.currentAge);
	const fireAge = Math.round(plan.fireAge);
	const endAge = Math.round(plan.endAge);
	const years = endAge - currentAge;
	const trials = Math.max(200, Math.min(2e4, Math.round(plan.trials) || 1e3));
	if (years < 1 || plan.assets.length === 0) return {
		trials: 0,
		years: 0,
		ages: [currentAge],
		ruinCount: 0,
		successRate: 1,
		percentiles: {
			p5: [plan.currentAssets],
			p10: [plan.currentAssets],
			p25: [plan.currentAssets],
			p50: [plan.currentAssets],
			p75: [plan.currentAssets],
			p90: [plan.currentAssets],
			p95: [plan.currentAssets]
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
			survivorMedian: plan.currentAssets
		},
		samplePaths: [],
		ruinStory: null,
		medianStory: null,
		periodStories: {
			throughAge80: null,
			age81To100: null,
			afterAge100: null,
			survived: null
		},
		medianRuinAge: null,
		fireAge,
		currentAge,
		endAge,
		portfolio: {
			accum: {
				mu: 0,
				sigma: 0
			},
			withdraw: {
				mu: 0,
				sigma: 0
			}
		}
	};
	const inflation = plan.inflationPct / 100;
	const nA = plan.assets.length;
	const mu = plan.assets.map((a) => realReturn(a.expectedReturnPct / 100, inflation, plan.returnsAreNominal));
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
			const taxRate = Math.max(0, Math.min(.9, (plan.taxRatePct ?? 0) / 100));
			let soldY = 0;
			let taxY = 0;
			if (isWithdraw) {
				const netNeed = plan.annualSpend - pension;
				if (netNeed > 0) {
					const desired = netNeed / (1 - taxRate);
					soldY = Math.min(desired, Math.max(0, w));
					taxY = soldY * taxRate;
					w -= desired;
				} else w += -netNeed;
			} else w += plan.annualContribution + pension;
			if (w < 0) w = 0;
			for (let i = 0; i < nA; i++) z[i] = gaussian(rng);
			for (let i = 0; i < nA; i++) {
				let s = 0;
				for (let j = 0; j <= i; j++) s += L[i][j] * z[j];
				shock[i] = s;
			}
			let portR = 0;
			if (w > 0) {
				const weights = isWithdraw ? wWd : wAcc;
				for (let i = 0; i < nA; i++) {
					let r = mu[i] + sigma[i] * shock[i];
					if (r < -.95) r = -.95;
					portR += weights[i] * r;
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
	const ages = Array.from({ length: T }, (_, i) => currentAge + i);
	const col = new Array(trials);
	const p5 = [];
	const p10 = [];
	const p25 = [];
	const p50 = [];
	const p75 = [];
	const p90 = [];
	const p95 = [];
	const survival = [];
	for (let t = 0; t < T; t++) {
		for (let i = 0; i < trials; i++) col[i] = wealth[i * T + t];
		col.sort((a, b) => a - b);
		p5.push(percentile(col, .05));
		p10.push(percentile(col, .1));
		p25.push(percentile(col, .25));
		p50.push(percentile(col, .5));
		p75.push(percentile(col, .75));
		p90.push(percentile(col, .9));
		p95.push(percentile(col, .95));
		const age = ages[t];
		let ruinedBy = 0;
		for (let i = 0; i < trials; i++) if (ruinAge[i] !== -1 && ruinAge[i] <= age) ruinedBy++;
		survival.push(1 - ruinedBy / trials);
	}
	const terminalCol = col;
	const survivors = [];
	let ruinCount = 0;
	const ruinedAges = [];
	for (let i = 0; i < trials; i++) if (ruined[i]) {
		ruinCount++;
		ruinedAges.push(ruinAge[i]);
	} else survivors.push(wealth[i * T + (T - 1)]);
	survivors.sort((a, b) => a - b);
	ruinedAges.sort((a, b) => a - b);
	const samplePaths = [];
	const stride = Math.max(1, Math.floor(trials / 12));
	for (let i = 0; i < trials && samplePaths.length < 12; i += stride) {
		const values = Array.from({ length: T }, (_, t) => wealth[i * T + t]);
		samplePaths.push({
			values,
			ruined: ruined[i] === 1
		});
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
		storyNonce
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
		p50
	});
	const periodStories = {
		throughAge80: pickRuinStory(storyArgs, "throughAge80"),
		age81To100: pickRuinStory(storyArgs, "age81To100"),
		afterAge100: pickRuinStory(storyArgs, "afterAge100"),
		survived: medianStory
	};
	return {
		trials,
		years,
		ages,
		ruinCount,
		successRate: 1 - ruinCount / trials,
		percentiles: {
			p5,
			p10,
			p25,
			p50,
			p75,
			p90,
			p95
		},
		survival,
		terminal: {
			mean: terminalCol.reduce((a, b) => a + b, 0) / trials,
			p5: percentile(terminalCol, .05),
			p10: percentile(terminalCol, .1),
			p25: percentile(terminalCol, .25),
			p50: percentile(terminalCol, .5),
			p75: percentile(terminalCol, .75),
			p90: percentile(terminalCol, .9),
			p95: percentile(terminalCol, .95),
			survivorMedian: survivors.length ? percentile(survivors, .5) : null
		},
		samplePaths,
		ruinStory,
		medianStory,
		periodStories,
		medianRuinAge: ruinedAges.length ? percentile(ruinedAges, .5) : null,
		fireAge,
		currentAge,
		endAge,
		portfolio: {
			accum: portfolioMoments(mu, sigma, wAcc, corr),
			withdraw: portfolioMoments(mu, sigma, wWd, corr)
		}
	};
}
function pickRuinStory(args, period) {
	const { wealth, rets, sold, taxPaid, ruined, ruinAge, trials, T, years } = args;
	const ruinedIdx = [];
	let worst = 0;
	let worstW = Infinity;
	for (let i = 0; i < trials; i++) if (ruined[i] && (!period || isRuinAgeInPeriod(ruinAge[i], period))) ruinedIdx.push(i);
	else {
		const tw = wealth[i * T + (T - 1)];
		if (tw < worstW) {
			worstW = tw;
			worst = i;
		}
	}
	if (period && ruinedIdx.length === 0) return null;
	const pickRng = mulberry32((args.seed ^ Math.imul(args.storyNonce + 1, 2654435769) >>> 0) >>> 0);
	const chosen = ruinedIdx.length > 0 ? ruinedIdx[Math.floor(pickRng() * ruinedIdx.length)] : worst;
	return buildRuinStory({
		wealth: Array.from({ length: T }, (_, t) => wealth[chosen * T + t]),
		returns: Array.from({ length: years }, (_, y) => rets[chosen * years + y]),
		sold: Array.from({ length: years }, (_, y) => sold[chosen * years + y]),
		taxPaid: Array.from({ length: years }, (_, y) => taxPaid[chosen * years + y]),
		ruined: ruined[chosen] === 1,
		ruinAge: ruinAge[chosen] === -1 ? null : ruinAge[chosen],
		currentAge: args.currentAge,
		fireAge: args.fireAge,
		endAge: args.endAge,
		trialIndex: chosen,
		ruinCount: period ? ruinedIdx.length : args.ruinCount,
		trials,
		role: "ruin"
	});
}
function isRuinAgeInPeriod(age, period) {
	if (period === "throughAge80") return age <= 80;
	if (period === "age81To100") return age > 80 && age <= 100;
	return age > 100;
}
function pickMedianStory(args) {
	const { wealth, rets, sold, taxPaid, ruined, ruinAge, trials, T, years, p50 } = args;
	let best = 0;
	let bestScore = Infinity;
	for (let i = 0; i < trials; i++) {
		let score = 0;
		for (let t = 0; t < T; t++) {
			const d = wealth[i * T + t] - (p50[t] ?? 0);
			score += d * d;
		}
		if (score < bestScore) {
			bestScore = score;
			best = i;
		}
	}
	return buildRuinStory({
		wealth: Array.from({ length: T }, (_, t) => wealth[best * T + t]),
		returns: Array.from({ length: years }, (_, y) => rets[best * years + y]),
		sold: Array.from({ length: years }, (_, y) => sold[best * years + y]),
		taxPaid: Array.from({ length: years }, (_, y) => taxPaid[best * years + y]),
		ruined: ruined[best] === 1,
		ruinAge: ruinAge[best] === -1 ? null : ruinAge[best],
		currentAge: args.currentAge,
		fireAge: args.fireAge,
		endAge: args.endAge,
		trialIndex: best,
		ruinCount: args.ruinCount,
		trials,
		role: "median"
	});
}
//#endregion
export { simulate };
