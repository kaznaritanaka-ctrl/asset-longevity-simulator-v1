import { formatInt, formatManYen, formatPct } from "@/lib/fire/format";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";
import { AgeSlider } from "./age-slider";
import { ShareButtons } from "./share-buttons";

export function KpiHero() {
  const result = usePlanStore((s) => s.result);
  const status = usePlanStore((s) => s.status);

  const rate = result?.successRate ?? null;
  const tone =
    rate == null ? "mid" : rate >= 0.95 ? "survive" : rate >= 0.8 ? "mid" : "ruin";

  return (
    <section className="rise-in min-w-0 rounded-xl bg-surface px-4 py-5 shadow-[var(--shadow-border)] sm:px-5 sm:py-6 md:px-8 md:py-7">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="text-[11px] font-medium tracking-[0.16em] text-fg-subtle uppercase">
          生存率{result ? ` · ${formatInt(result.trials)}経路` : ""}
        </p>
        <ShareButtons />
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p
            className={cn(
              "font-display text-4xl leading-none tracking-tight tabular-nums sm:text-5xl md:text-6xl",
              tone === "survive" && "text-survive",
              tone === "mid" && "text-fg",
              tone === "ruin" && "text-ruin",
            )}
          >
            {rate == null ? "—" : formatPct(rate, 1)}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
            {result
              ? `${formatInt(result.trials)}回のうち破綻は ${formatInt(result.ruinCount)}回。${
                  result.medianRuinAge != null
                    ? ` 破綻した経路の中央年齢は ${Math.round(result.medianRuinAge)}歳。`
                    : " この条件では破綻経路が出ていない。"
                }`
              : status === "running"
                ? "計算中です。"
                : "条件を確認してから、再計算で経路を回す。"}
          </p>
        </div>
        {result ? (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 sm:gap-x-8">
            <Stat label={`${result.endAge}歳 中央値`} value={formatManYen(result.terminal.p50)} />
            <Stat label="下位5%" value={formatManYen(result.terminal.p5)} />
            <Stat
              label="生存経路の中央"
              value={
                result.terminal.survivorMedian != null
                  ? formatManYen(result.terminal.survivorMedian)
                  : "—"
              }
            />
          </dl>
        ) : null}
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <AgeSlider />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] text-fg-subtle">{label}</dt>
      <dd className="font-display text-xl tabular-nums tracking-tight text-fg">{value}</dd>
    </div>
  );
}
