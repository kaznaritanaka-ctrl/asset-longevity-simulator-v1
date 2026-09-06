import type { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/field";
import { Input, Select } from "@/components/ui/input";
import {
  ASSET_COLORS,
  ASSET_LABELS,
  matchingPhasePresetId,
  PRESETS,
  type Phase,
} from "@/lib/fire/defaults";
import { formatPct } from "@/lib/fire/format";
import { KIND_LABEL, type AssetKind } from "@/lib/fire/types";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";

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

function PresetRow({ phase, label }: { phase: Phase; label: string }) {
  const plan = usePlanStore((s) => s.plan);
  const applyPreset = usePlanStore((s) => s.applyPreset);
  const result = usePlanStore((s) => s.result);
  const active = matchingPhasePresetId(plan, phase);
  const sum = weightSum(plan.assets.map((a) => (phase === "accum" ? a.accumWeight : a.withdrawWeight)));
  const moments = result ? (phase === "accum" ? result.portfolio.accum : result.portfolio.withdraw) : null;

  return (
    <div className="grid min-w-0 gap-1.5">
      <div className="flex items-center justify-between gap-2 text-xs text-fg-muted">
        <span className="shrink-0">{label}</span>
        {moments ? (
          <span className="truncate tabular-nums">
            実質 {formatPct(moments.mu)} · σ {formatPct(moments.sigma)}
          </span>
        ) : (
          <span className="tabular-nums">{sum.toFixed(0)}%</span>
        )}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {PRESETS.map((p, index) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPreset(p.id, phase)}
            className={cn(
              "group relative min-w-0 whitespace-nowrap rounded-md border px-0.5 py-1.5 text-center text-xs leading-none tracking-tight transition-colors duration-150",
              active === p.id
                ? "border-accent bg-accent text-accent-fg"
                : "border-border bg-surface-2 text-fg hover:bg-bg-sunken",
            )}
          >
            {p.name}
            <span
              className={cn(
                "pointer-events-none absolute bottom-full z-30 mb-1 hidden w-40 rounded-md bg-surface-2 px-2.5 py-2 text-left text-xs leading-relaxed text-fg shadow-[var(--shadow-border)] group-hover:block group-focus-visible:block",
                index >= 2 ? "right-0" : "left-0",
              )}
            >
              {Object.entries(p.weights)
                .filter(([, w]) => (phase === "accum" ? w.accum : w.withdraw) > 0)
                .map(([id, w]) => (
                  <span key={id} className="flex justify-between gap-2">
                    <span>{ASSET_LABELS[id] ?? id}</span>
                    <span className="tabular-nums">
                      {phase === "accum" ? w.accum : w.withdraw}%
                    </span>
                  </span>
                ))}
            </span>
          </button>
        ))}
      </div>
      <WeightBar
        items={plan.assets.map((a) => ({
          id: a.id,
          name: a.name,
          weight: phase === "accum" ? a.accumWeight : a.withdrawWeight,
        }))}
      />
    </div>
  );
}

export function AssetEditor() {
  return (
    <SectionCard title="資産配分タイプ">
      <div className="grid gap-3">
        <PresetRow phase="accum" label="形成期" />
        <PresetRow phase="withdraw" label="取崩期" />
      </div>
    </SectionCard>
  );
}

export function AssetClassList() {
  const plan = usePlanStore((s) => s.plan);
  const updateAsset = usePlanStore((s) => s.updateAsset);
  const addAsset = usePlanStore((s) => s.addAsset);
  const removeAsset = usePlanStore((s) => s.removeAsset);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-fg">リスクリターン</h3>
        <Button type="button" variant="ghost" size="sm" onClick={addAsset} className="pr-2">
          <Plus className="size-4" />
          追加
        </Button>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-fg-subtle">
        期待リターンとリスク（年率標準偏差）をクラスごとに指定。配分は形成期 /
        取崩期で別々。合計が100%でなくても計算時に正規化する。
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
    </div>
  );
}

function MiniField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="type-caption font-medium tracking-wide text-fg-subtle">{label}</span>
      {children}
    </label>
  );
}
