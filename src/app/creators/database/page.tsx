"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search, Filter, Download, ChevronDown, ChevronUp,
  Instagram, Music2, ArrowUpDown, ChevronLeft, ChevronRight
} from "lucide-react";
import Link from "next/link";

interface Creator {
  id: string;
  handle: string;
  name: string;
  platform: "Instagram" | "TikTok" | "Both";
  tier: "Nano" | "Micro" | "Mid-Tier" | "Macro";
  niche: string;
  stage: string;
  score: number;
  followers: number;
  revenue: number;
  lastActive: string;
  partnership?: "Affiliate" | "Gifted" | "Paid" | "Ambassador";
}

const creators: Creator[] = [
  { id: "CR-001", handle: "@mixmaster_mike", name: "Mike Chen", platform: "Both", tier: "Mid-Tier", niche: "Mixology", stage: "active", score: 95, followers: 89000, revenue: 4280, lastActive: "Today" },
  { id: "CR-002", handle: "@cocktail_queen", name: "Lisa Thompson", platform: "Both", tier: "Macro", niche: "Lifestyle", stage: "gifted", score: 92, followers: 145000, revenue: 3950, lastActive: "Yesterday" },
  { id: "CR-003", handle: "@home_bartender", name: "James Rodriguez", platform: "Instagram", tier: "Micro", niche: "Home Bar", stage: "active", score: 87, followers: 35000, revenue: 2140, lastActive: "Today" },
  { id: "CR-004", handle: "@drinkswithdan", name: "Dan Foster", platform: "Both", tier: "Mid-Tier", niche: "Cocktails", stage: "approved", score: 85, followers: 67000, revenue: 1890, lastActive: "Mar 14" },
  { id: "CR-005", handle: "@party_host_pro", name: "Kayla Stevens", platform: "Both", tier: "Mid-Tier", niche: "Entertaining", stage: "active", score: 83, followers: 55000, revenue: 1650, lastActive: "Today" },
  { id: "CR-006", handle: "@sippingpretty", name: "Aria Patel", platform: "Instagram", tier: "Micro", niche: "Lifestyle", stage: "posted", score: 82, followers: 28000, revenue: 1420, lastActive: "Mar 15" },
  { id: "CR-007", handle: "@nola_bartender", name: "Antoine Dupree", platform: "Instagram", tier: "Micro", niche: "Bartending", stage: "onboarded", score: 80, followers: 31000, revenue: 920, lastActive: "Mar 13" },
  { id: "CR-008", handle: "@cocktail_enthusiast", name: "Sophia Martinez", platform: "Instagram", tier: "Micro", niche: "Cocktails", stage: "sourced", score: 78, followers: 12400, revenue: 0, lastActive: "Mar 12" },
  { id: "CR-009", handle: "@classiccocktails", name: "William Hart", platform: "Instagram", tier: "Micro", niche: "Classic Cocktails", stage: "first_sale", score: 76, followers: 19000, revenue: 680, lastActive: "Mar 14" },
  { id: "CR-010", handle: "@bar_cart_queen", name: "Jasmine Patel", platform: "Instagram", tier: "Micro", niche: "Home Decor", stage: "responded", score: 75, followers: 22000, revenue: 0, lastActive: "Mar 15" },
  { id: "CR-011", handle: "@craft_cocktails_la", name: "Derek Wang", platform: "Instagram", tier: "Micro", niche: "Cocktails", stage: "contacted", score: 72, followers: 18200, revenue: 0, lastActive: "Mar 10" },
  { id: "CR-012", handle: "@tiki_tina", name: "Tina Nguyen", platform: "TikTok", tier: "Nano", niche: "Tiki", stage: "active", score: 70, followers: 9400, revenue: 520, lastActive: "Mar 13" },
  { id: "CR-013", handle: "@boozy_brunch", name: "Olivia Martinez", platform: "Instagram", tier: "Micro", niche: "Brunch", stage: "inactive", score: 68, followers: 14000, revenue: 340, lastActive: "Feb 10" },
  { id: "CR-014", handle: "@home_bar_hero", name: "Tyler Brooks", platform: "TikTok", tier: "Nano", niche: "Home Bar", stage: "sourced", score: 65, followers: 4800, revenue: 0, lastActive: "Mar 11" },
  { id: "CR-015", handle: "@shake_stir_pour", name: "Alex Morgan", platform: "TikTok", tier: "Nano", niche: "Cocktails", stage: "inactive", score: 55, followers: 3200, revenue: 180, lastActive: "Feb 5" },
];

