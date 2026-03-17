"use client";

import { useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, TrendingUp, Users, Globe, Instagram, Music2 } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

const engagementData = [
  { date: "Mar 10", instagram: 4.2, tiktok: 5.8 },
  { date: "Mar 11", instagram: 4.5, tiktok: 6.1 },
  { date: "Mar 12", instagram: 3.9, tiktok: 5.5 },
  { date: "Mar 13", instagram: 5.1, tiktok: 7.2 },
  { date: "Mar 14", instagram: 4.8, tiktok: 6.8 },
  { date: "Mar 15", instagram: 5.3, tiktok: 7.5 },
  { date: "Mar 16", instagram: 4.9, tiktok: 6.4 },
];

const formatPerformanceData = [
  { format: "Reels", views: 28400, engagement: 5.2 },
  { format: "Carousel", views: 12800, engagement: 4.1 },
  { format: "Stories", views: 8200, engagement: 3.8 },
  { format: "TikTok", views: 45600, engagement: 6.9 },
];

type DateRange = "7d" | "30d" | "90d";
type PlatformView = "instagram" | "tiktok" | "both";

export default function PerformancePage() {
  const [dateRange, setDateRange] = useState<DateRange>("7d");
  const [platform, setPlatform] = useState<PlatformView>("both");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Social Performance</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Track engagement, reach, and growth across platforms</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
        <div className="flex items-center gap-1">
          <Button
            variant={platform === "instagram" ? "default" : "outline"}
            size="sm"
            onClick={() => setPlatform("instagram")}
            className="text-xs"
          >
            <Instagram className="h-3 w-3 mr-1" />
            Instagram
          </Button>
          <Button
            variant={platform === "tiktok" ? "default" : "outline"}
            size="sm"
            onClick={() => setPlatform("tiktok")}
            className="text-xs"
          >
            <Music2 className="h-3 w-3 mr-1" />
            TikTok
          </Button>
          <Button
            variant={platform === "both" ? "default" : "outline"}
            size="sm"
            onClick={() => setPlatform("both")}
            className="text-xs"
          >
            Both
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Views"
          value="95.0K"
          icon={<Eye className="h-4 w-4" />}
          trend={{ value: 12.4, direction: "up", isPositive: true, label: "vs. prev period" }}
        />
        <StatCard
          label="Avg Engagement Rate"
          value="5.4%"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 0.8, direction: "up", isPositive: true, label: "vs. prev period" }}
        />
        <StatCard
          label="Follower Growth"
          value="+1,240"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 15.2, direction: "up", isPositive: true, label: "vs. prev period" }}
        />
        <StatCard
          label="Total Reach"
          value="82.5K"
          icon={<Globe className="h-4 w-4" />}
          trend={{ value: 8.1, direction: "up", isPositive: true, label: "vs. prev period" }}
        />
      </div>

      {/* Engagement Rate Line Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Engagement Rate Over Time</CardTitle>
          <div className="flex items-center gap-3">
            {(platform === "both" || platform === "instagram") && (
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#d4943a" }} />
                <span className="text-xs text-[var(--muted-foreground)]">Instagram</span>
              </div>
            )}
            {(platform === "both" || platform === "tiktok") && (
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#60a5fa" }} />
                <span className="text-xs text-[var(--muted-foreground)]">TikTok</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => `${value}%`}
                />
                {(platform === "both" || platform === "instagram") && (
                  <Line
                    type="monotone"
                    dataKey="instagram"
                    stroke="#d4943a"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#d4943a" }}
                    name="Instagram"
                  />
                )}
                {(platform === "both" || platform === "tiktok") && (
                  <Line
                    type="monotone"
                    dataKey="tiktok"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#60a5fa" }}
                    name="TikTok"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Content Performance by Format */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Content Performance by Format</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={formatPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="format" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="views" fill="#d4943a" radius={[4, 4, 0, 0]} name="Views" />
                <Bar yAxisId="right" dataKey="engagement" fill="#60a5fa" radius={[4, 4, 0, 0]} name="Eng. Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Top Performing Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: "POV: Making an Espresso Martini with Barsys", platform: "TikTok", format: "Video", views: "45.6K", engagement: "7.2%", date: "Mar 13" },
              { title: "Spring Martini Mix — 3 Ways", platform: "IG", format: "Reel", views: "18.2K", engagement: "5.8%", date: "Mar 10" },
              { title: "5 Easy Cocktails for Beginners", platform: "IG", format: "Carousel", views: "12.8K", engagement: "4.9%", date: "Mar 11" },
              { title: "Aperol Spritz Season is Here", platform: "IG", format: "Reel", views: "10.4K", engagement: "5.1%", date: "Mar 14" },
              { title: "Cocktail Hour LIVE Replay", platform: "IG", format: "Reel", views: "8.0K", engagement: "4.3%", date: "Mar 15" },
            ].map((post, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 hover:bg-[var(--muted)]/30 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-bold text-[var(--muted-foreground)] w-5">{i + 1}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{post.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[10px]">{post.platform}</Badge>
                      <Badge variant="secondary" className="text-[10px]">{post.format}</Badge>
                      <span className="text-[10px] text-[var(--muted-foreground)]">{post.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{post.views}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-400">{post.engagement}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">eng. rate</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
