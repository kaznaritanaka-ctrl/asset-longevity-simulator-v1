import { useEffect, useState, type ReactNode } from "react";
import { SegmentedControl } from "@/components/ui/segmented";
import { expectedDeathAge } from "@/lib/fire/life-table";
import type { RuinPeriod, Sex } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { FanChart, type ChartScale } from "./fan-chart";
import { RuinRiskSummary } from "./ruin-risk-summary";
import { RuinStoryCard } from "./ruin-story";
import { SurvivalChart } from "./survival-chart";
import { usePlanStore } from "@/store/plan-store";

function ClientChart({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="h-full min-h-40 w-full flex-1 rounded-lg bg-bg-sunken/70" />;
  }
  return <div className="h-full min-h-0 w-full flex-1">{children}</div>;
}

export function ResultsPanel() {
  const result = usePlanStore((s) => s.result);
  const status = usePlanStore((s) => s.status);
  const sex = usePlanStore((s) => (s.plan.sex === "female" ? "female" : "male"));
  const patchPlan = usePlanStore((s) => s.patchPlan);
  const [scale, setScale] = useState<ChartScale>("log");
  const [selectedPeriod, setSelectedPeriod] = useState<RuinPeriod>("throughAge80");

  if (!result) {
    return (
      <div className="flex min-h-0 flex-1 items-center rounded-xl bg-surface px-5 py-10 text-sm text-fg-muted shadow-[var(--shadow-border)]">
        {status === "running" ? "計算中です。" : "まだ計算していません。再計算を押すとシナリオが出る。"}
      </div>
    );
  }

  const firstAvailablePeriod = (
    ["throughAge80", "age81To100", "afterAge100", "survived"] as const
  ).find((period) => result.periodStories[period]);
  const activePeriod = result.periodStories[selectedPeriod]
    ? selectedPeriod
    : (firstAvailablePeriod ?? "survived");
  const featured = result.periodStories[activePeriod];
  const pathKind = featured?.role ?? "ruin";
  const deathAge = expectedDeathAge(result.currentAge, sex);
  const storyHeading =
    activePeriod === "survived"
      ? `${result.endAge}歳まで生存の代表シナリオ`
      : activePeriod === "throughAge80"
        ? "80歳までに資産枯渇の代表シナリオ"
        : activePeriod === "age81To100"
          ? "81〜100歳で資産枯渇の代表シナリオ"
          : "101歳以降に資産枯渇の代表シナリオ";

  return (
    <div className="grid grid-cols-1 gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-2 lg:grid-rows-2">
      <Quad>
        <RuinRiskSummary
          result={result}
          selected={activePeriod}
          onSelect={setSelectedPeriod}
        />
      </Quad>

      <Quad>
        <RuinStoryCard
          story={featured}
          fireAge={result.fireAge}
          compact
          heading={storyHeading}
          scale={scale}
          onScaleChange={setScale}
        />
      </Quad>

      <Quad
        title="資産の推移"
        fill
        action={
          <SegmentedControl
            ariaLabel="縦軸のスケール"
            value={scale}
            onChange={setScale}
            options={[
              { id: "log", label: "片対数" },
              { id: "linear", label: "線形" },
            ]}
          />
        }
      >
        <ClientChart>
          <FanChart
            result={result}
            scale={scale}
            featured={featured}
            pathKind={pathKind}
            deathAge={deathAge}
            fill
          />
        </ClientChart>
      </Quad>

      <Quad
        title="資産寿命と生命寿命の比較"
        fill
        action={

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
        }
      >
        <ClientChart>
          <SurvivalChart result={result} compact />
        </ClientChart>
      </Quad>
    </div>
  );
}

function Quad({
  title,
  action,
  fill = false,
  children,
}: {
  title?: string;
  action?: ReactNode;
  fill?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-3.5 lg:min-h-0",
        fill && "min-h-[18rem]",
      )}
    >
      {title ? (
        <header className="mb-2 flex shrink-0 items-center justify-between gap-2">
          <h2 className="type-title min-w-0 text-fg">{title}</h2>
          {action}
        </header>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </section>
  );
}
