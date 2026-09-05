import { cn } from "@/lib/utils";

type Option<T extends string> = { id: T; label: string };

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: readonly [Option<T>, Option<T>];
  ariaLabel?: string;
  className?: string;
}) {
  const index = options[0].id === value ? 0 : 1;

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "relative grid h-9 w-[11.5rem] shrink-0 grid-cols-2 rounded-full bg-bg-sunken p-0.5 text-xs font-medium",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-surface shadow-[var(--shadow-border)] transition-[left] duration-200 ease-out"
        style={{ left: index === 0 ? 2 : "50%" }}
      />
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          role="tab"
          aria-selected={value === opt.id}
          onClick={() => onChange(opt.id)}
          className={cn(
            "relative z-10 rounded-full px-2 text-center transition-colors duration-150",
            value === opt.id ? "text-fg" : "text-fg-muted hover:text-fg",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
