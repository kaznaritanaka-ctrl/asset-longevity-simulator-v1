import { Field, SectionCard } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePlanStore } from "@/store/plan-store";

export function PlanPanel() {
  const plan = usePlanStore((s) => s.plan);
  const patchPlan = usePlanStore((s) => s.patchPlan);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SectionCard title="条件設定">
        <div className="grid grid-cols-2 items-start gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-3">
          <Field label="金融資産" hint="万円">
            <Input
              type="number"
              min={0}
              step={100}
              value={plan.currentAssets}
              onChange={(e) => patchPlan({ currentAssets: Number(e.target.value) })}
            />
          </Field>
          <Field label="年間積立" hint="万円 / 年">
            <Input
              type="number"
              min={0}
              step={10}
              value={plan.annualContribution}
              onChange={(e) => patchPlan({ annualContribution: Number(e.target.value) })}
            />
          </Field>
          <Field label="年間支出" hint="万円 / 年">
            <Input
              type="number"
              min={0}
              step={10}
              value={plan.annualSpend}
              onChange={(e) => patchPlan({ annualSpend: Number(e.target.value) })}
            />
          </Field>
          <Field label="年金額" hint="万円 / 年">
            <Input
              type="number"
              min={0}
              step={10}
              value={plan.annualPension}
              onChange={(e) => patchPlan({ annualPension: Number(e.target.value) })}
            />
          </Field>
          <Field label="年金開始" hint="歳">
            <Input
              type="number"
              min={40}
              max={80}
              value={plan.pensionAge}
              onChange={(e) => patchPlan({ pensionAge: Number(e.target.value) })}
            />
          </Field>
          <Field label="インフレ率" hint="% / 年">
            <Input
              type="number"
              min={-2}
              max={10}
              step={0.1}
              value={plan.inflationPct}
              onChange={(e) => patchPlan({ inflationPct: Number(e.target.value) })}
            />
          </Field>
          <Field label="売却税率" hint="%">
            <Input
              type="number"
              min={0}
              max={50}
              step={0.1}
              value={plan.taxRatePct}
              onChange={(e) => patchPlan({ taxRatePct: Number(e.target.value) })}
            />
          </Field>
        </div>
        <label className="mt-4 flex items-start gap-2 text-sm text-fg">
          <input
            type="checkbox"
            suppressHydrationWarning
            className="mt-0.5 size-4 accent-accent"
            checked={plan.returnsAreNominal}
            onChange={(e) => patchPlan({ returnsAreNominal: e.target.checked })}
          />
          <span>
            入力は名目（チェック時のみインフレで実質化）。出典ボタンで入れた系列はすでに日本CPI済みなので、通常は外す。
          </span>
        </label>
        <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
          税率は取崩期に支出を賄う売却額へかける。手取り支出を保つため、売却は 1 / (1−税率) に上乗せ。取得費・NISA・配当は見ていない。非課税なら 0。
        </p>
      </SectionCard>
    </div>
  );
}
