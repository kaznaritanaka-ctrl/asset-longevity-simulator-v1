import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatAge, formatInt, formatManYen, formatPct } from "@/lib/fire/format";
import type { RuinStory } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";

function signedPct(decimal: number | null, digits = 1): string {
  if (decimal == null || !Number.isFinite(decimal)) return "—";
  const body = formatPct(Math.abs(decimal), digits);
  return `${decimal < 0 ? "−" : "+"}${body}`;
}

function balanceDrawdownPct(decimal: number, excludesDepletionYear: boolean): string {
  if (excludesDepletionYear && decimal > -1 && decimal <= -0.9995) return "−99.9%超";
  return formatPct(decimal, excludesDepletionYear ? 1 : 0);
}

export function RuinStoryCard({
  story,
  fireAge,
  embedded = false,
  compact = false,
  heading = "代表シナリオ",
}: {
  story: RuinStory | null;
  fireAge: number;
  embedded?: boolean;
  compact?: boolean;
  heading?: string;
}) {
  const drawAnotherStory = usePlanStore((s) => s.drawAnotherStory);

  if (!story) {
    return (
      <div className="flex min-h-0 flex-1 items-center text-sm text-fg-muted">
        この区分に該当するシナリオはありません。
      </div>
    );
  }

  const isMedian = story.role === "median";
  const canDrawAnother = !isMedian && story.ruinCount > 1;
  const excludedDepletionYear = !isMedian && story.ruined && story.terminal <= 0;

  const headline = isMedian
    ? `${formatAge(story.years.at(-1)?.age ?? story.ruinAge)}で${formatManYen(story.terminal)}`
    : story.ruined
      ? story.terminal <= 0
        ? `${formatAge(story.ruinAge)}で折れた`
        : `${formatAge(story.ruinAge)}時点で${formatManYen(story.terminal)}`
      : `${formatAge(story.years.at(-1)?.age ?? story.ruinAge)}まで持った`;

  return (
    <section
      className={cn(
        "flex min-h-0 min-w-0 max-w-full flex-1 flex-col",
        !compact && !embedded && "rounded-xl p-3.5 shadow-[var(--shadow-border)] sm:p-5",
        !compact && !embedded && (isMedian ? "bg-surface" : story.ruined ? "bg-ruin-soft" : "bg-surface"),
        !compact && embedded && "mt-5 border-t border-border pt-4",
      )}
    >
      <header className="flex shrink-0 items-center justify-between gap-3">
        <h3 className="type-title text-fg">{heading}</h3>
        {canDrawAnother ? (
          <Button type="button" variant="secondary" size="sm" className="shrink-0 text-xs" onClick={drawAnotherStory}>
            別の資産枯渇シナリオを見る
          </Button>
        ) : null}
      </header>

      <p className="type-metric mt-1.5 shrink-0 text-fg">
        {headline}
      </p>
      <p
        className={cn(
          "mt-1.5 shrink-0 text-sm leading-relaxed text-fg",
          compact && "line-clamp-2 text-xs text-fg-muted",
        )}
      >
        {story.narrative}
      </p>

      <Spark story={story} fireAge={fireAge} isMedian={isMedian} fill={compact} />

      <dl
        className={cn(
          "mt-2 shrink-0 grid gap-x-3 gap-y-2",
          compact ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-3",
        )}
      >
        {isMedian ? (
          <Metric label="終価" value={formatManYen(story.terminal)} compact={compact} />
        ) : (
          <Metric
            label="枯渇年齢"
            value={story.ruined ? formatAge(story.ruinAge) : "—"}
            compact={compact}
          />
        )}
        <Metric label={isMedian ? "期間" : "枯渇まで"} value={`${story.yearsToRuin}年`} compact={compact} />
        <Metric
          label={excludedDepletionYear ? (compact ? "枯渇前年DD" : "枯渇年を除く残高最大減少") : compact ? "最大DD" : "入出金込みの残高最大減少"}
          value={balanceDrawdownPct(story.maxDrawdown, excludedDepletionYear)}
          warn={story.maxDrawdown <= -0.3}
          compact={compact}
        />
        <Metric
          label="最悪年"
          value={
            story.worstAge != null
              ? `${signedPct(story.worstYear, 0)}（${formatAge(story.worstAge)}）`
              : signedPct(story.worstYear, 0)
          }
          warn={story.worstYear <= -0.2}
          compact={compact}
        />
        {compact ? null : (
          <>
            <Metric
              label="運用だけの最大下落"
              value={formatPct(story.marketMaxDrawdown, 0)}
              warn={story.marketMaxDrawdown <= -0.3}
            />
            <Metric
              label="FIRE後10年の実質CAGR"
              value={signedPct(story.fire10yCagr)}
              warn={(story.fire10yCagr ?? 0) < 0}
            />
            <Metric
              label={isMedian ? "終盤5年の平均リターン" : "枯渇直前5年の平均リターン"}
              value={signedPct(story.preRuin5yAvg)}
            />
            <Metric label="累計取り崩し額" value={formatManYen(story.cumulativeWithdrawal)} />
            <Metric label="累計税負担" value={formatManYen(story.cumulativeTax)} />
          </>
        )}
      </dl>
    </section>
  );
}

