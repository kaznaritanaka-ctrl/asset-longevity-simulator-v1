import type { BalanceDrawdownSummary } from "./types";
import { percentile } from "./math";

export function maxBalanceDrawdown(values: ArrayLike<number>, startIndex = 0): number {
  if (values.length === 0) return 0;

  const start = Math.max(0, Math.min(values.length - 1, Math.trunc(startIndex)));
  let peak = values[start] ?? 0;
  if (peak <= 0) return -1;

  let maxDrawdown = 0;
  for (let index = start + 1; index < values.length; index++) {
    const wealth = values[index] ?? 0;
    if (wealth <= 0) return -1;
    if (wealth > peak) peak = wealth;
    maxDrawdown = Math.min(maxDrawdown, wealth / peak - 1);
  }
  return maxDrawdown;
}

export function summarizeBalanceDrawdowns(drawdowns: ArrayLike<number>): BalanceDrawdownSummary {
  if (drawdowns.length === 0) {
    return { median: 0, experienced30Pct: 0, experienced50Pct: 0 };
  }

  const sorted = Array.from(drawdowns).sort((a, b) => a - b);
  let experienced30 = 0;
  let experienced50 = 0;
  for (const drawdown of sorted) {
    if (drawdown <= -0.3) experienced30++;
    if (drawdown <= -0.5) experienced50++;
  }

  return {
    median: percentile(sorted, 0.5),
    experienced30Pct: experienced30 / sorted.length,
    experienced50Pct: experienced50 / sorted.length,
  };
}
