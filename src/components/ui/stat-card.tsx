"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "./card";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    direction: "up" | "down" | "flat";
    isPositive: boolean;
    label: string;
  };
  icon?: React.ReactNode;
  alertLevel?: "critical" | "warning" | null;
  className?: string;
  onClick?: () => void;
}

export function StatCard({ label, value, trend, icon, alertLevel, className, onClick }: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden p-5 transition-all",
        onClick && "cursor-pointer hover:border-[var(--accent)]/50",
        alertLevel === "critical" && "border-red-500/50",
        alertLevel === "warning" && "border-amber-500/50",
        className
      )}
      onClick={onClick}
    >
      {alertLevel && (
        <div
          className={cn(
            "absolute top-0 right-0 h-2 w-2 rounded-full m-3",
            alertLevel === "critical" ? "bg-red-500 animate-pulse" : "bg-amber-500"
          )}
        />
      )}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">{label}</p>
        {icon && <div className="text-[var(--muted-foreground)]">{icon}</div>}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1.5">
          {trend.direction === "up" && (
            <TrendingUp className={cn("h-3.5 w-3.5", trend.isPositive ? "text-emerald-400" : "text-red-400")} />
          )}
          {trend.direction === "down" && (
            <TrendingDown className={cn("h-3.5 w-3.5", trend.isPositive ? "text-emerald-400" : "text-red-400")} />
          )}
          {trend.direction === "flat" && <Minus className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-emerald-400" : "text-red-400",
              trend.direction === "flat" && "text-[var(--muted-foreground)]"
            )}
          >
            {trend.value > 0 ? "+" : ""}
            {trend.value.toFixed(1)}%
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">{trend.label}</span>
        </div>
      )}
    </Card>
  );
}
