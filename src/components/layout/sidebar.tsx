"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRoleStore } from "@/stores/use-role-store";
import { navigation, type NavSection } from "@/config/navigation";
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import { useState, useRef, useCallback } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const { activeRole } = useRoleStore();
  const [collapsed, setCollapsed] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; top: number; left: number } | null>(null);
  const tooltipTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const showTooltip = useCallback((e: React.MouseEvent, description: string) => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ text: description, top: rect.top + rect.height / 2, left: rect.right + 8 });
  }, []);

  const hideTooltip = useCallback(() => {
    tooltipTimeout.current = setTimeout(() => setTooltip(null), 100);
  }, []);

  const filteredSections = navigation.map((section) => {
    if (!section.role) return section;
    return section;
  });

  return (
    <aside
      data-tour="sidebar"
      className={cn(
        "fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-[var(--border)] bg-[var(--sidebar)] transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-between border-b border-[var(--border)] px-4">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">
            <span className="text-[var(--accent)]">Barsys</span>
            <span className="text-[var(--muted-foreground)] text-xs ml-1.5 font-normal">Dashboard</span>
          </span>
        )}
        {collapsed && <span className="text-lg font-bold text-[var(--accent)] mx-auto">B</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {filteredSections.map((section) => {
          const tourId =
            section.label === "Brand & Social Hub" ? "brand-hub" :
            section.label === "Creator & Affiliate Hub" ? "creator-hub" :
            section.label === "Shared Tools" ? "shared-tools" :
            undefined;
          return (
          <div key={section.label} className="mb-4" data-tour={tourId}>
            {!collapsed && (
              <div className="mb-1 px-2 flex items-center gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-foreground)]/60">
                  {section.label}
                </p>
                {section.description && (
                  <HelpCircle
                    className="h-3 w-3 shrink-0 cursor-help transition-colors opacity-40 hover:opacity-100"
                    style={{ color: 'var(--muted-foreground)' }}
                    onMouseEnter={(e) => showTooltip(e, section.description!)}
                    onMouseLeave={hideTooltip}
                  />
                )}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-[var(--accent)]/10 text-[var(--accent)] font-medium"
                        : "text-[var(--sidebar-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
                      collapsed && "justify-center px-2"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-[var(--accent)]")} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
          );
        })}
      </nav>

      {/* Role indicator */}
      <div className="border-t border-[var(--border)] p-3">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-foreground)]">
              {activeRole === "brand" ? "G" : "L"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{activeRole === "brand" ? "Gosia" : "Lexi"}</p>
              <p className="text-xs text-[var(--muted-foreground)] truncate">
                {activeRole === "brand" ? "Brand & Community" : "Creator & Affiliate"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--accent-foreground)]">
              {activeRole === "brand" ? "G" : "L"}
            </div>
          </div>
        )}
      </div>
      {/* Help tooltip */}
      {tooltip && (
        <div
          className="fixed z-[9999] w-[200px] rounded-md border px-2.5 py-1.5 text-xs shadow-lg pointer-events-none"
          style={{
            top: tooltip.top,
            left: tooltip.left,
            transform: 'translateY(-50%)',
            backgroundColor: 'var(--popover)',
            borderColor: 'var(--border)',
            color: 'var(--popover-foreground)',
          }}
        >
          {tooltip.text}
        </div>
      )}
    </aside>
  );
}
