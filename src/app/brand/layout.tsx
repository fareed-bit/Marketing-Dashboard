"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Calendar, BarChart3, MessageSquare,
  FileText, PartyPopper, TrendingUp, Radio
} from "lucide-react";

const tabs = [
  { label: "Overview", href: "/brand", icon: LayoutDashboard },
  { label: "Calendar", href: "/brand/calendar", icon: Calendar },
  { label: "Performance", href: "/brand/performance", icon: BarChart3 },
  { label: "Community", href: "/brand/community", icon: MessageSquare },
  { label: "Briefs", href: "/brand/briefs", icon: FileText },
  { label: "Activations", href: "/brand/activations", icon: PartyPopper },
  { label: "Trends", href: "/brand/trends", icon: TrendingUp },
  { label: "Ops Feed", href: "/brand/ops-feed", icon: Radio },
];

export default function BrandLayout({ children }: { children: React.ReactNode }) {
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
