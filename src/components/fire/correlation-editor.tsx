import { useState } from "react";
import { Input } from "@/components/ui/input";
import { usePlanStore } from "@/store/plan-store";

export function CorrelationEditor() {
  const [open, setOpen] = useState(false);
  const plan = usePlanStore((s) => s.plan);
  const setCorrelation = usePlanStore((s) => s.setCorrelation);
  const n = plan.assets.length;

  return (
    <div className="mt-4 border-t border-border pt-3">
      <button
        type="button"
        className="flex w-full items-center justify-between text-sm text-fg"
        onClick={() => setOpen((v) => !v)}
      >
        <span>相関係数</span>
        <span className="text-xs text-fg-subtle">{open ? "閉じる" : "開く"}</span>
      </button>
      {open ? (
        <div className="mt-3 max-w-full overflow-x-auto">
          <p className="mb-2 text-xs leading-relaxed text-fg-subtle">
            対角は1で固定。対称行列として両方を同時に更新する。非正定値なら計算側で微小なリッジを足す。
          </p>
          <table className="min-w-full border-collapse text-[11px]">
            <thead>
              <tr>
                <th className="p-1 text-left font-medium text-fg-muted"> </th>
                {plan.assets.map((a) => (
                  <th key={a.id} className="p-1 font-medium text-fg-muted">
                    <span className="block max-w-16 truncate">{a.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plan.assets.map((rowAsset, i) => (
                <tr key={rowAsset.id}>
                  <th className="whitespace-nowrap p-1 text-left font-medium text-fg-muted">
                    {rowAsset.name}
                  </th>
                  {Array.from({ length: n }, (_, j) => {
                    const v = plan.correlations[i]?.[j] ?? (i === j ? 1 : 0);
                    if (i === j) {
                      return (
                        <td key={j} className="p-1 text-center tabular-nums text-fg-subtle">
                          1
                        </td>
                      );
                    }
                    if (j < i) {
                      return (
                        <td key={j} className="p-1 text-center tabular-nums text-fg-subtle">
                          {v.toFixed(2)}
                        </td>
                      );
                    }
                    return (
                      <td key={j} className="p-1">
                        <Input
                          type="number"
                          step={0.05}
                          min={-0.99}
                          max={0.99}
                          value={Number(v.toFixed(2))}
                          onChange={(e) => setCorrelation(i, j, Number(e.target.value))}
                          className="h-8 px-1 text-center md:h-8"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
