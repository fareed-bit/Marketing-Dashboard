"use client";

import { useRoleStore } from "@/stores/use-role-store";
import { useSession } from "next-auth/react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, Eye, TrendingUp, DollarSign, MessageSquare, FileText,
  GitBranch, Mail, AlertTriangle, ArrowRight, Clock,
  Instagram, Music2
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { activeRole } = useRoleStore();
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] ?? "there";
  const today = new Date();
  const greeting = today.getHours() < 12 ? "Good morning" : today.getHours() < 17 ? "Good afternoon" : "Good evening";
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, {userName}
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">{dateStr}</p>
      </div>

      {/* Critical Alert Banner */}
      <div data-tour="alert-banner" className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15">
          <AlertTriangle className="h-4 w-4 text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Barsys 360 inventory alert — units running low in warehouse</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">From Austin, Operations — 2 hours ago</p>
        </div>
        <Link href="/brand/ops-feed">
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
      </div>

      {/* KPI Summary Cards */}
      <div data-tour="kpi-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Followers"
          value="77.7K"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 2.3, direction: "up", isPositive: true, label: "vs. last week" }}
        />
        <StatCard
          label="Avg Engagement Rate"
          value="4.8%"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 0.3, direction: "up", isPositive: true, label: "vs. last week" }}
        />
        <StatCard
          label="Active Creators"
          value="34"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 6.2, direction: "up", isPositive: true, label: "vs. last month" }}
        />
        <StatCard
          label="Creator Revenue"
          value="$12,400"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 18.0, direction: "up", isPositive: true, label: "vs. last month" }}
        />
      </div>

      {/* Two-Column Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Quick View */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-[#E1306C]" />
              Brand & Social
            </CardTitle>
            <Link href="/brand">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Go to Hub <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <QuickStat label="Posts this week" value="8 / 10" icon={<FileText className="h-3.5 w-3.5" />} />
              <QuickStat label="Avg engagement" value="4.2%" icon={<TrendingUp className="h-3.5 w-3.5" />} />
              <QuickStat label="DMs pending" value="14" icon={<MessageSquare className="h-3.5 w-3.5" />} alert />
              <QuickStat label="Briefs in progress" value="3" icon={<FileText className="h-3.5 w-3.5" />} />
              <QuickStat label="Upcoming activation" value="March 22" icon={<Clock className="h-3.5 w-3.5" />} />
            </div>
          </CardContent>
        </Card>

        {/* Creator Quick View */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--color-brand-400)]" />
              Creator & Affiliate
            </CardTitle>
            <Link href="/creators">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Go to Hub <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <QuickStat label="Pipeline: contacted" value="12 creators" icon={<GitBranch className="h-3.5 w-3.5" />} />
              <QuickStat label="Awaiting first post" value="6 creators" icon={<Clock className="h-3.5 w-3.5" />} />
              <QuickStat label="Follow-ups due" value="4" icon={<Mail className="h-3.5 w-3.5" />} alert />
              <QuickStat label="Top performer" value="@mixologist_maria" icon={<TrendingUp className="h-3.5 w-3.5" />} />
              <QuickStat label="Active campaigns" value="3" icon={<Eye className="h-3.5 w-3.5" />} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--muted)]">
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-lg border border-[var(--border)] p-3"
                >
                  <AlertTriangle className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${
                    a.priority === "critical" ? "text-red-400" : a.priority === "high" ? "text-amber-400" : "text-blue-400"
                  }`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium">{a.text}</p>
                    <Badge variant={a.priority === "critical" ? "error" : a.priority === "high" ? "warning" : "secondary"} className="mt-1">
                      {a.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickStat({ label, value, icon, alert }: { label: string; value: string; icon: React.ReactNode; alert?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className={`text-sm font-medium ${alert ? "text-amber-400" : ""}`}>{value}</span>
    </div>
  );
}

const activities = [
  { icon: <FileText className="h-3.5 w-3.5 text-emerald-400" />, text: 'Brief "Spring Martini Mix" approved by Kirti', time: "10:32 AM" },
  { icon: <Instagram className="h-3.5 w-3.5 text-[#E1306C]" />, text: "@cocktail_queen posted UGC featuring Barsys 360", time: "9:15 AM" },
  { icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />, text: "Austin: Inventory update — Barsys 360 stock low", time: "8:45 AM" },
  { icon: <Users className="h-3.5 w-3.5 text-blue-400" />, text: 'Campaign "Easter Entertaining Guide" launched', time: "8:30 AM" },
  { icon: <Mail className="h-3.5 w-3.5 text-purple-400" />, text: "3 new creator responses received overnight", time: "8:00 AM" },
  { icon: <Music2 className="h-3.5 w-3.5 text-cyan-400" />, text: "TikTok: Reel 'POV: Hosting 101' hit 25K views", time: "Yesterday" },
];

const alerts = [
  { text: "Creator @sips_with_sam: no post in 14 days", priority: "high" as const },
  { text: "Content due tomorrow: 2 items not approved", priority: "critical" as const },
  { text: "3 affiliate codes expiring in 5 days", priority: "high" as const },
  { text: "Brief 'Easter Carousel' overdue by 2 days", priority: "critical" as const },
  { text: "Outreach follow-up due: 4 creators", priority: "medium" as const },
];
