import { formatManYen, formatPct } from "@/lib/fire/format";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";
import { AgeSlider } from "./age-slider";
import { ShareButtons } from "./share-buttons";

export function KpiHero() {
  const result = usePlanStore((s) => s.result);
  const status = usePlanStore((s) => s.status);
  const resultStale = usePlanStore((s) => s.resultStale);
  const error = usePlanStore((s) => s.error);
  const validationIssues = usePlanStore((s) => s.validationIssues);

  const rate = result?.successRate ?? null;
  const tone = rate == null ? "mid" : rate >= 0.95 ? "survive" : rate >= 0.8 ? "mid" : "ruin";

  return (
    <section className="rise-in shrink-0 min-w-0 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)] sm:px-5 lg:py-2.5">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <div className="flex min-w-0 items-baseline gap-3">
          <p className="type-caption font-medium tracking-[0.16em] text-fg-subtle uppercase">
            生存率
            {result ? (resultStale ? " · 前回" : "") : ""}
          </p>
          <p
            className={cn(
              "type-hero",
              tone === "survive" && "text-survive",
              tone === "mid" && "text-fg",
              tone === "ruin" && "text-ruin",
            )}
          >
            {rate == null ? "—" : formatPct(rate, 1)}
          </p>
        </div>
        {result ? (
          <dl className="flex min-w-0 flex-wrap items-end gap-x-5 gap-y-1">
            <Stat label={`${result.endAge}歳 中央値`} value={formatManYen(result.terminal.p50)} />
            <Stat label="下位5%" value={formatManYen(result.terminal.p5)} />
            <Stat
              label="生存シナリオの中央"
              value={
                result.terminal.survivorMedian != null
                  ? formatManYen(result.terminal.survivorMedian)
                  : "—"
              }
            />
          </dl>
        ) : (
          <p className="text-sm text-fg-muted">
            {status === "running" ? "計算中です。" : "条件を確認してから、再計算でシナリオを回す。"}
          </p>
        )}
        <div className="ml-auto shrink-0">
          <ShareButtons />
        </div>
      </div>

      {error || validationIssues.length > 0 ? (
        <div
          role="alert"
          className="mt-2 rounded-lg bg-ruin-soft px-3 py-2 text-sm leading-relaxed text-ruin"
        >
          <p className="font-medium">{error ?? "入力条件を確認してください。"}</p>
          {validationIssues.length > 0 ? (
            <ul className="mt-1 list-disc pl-5 text-xs">
              {validationIssues.slice(0, 4).map((issue) => (
                <li key={`${issue.field}:${issue.message}`}>{issue.message}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {result && resultStale && !error ? (
        <p className="mt-2 text-xs text-fg-muted">
          {status === "running" ? "新しい条件を計算中。表示は前回結果。" : "条件が変わっています。表示は前回結果。"}
        </p>
      ) : null}

      <div className="mt-4 border-t border-border pt-4 lg:hidden">
        <AgeSlider />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="type-caption text-fg-subtle">{label}</dt>
      <dd className="type-metric text-fg">{value}</dd>
    </div>
  );
}
