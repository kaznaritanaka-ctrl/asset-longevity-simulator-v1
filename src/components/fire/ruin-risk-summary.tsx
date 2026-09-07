import { formatAge, formatManYen, formatPct } from "@/lib/fire/format";
import { buildRuinRiskBreakdown } from "@/lib/fire/risk-breakdown";
import type { RuinPeriod, SimResult } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { usePlanStore } from "@/store/plan-store";
import { ShareButtons } from "./share-buttons";

function formatRiskRate(value: number, count: number): string {
  if (count > 0 && value < 0.0005) return "<0.1%";
  return formatPct(value, 1);
}

function formatDrawdown(value: number): string {
  return formatPct(value, 1).replace("-", "−");
}

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
  const totalRuin = result.trials > 0 ? result.ruinCount / result.trials : 0;
  const rate = result.successRate;
  const tone = rate >= 0.95 ? "survive" : rate >= 0.8 ? "mid" : "ruin";
  const depletionOnly = result.failureMode === "depletion";
  const failureLabel = depletionOnly ? "資産枯渇" : "条件抵触";
  const successLabel = depletionOnly ? "資産維持" : "計画達成";
  const firstSimulatedAge = result.currentAge + 1;
  const intersects = (from: number, through: number) =>
    Math.max(firstSimulatedAge, from) <= Math.min(result.endAge, through);

  const segments: Array<{
    id: RuinPeriod;
    label: string;
    full: string;
    value: number;
    count: number;
    color: string;
  }> = [];
  if (intersects(Number.NEGATIVE_INFINITY, 80)) {
    segments.push({
      id: "throughAge80",
      label: "80歳まで",
      full: `80歳までに${failureLabel}`,
      value: breakdown.throughAge80,
      count: breakdown.counts.throughAge80,
      color: "bg-ruin",
    });
  }
  if (intersects(81, 100)) {
    segments.push({
      id: "age81To100",
      label: "81–100歳",
      full: `81〜100歳で${failureLabel}`,
      value: breakdown.age81To100,
      count: breakdown.counts.age81To100,
      color: "bg-fire",
    });
  }
  if (intersects(101, Number.POSITIVE_INFINITY)) {
    segments.push({
      id: "afterAge100",
      label: "101歳以降",
      full: `101歳以降に${failureLabel}`,
      value: breakdown.afterAge100,
      count: breakdown.counts.afterAge100,
      color: "bg-ruin/75",
    });
  }
  segments.push({
    id: "survived",
    label: `${result.endAge}歳${successLabel}`,
    full: `${formatAge(result.endAge)}まで${successLabel}`,
    value: breakdown.survived,
    count: breakdown.counts.survived,
    color: "bg-survive",
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex shrink-0 items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="type-title text-fg">
            {result.endAge}歳まで資産が持つ割合
            {resultStale ? " · 前回" : ""}
          </p>
          <p
            className={cn(
              "type-hero mt-1",
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
        <Stat label={failureLabel} value={formatRiskRate(totalRuin, result.ruinCount)} />
      </dl>

      <section
        className="mt-3 shrink-0"
        aria-label="途中経路のリスク。FIRE開始後、過去の最高資産残高からの減少を入出金込みで集計"
      >
        <p className="type-caption text-fg-muted">途中経路のリスク（FIRE開始後・入出金込み）</p>
        <dl className="mt-1 grid grid-cols-3 gap-x-3">
          <Stat
            label={
              <>
                <span className="hidden lg:inline">最大ドローダウン中央値</span>
                <span className="lg:hidden">
                  最大ドローダウン
                  <br />
                  中央値
                </span>
              </>
            }
            value={formatDrawdown(result.balanceDrawdown.median)}
          />
          <Stat label="30%以上を経験" value={formatPct(result.balanceDrawdown.experienced30Pct, 1)} />
          <Stat label="50%以上を経験" value={formatPct(result.balanceDrawdown.experienced50Pct, 1)} />
        </dl>
      </section>

      {error ? (
        <p className="mt-2 text-xs text-ruin">{error}</p>
      ) : resultStale ? (
        <p className="mt-2 text-sm text-fg-muted">
          {status === "running" ? "新しい条件を計算中。表示は前回結果。" : "条件が変わっています。表示は前回結果。"}
        </p>
      ) : null}

      <div
        className="mt-3 flex h-2.5 shrink-0 overflow-hidden rounded-full bg-bg-sunken saturate-125"
        role="img"
        aria-label={`${failureLabel}率 ${formatRiskRate(totalRuin, result.ruinCount)}。${segments
          .map(
            (segment) =>
              `${segment.full} ${formatRiskRate(segment.value, segment.count)}、${segment.count}シナリオ`,
          )
          .join("、")}`}
      >
        {segments.map((segment) => (
          <div
            key={segment.id}
            className={segment.color}
            style={{ width: `${segment.value * 100}%` }}
            title={`${segment.full} ${formatRiskRate(segment.value, segment.count)}（${segment.count.toLocaleString("ja-JP")}シナリオ）`}
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
            <strong className="type-body mt-0.5 block font-medium tabular-nums text-fg">
              {formatRiskRate(segment.value, segment.count)}
            </strong>
          </button>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: ReactNode; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="type-caption text-fg-muted">{label}</dt>
      <dd className="type-metric text-fg">{value}</dd>
    </div>
  );
}
