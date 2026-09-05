import { useState, type ReactNode, type SyntheticEvent } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("grid min-w-0 gap-1.5", className)}>
      <span className="flex min-h-4 items-baseline justify-between gap-2">
        <span className="text-xs font-medium tracking-wide text-fg-muted">{label}</span>
        {hint ? (
          <span className="shrink-0 text-xs tabular-nums text-fg-subtle">{hint}</span>
        ) : (
          <span className="invisible text-xs">.</span>
        )}
      </span>
      {children}
    </label>
  );
}

export function SectionCard({
  title,
  kicker,
  action,
  children,
  collapsible = false,
  defaultOpen = true,
  preview,
  titleNowrap = false,
}: {
  title: string;
  kicker?: string;
  action?: ReactNode;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  preview?: ReactNode;
  titleNowrap?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const heading = (
    <div className={titleNowrap ? "shrink-0" : "min-w-0"}>
      {kicker ? (
        <p className="text-[11px] font-medium tracking-[0.08em] text-fg-subtle">{kicker}</p>
      ) : null}
      <h2
        className={cn(
          "flex items-center gap-2 font-display text-lg leading-snug text-fg",
          titleNowrap && "whitespace-nowrap",
        )}
      >
        {title}
        {collapsible ? (
          <span
            aria-hidden
            className="text-[10px] leading-none text-fg-subtle transition-transform duration-150 group-open:rotate-180"
          >
            ▼
          </span>
        ) : null}
      </h2>
    </div>
  );

  if (!collapsible) {
    return (
      <section className="min-w-0 max-w-full rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5">
        <header className={cn("mb-4 flex items-center justify-between gap-2", titleNowrap && "flex-nowrap")}>
          {heading}
          {action}
        </header>
        {children}
      </section>
    );
  }

  return (
    <section className="min-w-0 max-w-full rounded-xl bg-surface p-3.5 shadow-[var(--shadow-border)] sm:p-4 md:p-5">
      <details
        className="group"
        open={open}
        onToggle={(e: SyntheticEvent<HTMLDetailsElement>) => setOpen(e.currentTarget.open)}
      >
        <summary className="flex cursor-pointer list-none flex-col [&::-webkit-details-marker]:hidden">
          <span className="flex items-start justify-between gap-3">
            {heading}
            {action ? (
              <span
                className="hidden group-open:flex"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {action}
              </span>
            ) : null}
          </span>
          {preview ? (
            <span
              className="mt-4"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {preview}
            </span>
          ) : null}
        </summary>
        <div className={preview ? "mt-3" : "mt-4"}>{children}</div>
      </details>
    </section>
  );
}
