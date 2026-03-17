"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tag, DollarSign, ShoppingCart, Plus, AlertTriangle,
  Copy, Instagram, Music2
} from "lucide-react";

interface AffiliateCode {
  id: string;
  creatorHandle: string;
  creatorName: string;
  code: string;
  platform: "Instagram" | "TikTok" | "Both";
  discount: string;
  status: "active" | "expired" | "paused";
  uses: number;
  revenue: number;
  expiresDate: string;
  expiringSoon: boolean;
}

const codes: AffiliateCode[] = [
  { id: "AC-001", creatorHandle: "@mixmaster_mike", creatorName: "Mike Chen", code: "MIKE15", platform: "Both", discount: "15%", status: "active", uses: 89, revenue: 4280, expiresDate: "Apr 30, 2026", expiringSoon: false },
  { id: "AC-002", creatorHandle: "@cocktail_queen", creatorName: "Lisa Thompson", code: "QUEEN20", platform: "Both", discount: "20%", status: "active", uses: 72, revenue: 3950, expiresDate: "Mar 31, 2026", expiringSoon: true },
  { id: "AC-003", creatorHandle: "@home_bartender", creatorName: "James Rodriguez", code: "HOMEBARTEND", platform: "Instagram", discount: "15%", status: "active", uses: 52, revenue: 2140, expiresDate: "May 15, 2026", expiringSoon: false },
  { id: "AC-004", creatorHandle: "@drinkswithdan", creatorName: "Dan Foster", code: "DAN10", platform: "Both", discount: "10%", status: "active", uses: 38, revenue: 1890, expiresDate: "Apr 15, 2026", expiringSoon: false },
  { id: "AC-005", creatorHandle: "@party_host_pro", creatorName: "Kayla Stevens", code: "PARTY15", platform: "Instagram", discount: "15%", status: "active", uses: 34, revenue: 1650, expiresDate: "Mar 20, 2026", expiringSoon: true },
  { id: "AC-006", creatorHandle: "@sippingpretty", creatorName: "Aria Patel", code: "SIPPY10", platform: "Instagram", discount: "10%", status: "active", uses: 31, revenue: 1420, expiresDate: "Jun 1, 2026", expiringSoon: false },
  { id: "AC-007", creatorHandle: "@nola_bartender", creatorName: "Antoine Dupree", code: "NOLA15", platform: "Instagram", discount: "15%", status: "active", uses: 18, revenue: 920, expiresDate: "Apr 30, 2026", expiringSoon: false },
  { id: "AC-008", creatorHandle: "@classiccocktails", creatorName: "William Hart", code: "CLASSIC10", platform: "Instagram", discount: "10%", status: "active", uses: 14, revenue: 680, expiresDate: "May 31, 2026", expiringSoon: false },
  { id: "AC-009", creatorHandle: "@tiki_tina", creatorName: "Tina Nguyen", code: "TIKI20", platform: "TikTok", discount: "20%", status: "active", uses: 11, revenue: 520, expiresDate: "Mar 18, 2026", expiringSoon: true },
  { id: "AC-010", creatorHandle: "@weekend_mixologist", creatorName: "Ryan O'Brien", code: "WEEKENDMIX", platform: "TikTok", discount: "15%", status: "expired", uses: 8, revenue: 340, expiresDate: "Mar 10, 2026", expiringSoon: false },
];

const statusBadgeVariant: Record<string, "success" | "error" | "warning"> = {
  active: "success",
  expired: "error",
  paused: "warning",
};

export default function CodesPage() {
  const activeCodes = codes.filter((c) => c.status === "active").length;
  const totalUses = codes.reduce((s, c) => s + c.uses, 0);
  const totalRevenue = codes.reduce((s, c) => s + c.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Affiliate Codes & Links</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Manage creator discount codes and tracking links</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Create Code
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Active Codes" value={activeCodes} icon={<Tag className="h-4 w-4" />} />
        <StatCard label="Total Uses" value={totalUses} icon={<ShoppingCart className="h-4 w-4" />} />
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 14.2, direction: "up", isPositive: true, label: "this month" }}
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Creator</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Code</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Platform</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Discount</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Uses</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Revenue</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Expires</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((code) => (
                  <tr
                    key={code.id}
                    className={`border-b border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors ${
                      code.expiringSoon ? "bg-amber-500/5" : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div>
                        <p className="text-sm font-medium">{code.creatorHandle}</p>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{code.creatorName}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <code className="text-sm font-mono font-semibold bg-[var(--muted)] px-2 py-0.5 rounded">{code.code}</code>
                        <button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        {(code.platform === "Instagram" || code.platform === "Both") && <Instagram className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
                        {(code.platform === "TikTok" || code.platform === "Both") && <Music2 className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant="secondary" className="text-[10px]">{code.discount}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={statusBadgeVariant[code.status]} className="text-[10px] capitalize">{code.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-sm">{code.uses}</td>
                    <td className="px-5 py-3 text-sm font-medium">${code.revenue.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs ${code.expiringSoon ? "text-amber-400 font-medium" : ""} ${code.status === "expired" ? "text-red-400 line-through" : ""}`}>
                        {code.expiringSoon && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                        {code.expiresDate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
