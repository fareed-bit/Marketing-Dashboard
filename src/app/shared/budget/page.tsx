"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wallet, DollarSign, TrendingDown, AlertTriangle, Download
} from "lucide-react";

interface BudgetItem {
  id: string;
  category: "content_production" | "creator_payments" | "events" | "partnerships" | "tools" | "paid_media" | "misc";
  description: string;
  planned: number;
  actual: number;
  date: string;
  relatedEntity: string | null;
}

const budgetItems: BudgetItem[] = [
  { id: "BG-001", category: "creator_payments", description: "Q1 Ambassador Payouts (5 creators)", planned: 7500, actual: 7200, date: "Mar 15", relatedEntity: "Ambassador Program Q1" },
  { id: "BG-002", category: "events", description: "SoHo House Spring Pop-Up — Venue + Catering", planned: 5000, actual: 4800, date: "Mar 14", relatedEntity: "SoHo House Pop-Up" },
  { id: "BG-003", category: "content_production", description: "March Content Production (India)", planned: 3000, actual: 3000, date: "Mar 12", relatedEntity: null },
  { id: "BG-004", category: "paid_media", description: "Instagram Reels Boost — Spring Collection", planned: 2000, actual: 1850, date: "Mar 10", relatedEntity: "Spring Cocktail Campaign" },
  { id: "BG-005", category: "creator_payments", description: "TikTok Growth Sprint — Creator Fees", planned: 2500, actual: 2100, date: "Mar 8", relatedEntity: "TikTok Growth Sprint" },
  { id: "BG-006", category: "tools", description: "Social Media Management Tools (Monthly)", planned: 500, actual: 500, date: "Mar 1", relatedEntity: null },
  { id: "BG-007", category: "partnerships", description: "Williams-Sonoma Demo Materials Deposit", planned: 3000, actual: 0, date: "Mar 28", relatedEntity: "Williams-Sonoma Partnership" },
  { id: "BG-008", category: "events", description: "Cinco de Mayo Rooftop — Venue Deposit", planned: 4000, actual: 2000, date: "Mar 20", relatedEntity: "Cinco de Mayo Rooftop Party" },
  { id: "BG-009", category: "content_production", description: "Freelance Editor — Video Post-Production", planned: 1200, actual: 1200, date: "Mar 5", relatedEntity: null },
  { id: "BG-010", category: "misc", description: "Product Gifting & Shipping (15 units)", planned: 1500, actual: 1350, date: "Mar 6", relatedEntity: "Creator Gifting" },
  { id: "BG-011", category: "paid_media", description: "TikTok Spark Ads — Creator Content", planned: 1500, actual: 1100, date: "Mar 9", relatedEntity: "TikTok Growth Sprint" },
  { id: "BG-012", category: "partnerships", description: "Food & Wine Magazine Feature Sponsorship", planned: 3500, actual: 3500, date: "Mar 15", relatedEntity: "Food & Wine Feature" },
];

const categoryLabels: Record<string, string> = {
  content_production: "Content Production",
  creator_payments: "Creator Payments",
  events: "Events",
  partnerships: "Partnerships",
  tools: "Tools & Software",
  paid_media: "Paid Media",
  misc: "Miscellaneous",
};

const categoryBadgeVariant: Record<string, "default" | "secondary" | "success" | "warning" | "error" | "outline"> = {
  content_production: "default",
  creator_payments: "success",
  events: "warning",
  partnerships: "secondary",
  tools: "outline",
  paid_media: "error",
  misc: "outline",
};

export default function BudgetPage() {
  const totalPlanned = budgetItems.reduce((s, b) => s + b.planned, 0);
  const totalActual = budgetItems.reduce((s, b) => s + b.actual, 0);
  const remaining = totalPlanned - totalActual;
  const spentPercent = ((totalActual / totalPlanned) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Wallet className="h-6 w-6 text-[var(--accent)]" />
            Budget Tracker
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">March 2026 marketing budget overview</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          <Download className="h-3.5 w-3.5 mr-1" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Total Budget"
          value={`$${totalPlanned.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          label="Spent"
          value={`$${totalActual.toLocaleString()}`}
          icon={<TrendingDown className="h-4 w-4" />}
          trend={{ value: parseFloat(spentPercent), direction: "up", isPositive: false, label: "of total" }}
        />
        <StatCard
          label="Remaining"
          value={`$${remaining.toLocaleString()}`}
          icon={<Wallet className="h-4 w-4" />}
          alertLevel={remaining < totalPlanned * 0.2 ? "warning" : null}
        />
      </div>

      {/* Budget Progress */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Budget Utilization</span>
            <span className="text-sm font-semibold">{spentPercent}%</span>
          </div>
          <div className="h-3 rounded-full bg-[var(--muted)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${spentPercent}%`,
                backgroundColor: parseFloat(spentPercent) > 90 ? "#ef4444" : parseFloat(spentPercent) > 70 ? "#f59e0b" : "#22c55e",
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Line Items Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Budget Line Items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Description</th>
                  <th className="text-right text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Planned</th>
                  <th className="text-right text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Actual</th>
                  <th className="text-right text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Variance</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Related</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map((item) => {
                  const variance = item.planned - item.actual;
                  return (
                    <tr key={item.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors">
                      <td className="px-5 py-3">
                        <Badge variant={categoryBadgeVariant[item.category]} className="text-[10px]">
                          {categoryLabels[item.category]}
                        </Badge>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm">{item.description}</span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="text-sm">${item.planned.toLocaleString()}</span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="text-sm font-medium">${item.actual.toLocaleString()}</span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className={`text-sm ${variance > 0 ? "text-emerald-400" : variance < 0 ? "text-red-400" : "text-[var(--muted-foreground)]"}`}>
                          {variance > 0 ? "+" : ""}{variance === 0 ? "—" : `$${variance.toLocaleString()}`}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-[var(--muted-foreground)]">{item.date}</span>
                      </td>
                      <td className="px-5 py-3">
                        {item.relatedEntity ? (
                          <span className="text-xs text-[var(--accent)]">{item.relatedEntity}</span>
                        ) : (
                          <span className="text-xs text-[var(--muted-foreground)]">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {/* Totals Row */}
                <tr className="border-t-2 border-[var(--border)] bg-[var(--muted)]/30 font-semibold">
                  <td className="px-5 py-3 text-sm" colSpan={2}>Total</td>
                  <td className="px-5 py-3 text-right text-sm">${totalPlanned.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-sm">${totalActual.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-sm text-emerald-400">
                    +${remaining.toLocaleString()}
                  </td>
                  <td className="px-5 py-3" colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
