import { Button } from "@/components/ui/button";
import { Field, SectionCard } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePlanStore } from "@/store/plan-store";
import { AgeSlider } from "./age-slider";
import { RuinEditor } from "./ruin-editor";

export function PlanPanel({ onRun }: { onRun?: () => void }) {
  const plan = usePlanStore((s) => s.plan);
  const patchPlan = usePlanStore((s) => s.patchPlan);
  const reset = usePlanStore((s) => s.reset);
  const reroll = usePlanStore((s) => s.reroll);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SectionCard title="条件設定">
        <div className="hidden lg:block">
          <AgeSlider compact onRun={onRun} />
          <div className="my-4 border-t border-border" />
        </div>
        <div className="grid grid-cols-2 items-start gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-3 min-[1400px]:grid-cols-3">
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
          <Field label="売却実効税率" hint="%">
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
        <details className="group mt-4 rounded-lg border border-border bg-bg-sunken/45 px-3 py-2.5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-fg [&::-webkit-details-marker]:hidden">
            <span>リターン・税の扱い</span>
            <span className="flex items-center gap-2 text-xs text-fg-muted">
              {plan.returnsAreNominal ? "名目入力" : "実質入力"}
              <i className="text-[10px] not-italic transition-transform group-open:rotate-180">▼</i>
            </span>
          </summary>
          <div className="mt-3 border-t border-border pt-3">
            <label className="flex items-start gap-2 text-sm text-fg">
              <input
                type="checkbox"
                suppressHydrationWarning
                className="mt-0.5 size-4 accent-accent"
                checked={plan.returnsAreNominal}
                onChange={(e) => patchPlan({ returnsAreNominal: e.target.checked })}
              />
              <span>
                入力は名目（チェック時のみインフレで実質化）。出典データは日本CPI調整済みなので、通常は外す。
              </span>
            </label>
            <div className="mt-3 max-w-48">
              <Field
                label="インフレ率"
                hint={plan.returnsAreNominal ? "% / 年" : "実質入力では未使用"}
              >
                <Input
                  type="number"
                  min={-2}
                  max={10}
                  step={0.1}
                  value={plan.inflationPct}
                  disabled={!plan.returnsAreNominal}
                  aria-describedby="inflation-help"
                  onChange={(e) => patchPlan({ inflationPct: Number(e.target.value) })}
                />
              </Field>
            </div>
            <p id="inflation-help" className="mt-2 text-xs leading-relaxed text-fg-subtle">
              {plan.returnsAreNominal
                ? "名目リターンからインフレ率を差し引き、現在価値へ換算する。"
                : "現在の実質リターン設定では計算に使用しない。支出・積立・年金・結果金額は、すべて現在の購買力で一定として扱う。"}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
              売却実効税率は、利益ではなく売却額全体に対する簡易的な税負担率。手取り支出を保つため、売却は 1 / (1−税率)
              に上乗せする。例：100万円売却して実際の税負担が10万円なら10%。取得費・NISA・配当は個別計算しない。
            </p>
          </div>
        </details>
        <RuinEditor embedded />
        <details className="group mt-4 rounded-lg border border-border bg-bg-sunken/45 px-3 py-2.5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-fg [&::-webkit-details-marker]:hidden">
            <span>計算の再現性</span>
            <i className="text-[10px] not-italic text-fg-muted transition-transform group-open:rotate-180">▼</i>
          </summary>
          <div className="mt-3 border-t border-border pt-3">
            <p className="text-xs leading-relaxed text-fg-subtle">
              通常の再計算は同じ乱数を使うため、条件変更の効果を比較しやすい。乱数変更は別の市場経路を抽選するので、結果の選り好みに注意する。
            </p>
            <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={reroll}>
              乱数を変更して再計算
            </Button>
          </div>
        </details>
        <div className="mt-4 flex justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={reset}>
            初期設定へ戻す
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
