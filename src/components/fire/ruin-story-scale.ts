import type { ChartScale } from "./fan-chart";

export function createStoryYScale(
  values: readonly number[],
  scale: ChartScale,
  height: number,
  padding: number,
): (value: number) => number {
  const chartRange = height - padding * 2;
  const bottom = height - padding;

  if (scale === "linear") {
    const max = Math.max(...values, 1);
    return (value) => padding + (1 - value / max) * chartRange;
  }

  const positiveValues = values.filter((value) => value > 0 && Number.isFinite(value));
  if (positiveValues.length === 0) return () => bottom;

  const minPositive = Math.min(...positiveValues);
  const maxPositive = Math.max(...positiveValues);
  if (minPositive === maxPositive) return (value) => (value > 0 ? padding : bottom);

  const logMin = Math.log(minPositive);
  const logRange = Math.log(maxPositive) - logMin;
  const zeroGap = Math.min(8, chartRange * 0.12);
  const positiveRange = chartRange - zeroGap;

  return (value) => {
    if (!(value > 0) || !Number.isFinite(value)) return bottom;
    const normalized = Math.max(0, Math.min(1, (Math.log(value) - logMin) / logRange));
    return padding + (1 - normalized) * positiveRange;
  };
}
