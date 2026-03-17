"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50",
          {
            default: "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--color-brand-500)]",
            secondary: "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]",
            outline: "border border-[var(--border)] bg-transparent hover:bg-[var(--muted)]",
            ghost: "hover:bg-[var(--muted)]",
            destructive: "bg-red-600 text-white hover:bg-red-700",
          }[variant],
          {
            sm: "h-8 px-3 text-xs",
            md: "h-9 px-4 text-sm",
            lg: "h-11 px-6 text-base",
            icon: "h-9 w-9",
          }[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
