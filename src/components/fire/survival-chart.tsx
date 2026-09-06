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
import { expectedDeathAge, LIFE_TABLE, lifeSurvival, remainingLife } from "@/lib/fire/life-table";
import type { Sex, SimResult } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";

function survivalAtAge(result: SimResult, age: number): number {
  const { ages, survival } = result;
  if (ages.length === 0) return 1;
  if (age <= (ages[0] ?? 0)) return survival[0] ?? 1;
  for (let i = ages.length - 1; i >= 0; i--) {
    if ((ages[i] ?? 0) <= age) return survival[i] ?? 1;
  }
  return survival.at(-1) ?? 1;
}

export function SurvivalChart({ result, compact = false }: { result: SimResult; compact?: boolean }) {
  const sex: Sex = usePlanStore((s) => (s.plan.sex === "female" ? "female" : "male"));
  const ex = remainingLife(result.currentAge, sex);
  const deathAge = expectedDeathAge(result.currentAge, sex);
  const survAtDeath = survivalAtAge(result, deathAge);
  const survAtEnd = result.survival.at(-1) ?? result.successRate;
  const sexLabel = sex === "female" ? "女性" : "男性";

  const data = result.ages.map((age, i) => ({
    age,
    asset: result.survival[i] ?? 1,
    life: lifeSurvival(result.currentAge, age, sex),
  }));

  return (
    <div className={cn("flex min-h-0 min-w-0 flex-1 flex-col", compact && "h-full")}>
      <dl className={cn("grid grid-cols-2 gap-2", compact ? "mb-2 shrink-0" : "mb-4 gap-3")}>
        <CompareStat
          label={`${sexLabel}の平均余命`}
          value={`${ex.toFixed(1)}年`}
          sub={`${formatAge(result.currentAge)} → ${formatAge(Math.round(deathAge))}`}
          fill={Math.min(1, ex / Math.max(1, result.endAge - result.currentAge))}
          tone="life"
          compact={compact}
        />
        <CompareStat
          label={`${formatAge(Math.round(deathAge))}時点の残存`}
          value={formatPct(survAtDeath, 1)}
          sub={`終了時 ${formatPct(survAtEnd, 1)}（シミュレーション）`}
          fill={survAtDeath}
          tone="asset"
          compact={compact}
        />
      </dl>
      {compact ? null : (
        <p className="mb-3 text-sm leading-relaxed text-fg-muted">
          資産の線は今回回した{result.trials.toLocaleString("ja-JP")}
          本のうち、その年齢まで資産が残った割合。生命は生命表。
        </p>
      )}
      <div className={cn("min-h-0 w-full", compact ? "flex-1" : "h-48 sm:h-56")}>
        <ResponsiveContainer width="100%" height="100%" minHeight={120}>
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="age"
              type="number"
              domain={["dataMin", "dataMax"]}
              tick={{ fill: "var(--color-fg-muted)", fontSize: 12 }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 1]}
              tickFormatter={(v) => `${Math.round(Number(v) * 100)}%`}
              tick={{ fill: "var(--color-fg-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const asset = payload.find((p) => p.dataKey === "asset")?.value as number | undefined;
                const life = payload.find((p) => p.dataKey === "life")?.value as number | undefined;
                return (
                  <div className="rounded-md bg-surface-2 px-3 py-2 text-sm shadow-[var(--shadow-border)]">
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
              strokeWidth={2.5}
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
      <div className="mt-1.5 flex shrink-0 flex-wrap items-center gap-x-3 text-xs text-fg-muted">
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-0.5 w-3 bg-accent" />
          シミュレーション（資産が残る割合）
        </span>
        <span className="inline-flex items-center gap-1">
          <i className="inline-block h-0.5 w-3 bg-fire" />
          {sexLabel}の生命表
        </span>
      </div>
      {compact ? null : (
        <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
          生命は{LIFE_TABLE.publisher}
          {LIFE_TABLE.name}（{LIFE_TABLE.year}年）の{sexLabel}、現在年齢から条件付き。資産は今回の乱数。死亡では打ち切らない。
        </p>
      )}
    </div>
  );
}

function CompareStat({
  label,
  value,
  sub,
  fill,
  tone,
  compact,
}: {
  label: string;
  value: string;
  sub: string;
  fill: number;
  tone: "life" | "asset";
  compact?: boolean;
}) {
  return (
    <div className={cn("min-w-0 rounded-lg bg-surface-2 shadow-[var(--shadow-border)]", compact ? "px-2 py-1.5" : "px-3 py-2.5")}>
      <dt className="type-caption text-fg-muted">{label}</dt>
      <dd className="type-metric text-fg">{value}</dd>
      {compact ? null : <p className="mt-0.5 text-sm text-fg-muted">{sub}</p>}
      <div className={cn("overflow-hidden rounded-full bg-bg-sunken", compact ? "mt-1 h-1" : "mt-2 h-1.5")}>
        <div
          className={cn("h-full rounded-full", tone === "asset" ? "bg-accent" : "bg-fire")}
          style={{ width: `${Math.min(100, Math.max(4, fill * 100))}%` }}
        />
      </div>
    </div>
  );
}
