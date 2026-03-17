"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "error" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          default: "bg-[var(--accent)] text-[var(--accent-foreground)]",
          secondary: "bg-[var(--muted)] text-[var(--muted-foreground)]",
          success: "bg-emerald-500/15 text-emerald-400",
          warning: "bg-amber-500/15 text-amber-400",
          error: "bg-red-500/15 text-red-400",
          outline: "border border-[var(--border)] text-[var(--muted-foreground)]",
        }[variant],
        className
      )}
      {...props}
    />
  );
}
