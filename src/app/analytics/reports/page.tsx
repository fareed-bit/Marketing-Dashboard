"use client";

import { useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileBarChart, Download, FileText, Globe, TrendingUp,
  DollarSign, Users, Calendar, CheckCircle
} from "lucide-react";

export default function AnalyticsReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("march-2026");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileBarChart className="h-6 w-6 text-[var(--accent)]" />
            Monthly Report Generator
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Generate and preview monthly marketing reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" className="text-xs">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="h-3.5 w-3.5 mr-1" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-[var(--muted-foreground)]" />
        <span className="text-sm text-[var(--muted-foreground)]">Period:</span>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="text-sm rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-[var(--foreground)]"
        >
          <option value="march-2026">March 2026 (MTD)</option>
          <option value="february-2026">February 2026</option>
          <option value="january-2026">January 2026</option>
          <option value="q1-2026">Q1 2026</option>
        </select>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Reach"
          value="202.5K"
          icon={<Globe className="h-4 w-4" />}
          trend={{ value: 18.4, direction: "up", isPositive: true, label: "vs. Feb" }}
        />
        <StatCard
          label="Engagement"
          value="12.8K"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 12.1, direction: "up", isPositive: true, label: "vs. Feb" }}
        />
        <StatCard
          label="Revenue"
          value="$18,640"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 15.3, direction: "up", isPositive: true, label: "vs. Feb" }}
        />
        <StatCard
          label="Active Creators"
          value="18"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12.5, direction: "up", isPositive: true, label: "vs. Feb" }}
        />
      </div>

      {/* Report Preview */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Report Preview — March 2026</CardTitle>
            <Badge variant="warning" className="text-[10px]">Draft</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Executive Summary */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Executive Summary</h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              March 2026 has been a strong month for Barsys marketing. Total reach across all channels exceeded 200K for the first time,
              driven by a combination of high-performing organic content and an expanding creator program. Creator-driven revenue hit $18,640,
              representing a 15.3% increase over February. The creator roster grew to 25 total (18 active), and the TikTok Growth Sprint campaign
              is generating strong results with nano and micro creators.
            </p>
          </div>

          {/* Key Achievements */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Key Achievements</h3>
            <ul className="space-y-2">
              {[
                "Total combined reach exceeded 200K for the first time",
                "Creator program revenue grew 15.3% month-over-month",
                "12 new creators added — strongest onboarding month since launch",
                "TikTok engagement rate averaged 6.8%, outpacing industry benchmarks",
                "SoHo House partnership secured for spring pop-up series",
                "Williams-Sonoma in-store demo partnership officially signed",
                "Creator activation rate improved to 72% (up from 65%)",
                "Average creator score improved from 74 to 78 program-wide",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-[var(--muted-foreground)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Channel Performance Summary */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Channel Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-lg border border-[var(--border)] p-3">
                <p className="text-xs font-semibold mb-2">Instagram</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs"><span className="text-[var(--muted-foreground)]">Reach</span><span>48.1K</span></div>
                  <div className="flex justify-between text-xs"><span className="text-[var(--muted-foreground)]">Eng. Rate</span><span>5.1%</span></div>
                  <div className="flex justify-between text-xs"><span className="text-[var(--muted-foreground)]">Growth</span><span className="text-emerald-400">+820</span></div>
                </div>
              </div>
              <div className="rounded-lg border border-[var(--border)] p-3">
                <p className="text-xs font-semibold mb-2">TikTok</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs"><span className="text-[var(--muted-foreground)]">Reach</span><span>34.4K</span></div>
                  <div className="flex justify-between text-xs"><span className="text-[var(--muted-foreground)]">Eng. Rate</span><span>6.8%</span></div>
                  <div className="flex justify-between text-xs"><span className="text-[var(--muted-foreground)]">Growth</span><span className="text-emerald-400">+420</span></div>
                </div>
              </div>
              <div className="rounded-lg border border-[var(--border)] p-3">
                <p className="text-xs font-semibold mb-2">Creator Program</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs"><span className="text-[var(--muted-foreground)]">Revenue</span><span>$18,640</span></div>
                  <div className="flex justify-between text-xs"><span className="text-[var(--muted-foreground)]">Creators</span><span>18 active</span></div>
                  <div className="flex justify-between text-xs"><span className="text-[var(--muted-foreground)]">Avg ROI</span><span className="text-emerald-400">2.68x</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Month Priorities */}
          <div>
            <h3 className="text-sm font-semibold mb-2">April Priorities</h3>
            <ul className="space-y-1.5">
              {[
                "Execute Williams-Sonoma in-store demo (April 5)",
                "Scale TikTok Growth Sprint to 15 creators",
                "Launch Cinco de Mayo campaign planning",
                "Reactivate 5+ dormant creators through targeted outreach",
                "Implement creator content repurposing for paid ads",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                  <span className="text-[var(--accent)] shrink-0">&#8226;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
