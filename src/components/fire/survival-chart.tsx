import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatAge, formatPct } from "@/lib/fire/format";
import {
  assetHalfLifeAge,
  expectedDeathAge,
  LIFE_TABLE,
  lifeSurvival,
  meanAssetYears,
  remainingLife,
} from "@/lib/fire/life-table";
import type { Sex, SimResult } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";

export function SurvivalChart({ result }: { result: SimResult }) {
  const sex: Sex = usePlanStore((s) => (s.plan.sex === "female" ? "female" : "male"));
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
    life: lifeSurvival(result.currentAge, age, sex),
  }));

  return (
    <div className="min-w-0">
      <dl className="mb-4 grid grid-cols-2 gap-3">
        <CompareStat
          label={`${sexLabel}の平均余命`}
          value={`${ex.toFixed(1)}年`}
          sub={`${formatAge(result.currentAge)} → ${formatAge(Math.round(deathAge))}`}
          fill={ex / barMax}
          tone="life"
        />
        <CompareStat
          label="資産寿命（半数）"
          value={censored ? `${horizonYears}年+` : `${assetYears}年`}
          sub={
            censored
              ? `終了年齢（${formatAge(result.endAge)}）まで半分は持つ`
              : `${formatAge(result.currentAge)} → ${formatAge(halfAge!)}`
          }
          fill={assetYears / barMax}
          tone="asset"
        />
      </dl>
      <p className="mb-3 text-xs leading-relaxed text-fg-muted">
        {censored
          ? `平均余命は${ex.toFixed(1)}年（${formatAge(Math.round(deathAge))}）。この条件では資産の半分が尽きる前にシミュレーション終了年齢へ達する。曲線の平均は${meanYears.toFixed(0)}年（打ち切り）。`
          : `平均余命${ex.toFixed(1)}年に対し、経路の半数が${formatAge(halfAge!)}で破綻する。`}
      </p>
      <div className="h-48 w-full overflow-hidden sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="age"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fill: "var(--color-fg-muted)", fontSize: 11 }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              tick={{ fill: "var(--color-fg-muted)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const asset = payload.find((p) => p.dataKey === "asset")?.value as number | undefined;
                const life = payload.find((p) => p.dataKey === "life")?.value as number | undefined;
                return (
                  <div className="rounded-md bg-surface-2 px-3 py-2 text-xs shadow-[var(--shadow-border)]">
                    <p className="font-medium text-fg">{formatAge(Number(label))}</p>
                    {asset != null ? (
                      <p className="tabular-nums text-accent">資産 {formatPct(asset)}</p>
                    ) : null}
                    {life != null ? (
                      <p className="tabular-nums text-fire">生命 {formatPct(life)}</p>
                    ) : null}
                  </div>
                );
              }}
            />
            <ReferenceLine x={result.fireAge} stroke="var(--color-fire)" strokeDasharray="4 4" />
            {deathAge > result.currentAge && deathAge < result.endAge ? (
              <ReferenceLine x={deathAge} stroke="var(--color-fg-muted)" strokeDasharray="2 4" />
            ) : null}
            <Line
              type="stepAfter"
              dataKey="asset"
              name="資産"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="life"
              name="生命"
              stroke="var(--color-fire)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-fg-subtle">
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-0.5 w-3 bg-accent" />
          資産が持つ割合
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="inline-block h-0.5 w-3 bg-fire" />
          {sexLabel}が生きている割合
        </span>
        <span>点線はFIREと平均余命の到達年齢</span>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-fg-subtle">
        生命は{LIFE_TABLE.publisher}
        {LIFE_TABLE.name}（{LIFE_TABLE.year}年）の{sexLabel}、現在年齢から条件付き。経路は死なない。比較用。
      </p>
    </div>
  );
}

function CompareStat({
  label,
  value,
  sub,
  fill,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  fill: number;
  tone: "life" | "asset";
}) {
  return (
    <div className="min-w-0 rounded-lg bg-surface-2 px-3 py-2.5 shadow-[var(--shadow-border)]">
      <dt className="text-[11px] text-fg-subtle">{label}</dt>
      <dd className="font-display text-xl tabular-nums tracking-tight text-fg">{value}</dd>
      <p className="mt-0.5 text-[11px] text-fg-muted">{sub}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-sunken">
        <div
          className={cn("h-full rounded-full", tone === "asset" ? "bg-accent" : "bg-fire")}
          style={{ width: `${Math.min(100, Math.max(4, fill * 100))}%` }}
        />
      </div>
    </div>
  );
}
