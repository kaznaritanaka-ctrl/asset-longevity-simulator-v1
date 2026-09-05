import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-fg hover:opacity-90",
        secondary:
          "bg-surface-2 text-fg shadow-[var(--shadow-border)] hover:bg-bg-sunken",
        ghost: "text-fg-muted hover:bg-bg-sunken hover:text-fg",
        outline: "border border-border bg-transparent text-fg hover:bg-bg-sunken",
        ruin: "bg-ruin text-ruin-fg hover:opacity-90",
      },
      size: {
        default: "h-11 px-4 text-sm md:h-10",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-5 text-sm",
        icon: "size-11 md:size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
