import { Field, SectionCard } from "@/components/ui/field";
import { Input, Select } from "@/components/ui/input";
import { formatInt } from "@/lib/fire/format";
import { windowById } from "@/lib/fire/sourced-params";
import { usePlanStore } from "@/store/plan-store";
import { AssetClassList } from "./asset-editor";
import { CorrelationEditor } from "./correlation-editor";
import { RuinEditor } from "./ruin-editor";
import { SourceCard } from "./source-card";

export function AdvancedSettings() {
  const plan = usePlanStore((s) => s.plan);
  const patchPlan = usePlanStore((s) => s.patchPlan);
  const win = windowById(plan.dataWindow ?? "long");

  const previewBits = [
    `${formatInt(plan.trials)}シナリオ`,
    `税率${plan.taxRatePct}%`,
    plan.returnsAreNominal ? "名目入力" : "実質入力",
    `資産枯渇${plan.ruinRules.length}件`,
    win.name,
  ];

  return (
    <SectionCard
      title="詳細設定"
      collapsible
      defaultOpen={false}
      preview={
        <p className="text-xs leading-relaxed text-fg-muted">{previewBits.join(" · ")}</p>
      }
    >
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="mb-2 text-sm font-medium text-fg">試行と税</h3>
          <div className="grid grid-cols-2 items-start gap-x-2 gap-y-3">
            <Field label="売却税率" hint="%">
              <Input
                type="number"
                min={0}
                max={50}
                step={0.1}
                value={plan.taxRatePct}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (Number.isFinite(n)) patchPlan({ taxRatePct: n });
                }}
              />
            </Field>
            <Field label="試行回数" hint="経路">
              <Select
                value={plan.trials}
                onChange={(e) => patchPlan({ trials: Number(e.target.value) })}
              >
                <option value={1000}>1,000（速い）</option>
                <option value={3000}>3,000（標準）</option>
                <option value={5000}>5,000</option>
                <option value={10000}>10,000（精密）</option>
              </Select>
            </Field>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium text-fg">リターン・税の扱い</h3>
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
          <p className="mt-2 text-xs leading-relaxed text-fg-subtle">
            税率は取崩期の売却額へかける。手取り支出を保つため、売却は 1 / (1−税率)
            に上乗せ。取得費・NISA・配当は見ていない。
          </p>
        </div>

        <RuinEditor plain />
        <SourceCard plain />
        <AssetClassList />
        <CorrelationEditor />
      </div>
    </SectionCard>
  );
}
