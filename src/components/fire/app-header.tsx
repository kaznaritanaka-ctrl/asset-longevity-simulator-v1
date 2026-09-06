export function AppHeader() {
  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full min-w-0 items-center justify-between gap-4 px-3 py-2.5 sm:px-4 lg:px-4">
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" className="fill-accent" />
            <path
              d="M6 21c5-9 15-9 20 0"
              fill="none"
              stroke="currentColor"
              className="text-accent-fg"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="11" cy="16.2" r="1.6" className="fill-accent-fg" />
            <circle cx="16" cy="13.4" r="1.8" className="fill-accent-fg" />
            <circle
              cx="22.5"
              cy="16.6"
              r="1.3"
              fill="none"
              className="stroke-accent-fg"
              strokeWidth="1.4"
            />
          </svg>
          <p className="type-title leading-none text-fg">
            資産寿命シミュレータ
          </p>
        </div>
        <div className="hidden min-w-0 text-right text-xs leading-snug text-fg-subtle sm:block">
          <p className="truncate whitespace-nowrap">
            形成期と取り崩し期を分け、資産クラスごとにリターンとリスクを置いて資産枯渇確率を測る
          </p>
          <p className="mt-0.5 truncate whitespace-nowrap">
            金額の単位は万円。計算は端末内のみ。投資助言ではない。
          </p>
        </div>
      </div>
      <p className="px-3 pb-2 text-xs leading-snug text-fg-subtle sm:hidden">
        形成期と取り崩し期を分け、資産クラスごとにリターンとリスクを置いて資産枯渇確率を測る。金額の単位は万円。計算は端末内のみ。投資助言ではない。
      </p>
    </header>
  );
}
