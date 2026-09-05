export function AppHeader() {
  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1200px] min-w-0 items-center justify-between gap-3 px-3 py-3.5 sm:px-4 md:px-6">
        <div className="flex items-center gap-3">
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
          <div>
            <p className="font-display text-lg leading-none tracking-tight text-fg">
              資産寿命
            </p>
            <p className="mt-0.5 text-[11px] tracking-wide text-fg-subtle">
              FIRE破綻シミュレーター
            </p>
          </div>
        </div>
        <p className="hidden max-w-xs text-right text-[11px] leading-relaxed text-fg-subtle sm:block">
          形成期と取り崩し期を分け、資産クラスごとにリターンとリスクを置いて破綻確率を測る
        </p>
      </div>
    </header>
  );
}
