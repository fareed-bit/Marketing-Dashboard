"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe, TrendingUp, DollarSign, FileText, Instagram,
  Music2, Users
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const reachData = [
  { date: "Mar 1", organic: 32000, creator: 18000 },
  { date: "Mar 3", organic: 28000, creator: 22000 },
  { date: "Mar 5", organic: 35000, creator: 25000 },
  { date: "Mar 7", organic: 42000, creator: 28000 },
  { date: "Mar 9", organic: 38000, creator: 32000 },
  { date: "Mar 11", organic: 45000, creator: 35000 },
  { date: "Mar 13", organic: 52000, creator: 38000 },
  { date: "Mar 15", organic: 48000, creator: 42000 },
];

const organicMetrics = [
  { label: "Total Reach", value: "82.5K" },
  { label: "Engagement Rate", value: "5.4%" },
  { label: "Follower Growth", value: "+1,240" },
  { label: "Content Published", value: "18" },
  { label: "Avg Views/Post", value: "5.3K" },
  { label: "Website Clicks", value: "458" },
];

const creatorMetrics = [
  { label: "Total Reach", value: "120K" },
  { label: "Creator Posts", value: "34" },
  { label: "Total Clicks", value: "17.5K" },
  { label: "Total Orders", value: "348" },
  { label: "Revenue", value: "$18,640" },
  { label: "Avg CVR", value: "2.0%" },
];

export default function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Marketing Performance</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Combined view of organic social and creator/affiliate performance</p>
      </div>

      {/* Headline Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Reach"
          value="202.5K"
          icon={<Globe className="h-4 w-4" />}
          trend={{ value: 18.4, direction: "up", isPositive: true, label: "vs. last month" }}
        />
        <StatCard
          label="Total Engagement"
          value="12.8K"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 12.1, direction: "up", isPositive: true, label: "vs. last month" }}
        />
        <StatCard
          label="Total Revenue"
          value="$18,640"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 15.3, direction: "up", isPositive: true, label: "vs. last month" }}
        />
        <StatCard
          label="Total Content"
          value="52"
          icon={<FileText className="h-4 w-4" />}
        />
      </div>

      {/* Two-Column Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organic Social */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Instagram className="h-4 w-4" />
                <Music2 className="h-4 w-4" />
              </div>
              Organic Social
              <Badge variant="secondary" className="text-[10px] ml-auto">This Month</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {organicMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted-foreground)]">{metric.label}</span>
                  <span className="text-sm font-semibold">{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Creator / Affiliate */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Creator / Affiliate
              <Badge variant="secondary" className="text-[10px] ml-auto">This Month</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {creatorMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted-foreground)]">{metric.label}</span>
                  <span className="text-sm font-semibold">{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Combined Reach Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Combined Reach Over Time</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#d4943a" }} />
              <span className="text-xs text-[var(--muted-foreground)]">Organic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#60a5fa" }} />
              <span className="text-xs text-[var(--muted-foreground)]">Creator</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={reachData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => {
                    const num = Number(value);
                    return `${(num / 1000).toFixed(1)}K`;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="organic"
                  stroke="#d4943a"
                  fill="#d4943a"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  name="Organic"
                />
                <Area
                  type="monotone"
                  dataKey="creator"
                  stroke="#60a5fa"
                  fill="#60a5fa"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  name="Creator"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
