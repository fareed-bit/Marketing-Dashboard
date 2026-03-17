"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HeartPulse, UserCheck, UserX, Activity, RefreshCw,
  Users
} from "lucide-react";

const rosterSummary = {
  active: 18,
  dormant: 7,
  total: 25,
  activationRate: 72,
};

const tierDistribution = [
  { tier: "Nano", count: 5, color: "#94a3b8", label: "1K-10K followers" },
  { tier: "Micro", count: 10, color: "#60a5fa", label: "10K-50K followers" },
  { tier: "Mid-Tier", count: 7, color: "#d4943a", label: "50K-100K followers" },
  { tier: "Macro", count: 3, color: "#a78bfa", label: "100K+ followers" },
];

const nicheDistribution = [
  { niche: "Cocktails", count: 8 },
  { niche: "Lifestyle", count: 5 },
  { niche: "Home Bar", count: 3 },
  { niche: "Mixology", count: 3 },
  { niche: "Bartending", count: 2 },
  { niche: "Entertaining", count: 2 },
  { niche: "Other", count: 2 },
];

const dormantCreators = [
  { handle: "@shake_stir_pour", name: "Alex Morgan", tier: "Nano", daysInactive: 40, lastPost: "Feb 5, 2026", reason: "No content posted" },
  { handle: "@boozy_brunch", name: "Olivia Martinez", tier: "Micro", daysInactive: 35, lastPost: "Feb 10, 2026", reason: "No content posted" },
  { handle: "@sunset_sips", name: "Maya Johnson", tier: "Nano", daysInactive: 30, lastPost: "Feb 14, 2026", reason: "No engagement" },
  { handle: "@cocktail_corner", name: "David Kim", tier: "Micro", daysInactive: 28, lastPost: "Feb 16, 2026", reason: "No content posted" },
  { handle: "@drink_art", name: "Sam Wilson", tier: "Nano", daysInactive: 25, lastPost: "Feb 19, 2026", reason: "Expired code" },
  { handle: "@bar_boss", name: "Troy Nguyen", tier: "Micro", daysInactive: 22, lastPost: "Feb 22, 2026", reason: "No sales" },
  { handle: "@sip_happens", name: "Jade Brown", tier: "Nano", daysInactive: 21, lastPost: "Feb 23, 2026", reason: "No engagement" },
];

export default function RosterPage() {
  const totalTiers = tierDistribution.reduce((s, t) => s + t.count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-[var(--accent)]" />
          Roster Health
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Monitor creator activity and roster wellness</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Active Creators"
          value={rosterSummary.active}
          icon={<UserCheck className="h-4 w-4" />}
          trend={{ value: 5.9, direction: "up", isPositive: true, label: "vs. last month" }}
        />
        <StatCard
          label="Dormant Creators"
          value={rosterSummary.dormant}
          icon={<UserX className="h-4 w-4" />}
          alertLevel={rosterSummary.dormant > 5 ? "warning" : null}
        />
        <StatCard
          label="Activation Rate"
          value={`${rosterSummary.activationRate}%`}
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active vs Inactive Donut */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active vs Dormant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-8">
              {/* Simple visual donut using CSS */}
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--muted)"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeDasharray={`${rosterSummary.activationRate}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{rosterSummary.activationRate}%</span>
                  <span className="text-[10px] text-[var(--muted-foreground)]">Active</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold">{rosterSummary.active} Active</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">Posted in last 21 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[var(--muted)]" />
                  <div>
                    <p className="text-sm font-semibold">{rosterSummary.dormant} Dormant</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">No activity 21+ days</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tier Distribution */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Tier Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tierDistribution.map((tier) => {
                const percentage = (tier.count / totalTiers) * 100;
                return (
                  <div key={tier.tier}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: tier.color }} />
                        <span className="text-sm font-medium">{tier.tier}</span>
                        <span className="text-[10px] text-[var(--muted-foreground)]">{tier.label}</span>
                      </div>
                      <span className="text-sm font-semibold">{tier.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--muted)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${percentage}%`, backgroundColor: tier.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Niche Distribution */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Niche Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {nicheDistribution.map((niche) => (
              <div key={niche.niche} className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2">
                <span className="text-sm">{niche.niche}</span>
                <Badge variant="secondary" className="text-[10px]">{niche.count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reactivation Queue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-amber-400" />
            Reactivation Queue
            <Badge variant="warning" className="text-[10px] ml-1">{dormantCreators.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {dormantCreators.map((creator) => (
              <div
                key={creator.handle}
                className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3 hover:bg-[var(--muted)]/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-[var(--muted)] flex items-center justify-center text-xs font-semibold shrink-0">
                    {creator.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{creator.handle}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">{creator.name} &middot; {creator.tier}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${creator.daysInactive > 30 ? "text-red-400" : "text-amber-400"}`}>
                      {creator.daysInactive}d
                    </p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">inactive</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-[var(--muted-foreground)]">{creator.reason}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">Last: {creator.lastPost}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reactivate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
