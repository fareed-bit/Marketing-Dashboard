"use client";

import { useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calculator, DollarSign, TrendingUp, Target, RefreshCw
} from "lucide-react";

export default function ROIPage() {
  const [totalCost, setTotalCost] = useState(7000);
  const [totalRevenue, setTotalRevenue] = useState(18640);

  const roi = totalCost > 0 ? ((totalRevenue - totalCost) / totalCost * 100).toFixed(1) : "0.0";
  const roas = totalCost > 0 ? (totalRevenue / totalCost).toFixed(2) : "0.00";
  const cpa = totalRevenue > 0 ? (totalCost / 348).toFixed(2) : "0.00"; // 348 orders
  const profit = totalRevenue - totalCost;

  const presets = [
    { label: "Creator Program", cost: 7000, revenue: 18640, description: "All creator/affiliate costs vs. affiliate-driven revenue" },
    { label: "Ambassador Q1", cost: 7500, revenue: 28400, description: "Q1 ambassador payments vs. ambassador-driven revenue" },
    { label: "TikTok Sprint", cost: 5000, revenue: 8200, description: "TikTok campaign costs vs. TikTok-attributed revenue" },
    { label: "Paid Media", cost: 3500, revenue: 5800, description: "Ad spend (boosted + spark ads) vs. ad-attributed revenue" },
    { label: "Total Marketing", cost: 28600, revenue: 52800, description: "Total marketing budget vs. total attributed revenue" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Calculator className="h-6 w-6 text-[var(--accent)]" />
          ROI Calculator
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Calculate return on investment for marketing initiatives</p>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant={totalCost === preset.cost && totalRevenue === preset.revenue ? "default" : "outline"}
            size="sm"
            className="text-xs"
            onClick={() => { setTotalCost(preset.cost); setTotalRevenue(preset.revenue); }}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider block mb-1.5">
                Total Cost / Investment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)]">$</span>
                <input
                  type="number"
                  value={totalCost}
                  onChange={(e) => setTotalCost(Number(e.target.value))}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-7 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <p className="text-[10px] text-[var(--muted-foreground)] mt-1">Include all costs: creator fees, product gifting, ads, tools</p>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider block mb-1.5">
                Total Revenue Generated
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--muted-foreground)]">$</span>
                <input
                  type="number"
                  value={totalRevenue}
                  onChange={(e) => setTotalRevenue(Number(e.target.value))}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-7 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>
              <p className="text-[10px] text-[var(--muted-foreground)] mt-1">Revenue attributed to this marketing initiative</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => { setTotalCost(0); setTotalRevenue(0); }}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className={profit > 0 ? "border-emerald-500/30" : profit < 0 ? "border-red-500/30" : ""}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Results
              {profit > 0 && <Badge variant="success" className="text-[10px]">Profitable</Badge>}
              {profit < 0 && <Badge variant="error" className="text-[10px]">Loss</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[var(--muted)]/50 p-4 text-center">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">ROI</p>
                <p className={`text-3xl font-bold ${parseFloat(roi) > 0 ? "text-emerald-400" : parseFloat(roi) < 0 ? "text-red-400" : ""}`}>
                  {roi}%
                </p>
              </div>
              <div className="rounded-lg bg-[var(--muted)]/50 p-4 text-center">
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">ROAS</p>
                <p className={`text-3xl font-bold ${parseFloat(roas) > 1 ? "text-emerald-400" : parseFloat(roas) < 1 ? "text-red-400" : ""}`}>
                  {roas}x
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                <span className="text-sm text-[var(--muted-foreground)]">Net Profit / Loss</span>
                <span className={`text-sm font-bold ${profit > 0 ? "text-emerald-400" : profit < 0 ? "text-red-400" : ""}`}>
                  {profit >= 0 ? "+" : ""}${profit.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                <span className="text-sm text-[var(--muted-foreground)]">Cost Per Acquisition</span>
                <span className="text-sm font-bold">${cpa}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                <span className="text-sm text-[var(--muted-foreground)]">Revenue per $1 Spent</span>
                <span className="text-sm font-bold">${roas}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[var(--muted-foreground)]">Profit Margin</span>
                <span className={`text-sm font-bold ${profit > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : "0.0"}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benchmarks */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Program Benchmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {presets.slice(0, 3).map((preset) => {
              const presetROI = ((preset.revenue - preset.cost) / preset.cost * 100).toFixed(0);
              const presetROAS = (preset.revenue / preset.cost).toFixed(1);
              return (
                <div key={preset.label} className="rounded-lg border border-[var(--border)] p-4">
                  <p className="text-sm font-semibold mb-1">{preset.label}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)] mb-3">{preset.description}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-[10px] text-[var(--muted-foreground)] uppercase">Cost</p>
                      <p className="text-xs font-semibold">${(preset.cost / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-[var(--muted-foreground)] uppercase">Revenue</p>
                      <p className="text-xs font-semibold">${(preset.revenue / 1000).toFixed(1)}K</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-[var(--muted-foreground)] uppercase">ROAS</p>
                      <p className="text-xs font-semibold text-emerald-400">{presetROAS}x</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