const tierBadgeVariant: Record<string, "default" | "secondary" | "warning" | "outline"> = {
  Nano: "secondary",
  Micro: "outline",
  "Mid-Tier": "default",
  Macro: "warning",
};

const stageColors: Record<string, string> = {
  sourced: "bg-slate-400",
  contacted: "bg-blue-400",
  responded: "bg-sky-400",
  approved: "bg-emerald-400",
  onboarded: "bg-violet-400",
  gifted: "bg-pink-400",
  posted: "bg-orange-400",
  first_sale: "bg-yellow-400",
  active: "bg-green-500",
  inactive: "bg-gray-500",
};

type SortField = "score" | "followers" | "revenue" | "lastActive";
type SortDir = "asc" | "desc";

function formatFollowers(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = creators
    .filter((c) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return c.handle.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.niche.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortField === "score") return (a.score - b.score) * dir;
      if (sortField === "followers") return (a.followers - b.followers) * dir;
      if (sortField === "revenue") return (a.revenue - b.revenue) * dir;
      return 0;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 text-[var(--muted-foreground)]" />;
    return sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Creator Database</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{creators.length} creators in your program</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          <Download className="h-3.5 w-3.5 mr-1" />
          Export CSV
        </Button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search by handle, name, or niche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-4 py-2 text-sm placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-[var(--muted-foreground)]" />
          {["Niche", "Tier", "Platform", "Status", "Partnership"].map((label) => (
            <Button key={label} variant="outline" size="sm" className="text-xs">
              {label} <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Creator</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Platform</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Tier</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Niche</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Stage</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3 cursor-pointer" onClick={() => toggleSort("score")}>
                    <div className="flex items-center gap-1">Score <SortIcon field="score" /></div>
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3 cursor-pointer" onClick={() => toggleSort("followers")}>
                    <div className="flex items-center gap-1">Followers <SortIcon field="followers" /></div>
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3 cursor-pointer" onClick={() => toggleSort("revenue")}>
                    <div className="flex items-center gap-1">Revenue <SortIcon field="revenue" /></div>
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((creator) => (
                  <tr
                    key={creator.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-3">
                      <Link href={`/creators/database/${creator.id}`} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[var(--muted)] flex items-center justify-center text-xs font-semibold shrink-0">
                          {creator.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{creator.handle}</p>
                          <p className="text-[10px] text-[var(--muted-foreground)]">{creator.name}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        {(creator.platform === "Instagram" || creator.platform === "Both") && <Instagram className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
                        {(creator.platform === "TikTok" || creator.platform === "Both") && <Music2 className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={tierBadgeVariant[creator.tier]} className="text-[10px]">{creator.tier}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs">{creator.niche}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${stageColors[creator.stage]}`} />
                        <span className="text-xs capitalize">{creator.stage.replace("_", " ")}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-10 rounded-full bg-[var(--muted)] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${creator.score}%`,
                              backgroundColor: creator.score >= 80 ? "#22c55e" : creator.score >= 60 ? "#f59e0b" : "#ef4444",
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium">{creator.score}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs">{formatFollowers(creator.followers)}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-medium">{creator.revenue > 0 ? `$${creator.revenue.toLocaleString()}` : "—"}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs ${creator.lastActive === "Today" ? "text-emerald-400 font-medium" : "text-[var(--muted-foreground)]"}`}>
                        {creator.lastActive}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border)]">
            <span className="text-xs text-[var(--muted-foreground)]">Showing 1-{filtered.length} of {filtered.length}</span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled className="text-xs h-7">
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button variant="default" size="sm" className="text-xs h-7 w-7 p-0">1</Button>
              <Button variant="outline" size="sm" disabled className="text-xs h-7">
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
