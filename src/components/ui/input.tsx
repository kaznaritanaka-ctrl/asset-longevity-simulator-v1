import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      suppressHydrationWarning
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-border bg-surface-2 px-2.5 text-fg tabular-nums outline-none transition-[border-color,box-shadow] duration-150 sm:px-3 md:h-10",
        "placeholder:text-fg-subtle focus:border-accent",
        "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      suppressHydrationWarning
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-border bg-surface-2 px-2.5 text-fg outline-none transition-[border-color] duration-150 sm:px-3 md:h-10",
        "focus:border-accent",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
