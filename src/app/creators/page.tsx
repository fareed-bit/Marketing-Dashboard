"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pipelineStages } from "@/config/pipeline-stages";
import {
  Users, UserCheck, GitBranch, DollarSign, TrendingUp,
  AlertTriangle, Clock, Tag, Crown
} from "lucide-react";
import Link from "next/link";

const pipelineCounts: Record<string, number> = {
  sourced: 12, contacted: 8, responded: 5, approved: 4,
  onboarded: 3, gifted: 6, posted: 4, first_sale: 2,
  active: 18, inactive: 7,
};

const topPerformers = [
  { handle: "@mixmaster_mike", name: "Mike Chen", tier: "Mid-Tier", revenue: "$4,280", posts: 12, trend: "+18%" },
  { handle: "@cocktail_queen", name: "Lisa Thompson", tier: "Macro", revenue: "$3,950", posts: 8, trend: "+12%" },
  { handle: "@home_bartender", name: "James Rodriguez", tier: "Micro", revenue: "$2,140", posts: 15, trend: "+25%" },
  { handle: "@drinkswithdan", name: "Dan Foster", tier: "Mid-Tier", revenue: "$1,890", posts: 6, trend: "+8%" },
  { handle: "@sippingpretty", name: "Aria Patel", tier: "Micro", revenue: "$1,420", posts: 10, trend: "+22%" },
];

const tierColors: Record<string, "default" | "secondary" | "warning" | "success"> = {
  Nano: "secondary",
  Micro: "outline" as "secondary",
  "Mid-Tier": "default",
  Macro: "warning",
};

const alerts = [
  { type: "warning", icon: Clock, message: "5 follow-ups due today", link: "/creators/outreach" },
  { type: "error", icon: AlertTriangle, message: "3 creators dormant for 21+ days", link: "/creators/roster" },
  { type: "warning", icon: Tag, message: "2 affiliate codes expiring this week", link: "/creators/codes" },
];

export default function CreatorsOverview() {
  const totalPipeline = Object.values(pipelineCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Creator Hub</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Manage your creator and affiliate program</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Creators"
          value={totalPipeline}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          label="Active Creators"
          value={pipelineCounts.active}
          icon={<UserCheck className="h-4 w-4" />}
          trend={{ value: 12.5, direction: "up", isPositive: true, label: "this month" }}
        />
        <StatCard
          label="In Pipeline"
          value={totalPipeline - pipelineCounts.active - pipelineCounts.inactive}
          icon={<GitBranch className="h-4 w-4" />}
        />
        <StatCard
          label="Monthly Revenue"
          value="$18,640"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 15.3, direction: "up", isPositive: true, label: "vs. last month" }}
        />
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div
              key={i}
              className={`rounded-lg border p-3 flex items-center gap-3 ${
                alert.type === "error"
                  ? "border-red-500/30 bg-red-500/5"
                  : "border-amber-500/30 bg-amber-500/5"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${alert.type === "error" ? "text-red-400" : "text-amber-400"}`} />
              <span className="text-sm flex-1">{alert.message}</span>
              <Link href={alert.link}>
                <Button variant="ghost" size="sm" className="text-xs">View</Button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pipeline Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Pipeline Summary
          </CardTitle>
          <Link href="/creators/pipeline">
            <Button variant="ghost" size="sm" className="text-xs">Full Pipeline</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {/* Mini bar chart */}
          <div className="flex rounded-lg overflow-hidden h-8 mb-4">
            {pipelineStages.map((stage) => {
              const count = pipelineCounts[stage.key] || 0;
              const percentage = (count / totalPipeline) * 100;
              return (
                <div
                  key={stage.key}
                  className="relative group transition-all hover:opacity-80"
                  style={{ width: `${percentage}%`, backgroundColor: stage.color, minWidth: count > 0 ? "20px" : "0" }}
                  title={`${stage.label}: ${count}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {percentage > 6 && (
                      <span className="text-[10px] font-bold text-white drop-shadow">{count}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3">
            {pipelineStages.map((stage) => (
              <div key={stage.key} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: stage.color }} />
                <span className="text-[10px] text-[var(--muted-foreground)]">{stage.label}</span>
                <span className="text-[10px] font-semibold">{pipelineCounts[stage.key]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-amber-400" />
            Top Performers
          </CardTitle>
          <Link href="/creators/performance">
            <Button variant="ghost" size="sm" className="text-xs">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topPerformers.map((creator, i) => (
              <div key={creator.handle} className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 hover:bg-[var(--muted)]/30 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-bold text-[var(--muted-foreground)] w-5">{i + 1}</span>
                  <div className="h-8 w-8 rounded-full bg-[var(--muted)] flex items-center justify-center text-xs font-semibold shrink-0">
                    {creator.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{creator.handle}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{creator.name}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] shrink-0">{creator.tier}</Badge>
                </div>
                <div className="flex items-center gap-6 shrink-0 ml-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{creator.revenue}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">revenue</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{creator.posts}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">posts</p>
                  </div>
                  <span className="text-xs font-medium text-emerald-400">{creator.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
