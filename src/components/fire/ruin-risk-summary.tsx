import { formatAge, formatPct } from "@/lib/fire/format";
import { buildRuinRiskBreakdown } from "@/lib/fire/risk-breakdown";
import type { RuinPeriod, SimResult } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { RuinStoryCard } from "./ruin-story";

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
  const totalRuin = 1 - breakdown.survived;

  const segments = [
    {
      id: "throughAge80",
      label: "80歳までに破綻",
      value: breakdown.throughAge80,
      color: "bg-ruin",
    },
    {
      id: "age81To100",
      label: "81〜100歳で破綻",
      value: breakdown.age81To100,
      color: "bg-fire",
    },
    {
      id: "afterAge100",
      label: "101歳以降に破綻",
      value: breakdown.afterAge100,
      color: "bg-ruin/50",
    },
    {
      id: "survived",
      label: `${formatAge(result.endAge)}まで生存`,
      value: breakdown.survived,
      color: "bg-survive",
    },
  ] satisfies Array<{ id: RuinPeriod; label: string; value: number; color: string }>;
  const selectedSegment = segments.find((segment) => segment.id === selected) ?? segments[0]!;
  const selectedStory = result.periodStories[selected];

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

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
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
              {formatPct(segment.value, 1)}
            </strong>
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
      />
    </section>
  );
}
