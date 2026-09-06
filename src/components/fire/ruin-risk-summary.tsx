import { formatAge, formatPct } from "@/lib/fire/format";
import { buildRuinRiskBreakdown } from "@/lib/fire/risk-breakdown";
import type { SimResult } from "@/lib/fire/types";

export function RuinRiskSummary({ result }: { result: SimResult }) {
  const breakdown = buildRuinRiskBreakdown(result);
  const totalRuin = 1 - breakdown.survived;

  const segments = [
    { label: "80歳までに破綻", value: breakdown.throughAge80, color: "bg-ruin" },
    { label: "81〜100歳で破綻", value: breakdown.age81To100, color: "bg-fire" },
    { label: "101歳以降に破綻", value: breakdown.afterAge100, color: "bg-ruin/50" },
    {
      label: `${formatAge(result.endAge)}まで生存`,
      value: breakdown.survived,
      color: "bg-survive",
    },
  ];

  return (
    <section className="min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg text-fg">年齢別の破綻経路</h2>
          <p className="mt-0.5 text-xs text-fg-muted">破綻した年齢を80歳・100歳で区切って表示</p>
        </div>
        <p className="text-sm text-fg-muted">
          全期間{" "}
          <strong className="font-display text-xl font-normal tabular-nums text-ruin">
            {formatPct(totalRuin, 1)}
          </strong>
        </p>
      </header>

      <div
        className="mt-4 flex h-3 overflow-hidden rounded-full bg-bg-sunken"
        role="img"
        aria-label={`破綻確率 ${formatPct(totalRuin, 1)}。${segments
          .map((segment) => `${segment.label} ${formatPct(segment.value, 1)}`)
          .join("、")}`}
      >
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={segment.color}
            style={{ width: `${segment.value * 100}%` }}
            title={`${segment.label} ${formatPct(segment.value, 1)}`}
          />
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4">
        {segments.map((segment) => (
          <div key={segment.label} className="min-w-0">
            <dt className="flex items-center gap-1.5 text-[11px] text-fg-subtle">
              <i className={`inline-block size-2 shrink-0 rounded-full ${segment.color}`} />
              {segment.label}
            </dt>
            <dd className="mt-0.5 font-display text-lg tabular-nums text-fg">
              {formatPct(segment.value, 1)}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[11px] leading-relaxed text-fg-subtle">
        各値は全試行に占める割合。終了年齢が80歳または100歳より前の場合、それ以降の区分は0%になる。
      </p>
    </section>
  );
}
