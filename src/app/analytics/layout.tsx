"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BarChart3, FileBarChart, Calculator
} from "lucide-react";

const tabs = [
  { label: "Overview", href: "/analytics", icon: LayoutDashboard },
  { label: "Channels", href: "/analytics/channels", icon: BarChart3 },
  { label: "Reports", href: "/analytics/reports", icon: FileBarChart },
  { label: "ROI", href: "/analytics/roi", icon: Calculator },
];

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex items-center gap-1 border-b border-[var(--border)] pb-3 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
}
