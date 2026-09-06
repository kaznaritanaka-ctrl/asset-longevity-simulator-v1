import { useEffect, useState, type ReactNode } from "react";
import { SegmentedControl } from "@/components/ui/segmented";
import { expectedDeathAge } from "@/lib/fire/life-table";
import type { Sex, StoryRole } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { FanChart, type ChartScale } from "./fan-chart";
import { ModelNotes } from "./model-notes";
import { PercentileTable } from "./percentile-table";
import { RuinStoryCard } from "./ruin-story";
import { RuinRiskSummary } from "./ruin-risk-summary";
import { SurvivalChart } from "./survival-chart";
import { usePlanStore } from "@/store/plan-store";

function ClientChart({ children, heightClass }: { children: ReactNode; heightClass: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className={`${heightClass} w-full min-w-0 rounded-lg bg-bg-sunken/70`} />;
  }
  return children;
}

export function ResultsPanel({ wide = false }: { wide?: boolean }) {
  const result = usePlanStore((s) => s.result);
  const status = usePlanStore((s) => s.status);
  const sex = usePlanStore((s) => (s.plan.sex === "female" ? "female" : "male"));
  const patchPlan = usePlanStore((s) => s.patchPlan);
  const [scale, setScale] = useState<ChartScale>("log");
  const [pathKind, setPathKind] = useState<StoryRole>("ruin");

  if (!result) {
    return (
      <div className="rounded-xl bg-surface px-5 py-10 text-sm text-fg-muted shadow-[var(--shadow-border)]">
        {status === "running" ? "計算中です。" : "まだ計算していません。再計算を押すと経路が出る。"}
      </div>
    );
  }

  const featured = pathKind === "median" ? result.medianStory : result.ruinStory;
  const deathAge = expectedDeathAge(result.currentAge, sex);

  return (
    <div className={cn("grid min-w-0 grid-cols-1 gap-4", wide && "xl:grid-cols-2")}>
      <div className="min-w-0">
        <RuinRiskSummary result={result} />
      </div>

      <section className="min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5">
        <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg text-fg">資産の経路</h2>
          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-fg-subtle sm:block">
              {scale === "log" ? "縦軸は対数" : "帯は25–75% · 点線は5%と95%"}
              {pathKind === "median" ? " · 緑線は中央値の一本" : " · 赤線は破綻の一本"}
            </p>
            <SegmentedControl
              ariaLabel="縦軸のスケール"
              value={scale}
              onChange={setScale}
              options={[
                { id: "log", label: "片対数" },
                { id: "linear", label: "線形" },
              ]}
            />
          </div>
        </header>
        <ClientChart heightClass={cn("h-64 sm:h-80", wide && "xl:h-56")}>
          <FanChart
            result={result}
            scale={scale}
            featured={featured}
            pathKind={pathKind}
            deathAge={deathAge}
          />
        </ClientChart>
      </section>

      <div className="min-w-0">
        <RuinStoryCard
          story={featured}
          pathKind={pathKind}
          onPathKindChange={setPathKind}
          fireAge={result.fireAge}
        />
      </div>

      <section className="min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5">
        <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="font-display text-lg text-fg">資産寿命と寿命の比較</h2>
            <p className="text-xs text-fg-muted">
              資産が持つ経路の割合と、生命表上でその年齢まで生きている割合
            </p>
          </div>
          <SegmentedControl
            ariaLabel="性別"
            className="w-[7.5rem]"
            value={sex}
            onChange={(v: Sex) => patchPlan({ sex: v })}
            options={[
              { id: "male", label: "男性" },
              { id: "female", label: "女性" },
            ]}
          />
        </header>
        <ClientChart heightClass="h-48 sm:h-56">
          <SurvivalChart result={result} />
        </ClientChart>
      </section>

      <section className="min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5">
        <header className="mb-3">
          <h2 className="font-display text-lg text-fg">分位表</h2>
        </header>
        <PercentileTable result={result} />
      </section>

      <div className="min-w-0">
        <ModelNotes />
      </div>
    </div>
  );
}
