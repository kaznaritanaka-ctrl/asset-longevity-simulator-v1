export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gaussian(rng: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function cholesky(matrix: number[][]): number[][] {
  const n = matrix.length;
  const L = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) sum += L[i][k] * L[j][k];
      if (i === j) {
        L[i][j] = Math.sqrt(Math.max(matrix[i][i] - sum, 1e-12));
      } else {
        const denom = L[j][j] || 1e-12;
        L[i][j] = (matrix[i][j] - sum) / denom;
      }
    }
  }
  return L;
}

/** Ridge the diagonal until Cholesky is numerically stable. */
export function makePositiveDefinite(corr: number[][]): number[][] {
  const n = corr.length;
  const A = corr.map((row, i) =>
    row.map((v, j) => {
      if (i === j) return 1;
      const x = Number.isFinite(v) ? v : 0;
      return Math.max(-0.99, Math.min(0.99, x));
    }),
  );
  for (let ridge = 0; ridge <= 8; ridge++) {
    const eps = ridge === 0 ? 0 : 1e-4 * Math.pow(4, ridge - 1);
    const M = A.map((row, i) => row.map((v, j) => (i === j ? 1 + eps : v)));
    try {
      const L = cholesky(M);
      const ok = L.every((row, i) => Number.isFinite(row[i]) && row[i] > 0);
      if (ok) return M;
    } catch {
      /* retry */
    }
  }
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );
}

export function normalizeWeights(weights: number[]): number[] {
  const clipped = weights.map((w) => Math.max(0, w));
  const sum = clipped.reduce((a, b) => a + b, 0);
  if (sum <= 0) return clipped.map(() => 1 / Math.max(clipped.length, 1));
  return clipped.map((w) => w / sum);
}

export function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo]!;
  const t = idx - lo;
  return sorted[lo]! * (1 - t) + sorted[hi]! * t;
}

export function portfolioMoments(
  mu: number[],
  sigma: number[],
  weights: number[],
  corr: number[][],
): { mu: number; sigma: number } {
  const w = normalizeWeights(weights);
  let mean = 0;
  for (let i = 0; i < w.length; i++) mean += w[i]! * mu[i]!;
  let varSum = 0;
  for (let i = 0; i < w.length; i++) {
    for (let j = 0; j < w.length; j++) {
      const rho = corr[i]?.[j] ?? (i === j ? 1 : 0);
      varSum += w[i]! * w[j]! * sigma[i]! * sigma[j]! * rho;
    }
  }
  return { mu: mean, sigma: Math.sqrt(Math.max(varSum, 0)) };
}

export function resizeCorrelations(
  current: number[][],
  nextLen: number,
  fill = 0.2,
): number[][] {
  const n = Math.max(0, nextLen);
  const out: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : fill)),
  );
  const m = Math.min(current.length, n);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      out[i]![j] = i === j ? 1 : (current[i]?.[j] ?? fill);
    }
  }
  return out;
}

export function identityCorr(n: number): number[][] {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
