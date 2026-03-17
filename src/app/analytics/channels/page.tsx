"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, Music2, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

const channelData = [
  { metric: "Reach", instagram: 48100, tiktok: 34400, creator: 120000 },
  { metric: "Engagement", instagram: 5800, tiktok: 4200, creator: 2800 },
  { metric: "Clicks", instagram: 234, tiktok: 224, creator: 17560 },
  { metric: "Content", instagram: 12, tiktok: 6, creator: 34 },
];

interface ChannelMetrics {
  name: string;
  icon: React.ReactNode;
  color: string;
  metrics: { label: string; value: string }[];
}

const channels: ChannelMetrics[] = [
  {
    name: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
    color: "#d4943a",
    metrics: [
      { label: "Followers", value: "24.8K" },
      { label: "Reach", value: "48.1K" },
      { label: "Engagement Rate", value: "5.1%" },
      { label: "Follower Growth", value: "+820" },
      { label: "Posts Published", value: "12" },
      { label: "Avg Views/Post", value: "4.0K" },
      { label: "Website Clicks", value: "234" },
      { label: "Saves Rate", value: "3.2%" },
    ],
  },
  {
    name: "TikTok",
    icon: <Music2 className="h-5 w-5" />,
    color: "#60a5fa",
    metrics: [
      { label: "Followers", value: "12.3K" },
      { label: "Reach", value: "34.4K" },
      { label: "Engagement Rate", value: "6.8%" },
      { label: "Follower Growth", value: "+420" },
      { label: "Posts Published", value: "6" },
      { label: "Avg Views/Post", value: "5.7K" },
      { label: "Profile Visits", value: "1,240" },
      { label: "Share Rate", value: "4.5%" },
    ],
  },
  {
    name: "Creator Program",
    icon: <Users className="h-5 w-5" />,
    color: "#a78bfa",
    metrics: [
      { label: "Active Creators", value: "18" },
      { label: "Total Reach", value: "120K" },
      { label: "Content Published", value: "34" },
      { label: "Total Clicks", value: "17.5K" },
      { label: "Total Orders", value: "348" },
      { label: "Revenue", value: "$18,640" },
      { label: "Avg CVR", value: "2.0%" },
      { label: "Avg ROI", value: "2.68x" },
    ],
  },
];

export default function ChannelsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Channel Comparison</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Compare performance across all marketing channels</p>
      </div>

      {/* Channel Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {channels.map((channel) => (
          <Card key={channel.name} className="hover:border-[var(--accent)]/30 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <div style={{ color: channel.color }}>{channel.icon}</div>
                {channel.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {channel.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between">
                    <span className="text-xs text-[var(--muted-foreground)]">{metric.label}</span>
                    <span className="text-sm font-semibold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle>Channel Comparison</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#d4943a" }} />
              <span className="text-xs text-[var(--muted-foreground)]">Instagram</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#60a5fa" }} />
              <span className="text-xs text-[var(--muted-foreground)]">TikTok</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#a78bfa" }} />
              <span className="text-xs text-[var(--muted-foreground)]">Creator</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="metric" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v.toString()} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => {
                    const num = Number(value);
                    return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : String(value);
                  }}
                />
                <Legend />
                <Bar dataKey="instagram" fill="#d4943a" radius={[4, 4, 0, 0]} name="Instagram" />
                <Bar dataKey="tiktok" fill="#60a5fa" radius={[4, 4, 0, 0]} name="TikTok" />
                <Bar dataKey="creator" fill="#a78bfa" radius={[4, 4, 0, 0]} name="Creator" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { insight: "TikTok has 33% higher engagement rate than Instagram, driven by short-form cocktail content", badge: "Engagement" },
              { insight: "Creator program drives 95% of total website clicks — organic social needs stronger CTAs", badge: "Traffic" },
              { insight: "Instagram Reels outperform Carousels by 2.1x in reach, but Carousels have higher save rates", badge: "Content" },
              { insight: "Creator-driven revenue ($18.6K) exceeds monthly paid media spend ($3.5K) by 5.3x", badge: "ROI" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-3">
                <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">{item.badge}</Badge>
                <p className="text-sm text-[var(--muted-foreground)]">{item.insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
