import { Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/field";
import { Input, Select } from "@/components/ui/input";
import { ASSET_COLORS, matchingPresetId, PRESETS } from "@/lib/fire/defaults";
import { formatPct } from "@/lib/fire/format";
import { KIND_LABEL, type AssetKind } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";
import { CorrelationEditor } from "./correlation-editor";
import { SourceCard } from "./source-card";

const KINDS: AssetKind[] = ["equity", "bond", "cash", "alt"];

function weightSum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

function WeightBar({ items }: { items: { id: string; name: string; weight: number }[] }) {
  const sum = weightSum(items.map((i) => i.weight)) || 1;
  return (
    <div className="flex h-2.5 overflow-hidden rounded-full bg-bg-sunken">
      {items.map((item) => (
        <div
          key={item.id}
          title={`${item.name} ${((item.weight / sum) * 100).toFixed(0)}%`}
          className="h-full"
          style={{
            width: `${(item.weight / sum) * 100}%`,
            background: ASSET_COLORS[item.id] ?? "var(--color-fg-muted)",
          }}
        />
      ))}
    </div>
  );
}

export function AssetEditor() {
  const plan = usePlanStore((s) => s.plan);
  const patchPlan = usePlanStore((s) => s.patchPlan);
  const applyPreset = usePlanStore((s) => s.applyPreset);
  const updateAsset = usePlanStore((s) => s.updateAsset);
  const addAsset = usePlanStore((s) => s.addAsset);
  const removeAsset = usePlanStore((s) => s.removeAsset);
  const result = usePlanStore((s) => s.result);

  const accumSum = weightSum(plan.assets.map((a) => a.accumWeight));
  const wdSum = weightSum(plan.assets.map((a) => a.withdrawWeight));
  const activePreset = matchingPresetId(plan);

  return (
    <SectionCard
      title="資産配分タイプ"
      collapsible
      defaultOpen={false}
      action={
        <Button type="button" variant="ghost" size="sm" onClick={addAsset} className="pr-2">
          <Plus className="size-4" />
          追加
        </Button>
      }
      preview={
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-2 min-[1400px]:grid-cols-4">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => applyPreset(p.id)}
                title={p.hint}
                className={cn(
                  "rounded-md border px-3 py-2.5 text-left text-sm leading-tight transition-colors duration-150",
                  activePreset === p.id
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border bg-surface-2 text-fg hover:bg-bg-sunken",
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid gap-2 min-[1400px]:grid-cols-2">
            <div className="grid min-w-0 gap-1.5">
              <div className="flex items-center justify-between gap-2 text-[11px] text-fg-muted">
                <span className="shrink-0">形成期 {accumSum.toFixed(0)}%</span>
                {result ? (
                  <span className="truncate tabular-nums">
                    実質 {formatPct(result.portfolio.accum.mu)} · σ{" "}
                    {formatPct(result.portfolio.accum.sigma)}
                  </span>
                ) : null}
              </div>
              <WeightBar
                items={plan.assets.map((a) => ({
                  id: a.id,
                  name: a.name,
                  weight: a.accumWeight,
                }))}
              />
            </div>
            <div className="grid min-w-0 gap-1.5">
              <div className="flex items-center justify-between gap-2 text-[11px] text-fg-muted">
                <span className="shrink-0">取崩期 {wdSum.toFixed(0)}%</span>
                {result ? (
                  <span className="truncate tabular-nums">
                    実質 {formatPct(result.portfolio.withdraw.mu)} · σ{" "}
                    {formatPct(result.portfolio.withdraw.sigma)}
                  </span>
                ) : null}
              </div>
              <WeightBar
                items={plan.assets.map((a) => ({
                  id: a.id,
                  name: a.name,
                  weight: a.withdrawWeight,
                }))}
              />
            </div>
          </div>
          <label className="grid gap-1.5 min-[1400px]:grid-cols-[auto_minmax(0,1fr)] min-[1400px]:items-center">
            <span className="text-xs font-medium text-fg-muted">試行回数</span>
            <Select
              value={plan.trials}
              onChange={(e) => patchPlan({ trials: Number(e.target.value) })}
              className="min-[1400px]:h-9"
            >
              <option value={1000}>1,000（速い）</option>
              <option value={3000}>3,000（標準）</option>
              <option value={5000}>5,000</option>
              <option value={10000}>10,000（精密）</option>
            </Select>
          </label>
        </div>
      }
    >
      <p className="mb-3 text-xs leading-relaxed text-fg-subtle">
        期待リターンとリスク（年率標準偏差）をクラスごとに指定。配分は形成期 /
        取崩期で別々。合計が100%でなくても計算時に正規化する。
        プリセットは配分だけを変更し、追加した資産は0%にする。
      </p>

      <div className="flex flex-col gap-3">
        {plan.assets.map((asset) => (
          <article
            key={asset.id}
            className="rounded-lg bg-surface-2 p-3 shadow-[var(--shadow-border)]"
          >
            <div className="mb-2 flex min-w-0 items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: ASSET_COLORS[asset.id] ?? "var(--color-fg-muted)" }}
              />
              <Input
                value={asset.name}
                onChange={(e) => updateAsset(asset.id, { name: e.target.value })}
                className="h-9 min-w-0 border-0 bg-transparent px-0 shadow-none md:h-9"
              />
              <Select
                value={asset.kind}
                onChange={(e) => updateAsset(asset.id, { kind: e.target.value as AssetKind })}
                className="h-9 w-20 shrink-0 px-1.5 text-xs sm:w-28 md:h-9"
              >
                {KINDS.map((k) => (
                  <option key={k} value={k}>
                    {KIND_LABEL[k]}
                  </option>
                ))}
              </Select>
              <button
                type="button"
                aria-label={`${asset.name}を削除`}
                className="grid size-9 shrink-0 place-items-center rounded-md text-fg-subtle hover:bg-ruin-soft hover:text-ruin"
                onClick={() => removeAsset(asset.id)}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <MiniField label="リターン %">
                <Input
                  type="number"
                  step={0.1}
                  value={asset.expectedReturnPct}
                  onChange={(e) =>
                    updateAsset(asset.id, { expectedReturnPct: Number(e.target.value) })
                  }
                  className="h-9 md:h-9"
                />
              </MiniField>
              <MiniField label="リスク %">
                <Input
                  type="number"
                  step={0.1}
                  min={0}
                  value={asset.volatilityPct}
                  onChange={(e) => updateAsset(asset.id, { volatilityPct: Number(e.target.value) })}
                  className="h-9 md:h-9"
                />
              </MiniField>
              <MiniField label="形成期 %">
                <Input
                  type="number"
                  step={1}
                  min={0}
                  value={asset.accumWeight}
                  onChange={(e) => updateAsset(asset.id, { accumWeight: Number(e.target.value) })}
                  className="h-9 md:h-9"
                />
              </MiniField>
              <MiniField label="取崩期 %">
                <Input
                  type="number"
                  step={1}
                  min={0}
                  value={asset.withdrawWeight}
                  onChange={(e) =>
                    updateAsset(asset.id, { withdrawWeight: Number(e.target.value) })
                  }
                  className="h-9 md:h-9"
                />
              </MiniField>
            </div>
          </article>
        ))}
      </div>

      <CorrelationEditor />

      <div className="mt-3">
        <SourceCard embedded />
      </div>
    </SectionCard>
  );
}

function MiniField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-[10px] font-medium tracking-wide text-fg-subtle">{label}</span>
      {children}
    </label>
  );
}
