"use client";

import { useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileBarChart, Download, FileText, Users, DollarSign,
  TrendingUp, CheckCircle, Star
} from "lucide-react";

const weeklyStats = {
  newCreators: 3,
  contentPublished: 18,
  totalClicks: 4820,
  totalOrders: 112,
  revenue: "$5,480",
  topCreator: "@mixmaster_mike",
  avgEngagement: "5.2%",
  followUpsSent: 8,
};

const monthlyStats = {
  newCreators: 12,
  contentPublished: 68,
  totalClicks: 17560,
  totalOrders: 348,
  revenue: "$18,640",
  topCreator: "@mixmaster_mike",
  avgEngagement: "4.8%",
  followUpsSent: 24,
};

const weeklyHighlights = [
  "3 new creators onboarded this week — all in the Cocktails niche",
  "@mixmaster_mike generated $1,240 in revenue from a single Reel",
  "TikTok creator content outperformed Instagram by 35% in engagement rate",
  "National Margarita Day prep — 8 creators briefed for March 22 push",
  "Response rate on outreach improved to 25% (up from 18% last week)",
  "2 creators moved from Gifted to Active stage after first sales",
];

const monthlyHighlights = [
  "12 new creators added to the program — strongest month since launch",
  "Total creator-driven revenue hit $18,640 (+15.3% vs. February)",
  "Top 5 creators account for 78% of total affiliate revenue",
  "Ambassador program Q1 delivered 2.54x ROI across 5 creators",
  "TikTok Growth Sprint campaign generating strong nano-creator pipeline",
  "Creator activation rate improved to 72% (up from 65% in February)",
  "Average creator score increased from 74 to 78 program-wide",
  "3 dormant creators successfully reactivated through outreach campaign",
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileBarChart className="h-6 w-6 text-[var(--accent)]" />
            Reports
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Weekly and monthly creator program summaries</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="h-3.5 w-3.5 mr-1" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        {/* Weekly Report */}
        <TabsContent value="weekly">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-xs">Week of Mar 10 - Mar 16, 2026</Badge>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="New Creators" value={weeklyStats.newCreators} icon={<Users className="h-4 w-4" />} />
              <StatCard label="Content Published" value={weeklyStats.contentPublished} icon={<FileText className="h-4 w-4" />} />
              <StatCard label="Total Orders" value={weeklyStats.totalOrders} icon={<TrendingUp className="h-4 w-4" />} />
              <StatCard
                label="Revenue"
                value={weeklyStats.revenue}
                icon={<DollarSign className="h-4 w-4" />}
                trend={{ value: 22.1, direction: "up", isPositive: true, label: "vs. prev week" }}
              />
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Total Clicks</p>
                <p className="text-lg font-bold">{weeklyStats.totalClicks.toLocaleString()}</p>
              </Card>
              <Card className="p-4">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Avg Engagement</p>
                <p className="text-lg font-bold">{weeklyStats.avgEngagement}</p>
              </Card>
              <Card className="p-4">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Top Creator</p>
                <p className="text-lg font-bold">{weeklyStats.topCreator}</p>
              </Card>
              <Card className="p-4">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Follow-ups Sent</p>
                <p className="text-lg font-bold">{weeklyStats.followUpsSent}</p>
              </Card>
            </div>

            {/* Highlights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  Key Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {weeklyHighlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--muted-foreground)]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monthly Report */}
        <TabsContent value="monthly">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-xs">March 2026 (MTD)</Badge>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="New Creators" value={monthlyStats.newCreators} icon={<Users className="h-4 w-4" />} />
              <StatCard label="Content Published" value={monthlyStats.contentPublished} icon={<FileText className="h-4 w-4" />} />
              <StatCard label="Total Orders" value={monthlyStats.totalOrders} icon={<TrendingUp className="h-4 w-4" />} />
              <StatCard
                label="Revenue"
                value={monthlyStats.revenue}
                icon={<DollarSign className="h-4 w-4" />}
                trend={{ value: 15.3, direction: "up", isPositive: true, label: "vs. last month" }}
              />
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Total Clicks</p>
                <p className="text-lg font-bold">{monthlyStats.totalClicks.toLocaleString()}</p>
              </Card>
              <Card className="p-4">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Avg Engagement</p>
                <p className="text-lg font-bold">{monthlyStats.avgEngagement}</p>
              </Card>
              <Card className="p-4">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Top Creator</p>
                <p className="text-lg font-bold">{monthlyStats.topCreator}</p>
              </Card>
              <Card className="p-4">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Follow-ups Sent</p>
                <p className="text-lg font-bold">{monthlyStats.followUpsSent}</p>
              </Card>
            </div>

            {/* Highlights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  Key Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {monthlyHighlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--muted-foreground)]">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
