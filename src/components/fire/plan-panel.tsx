import { Button } from "@/components/ui/button";
import { Field, SectionCard } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePlanStore } from "@/store/plan-store";
import { AgeSlider } from "./age-slider";

export function PlanPanel() {
  const plan = usePlanStore((s) => s.plan);
  const patchPlan = usePlanStore((s) => s.patchPlan);
  const fromShare = usePlanStore((s) => s.fromShare);
  const saveSharedPlan = usePlanStore((s) => s.saveSharedPlan);
  const restorePreviousPlan = usePlanStore((s) => s.restorePreviousPlan);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {fromShare ? (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface px-3 py-2.5 text-xs leading-relaxed text-fg-muted shadow-[var(--shadow-border)]">
          <p>共有リンクの条件を一時表示中。端末に保存した条件はまだ変えていない。</p>
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
      <SectionCard title="条件設定">
        <div>
          <AgeSlider compact />
          <div className="my-4 border-t border-border" />
        </div>
        <div className="grid grid-cols-2 items-start gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-3">
          <Field label="金融資産" hint="万円">
            <Input
              type="number"
              min={0}
              step={100}
              value={plan.currentAssets}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isFinite(n)) patchPlan({ currentAssets: n });
              }}
            />
          </Field>
          <Field label="年間積立" hint="万円 / 年">
            <Input
              type="number"
              min={0}
              step={10}
              value={plan.annualContribution}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isFinite(n)) patchPlan({ annualContribution: n });
              }}
            />
          </Field>
          <Field label="年間支出" hint="万円 / 年">
            <Input
              type="number"
              min={0}
              step={10}
              value={plan.annualSpend}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isFinite(n)) patchPlan({ annualSpend: n });
              }}
            />
          </Field>
          <Field label="年金額" hint="万円 / 年">
            <Input
              type="number"
              min={0}
              step={10}
              value={plan.annualPension}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isFinite(n)) patchPlan({ annualPension: n });
              }}
            />
          </Field>
          <Field label="年金開始" hint="歳">
            <Input
              type="number"
              min={40}
              max={80}
              value={plan.pensionAge}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isFinite(n)) patchPlan({ pensionAge: Math.round(n) });
              }}
            />
          </Field>
          <Field label="インフレ率" hint="% / 年">
            <Input
              type="number"
              min={-2}
              max={10}
              step={0.1}
              value={plan.inflationPct}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isFinite(n)) patchPlan({ inflationPct: n });
              }}
            />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}
