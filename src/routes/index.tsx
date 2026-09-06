import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AdvancedSettings } from "@/components/fire/advanced-settings";
import { AppHeader } from "@/components/fire/app-header";
import { AssetEditor } from "@/components/fire/asset-editor";
import { PlanPanel } from "@/components/fire/plan-panel";
import { cn } from "@/lib/utils";
import { usePlanStore, consumeSkipAutoRun, simSignature } from "@/store/plan-store";

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
  const sigRef = useRef(simSignature(plan));

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
      sigRef.current = simSignature(plan);
      return;
    }
    if (consumeSkipAutoRun()) {
      planRef.current = plan;
      sigRef.current = simSignature(plan);
      return;
    }
    const sig = simSignature(plan);
    if (sigRef.current === sig) {
      planRef.current = plan;
      return;
    }
    planRef.current = plan;
    sigRef.current = sig;
    const id = window.setTimeout(() => run(), 280);
    return () => window.clearTimeout(id);
  }, [hydrated, plan, activated, run]);

  const showResults = tab === "results" || result != null || status === "running";

  const openResults = () => {
    setTab("results");
    if (status === "idle") run();
  };

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-bg text-fg lg:h-dvh lg:overflow-hidden">
      <AppHeader />
      <main className="mx-auto flex w-full min-w-0 flex-1 flex-col overflow-x-hidden px-3 py-3 sm:px-4 lg:min-h-0 lg:flex-row lg:gap-4 lg:overflow-hidden lg:px-4 lg:py-3">
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
            tab === "setup" ? "mt-3 block" : "hidden",
            "min-w-0 lg:mt-0 lg:block lg:w-[22.5rem] lg:shrink-0 lg:overflow-y-auto xl:w-[24rem]",
          )}
        >
          <PlanPanel />
          <div className="mt-3 min-w-0">
            <AssetEditor />
          </div>
          <div className="mt-3 min-w-0 pb-6 lg:pb-2">
            <AdvancedSettings />
          </div>
        </div>

        <div
          className={cn(
            tab === "results" ? "mt-3 flex" : "hidden",
            "min-w-0 flex-1 flex-col gap-3 lg:mt-0 lg:flex lg:min-h-0 lg:overflow-hidden",
          )}
        >
          {showResults ? (
            <Suspense fallback={<IdleResults running />}>
              <ResultsPanel />
            </Suspense>
          ) : (
            <IdleResults running={false} onRun={run} />
          )}
        </div>
      </main>
    </div>
  );
}

function IdleResults({ running, onRun }: { running: boolean; onRun?: () => void }) {
  return (
    <div className="flex min-h-0 flex-1 items-center rounded-xl bg-surface px-5 py-10 text-sm text-fg-muted shadow-[var(--shadow-border)]">
      {running ? (
        <p>計算中です。</p>
      ) : (
        <div className="flex flex-col items-start gap-3">
          <p>条件を確認してから計算を開始する。初期表示ではシナリオを回していない。</p>
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
