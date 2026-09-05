import { formatManYen } from "@/lib/fire/format";
import type { SimResult } from "@/lib/fire/types";

export function PercentileTable({ result }: { result: SimResult }) {
  const marks = [
    result.currentAge,
    result.fireAge,
    Math.round((result.fireAge + result.endAge) / 2),
    result.endAge,
  ].filter((v, i, arr) => arr.indexOf(v) === i);

  const rows = [
    { key: "p5", label: "5%" },
    { key: "p25", label: "25%" },
    { key: "p50", label: "中央" },
    { key: "p75", label: "75%" },
    { key: "p95", label: "95%" },
  ] as const;

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-fg-muted">
            <th className="py-2 pr-3 font-medium">分位</th>
            {marks.map((age) => (
              <th key={age} className="py-2 pr-3 font-medium tabular-nums">
                {age}歳
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-b border-border/70">
              <th className="py-2 pr-3 text-left font-medium text-fg-muted">{row.label}</th>
              {marks.map((age) => {
                const idx = result.ages.indexOf(age);
                const v = idx >= 0 ? result.percentiles[row.key][idx] : undefined;
                return (
                  <td key={age} className="py-2 pr-3 tabular-nums text-fg">
                    {v == null ? "—" : formatManYen(v)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
