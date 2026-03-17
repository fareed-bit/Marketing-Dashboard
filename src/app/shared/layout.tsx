"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Image, Handshake, MessageCircle, Wallet
} from "lucide-react";

const tabs = [
  { label: "Asset Library", href: "/shared/assets", icon: Image },
  { label: "Collaborations", href: "/shared/collaborations", icon: Handshake },
  { label: "Comms Hub", href: "/shared/comms", icon: MessageCircle },
  { label: "Budget", href: "/shared/budget", icon: Wallet },
];

export default function SharedLayout({ children }: { children: React.ReactNode }) {
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
