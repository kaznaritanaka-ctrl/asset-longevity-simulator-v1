export function formatManYen(man: number, digits = 0): string {
  if (!Number.isFinite(man)) return "—";
  const sign = man < 0 ? "-" : "";
  const abs = Math.abs(man);
  if (abs >= 10_000) {
    const oku = abs / 10_000;
    const d = oku >= 100 ? 1 : 2;
    return `${sign}${oku.toLocaleString("ja-JP", { maximumFractionDigits: d, minimumFractionDigits: 0 })}億円`;
  }
  return `${sign}${abs.toLocaleString("ja-JP", { maximumFractionDigits: digits, minimumFractionDigits: 0 })}万円`;
}

export function formatAxisYen(man: number): string {
  if (!Number.isFinite(man)) return "";
  const sign = man < 0 ? "-" : "";
  const abs = Math.abs(man);
  if (abs >= 10_000) {
    const oku = abs / 10_000;
    const digits = oku >= 10 ? 0 : 1;
    return `${sign}${oku.toFixed(digits)}億`;
  }
  if (abs >= 100) return `${sign}${Math.round(abs).toLocaleString("ja-JP")}万`;
  return `${sign}${Math.round(abs)}万`;
}

export function formatPct(decimal: number, digits = 1): string {
  if (!Number.isFinite(decimal)) return "—";
  return `${(decimal * 100).toLocaleString("ja-JP", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}%`;
}

export function formatPctPoints(pct: number, digits = 1): string {
  if (!Number.isFinite(pct)) return "—";
  return `${pct.toLocaleString("ja-JP", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })}%`;
}

export function formatInt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return Math.round(n).toLocaleString("ja-JP");
}

export function formatAge(age: number): string {
  return `${Math.round(age)}歳`;
}
