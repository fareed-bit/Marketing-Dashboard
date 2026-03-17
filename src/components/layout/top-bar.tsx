"use client";

import { useRoleStore } from "@/stores/use-role-store";
import { useThemeStore } from "@/stores/use-theme-store";
import { Bell, Moon, Sun, Search, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTourStore } from "@/stores/use-tour-store";

export function TopBar() {
  const { activeRole, setActiveRole, userName } = useRoleStore();
  const { theme, toggleTheme } = useThemeStore();
  const { startTour } = useTourStore();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md px-6">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search creators, content, campaigns..."
            className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--muted)] pl-9 pr-3 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Role switcher */}
        <div data-tour="role-switcher" className="flex items-center rounded-lg border border-[var(--border)] p-0.5 mr-2">
          <button
            onClick={() => setActiveRole("brand")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              activeRole === "brand"
                ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            Gosia
          </button>
          <button
            onClick={() => setActiveRole("creator")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              activeRole === "creator"
                ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            Lexi
          </button>
        </div>

        {/* Tour help */}
        <button
          onClick={startTour}
          className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          title="Take a tour"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Theme toggle */}
        <button
          data-tour="theme-toggle"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
