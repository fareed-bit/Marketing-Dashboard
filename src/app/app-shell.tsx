"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { useThemeStore } from "@/stores/use-theme-store";
import { WelcomeTour } from "@/components/tour/welcome-tour";
import { TourAutoStart } from "@/components/tour/tour-auto-start";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-56">
        <TopBar />
        <main className="p-6">{children}</main>
      </div>
      <WelcomeTour />
      <TourAutoStart />
    </div>
  );
}
