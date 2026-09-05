import { SectionCard } from "@/components/ui/field";
import { DATA_WINDOWS, SOURCE_CITATION, windowById } from "@/lib/fire/sourced-params";
import { cn } from "@/lib/utils";
import { usePlanStore } from "@/store/plan-store";

export function SourceCard() {
  const plan = usePlanStore((s) => s.plan);
  const applyDataWindow = usePlanStore((s) => s.applyDataWindow);
  const win = windowById(plan.dataWindow ?? "long");

  return (
    <SectionCard
      title="使用するデータの選択"
      collapsible
      defaultOpen={false}
      preview={
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {DATA_WINDOWS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => applyDataWindow(w.id)}
              className={cn(
                "min-w-0 rounded-md border px-1.5 py-2 text-center leading-tight transition-colors duration-150 sm:px-2",
                plan.dataWindow === w.id
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border bg-surface-2 text-fg hover:bg-bg-sunken",
              )}
            >
              <span className="block text-xs font-medium sm:text-sm">{w.name}</span>
              <span
                className={cn(
                  "mt-0.5 block text-[10px] tabular-nums sm:text-xs",
                  plan.dataWindow === w.id ? "text-accent-fg/80" : "text-fg-subtle",
                )}
              >
                {w.n}年
              </span>
            </button>
          ))}
        </div>
      }
    >
      <p className="text-xs leading-relaxed text-fg-muted">
        円建て長期実データ。{win.note}
      </p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-border text-left text-fg-muted">
              <th className="py-1.5 pr-2 font-medium">クラス</th>
              <th className="py-1.5 pr-2 font-medium">算術</th>
              <th className="py-1.5 pr-2 font-medium">幾何</th>
              <th className="py-1.5 font-medium">σ</th>
            </tr>
          </thead>
          <tbody>
            {win.assets.map((a) => (
              <tr key={a.id} className="border-b border-border/70">
                <td className="py-1.5 pr-2 text-fg">{a.name}</td>
                <td className="py-1.5 pr-2 tabular-nums text-fg">{a.arithPct.toFixed(1)}%</td>
                <td className="py-1.5 pr-2 tabular-nums text-fg-muted">{a.geomPct.toFixed(1)}%</td>
                <td className="py-1.5 tabular-nums text-fg">{a.volPct.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-3 grid gap-2 text-xs leading-relaxed text-fg-subtle">
        <li>
          <span className="font-medium text-fg-muted">{SOURCE_CITATION.jst.label}。</span>{" "}
          {SOURCE_CITATION.jst.detail} {SOURCE_CITATION.jst.papers}
        </li>
        <li>
          <span className="font-medium text-fg-muted">{SOURCE_CITATION.gold.label}。</span>{" "}
          {SOURCE_CITATION.gold.detail}
        </li>
        <li>
          米国株式はヘッジなし円建て。金もドル価格×円ドル。債券は円建て最長を取るため日本国債（世界国債の超長期円系列がない）。
        </li>
      </ul>
    </SectionCard>
  );
}
