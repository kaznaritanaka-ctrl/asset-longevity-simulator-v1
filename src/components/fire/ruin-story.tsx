import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented";
import { formatAge, formatManYen, formatPct } from "@/lib/fire/format";
import type { RuinStory, StoryRole } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";

function signedPct(decimal: number | null, digits = 1): string {
  if (decimal == null || !Number.isFinite(decimal)) return "—";
  const body = formatPct(Math.abs(decimal), digits);
  return `${decimal < 0 ? "−" : "+"}${body}`;
}

export function RuinStoryCard({
  story,
  pathKind,
  onPathKindChange,
  fireAge,
}: {
  story: RuinStory | null;
  pathKind: StoryRole;
  onPathKindChange: (k: StoryRole) => void;
  fireAge: number;
}) {
  const drawAnotherStory = usePlanStore((s) => s.drawAnotherStory);

  if (!story) return null;

  const isMedian = pathKind === "median";
  const canDrawAnother = !isMedian && story.ruinCount > 1;

  return (
    <section
      className={cn(
        "min-w-0 max-w-full rounded-xl p-3.5 shadow-[var(--shadow-border)] sm:p-5 md:p-6",
        isMedian ? "bg-surface" : story.ruined ? "bg-ruin-soft" : "bg-surface",
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg text-fg">シナリオ別表示</h2>
        <div className="shrink-0">
          <SegmentedControl
            ariaLabel="シナリオ"
            value={pathKind}
            onChange={onPathKindChange}
            options={[
              { id: "ruin", label: "破綻" },
              { id: "median", label: "中央値" },
            ]}
          />
        </div>
      </header>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
        <p className="font-display text-2xl text-fg">
          {isMedian
            ? `${formatAge(story.years.at(-1)?.age ?? story.ruinAge)}で${formatManYen(story.terminal)}`
            : story.ruined
              ? story.terminal <= 0
                ? `${formatAge(story.ruinAge)}で折れた`
                : `${formatAge(story.ruinAge)}時点で${formatManYen(story.terminal)}`
              : `${formatAge(story.years.at(-1)?.age ?? story.ruinAge)}まで持った`}
        </p>
        {canDrawAnother ? (
          <Button type="button" variant="secondary" size="sm" onClick={drawAnotherStory}>
            別の破綻を見る
          </Button>
        ) : null}
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg">{story.narrative}</p>

      <Spark story={story} fireAge={fireAge} isMedian={isMedian} />

      <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4 sm:gap-x-4">
        {isMedian ? (
          <Metric label="終価" value={formatManYen(story.terminal)} />
        ) : (
          <Metric label="破綻年齢" value={story.ruined ? formatAge(story.ruinAge) : "—"} />
        )}
        <Metric label={isMedian ? "期間" : "破綻まで"} value={`${story.yearsToRuin}年`} />
        <Metric
          label="最大ドローダウン"
          value={formatPct(story.maxDrawdown, 0)}
          warn={story.maxDrawdown <= -0.3}
        />
        <Metric
          label="FIRE後10年の実質CAGR"
          value={signedPct(story.fire10yCagr)}
          warn={(story.fire10yCagr ?? 0) < 0}
        />
        <Metric
          label="最悪年"
          value={
            story.worstAge != null
              ? `${signedPct(story.worstYear, 0)}（${formatAge(story.worstAge)}）`
              : signedPct(story.worstYear, 0)
          }
          warn={story.worstYear <= -0.2}
        />
        <Metric
          label={isMedian ? "終盤5年の平均リターン" : "破綻直前5年の平均リターン"}
          value={signedPct(story.preRuin5yAvg)}
        />
        <Metric label="累計取り崩し額" value={formatManYen(story.cumulativeWithdrawal)} />
        <Metric label="累計税負担" value={formatManYen(story.cumulativeTax)} />
      </dl>
    </section>
  );
}

function Metric({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] leading-snug break-words text-fg-subtle">{label}</dt>
      <dd
        className={cn(
          "mt-0.5 font-display text-base tabular-nums tracking-tight sm:text-lg",
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
}: {
  story: RuinStory;
  fireAge: number;
  isMedian: boolean;
}) {
  const vals = story.years.map((y) => y.wealth);
  const n = vals.length;
  if (n < 2) return null;
  const max = Math.max(...vals, 1);
  const w = 640;
  const h = 72;
  const pad = 2;
  const x = (i: number) => (i / (n - 1)) * w;
  const y = (v: number) => pad + (1 - v / max) * (h - pad * 2);
  const d = vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const fireI = story.years.findIndex((yr) => yr.age >= fireAge);
  const ruinI = story.years.findIndex((yr) => yr.age >= story.ruinAge);
  const stroke = isMedian ? "var(--color-median)" : "var(--color-ruin)";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-4 h-16 w-full max-w-full overflow-visible"
      role="img"
      aria-label="この経路の資産の推移"
    >
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
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      {!isMedian && story.ruined && ruinI >= 0 ? (
        <circle cx={x(ruinI)} cy={y(vals[ruinI] ?? 0)} r="4" fill="var(--color-ruin)" />
      ) : null}
    </svg>
  );
}
