"use client";

import { useThemeStore } from "@/stores/use-theme-store";
import { Bell, Moon, Sun, Search, HelpCircle, LogOut, ChevronDown } from "lucide-react";
import { useTourStore } from "@/stores/use-tour-store";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function TopBar() {
  const { theme, toggleTheme } = useThemeStore();
  const { startTour } = useTourStore();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = session?.user?.name ?? "";
  const userEmail = session?.user?.email ?? "";
  const userImage = session?.user?.image;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* User menu */}
        {session && (
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[var(--muted)] transition-colors"
            >
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                  {initials}
                </span>
              )}
              <span className="text-sm font-medium text-[var(--foreground)] max-w-[120px] truncate">
                {userName}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-xl py-1 z-50">
                <div className="px-3 py-2 border-b border-[var(--border)]">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">{userName}</p>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">{userEmail}</p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
