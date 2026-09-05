import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AppHeader } from "@/components/fire/app-header";
import { AssetEditor } from "@/components/fire/asset-editor";
import { KpiHero } from "@/components/fire/kpi-hero";
import { PlanPanel } from "@/components/fire/plan-panel";
import { RuinEditor } from "@/components/fire/ruin-editor";
import { SourceCard } from "@/components/fire/source-card";
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
  const planRef = useRef(plan);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

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

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-fg">
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl min-w-0 overflow-x-hidden px-3 pb-28 pt-5 sm:px-4 md:px-6 md:pb-16 md:pt-8">
        <KpiHero />

        <div className="mt-4 grid grid-cols-2 gap-1 rounded-lg bg-bg-sunken p-1 lg:hidden">
          <TabButton active={tab === "setup"} onClick={() => setTab("setup")}>
            条件
          </TabButton>
          <TabButton active={tab === "results"} onClick={openResults}>
            結果
          </TabButton>
        </div>

        <div className="mt-5 grid w-full min-w-0 items-start gap-5 lg:grid-cols-12 lg:gap-6">
          <div className={cn(tab === "setup" ? "block" : "hidden", "min-w-0 max-w-full lg:col-span-4 lg:block")}>
            <PlanPanel />
            <div className="mt-4 min-w-0">
              <AssetEditor />
            </div>
            <div className="mt-4 min-w-0">
              <RuinEditor />
            </div>
            <div className="mt-4 min-w-0">
              <SourceCard />
            </div>
          </div>
          <div className={cn(tab === "results" ? "block" : "hidden", "min-w-0 max-w-full lg:col-span-8 lg:block")}>
            {showResults ? (
              <Suspense fallback={<IdleResults running />}>
                <ResultsPanel />
              </Suspense>
            ) : (
              <IdleResults running={false} onRun={run} />
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
