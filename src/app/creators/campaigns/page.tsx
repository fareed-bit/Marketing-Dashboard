"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Megaphone, Plus, Users, DollarSign, TrendingUp,
  Calendar, Target
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: "product_launch" | "seasonal" | "ongoing" | "special";
  status: "active" | "planned" | "completed" | "paused";
  startDate: string;
  endDate: string;
  budgetTotal: number;
  budgetSpent: number;
  creatorCount: number;
  revenue: number;
  roi: number;
  description: string;
}

const campaigns: Campaign[] = [
  {
    id: "CMP-001",
    name: "Spring Cocktail Collection Launch",
    type: "product_launch",
    status: "active",
    startDate: "Mar 1, 2026",
    endDate: "Mar 31, 2026",
    budgetTotal: 8000,
    budgetSpent: 5200,
    creatorCount: 12,
    revenue: 14800,
    roi: 2.85,
    description: "Multi-creator campaign featuring spring cocktail recipes using Barsys 360. Focus on fresh ingredients and seasonal flavors.",
  },
  {
    id: "CMP-002",
    name: "National Margarita Day Blitz",
    type: "seasonal",
    status: "planned",
    startDate: "Mar 20, 2026",
    endDate: "Mar 23, 2026",
    budgetTotal: 3000,
    budgetSpent: 0,
    creatorCount: 8,
    revenue: 0,
    roi: 0,
    description: "Concentrated push around National Margarita Day. All creators post margarita content simultaneously for maximum reach.",
  },
  {
    id: "CMP-003",
    name: "Barsys Ambassador Program Q1",
    type: "ongoing",
    status: "active",
    startDate: "Jan 1, 2026",
    endDate: "Mar 31, 2026",
    budgetTotal: 15000,
    budgetSpent: 11200,
    creatorCount: 5,
    revenue: 28400,
    roi: 2.54,
    description: "Quarterly ambassador program with top-tier creators. Monthly content deliverables, exclusive discount codes, and commission structure.",
  },
  {
    id: "CMP-004",
    name: "TikTok Growth Sprint",
    type: "special",
    status: "active",
    startDate: "Feb 15, 2026",
    endDate: "Apr 15, 2026",
    budgetTotal: 5000,
    budgetSpent: 3100,
    creatorCount: 10,
    revenue: 8200,
    roi: 2.65,
    description: "Focused TikTok creator campaign to grow brand presence. Mix of nano and micro creators for authentic, high-volume content.",
  },
];

const typeBadgeVariant: Record<string, "default" | "secondary" | "warning" | "outline"> = {
  product_launch: "default",
  seasonal: "warning",
  ongoing: "secondary",
  special: "outline",
};

const typeLabels: Record<string, string> = {
  product_launch: "Product Launch",
  seasonal: "Seasonal",
  ongoing: "Ongoing",
  special: "Special",
};

const statusBadgeVariant: Record<string, "success" | "secondary" | "warning" | "outline"> = {
  active: "success",
  planned: "secondary",
  completed: "outline",
  paused: "warning",
};

export default function CampaignsPage() {
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const totalCreators = campaigns.reduce((sum, c) => sum + c.creatorCount, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const avgROI = campaigns.filter((c) => c.roi > 0).reduce((sum, c) => sum + c.roi, 0) / campaigns.filter((c) => c.roi > 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaign Manager</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Plan and track creator marketing campaigns</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Campaigns" value={activeCampaigns} icon={<Megaphone className="h-4 w-4" />} />
        <StatCard label="Total Creators" value={totalCreators} icon={<Users className="h-4 w-4" />} />
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 22.3, direction: "up", isPositive: true, label: "vs. last month" }}
        />
        <StatCard label="Avg ROI" value={`${avgROI.toFixed(1)}x`} icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {campaigns.map((campaign) => {
          const budgetPercent = campaign.budgetTotal > 0 ? (campaign.budgetSpent / campaign.budgetTotal) * 100 : 0;
          return (
            <Card key={campaign.id} className="hover:border-[var(--accent)]/30 transition-colors">
              <CardContent className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold">{campaign.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={typeBadgeVariant[campaign.type]} className="text-[10px]">
                        {typeLabels[campaign.type]}
                      </Badge>
                      <Badge variant={statusBadgeVariant[campaign.status]} className="text-[10px] capitalize">
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs shrink-0">View</Button>
                </div>

                {/* Description */}
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{campaign.description}</p>

                {/* Date Range */}
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{campaign.startDate} — {campaign.endDate}</span>
                </div>

                {/* Budget Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Budget</span>
                    <span className="text-xs font-medium">
                      ${campaign.budgetSpent.toLocaleString()} / ${campaign.budgetTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--muted)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${budgetPercent}%`,
                        backgroundColor: budgetPercent > 90 ? "#ef4444" : budgetPercent > 70 ? "#f59e0b" : "#22c55e",
                      }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[var(--border)]">
                  <div>
                    <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Creators</p>
                    <p className="text-sm font-semibold flex items-center gap-1">
                      <Users className="h-3 w-3 text-[var(--muted-foreground)]" />
                      {campaign.creatorCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">Revenue</p>
                    <p className="text-sm font-semibold">
                      {campaign.revenue > 0 ? `$${campaign.revenue.toLocaleString()}` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider">ROI</p>
                    <p className={`text-sm font-semibold ${campaign.roi >= 2 ? "text-emerald-400" : campaign.roi > 0 ? "text-amber-400" : "text-[var(--muted-foreground)]"}`}>
                      {campaign.roi > 0 ? `${campaign.roi.toFixed(1)}x` : "—"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
