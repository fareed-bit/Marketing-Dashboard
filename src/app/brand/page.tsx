"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText, MessageSquare, Camera, Eye,
  AlertTriangle, Calendar, TrendingUp, Instagram
} from "lucide-react";
import Link from "next/link";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekContent = [
  { day: "Mon", items: [{ title: "Spring Martini Mix", format: "R", status: "published" }] },
  { day: "Tue", items: [{ title: "5 Easy Cocktails", format: "C", status: "approved" }] },
  { day: "Wed", items: [{ title: "POV: Hosting", format: "T", status: "in_production" }] },
  { day: "Thu", items: [{ title: "Aperol Spritz", format: "R", status: "briefed" }] },
  { day: "Fri", items: [{ title: "Friday Cocktail", format: "R", status: "scheduled" }] },
  { day: "Sat", items: [] },
  { day: "Sun", items: [{ title: "Week Recap", format: "R", status: "idea" }] },
];

const statusColors: Record<string, string> = {
  published: "bg-emerald-500",
  scheduled: "bg-green-500",
  approved: "bg-emerald-400",
  review: "bg-amber-500",
  in_production: "bg-purple-400",
  briefed: "bg-blue-400",
  idea: "bg-slate-400",
};

const formatLabels: Record<string, string> = { R: "Reel", C: "Carousel", T: "TikTok", S: "Story" };

export default function BrandOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Brand & Social Hub</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Daily overview for Gosia</p>
      </div>

      {/* Ops Alert Strip */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 flex items-center gap-3">
        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
        <div className="flex-1 text-sm">
          <span className="font-medium">Ops:</span> Barsys 360 stock low (45 units) &bull; TikTok Shop listing under review &bull; USPS delays in Northeast
        </div>
        <Link href="/brand/ops-feed">
          <Button variant="ghost" size="sm" className="text-xs">View All</Button>
        </Link>
      </div>

      {/* Today's Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's Posts" value="2" icon={<FileText className="h-4 w-4" />} />
        <StatCard
          label="DMs Pending"
          value="14"
          icon={<MessageSquare className="h-4 w-4" />}
          alertLevel="warning"
        />
        <StatCard label="Comments Pending" value="23" icon={<MessageSquare className="h-4 w-4" />} />
        <StatCard
          label="UGC Found Today"
          value="3"
          icon={<Camera className="h-4 w-4" />}
          trend={{ value: 50, direction: "up", isPositive: true, label: "vs. yesterday" }}
        />
      </div>

      {/* Mini Content Calendar */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            This Week
          </CardTitle>
          <Link href="/brand/calendar">
            <Button variant="ghost" size="sm" className="text-xs">Full Calendar</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekContent.map((day) => (
              <div key={day.day} className="text-center">
                <p className="text-xs font-medium text-[var(--muted-foreground)] mb-2">{day.day}</p>
                {day.items.length > 0 ? (
                  day.items.map((item, i) => (
                    <div key={i} className="rounded-lg border border-[var(--border)] p-2 mb-1">
                      <div className={`h-1.5 w-1.5 rounded-full ${statusColors[item.status] || "bg-slate-400"} mx-auto mb-1`} />
                      <p className="text-[10px] font-medium truncate">{item.format}</p>
                      <p className="text-[9px] text-[var(--muted-foreground)] truncate">{item.title}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-[var(--border)] p-2 opacity-40">
                    <p className="text-[10px] text-[var(--muted-foreground)]">—</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Snapshot + Community/Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Last 7 Days
            </CardTitle>
            <div className="flex gap-1">
              <Badge variant="default" className="text-[10px]">IG</Badge>
              <Badge variant="outline" className="text-[10px]">TT</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <MetricRow label="Views" value="52.3K" change="+12%" positive />
              <MetricRow label="Engagement Rate" value="4.8%" change="+0.3%" positive />
              <MetricRow label="Follower Growth" value="+340" change="+2.3%" positive />
              <MetricRow label="Reach" value="48.1K" change="+8%" positive />
              <MetricRow label="Website Clicks" value="234" change="-5%" positive={false} />
            </div>
          </CardContent>
        </Card>

        {/* Community Queue Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Priority Queue
            </CardTitle>
            <Link href="/brand/community">
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {communityPreview.map((item) => (
                <div key={item.id} className="flex items-start gap-2 rounded-lg border border-[var(--border)] p-2.5">
                  <Badge variant={item.priority === "urgent" ? "error" : item.priority === "high" ? "warning" : "secondary"} className="text-[10px] shrink-0">
                    {item.priority}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium">{item.handle}</p>
                    <p className="text-xs text-[var(--muted-foreground)] truncate">{item.preview}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricRow({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{value}</span>
        <span className={`text-xs font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>{change}</span>
      </div>
    </div>
  );
}

const communityPreview = [
  { id: 1, priority: "urgent", handle: "@cocktail_lover_nyc", preview: "Ordered Barsys 360 but hasn't arrived...", type: "DM" },
  { id: 2, priority: "urgent", handle: "@home_mixology", preview: "App won't connect to my device, tried everything", type: "DM" },
  { id: 3, priority: "high", handle: "@weekend_hostess", preview: "Can you share the recipe from yesterday's reel?", type: "DM" },
  { id: 4, priority: "high", handle: "@cocktail_queen", preview: "Love this! Can I get a discount code?", type: "Comment" },
  { id: 5, priority: "normal", handle: "@partyvibes_dc", preview: "This is amazing! Just ordered mine", type: "Comment" },
];
