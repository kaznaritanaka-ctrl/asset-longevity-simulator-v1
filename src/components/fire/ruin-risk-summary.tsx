import { formatAge, formatPct } from "@/lib/fire/format";
import { buildRuinRiskBreakdown } from "@/lib/fire/risk-breakdown";
import type { RuinPeriod, SimResult } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { RuinStoryCard } from "./ruin-story";

function formatRiskRate(value: number, count: number): string {
  if (count > 0 && value < 0.0005) return "<0.1%";
  return formatPct(value, 1);
}

export function RuinRiskSummary({
  result,
  selected,
  onSelect,
}: {
  result: SimResult;
  selected: RuinPeriod;
  onSelect: (period: RuinPeriod) => void;
}) {
  const breakdown = buildRuinRiskBreakdown(result);
  const totalRuin = result.trials > 0 ? result.ruinCount / result.trials : 0;
  const depletionOnly = result.failureMode === "depletion";
  const failureLabel = depletionOnly ? "資産枯渇" : "条件抵触";
  const successLabel = depletionOnly ? "資産維持" : "計画達成";
  const firstSimulatedAge = result.currentAge + 1;
  const intersects = (from: number, through: number) =>
    Math.max(firstSimulatedAge, from) <= Math.min(result.endAge, through);

  const segments: Array<{
    id: RuinPeriod;
    label: string;
    value: number;
    count: number;
    color: string;
  }> = [];
  if (intersects(Number.NEGATIVE_INFINITY, 80)) {
    segments.push({
      id: "throughAge80",
      label: `${Math.min(80, result.endAge)}歳までに${failureLabel}`,
      value: breakdown.throughAge80,
      count: breakdown.counts.throughAge80,
      color: "bg-ruin",
    });
  }
  if (intersects(81, 100)) {
    segments.push({
      id: "age81To100",
      label: `${Math.max(81, firstSimulatedAge)}〜${Math.min(100, result.endAge)}歳で${failureLabel}`,
      value: breakdown.age81To100,
      count: breakdown.counts.age81To100,
      color: "bg-fire",
    });
  }
  if (intersects(101, Number.POSITIVE_INFINITY)) {
    segments.push({
      id: "afterAge100",
      label: `${Math.max(101, firstSimulatedAge)}〜${result.endAge}歳で${failureLabel}`,
      value: breakdown.afterAge100,
      count: breakdown.counts.afterAge100,
      color: "bg-ruin/50",
    });
  }
  segments.push({
    id: "survived",
    label: `${formatAge(result.endAge)}まで${successLabel}`,
    value: breakdown.survived,
    count: breakdown.counts.survived,
    color: "bg-survive",
  });
  const selectedSegment = segments.find((segment) => segment.id === selected) ?? segments[0]!;
  const selectedStory = result.periodStories[selected];

  return (
    <section className="min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg text-fg">年齢別の{failureLabel}経路</h2>
          <p className="mt-0.5 text-xs text-fg-muted">
            {failureLabel}した年齢を80歳・100歳で区切って表示
          </p>
        </div>
        <p className="text-sm text-fg-muted">
          全期間{" "}
          <strong className="font-display text-xl font-normal tabular-nums text-ruin">
            {formatRiskRate(totalRuin, result.ruinCount)}
          </strong>
          <span className="ml-1 text-xs tabular-nums text-fg-subtle">
            ({result.ruinCount.toLocaleString("ja-JP")} / {result.trials.toLocaleString("ja-JP")}
            経路)
          </span>
        </p>
      </header>

      <div
        className="mt-4 flex h-3 overflow-hidden rounded-full bg-bg-sunken"
        role="img"
        aria-label={`${failureLabel}率 ${formatRiskRate(totalRuin, result.ruinCount)}。${segments
          .map(
            (segment) =>
              `${segment.label} ${formatRiskRate(segment.value, segment.count)}、${segment.count}経路`,
          )
          .join("、")}`}
      >
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={segment.color}
            style={{ width: `${segment.value * 100}%` }}
            title={`${segment.label} ${formatRiskRate(segment.value, segment.count)}（${segment.count.toLocaleString("ja-JP")}経路）`}
          />
        ))}
      </div>

      <div
        className={cn(
          "mt-4 grid grid-cols-2 gap-2",
          segments.length === 2
            ? "sm:grid-cols-2"
            : segments.length === 3
              ? "sm:grid-cols-3"
              : "sm:grid-cols-4",
        )}
      >
        {segments.map((segment) => (
          <button
            key={segment.id}
            type="button"
            disabled={!result.periodStories[segment.id]}
            aria-pressed={selected === segment.id}
            onClick={() => onSelect(segment.id)}
            className={cn(
              "min-w-0 rounded-lg border px-2.5 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40",
              selected === segment.id
                ? "border-accent bg-accent/10"
                : "border-border bg-surface-2 hover:bg-bg-sunken",
            )}
          >
            <span className="flex items-center gap-1.5 text-[11px] leading-tight text-fg-subtle">
              <i className={`inline-block size-2 shrink-0 rounded-full ${segment.color}`} />
              {segment.label}
            </span>
            <strong className="mt-1 block font-display text-lg font-normal tabular-nums text-fg">
              {formatRiskRate(segment.value, segment.count)}
            </strong>
            <span className="mt-0.5 block text-[10px] tabular-nums text-fg-subtle">
              {segment.count.toLocaleString("ja-JP")} / {result.trials.toLocaleString("ja-JP")}経路
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-fg-subtle">
        年齢帯を選ぶと、その区分に該当する代表経路を表示する。各値は全試行に占める割合。
      </p>

      <RuinStoryCard
        story={selectedStory}
        fireAge={result.fireAge}
        embedded
        heading={`${selectedSegment.label}の代表経路`}
        failureLabel={failureLabel}
      />
    </section>
  );
}
