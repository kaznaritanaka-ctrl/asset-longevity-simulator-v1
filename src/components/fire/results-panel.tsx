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

type MobileResultTab = "risk" | "assets" | "life";

const MOBILE_RESULT_TABS: ReadonlyArray<{ id: MobileResultTab; label: string }> = [
  { id: "risk", label: "生存率" },
  { id: "assets", label: "資産推移" },
  { id: "life", label: "寿命比較" },
];

function useDesktopResultsLayout(): boolean {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return desktop;
}

function ClientChart({
  children,
  active = true,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !active) {
    return <div className="h-full min-h-40 w-full flex-1 rounded-lg bg-bg-sunken/70" />;
  }
  return <div className="h-full min-h-0 w-full flex-1">{children}</div>;
}

export function ResultsPanel() {
  const result = usePlanStore((s) => s.result);
  const status = usePlanStore((s) => s.status);
  const sex = usePlanStore((s) => (s.plan.sex === "female" ? "female" : "male"));
  const patchPlan = usePlanStore((s) => s.patchPlan);
  const desktopResultsLayout = useDesktopResultsLayout();
  const [scale, setScale] = useState<ChartScale>("log");
  const [selectedPeriod, setSelectedPeriod] = useState<RuinPeriod>("throughAge80");
  const [mobileTab, setMobileTab] = useState<MobileResultTab>("risk");

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
  const showRisk = desktopResultsLayout || mobileTab === "risk";
  const showAssets = desktopResultsLayout || mobileTab === "assets";
  const showLife = desktopResultsLayout || mobileTab === "life";

  return (
    <div className="flex min-w-0 flex-col gap-3 lg:min-h-0 lg:flex-1">
      <div
        className="grid grid-cols-3 gap-1 rounded-lg bg-bg-sunken p-1 lg:hidden"
        role="tablist"
        aria-label="結果の表示内容"
      >
        {MOBILE_RESULT_TABS.map((tab, index) => (
          <button
            key={tab.id}
            id={`mobile-result-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={mobileTab === tab.id}
            aria-controls={`mobile-result-panel-${tab.id}`}
            tabIndex={mobileTab === tab.id ? 0 : -1}
            onClick={() => setMobileTab(tab.id)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              const direction = event.key === "ArrowRight" ? 1 : -1;
              const nextIndex =
                (index + direction + MOBILE_RESULT_TABS.length) % MOBILE_RESULT_TABS.length;
              const nextTab = MOBILE_RESULT_TABS[nextIndex]!;
              setMobileTab(nextTab.id);
              document.getElementById(`mobile-result-tab-${nextTab.id}`)?.focus();
            }}
            className={cn(
              "h-11 min-w-0 rounded-md px-2 text-sm font-medium transition-[background-color,color,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              mobileTab === tab.id
                ? "bg-surface text-fg shadow-[var(--shadow-border)]"
                : "text-fg-muted hover:text-fg",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-2 lg:grid-rows-2">
        <Quad
          id="mobile-result-panel-risk"
          visible={showRisk}
        >
          <RuinRiskSummary
            result={result}
            selected={activePeriod}
            onSelect={setSelectedPeriod}
          />
        </Quad>

        <Quad visible={showRisk}>
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
          id="mobile-result-panel-assets"
          title="資産の推移"
          fill
          visible={showAssets}
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
          <ClientChart active={showAssets}>
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
          id="mobile-result-panel-life"
          title="資産寿命と生命寿命の比較"
          fill
          visible={showLife}
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
          <ClientChart active={showLife}>
            <SurvivalChart result={result} compact />
          </ClientChart>
        </Quad>
      </div>
    </div>
  );
}

function Quad({
  id,
  title,
  action,
  fill = false,
  visible = true,
  children,
}: {
  id?: string;
  title?: string;
  action?: ReactNode;
  fill?: boolean;
  visible?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "flex-col overflow-hidden rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-3.5 lg:min-h-0",
        visible ? "flex" : "hidden lg:flex",
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