function Metric({
  label,
  value,
  warn,
  compact,
}: {
  label: string;
  value: string;
  warn?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="type-caption leading-snug break-words text-fg-muted">{label}</dt>
      <dd
        className={cn(
          "mt-0.5 font-display text-lg tabular-nums tracking-tight",
          warn ? "text-ruin" : "text-fg",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function Spark({
  story,
  fireAge,
  isMedian,
  fill,
}: {
  story: RuinStory;
  fireAge: number;
  isMedian: boolean;
  fill?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const vals = story.years.map((y) => y.wealth);
  const n = vals.length;
  if (n < 2) return null;
  const max = Math.max(...vals, 1);
  const w = 640;
  const h = fill ? 160 : 72;
  const pad = 4;
  const x = (i: number) => (i / (n - 1)) * w;
  const y = (v: number) => pad + (1 - v / max) * (h - pad * 2);
  const d = vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const fireI = story.years.findIndex((yr) => yr.age >= fireAge);
  const ruinI = story.years.findIndex((yr) => yr.age >= story.ruinAge);
  const stroke = isMedian ? "var(--color-median)" : "var(--color-ruin)";
  const startWealth = vals[0] ?? 0;
  const startLineY = y(startWealth);
  const activeYear = activeIndex == null ? null : story.years[activeIndex];
  const activeX = activeIndex == null ? 0 : x(activeIndex);
  const activeY = activeYear ? y(activeYear.wealth) : 0;
  const activeXPercent = (activeX / w) * 100;
  const activeYPercent = (activeY / h) * 100;
  const timingLabel = activeYear
    ? activeYear.age < fireAge
      ? `FIREまで${formatInt(fireAge - activeYear.age)}年`
      : activeYear.age === fireAge
        ? "FIRE開始年"
        : `FIRE後${formatInt(activeYear.age - fireAge)}年`
    : "";
  const pointLabel = activeYear
    ? `${formatAge(activeYear.age)}（${timingLabel}）、資産額${formatManYen(activeYear.wealth)}`
    : "";

  const selectNearestYear = (clientX: number, element: SVGSVGElement) => {
    const rect = element.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setActiveIndex(Math.round(ratio * (n - 1)));
  };

  return (
    <div className={cn("relative min-h-0 w-full", fill ? "mt-2 flex-1" : "mt-4 h-16")}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio={fill ? "none" : "xMidYMid meet"}
        className="h-full w-full cursor-crosshair touch-pan-y overflow-visible rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        role="img"
        tabIndex={0}
        aria-label="このシナリオの資産の推移。マウスを動かすか、左右の矢印キーで年齢ごとの資産額を確認できます。"
        onPointerMove={(event) => {
          if (event.pointerType !== "touch") selectNearestYear(event.clientX, event.currentTarget);
        }}
        onPointerDown={(event) => {
          event.currentTarget.focus();
          selectNearestYear(event.clientX, event.currentTarget);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "touch") setActiveIndex(null);
        }}
        onFocus={() => setActiveIndex((current) => current ?? 0)}
        onBlur={() => setActiveIndex(null)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          const direction = event.key === "ArrowRight" ? 1 : -1;
          setActiveIndex((current) => Math.max(0, Math.min(n - 1, (current ?? 0) + direction)));
        }}
      >
        <line
          x1={0}
          x2={w}
          y1={startLineY}
          y2={startLineY}
          stroke="var(--color-border-strong)"
          strokeDasharray="2 4"
          strokeWidth="1"
        />
        {fireI >= 0 ? (
          <line
            x1={x(fireI)}
            x2={x(fireI)}
            y1={0}
            y2={h}
            stroke="var(--color-fire)"
            strokeDasharray="3 3"
            strokeWidth="1"
          />
        ) : null}
        <path d={d} fill="none" stroke={stroke} strokeWidth="2.4" strokeLinejoin="round" />
        {!isMedian && story.ruined && ruinI >= 0 ? (
          <circle cx={x(ruinI)} cy={y(vals[ruinI] ?? 0)} r="5" fill="var(--color-ruin)" />
        ) : null}
        {activeYear ? (
          <>
            <line
              x1={activeX}
              x2={activeX}
              y1={0}
              y2={h}
              stroke="var(--color-fg-subtle)"
              strokeDasharray="2 3"
              strokeWidth="1"
            />
            <circle
              cx={activeX}
              cy={activeY}
              r="5"
              fill="var(--color-surface)"
              stroke={stroke}
              strokeWidth="2"
            />
          </>
        ) : null}
      </svg>

      {activeYear ? (
        <div
          className={cn(
            "pointer-events-none absolute z-10 w-max max-w-48 rounded-lg bg-fg px-2.5 py-2 text-xs leading-snug text-surface shadow-lg",
            activeXPercent > 72
              ? "-translate-x-full"
              : activeXPercent >= 28
                ? "-translate-x-1/2"
                : "",
            activeYPercent < 40 ? "mt-2" : "-mt-2 -translate-y-full",
          )}
          style={{ left: `${activeXPercent}%`, top: `${activeYPercent}%` }}
          aria-hidden="true"
        >
          <span className="block font-medium">
            {formatAge(activeYear.age)}（{timingLabel}）
          </span>
          <span className="mt-0.5 block tabular-nums">資産額 {formatManYen(activeYear.wealth)}</span>
        </div>
      ) : null}
      <output className="sr-only" aria-live="polite">
        {pointLabel}
      </output>
    </div>
  );
}
