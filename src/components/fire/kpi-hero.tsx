import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { formatInt, formatManYen, formatPct } from "@/lib/fire/format";
import { isAssetDepletionOnly, wilsonInterval } from "@/lib/fire/risk-breakdown";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";
import { AgeSlider } from "./age-slider";
import { ShareButtons } from "./share-buttons";

export function KpiHero({
  desktopControl,
  onRun,
}: {
  desktopControl?: ReactNode;
  onRun?: () => void;
}) {
  const result = usePlanStore((s) => s.result);
  const status = usePlanStore((s) => s.status);
  const resultStale = usePlanStore((s) => s.resultStale);
  const error = usePlanStore((s) => s.error);
  const validationIssues = usePlanStore((s) => s.validationIssues);
  const plan = usePlanStore((s) => s.plan);
  const fromShare = usePlanStore((s) => s.fromShare);
  const saveSharedPlan = usePlanStore((s) => s.saveSharedPlan);
  const restorePreviousPlan = usePlanStore((s) => s.restorePreviousPlan);

  const rate = result?.successRate ?? null;
  const depletionOnly = result
    ? result.failureMode === "depletion"
    : isAssetDepletionOnly(plan.ruinRules);
  const successLabel = depletionOnly
    ? `${result?.endAge ?? plan.endAge}歳まで資産が持つ割合`
    : "計画達成率";
  const failureLabel = depletionOnly ? "資産枯渇" : "条件抵触";
  const confidence = result && result.trials > 0
    ? wilsonInterval(result.trials - result.ruinCount, result.trials)
    : null;
  const tone = rate == null ? "mid" : rate >= 0.95 ? "survive" : rate >= 0.8 ? "mid" : "ruin";

  return (
    <section className="rise-in min-w-0 rounded-xl bg-surface px-4 py-5 shadow-[var(--shadow-border)] sm:px-5 sm:py-6 md:px-8 md:py-7">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="text-[11px] font-medium tracking-[0.16em] text-fg-subtle uppercase">
          {successLabel}
          {result ? (resultStale ? " · 前回結果" : ` · ${formatInt(result.trials)}経路`) : ""}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {desktopControl}
          <ShareButtons />
        </div>
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
              ? `この前提で${formatInt(result.trials)}回試算し、${failureLabel}は ${formatInt(result.ruinCount)}回。${
                  result.medianRuinAge != null
                    ? ` ${failureLabel}した経路の中央年齢は ${Math.round(result.medianRuinAge)}歳。`
                    : ` この条件では${failureLabel}した経路が出ていない。`
                }`
              : status === "running"
                ? "計算中です。"
                : "条件を確認してから、再計算で経路を回す。"}
          </p>
          {confidence ? (
            <p className="mt-1 text-xs tabular-nums text-fg-subtle">
              試行誤差の目安（95%区間） {formatPct(confidence[0], 1)}〜
              {formatPct(confidence[1], 1)}。将来予測そのものの確実性ではありません。
            </p>
          ) : null}
        </div>
        {result ? (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 sm:gap-x-8">
            <Stat
              label={`${result.endAge}歳 中央値（現在価値）`}
              value={formatManYen(result.terminal.p50)}
            />
            <Stat label="下振れケース（下位5%）" value={formatManYen(result.terminal.p5)} />
            <Stat
              label={depletionOnly ? "資産維持経路の中央" : "計画達成経路の中央"}
              value={
                result.terminal.survivorMedian != null
                  ? formatManYen(result.terminal.survivorMedian)
                  : "—"
              }
            />
          </dl>
        ) : null}
      </div>

      {error || validationIssues.length > 0 ? (
        <div
          role="alert"
          className="mt-5 rounded-lg bg-ruin-soft px-4 py-3 text-sm leading-relaxed text-ruin"
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

      {fromShare ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-fire-soft px-4 py-3 text-xs leading-relaxed text-fg-muted">
          <p>共有された金融条件を一時表示中です。端末に保存されている元の条件は変更していません。</p>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={restorePreviousPlan}>
              元の条件に戻す
            </Button>
            <Button type="button" size="sm" onClick={saveSharedPlan}>
              この条件を保存
            </Button>
          </div>
        </div>
      ) : null}

      {result && resultStale && !error ? (
        <div className="mt-5 rounded-lg bg-fire-soft px-4 py-3 text-xs leading-relaxed text-fg-muted">
          {status === "running"
            ? "新しい条件を計算中です。現在表示している数値とグラフは前回の結果です。"
            : "条件が変更されています。現在表示している数値とグラフは前回の結果です。"}
        </div>
      ) : null}

      <div className="mt-6 border-t border-border pt-5 lg:hidden">
        <AgeSlider onRun={onRun} />
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
