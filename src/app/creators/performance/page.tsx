"use client";

import { useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MousePointer, ShoppingCart, DollarSign, TrendingUp,
  FileText, ArrowUpDown, ChevronUp, ChevronDown
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

interface CreatorPerf {
  id: string;
  handle: string;
  name: string;
  tier: string;
  posts: number;
  clicks: number;
  orders: number;
  revenue: number;
  cvr: number;
  score: number;
}

const performanceData: CreatorPerf[] = [
  { id: "1", handle: "@mixmaster_mike", name: "Mike Chen", tier: "Mid-Tier", posts: 12, clicks: 3420, orders: 89, revenue: 4280, cvr: 2.6, score: 95 },
  { id: "2", handle: "@cocktail_queen", name: "Lisa Thompson", tier: "Macro", posts: 8, clicks: 5100, orders: 72, revenue: 3950, cvr: 1.4, score: 92 },
  { id: "3", handle: "@home_bartender", name: "James Rodriguez", tier: "Micro", posts: 15, clicks: 1840, orders: 52, revenue: 2140, cvr: 2.8, score: 87 },
  { id: "4", handle: "@drinkswithdan", name: "Dan Foster", tier: "Mid-Tier", posts: 6, clicks: 2200, orders: 38, revenue: 1890, cvr: 1.7, score: 85 },
  { id: "5", handle: "@party_host_pro", name: "Kayla Stevens", tier: "Mid-Tier", posts: 9, clicks: 1920, orders: 34, revenue: 1650, cvr: 1.8, score: 83 },
  { id: "6", handle: "@sippingpretty", name: "Aria Patel", tier: "Micro", posts: 10, clicks: 1380, orders: 31, revenue: 1420, cvr: 2.2, score: 82 },
  { id: "7", handle: "@nola_bartender", name: "Antoine Dupree", tier: "Micro", posts: 4, clicks: 980, orders: 18, revenue: 920, cvr: 1.8, score: 80 },
  { id: "8", handle: "@classiccocktails", name: "William Hart", tier: "Micro", posts: 7, clicks: 720, orders: 14, revenue: 680, cvr: 1.9, score: 76 },
];

const chartData = performanceData.slice(0, 5).map((c) => ({
  name: c.handle.replace("@", ""),
  revenue: c.revenue,
}));

type SortField = "posts" | "clicks" | "orders" | "revenue" | "cvr" | "score";
type SortDir = "asc" | "desc";
type DateRange = "7d" | "30d" | "90d";

const tierBadgeVariant: Record<string, "default" | "secondary" | "warning" | "outline"> = {
  Nano: "secondary",
  Micro: "outline",
  "Mid-Tier": "default",
  Macro: "warning",
};

export default function CreatorPerformancePage() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [sortField, setSortField] = useState<SortField>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const totalClicks = performanceData.reduce((s, c) => s + c.clicks, 0);
  const totalOrders = performanceData.reduce((s, c) => s + c.orders, 0);
  const totalRevenue = performanceData.reduce((s, c) => s + c.revenue, 0);
  const avgCVR = totalOrders / totalClicks * 100;
  const totalContent = performanceData.reduce((s, c) => s + c.posts, 0);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  const sorted = [...performanceData].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    return (a[sortField] - b[sortField]) * dir;
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
          <h1 className="text-2xl font-bold tracking-tight">Creator Performance</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Track clicks, orders, and revenue by creator</p>
        </div>
        <div className="flex items-center gap-1">
          {(["7d", "30d", "90d"] as DateRange[]).map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange(range)}
              className="text-xs"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Clicks" value={totalClicks.toLocaleString()} icon={<MousePointer className="h-4 w-4" />} />
        <StatCard label="Total Orders" value={totalOrders} icon={<ShoppingCart className="h-4 w-4" />} />
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 18.5, direction: "up", isPositive: true, label: "vs. prev period" }}
        />
        <StatCard label="Avg CVR" value={`${avgCVR.toFixed(1)}%`} icon={<TrendingUp className="h-4 w-4" />} />
        <StatCard label="Total Content" value={totalContent} icon={<FileText className="h-4 w-4" />} />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Revenue by Creator (Top 5)</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}K`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
                <Bar dataKey="revenue" fill="#d4943a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Performance by Creator</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Creator</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Tier</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3 cursor-pointer" onClick={() => toggleSort("posts")}>
                    <span className="flex items-center gap-1">Posts <SortIcon field="posts" /></span>
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3 cursor-pointer" onClick={() => toggleSort("clicks")}>
                    <span className="flex items-center gap-1">Clicks <SortIcon field="clicks" /></span>
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3 cursor-pointer" onClick={() => toggleSort("orders")}>
                    <span className="flex items-center gap-1">Orders <SortIcon field="orders" /></span>
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3 cursor-pointer" onClick={() => toggleSort("revenue")}>
                    <span className="flex items-center gap-1">Revenue <SortIcon field="revenue" /></span>
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3 cursor-pointer" onClick={() => toggleSort("cvr")}>
                    <span className="flex items-center gap-1">CVR% <SortIcon field="cvr" /></span>
                  </th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3 cursor-pointer" onClick={() => toggleSort("score")}>
                    <span className="flex items-center gap-1">Score <SortIcon field="score" /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((c) => (
                  <tr key={c.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors">
                    <td className="px-5 py-3">
                      <div>
                        <p className="text-sm font-medium">{c.handle}</p>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{c.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={tierBadgeVariant[c.tier] || "secondary"} className="text-[10px]">{c.tier}</Badge>
                    </td>
                    <td className="px-5 py-3 text-sm">{c.posts}</td>
                    <td className="px-5 py-3 text-sm">{c.clicks.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm">{c.orders}</td>
                    <td className="px-5 py-3 text-sm font-medium">${c.revenue.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm">{c.cvr.toFixed(1)}%</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-10 rounded-full bg-[var(--muted)] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${c.score}%`,
                              backgroundColor: c.score >= 80 ? "#22c55e" : c.score >= 60 ? "#f59e0b" : "#ef4444",
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium">{c.score}</span>
                      </div>
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
