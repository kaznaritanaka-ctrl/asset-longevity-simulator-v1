import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AppHeader } from "@/components/fire/app-header";
import { AssetEditor } from "@/components/fire/asset-editor";
import { KpiHero } from "@/components/fire/kpi-hero";
import { PlanPanel } from "@/components/fire/plan-panel";
import { SegmentedControl } from "@/components/ui/segmented";
import { cn } from "@/lib/utils";
import { usePlanStore, consumeSkipAutoRun } from "@/store/plan-store";

const ResultsPanel = lazy(() =>
  import("@/components/fire/results-panel").then((m) => ({ default: m.ResultsPanel })),
);

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: (search: Record<string, unknown>) => ({
    p: typeof search.p === "string" ? search.p : undefined,
  }),
});

type Tab = "setup" | "results";
type DesktopLayout = "wide" | "stacked";

const LAYOUT_STORAGE_KEY = "shisan-jumyou-desktop-layout";

function Home() {
  const hydrate = usePlanStore((s) => s.hydrate);
  const hydrated = usePlanStore((s) => s.hydrated);
  const plan = usePlanStore((s) => s.plan);
  const run = usePlanStore((s) => s.run);
  const activated = usePlanStore((s) => s.activated);
  const result = usePlanStore((s) => s.result);
  const status = usePlanStore((s) => s.status);
  const fromShare = usePlanStore((s) => s.fromShare);
  const [tab, setTab] = useState<Tab>("setup");
  const [desktopLayout, setDesktopLayout] = useState<DesktopLayout>("wide");
  const planRef = useRef(plan);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (saved === "wide" || saved === "stacked") setDesktopLayout(saved);
    } catch {
      /* use the wide default */
    }
  }, []);

  useEffect(() => {
    if (!hydrated || !fromShare) return;
    setTab("results");
    run();
  }, [hydrated, fromShare, run]);

  useEffect(() => {
    if (!hydrated || !activated) {
      planRef.current = plan;
      return;
    }
    if (consumeSkipAutoRun()) {
      planRef.current = plan;
      return;
    }
    if (planRef.current === plan) return;
    planRef.current = plan;
    const id = window.setTimeout(() => run(), 280);
    return () => window.clearTimeout(id);
  }, [hydrated, plan, activated, run]);

  const showResults = tab === "results" || result != null || status === "running";

  const openResults = () => {
    setTab("results");
    if (status === "idle") run();
  };

  const runAndShowResults = () => {
    setTab("results");
    run();
  };

  const changeDesktopLayout = (layout: DesktopLayout) => {
    setDesktopLayout(layout);
    try {
      localStorage.setItem(LAYOUT_STORAGE_KEY, layout);
    } catch {
      /* keep the in-memory preference */
    }
  };

  const wide = desktopLayout === "wide";

  return (
    <div className="min-h-dvh overflow-x-clip bg-bg text-fg">
      <AppHeader />
      <main
        className={cn(
          "mx-auto w-full min-w-0 overflow-x-clip px-3 pb-28 pt-5 sm:px-4 md:px-6 md:pb-16 md:pt-8",
          wide ? "max-w-[1600px]" : "max-w-6xl",
        )}
      >
        <div
          className={cn(
            "grid w-full min-w-0 items-start gap-4 lg:gap-5",
            wide
              ? "lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] min-[1400px]:grid-cols-[440px_minmax(0,1fr)]"
              : "lg:grid-cols-12",
          )}
        >
          <div
            className={cn(
              "min-w-0",
              wide
                ? "lg:col-span-1 lg:col-start-2 lg:row-start-1"
                : "lg:col-span-8 lg:col-start-5 lg:row-start-1",
            )}
          >
            <KpiHero
              onRun={runAndShowResults}
              desktopControl={
                <div className="hidden items-center gap-2 lg:flex">
                  <span className="text-xs text-fg-subtle">PC表示</span>
                  <SegmentedControl
                    ariaLabel="PC画面のレイアウト"
                    className="w-[9rem]"
                    value={desktopLayout}
                    onChange={changeDesktopLayout}
                    options={[
                      { id: "wide", label: "横長" },
                      { id: "stacked", label: "縦長" },
                    ]}
                  />
                </div>
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-1 rounded-lg bg-bg-sunken p-1 lg:hidden">
            <TabButton active={tab === "setup"} onClick={() => setTab("setup")}>
              条件
            </TabButton>
            <TabButton active={tab === "results"} onClick={openResults}>
              結果
            </TabButton>
          </div>

          <div
            className={cn(
              tab === "setup" ? "block" : "hidden",
              "min-w-0 max-w-full lg:block",
              wide
                ? "lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:row-span-2"
                : "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:row-span-2",
            )}
          >
            <PlanPanel onRun={runAndShowResults} />
            <div className="mt-4 min-w-0">
              <AssetEditor />
            </div>
          </div>
          <div
            className={cn(
              tab === "results" ? "block" : "hidden",
              "min-w-0 max-w-full lg:block",
              wide
                ? "lg:col-span-1 lg:col-start-2 lg:row-start-2"
                : "lg:col-span-8 lg:col-start-5 lg:row-start-2",
            )}
          >
            {showResults ? (
              <Suspense fallback={<IdleResults running />}>
                <ResultsPanel wide={wide} />
              </Suspense>
            ) : (
              <IdleResults running={false} onRun={runAndShowResults} />
            )}
          </div>
        </div>

        <p className="mt-10 text-center text-xs leading-relaxed text-fg-subtle">
          金額の単位は万円。計算は端末内のみ。投資助言ではない。
        </p>
      </main>
    </div>
  );
}

function IdleResults({ running, onRun }: { running: boolean; onRun?: () => void }) {
  return (
    <div className="rounded-xl bg-surface px-5 py-10 text-sm text-fg-muted shadow-[var(--shadow-border)]">
      {running ? (
        <p>計算中です。</p>
      ) : (
        <div className="flex flex-col items-start gap-3">
          <p>条件を確認してから計算を開始する。初期表示では経路を回していない。</p>
          {onRun ? (
            <button
              type="button"
              onClick={onRun}
              className="h-10 rounded-md bg-accent px-4 text-sm font-medium text-accent-fg"
            >
              計算する
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "h-11 rounded-md text-sm font-medium transition-colors duration-150",
        active ? "bg-surface text-fg shadow-[var(--shadow-border)]" : "text-fg-muted",
      )}
    >
      {children}
    </button>
  );
}
