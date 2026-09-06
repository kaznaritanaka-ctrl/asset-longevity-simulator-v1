import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatAge, formatAxisYen, formatManYen } from "@/lib/fire/format";
import type { RuinStory, SimResult, StoryRole } from "@/lib/fire/types";

export type ChartScale = "linear" | "log";

type Row = {
  age: number;
  p5: number;
  p25: number;
  p50: number;
  p75: number;
  p95: number;
  featured: number | null;
  outerBase: number;
  outerSpan: number;
  innerBase: number;
  innerSpan: number;
};

const LOG_FLOOR = 1;

function logTicks(min: number, max: number): number[] {
  const ticks: number[] = [];
  const start = Math.pow(10, Math.floor(Math.log10(Math.max(min, LOG_FLOOR))));
  for (let t = start; t <= max * 1.05; t *= 10) ticks.push(t);
  return ticks.length ? ticks : [1, 10, 100, 1000, 10_000];
}

function niceLogMax(v: number): number {
  const exp = Math.floor(Math.log10(Math.max(v, LOG_FLOOR)));
  const mant = v / 10 ** exp;
  const top = mant <= 2 ? 2 : mant <= 5 ? 5 : 10;
  return top * 10 ** exp;
}

export function FanChart({
  result,
  scale,
  featured,
  pathKind,
  deathAge,
  fill = false,
}: {
  result: SimResult;
  scale: ChartScale;
  featured: RuinStory | null;
  pathKind: StoryRole;
  deathAge?: number;
  fill?: boolean;
}) {
  const isLog = scale === "log";
  const clamp = (v: number) => (isLog ? Math.max(LOG_FLOOR, v) : v);
  const featColor = pathKind === "median" ? "var(--color-median)" : "var(--color-ruin)";

  const data: Row[] = result.ages.map((age, i) => {
    const p5 = clamp(result.percentiles.p5[i] ?? 0);
    const p25 = clamp(result.percentiles.p25[i] ?? 0);
    const p50 = clamp(result.percentiles.p50[i] ?? 0);
    const p75 = clamp(result.percentiles.p75[i] ?? 0);
    const p95 = clamp(result.percentiles.p95[i] ?? 0);
    const featuredRaw = featured?.years[i]?.wealth;
    const featuredVal = featuredRaw == null ? null : clamp(featuredRaw);
    return {
      age,
      p5,
      p25,
      p50,
      p75,
      p95,
      featured: featuredVal,
      outerBase: p5,
      outerSpan: Math.max(0, p95 - p5),
      innerBase: p25,
      innerSpan: Math.max(0, p75 - p25),
    };
  });

  const yVals = data.flatMap((d) =>
    [d.p5, d.p25, d.p50, d.p75, d.p95, d.featured ?? 0].filter((v) => v >= LOG_FLOOR),
  );
  const rawMin = yVals.length ? Math.min(...yVals) : LOG_FLOOR;
  const rawMax = yVals.length ? Math.max(...yVals) : LOG_FLOOR * 10;
  const yMin = isLog ? Math.pow(10, Math.floor(Math.log10(rawMin))) : 0;
  const yMax = isLog ? niceLogMax(rawMax) : rawMax;

  return (
    <div className={fill ? "h-full min-h-0 w-full overflow-hidden" : "h-64 w-full overflow-hidden sm:h-80"}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          key={scale}
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="age"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(v) => String(v)}
            tick={{ fill: "var(--color-fg-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickLine={false}
          />
          <YAxis
            scale={isLog ? "log" : "auto"}
            domain={isLog ? [yMin, yMax] : [0, "auto"]}
            ticks={isLog ? logTicks(yMin, yMax) : undefined}
            allowDataOverflow
            tickFormatter={formatAxisYen}
            tick={{ fill: "var(--color-fg-muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const i = result.ages.indexOf(Number(label));
              const rawP5 = result.percentiles.p5[i] ?? 0;
              const rawP25 = result.percentiles.p25[i] ?? 0;
              const rawP50 = result.percentiles.p50[i] ?? 0;
              const rawP75 = result.percentiles.p75[i] ?? 0;
              const rawP95 = result.percentiles.p95[i] ?? 0;
              const rawFeat = featured?.years[i]?.wealth;
              return (
                <div className="rounded-md bg-surface-2 px-3 py-2 text-xs shadow-[var(--shadow-border)]">
                  <p className="mb-1 font-medium text-fg">{formatAge(Number(label))}</p>
                  <p className="tabular-nums text-fg-muted">5% {formatManYen(rawP5)}</p>
                  <p className="tabular-nums text-fg-muted">25% {formatManYen(rawP25)}</p>
                  <p className="tabular-nums text-fg">中央 {formatManYen(rawP50)}</p>
                  <p className="tabular-nums text-fg-muted">75% {formatManYen(rawP75)}</p>
                  <p className="tabular-nums text-fg-muted">95% {formatManYen(rawP95)}</p>
                  {rawFeat != null ? (
                    <p className="tabular-nums text-ruin">このシナリオ {formatManYen(rawFeat)}</p>
                  ) : null}
                </div>
              );
            }}
          />
          <ReferenceArea
            x1={result.currentAge}
            x2={result.fireAge}
            fill="var(--color-phase-accum)"
            fillOpacity={0.55}
            ifOverflow="extendDomain"
          />
          <ReferenceArea
            x1={result.fireAge}
            x2={result.endAge}
            fill="var(--color-phase-withdraw)"
            fillOpacity={0.55}
            ifOverflow="extendDomain"
          />
          {!isLog ? (
            <>
              <Area
                type="monotone"
                dataKey="p95"
                stroke="none"
                fill="var(--color-band-outer)"
                fillOpacity={0.55}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="p5"
                stroke="none"
                fill="var(--color-surface)"
                fillOpacity={1}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="p75"
                stroke="none"
                fill="var(--color-band-inner)"
                fillOpacity={0.45}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="p25"
                stroke="none"
                fill="var(--color-surface)"
                fillOpacity={1}
                isAnimationActive={false}
              />
            </>
          ) : null}
          <Line
            type="monotone"
            dataKey="p5"
            stroke="var(--color-fg-muted)"
            strokeOpacity={0.55}
            strokeWidth={1}
            strokeDasharray="4 3"
            dot={false}
            isAnimationActive={false}
            legendType="none"
          />
          <Line
            type="monotone"
            dataKey="p95"
            stroke="var(--color-fg-muted)"
            strokeOpacity={0.55}
            strokeWidth={1}
            strokeDasharray="4 3"
            dot={false}
            isAnimationActive={false}
            legendType="none"
          />
          {isLog ? (
            <>
              <Line
                type="monotone"
                dataKey="p25"
                stroke="var(--color-band-inner)"
                strokeWidth={1}
                strokeOpacity={0.8}
                dot={false}
                isAnimationActive={false}
                legendType="none"
              />
              <Line
                type="monotone"
                dataKey="p75"
                stroke="var(--color-band-inner)"
                strokeWidth={1}
                strokeOpacity={0.8}
                dot={false}
                isAnimationActive={false}
                legendType="none"
              />
            </>
          ) : null}
          <Line
            type="monotone"
            dataKey="p50"
            stroke="var(--color-median)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          {featured ? (
            <Line
              type="monotone"
              dataKey="featured"
              stroke={featColor}
              strokeWidth={1.6}
              dot={false}
              isAnimationActive={false}
              connectNulls
            />
          ) : null}
          <ReferenceLine
            x={result.fireAge}
            stroke="var(--color-fire)"
            strokeDasharray="4 4"
          />
          {deathAge != null && deathAge > result.currentAge && deathAge < result.endAge ? (
            <ReferenceLine x={deathAge} stroke="var(--color-fg-muted)" strokeDasharray="2 4" />
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
