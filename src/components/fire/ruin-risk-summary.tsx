import { formatAge, formatManYen, formatPct } from "@/lib/fire/format";
import { buildRuinRiskBreakdown } from "@/lib/fire/risk-breakdown";
import type { RuinPeriod, SimResult } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";
import { ShareButtons } from "./share-buttons";

export function RuinRiskSummary({
  result,
  selected,
  onSelect,
}: {
  result: SimResult;
  selected: RuinPeriod;
  onSelect: (period: RuinPeriod) => void;
  compact?: boolean;
}) {
  const resultStale = usePlanStore((s) => s.resultStale);
  const status = usePlanStore((s) => s.status);
  const error = usePlanStore((s) => s.error);
  const breakdown = buildRuinRiskBreakdown(result);
  const totalRuin = 1 - breakdown.survived;
  const rate = result.successRate;
  const tone = rate >= 0.95 ? "survive" : rate >= 0.8 ? "mid" : "ruin";

  const segments = [
    {
      id: "throughAge80",
      label: "80歳まで",
      full: "80歳までに資産枯渇",
      value: breakdown.throughAge80,
      color: "bg-ruin",
    },
    {
      id: "age81To100",
      label: "81–100歳",
      full: "81〜100歳で資産枯渇",
      value: breakdown.age81To100,
      color: "bg-fire",
    },
    {
      id: "afterAge100",
      label: "101歳以降",
      full: "101歳以降に資産枯渇",
      value: breakdown.afterAge100,
      color: "bg-ruin/50",
    },
    {
      id: "survived",
      label: `${result.endAge}歳生存`,
      full: `${formatAge(result.endAge)}まで生存`,
      value: breakdown.survived,
      color: "bg-survive",
    },
  ] satisfies Array<{
    id: RuinPeriod;
    label: string;
    full: string;
    value: number;
    color: string;
  }>;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex shrink-0 items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-xl leading-snug text-fg">
            {result.endAge}歳まで資産が持つ割合
            {resultStale ? " · 前回" : ""}
          </p>
          <p
            className={cn(
              "mt-1 font-display text-5xl leading-none tracking-tight tabular-nums lg:text-6xl",
              tone === "survive" && "text-survive",
              tone === "mid" && "text-fg",
              tone === "ruin" && "text-ruin",
            )}
          >
            {formatPct(rate, 1)}
          </p>
        </div>
        <ShareButtons />
      </header>

      <dl className="mt-3 grid shrink-0 grid-cols-2 gap-x-4 gap-y-2">
        <Stat label={`${result.endAge}歳時点　中央値`} value={formatManYen(result.terminal.p50)} />
        <Stat label="下振れ5%" value={formatManYen(result.terminal.p5)} />
        <Stat
          label="資産が足りたシナリオの中央値"
          value={
            result.terminal.survivorMedian != null
              ? formatManYen(result.terminal.survivorMedian)
              : "—"
          }
        />
        <Stat label="資産枯渇" value={formatPct(totalRuin, 1)} />
      </dl>

      {error ? (
        <p className="mt-2 text-xs text-ruin">{error}</p>
      ) : resultStale ? (
        <p className="mt-2 text-sm text-fg-muted">
          {status === "running" ? "新しい条件を計算中。表示は前回結果。" : "条件が変わっています。表示は前回結果。"}
        </p>
      ) : null}

      <div
        className="mt-3 flex h-2 shrink-0 overflow-hidden rounded-full bg-bg-sunken"
        role="img"
        aria-label={`資産枯渇確率 ${formatPct(totalRuin, 1)}。${segments
          .map((segment) => `${segment.full} ${formatPct(segment.value, 1)}`)
          .join("、")}`}
      >
        {segments.map((segment) => (
          <div
            key={segment.id}
            className={segment.color}
            style={{ width: `${segment.value * 100}%` }}
            title={`${segment.full} ${formatPct(segment.value, 1)}`}
          />
        ))}
      </div>

      <div className="mt-2 flex shrink-0 gap-1">
        {segments.map((segment) => (
          <button
            key={segment.id}
            type="button"
            disabled={!result.periodStories[segment.id]}
            aria-pressed={selected === segment.id}
            onClick={() => onSelect(segment.id)}
            className={cn(
              "min-w-0 flex-1 rounded-md border px-1 py-1 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40",
              selected === segment.id
                ? "border-accent bg-accent/10"
                : "border-border bg-surface-2 hover:bg-bg-sunken",
            )}
          >
            <span className="flex items-center justify-center gap-1 text-xs leading-tight text-fg-muted">
              <i className={`inline-block size-1.5 shrink-0 rounded-full ${segment.color}`} />
              <span className="truncate">{segment.label}</span>
            </span>
            <strong className="mt-0.5 block font-display text-base font-normal tabular-nums text-fg">
              {formatPct(segment.value, 1)}
            </strong>
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-sm leading-snug text-fg-muted">{label}</dt>
      <dd className="font-display text-2xl tabular-nums tracking-tight text-fg lg:text-3xl">{value}</dd>
    </div>
  );
}
