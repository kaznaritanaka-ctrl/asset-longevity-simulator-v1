import { useEffect, useState, type ReactNode } from "react";
import { SegmentedControl } from "@/components/ui/segmented";
import { expectedDeathAge } from "@/lib/fire/life-table";
import type { RuinPeriod, Sex } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { FanChart, type ChartScale } from "./fan-chart";
import { ModelNotes } from "./model-notes";
import { RuinRiskSummary } from "./ruin-risk-summary";
import { SurvivalChart } from "./survival-chart";
import { usePlanStore } from "@/store/plan-store";

type MobileResultTab = "risk" | "assets" | "life";

const MOBILE_RESULT_TABS: ReadonlyArray<{ id: MobileResultTab; label: string }> = [
  { id: "risk", label: "破綻リスク" },
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
  heightClass,
  active = true,
}: {
  children: ReactNode;
  heightClass: string;
  active?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !active) {
    return <div className={`${heightClass} w-full min-w-0 rounded-lg bg-bg-sunken/70`} />;
  }
  return children;
}

export function ResultsPanel({ wide = false }: { wide?: boolean }) {
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
      <div className="rounded-xl bg-surface px-5 py-10 text-sm text-fg-muted shadow-[var(--shadow-border)]">
        {status === "running" ? "計算中です。" : "まだ計算していません。再計算を押すと経路が出る。"}
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

  return (
    <div className={cn("grid min-w-0 grid-cols-1 gap-4", wide && "xl:grid-cols-2")}>
      <div
        className="sticky top-0 z-30 grid grid-cols-3 gap-1 self-start rounded-lg bg-bg-sunken p-1 shadow-[var(--shadow-border)] lg:hidden"
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

      <div
        id="mobile-result-panel-risk"
        className={cn("min-w-0 lg:block", mobileTab === "risk" ? "block" : "hidden")}
      >
        <RuinRiskSummary result={result} selected={activePeriod} onSelect={setSelectedPeriod} />
      </div>

      <section
        id="mobile-result-panel-assets"
        className={cn(
          "min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5 lg:block",
          mobileTab === "assets" ? "block" : "hidden",
        )}
      >
        <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg text-fg">資産の経路</h2>
          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-fg-subtle sm:block">
              {scale === "log" ? "縦軸は対数" : "帯は25–75% · 点線は5%と95%"}
              {pathKind === "median"
                ? " · 緑線は中央値の一本"
                : ` · 赤線は${result.failureMode === "depletion" ? "資産枯渇" : "条件抵触"}の一本`}
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
        <ClientChart
          heightClass={cn("h-64 sm:h-80", wide && "xl:h-56")}
          active={desktopResultsLayout || mobileTab === "assets"}
        >
          <FanChart
            result={result}
            scale={scale}
            featured={featured}
            pathKind={pathKind}
            deathAge={deathAge}
          />
        </ClientChart>
      </section>

      <section
        id="mobile-result-panel-life"
        className={cn(
          "min-w-0 rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5 lg:block",
          mobileTab === "life" ? "block" : "hidden",
        )}
      >
        <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="font-display text-lg text-fg">資産寿命と寿命の比較</h2>
            <p className="text-xs text-fg-muted">
              同じ{result.endAge}歳時点の
              {result.failureMode === "depletion" ? "資産維持率" : "計画達成率"}
              と、生命表上の条件付き生存率
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
        <ClientChart
          heightClass="h-48 sm:h-56"
          active={desktopResultsLayout || mobileTab === "life"}
        >
          <SurvivalChart result={result} />
        </ClientChart>
      </section>

      <div className={cn("min-w-0 lg:block", mobileTab === "life" ? "block" : "hidden")}>
        <ModelNotes />
      </div>
    </div>
  );
}
