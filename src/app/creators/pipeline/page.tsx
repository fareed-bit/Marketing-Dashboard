"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pipelineStages } from "@/config/pipeline-stages";
import {
  Filter, LayoutGrid, List, AlertTriangle, Clock,
  Instagram, Music2, ChevronDown
} from "lucide-react";

interface CreatorCard {
  id: string;
  handle: string;
  name: string;
  tier: "Nano" | "Micro" | "Mid-Tier" | "Macro";
  niche: string;
  platform: "Instagram" | "TikTok" | "Both";
  score: number;
  stage: string;
  daysSinceAction: number;
  followUpDue: boolean;
  followers: string;
}

const creatorCards: CreatorCard[] = [
  { id: "CR-001", handle: "@cocktail_enthusiast", name: "Sophia Martinez", tier: "Micro", niche: "Cocktails", platform: "Instagram", score: 78, stage: "sourced", daysSinceAction: 2, followUpDue: false, followers: "12.4K" },
  { id: "CR-002", handle: "@home_bar_hero", name: "Tyler Brooks", tier: "Nano", niche: "Home Bar", platform: "TikTok", score: 65, stage: "sourced", daysSinceAction: 5, followUpDue: true, followers: "4.8K" },
  { id: "CR-003", handle: "@mixology_maven", name: "Rachel Kim", tier: "Mid-Tier", niche: "Mixology", platform: "Both", score: 88, stage: "contacted", daysSinceAction: 3, followUpDue: false, followers: "52K" },
  { id: "CR-004", handle: "@craft_cocktails_la", name: "Derek Wang", tier: "Micro", niche: "Cocktails", platform: "Instagram", score: 72, stage: "contacted", daysSinceAction: 7, followUpDue: true, followers: "18.2K" },
  { id: "CR-005", handle: "@sip_and_savor", name: "Emma Collins", tier: "Nano", niche: "Lifestyle", platform: "TikTok", score: 60, stage: "responded", daysSinceAction: 1, followUpDue: false, followers: "8.1K" },
  { id: "CR-006", handle: "@bar_cart_queen", name: "Jasmine Patel", tier: "Micro", niche: "Home Decor", platform: "Instagram", score: 75, stage: "responded", daysSinceAction: 4, followUpDue: false, followers: "22K" },
  { id: "CR-007", handle: "@drinkswithdan", name: "Dan Foster", tier: "Mid-Tier", niche: "Cocktails", platform: "Both", score: 85, stage: "approved", daysSinceAction: 0, followUpDue: false, followers: "67K" },
  { id: "CR-008", handle: "@nola_bartender", name: "Antoine Dupree", tier: "Micro", niche: "Bartending", platform: "Instagram", score: 80, stage: "onboarded", daysSinceAction: 2, followUpDue: false, followers: "31K" },
  { id: "CR-009", handle: "@cocktail_queen", name: "Lisa Thompson", tier: "Macro", niche: "Lifestyle", platform: "Both", score: 92, stage: "gifted", daysSinceAction: 5, followUpDue: true, followers: "145K" },
  { id: "CR-010", handle: "@weekend_mixologist", name: "Ryan O'Brien", tier: "Nano", niche: "Cocktails", platform: "TikTok", score: 58, stage: "gifted", daysSinceAction: 3, followUpDue: false, followers: "6.2K" },
  { id: "CR-011", handle: "@sippingpretty", name: "Aria Patel", tier: "Micro", niche: "Lifestyle", platform: "Instagram", score: 82, stage: "posted", daysSinceAction: 1, followUpDue: false, followers: "28K" },
  { id: "CR-012", handle: "@mixmaster_mike", name: "Mike Chen", tier: "Mid-Tier", niche: "Mixology", platform: "Both", score: 95, stage: "active", daysSinceAction: 0, followUpDue: false, followers: "89K" },
  { id: "CR-013", handle: "@home_bartender", name: "James Rodriguez", tier: "Micro", niche: "Home Bar", platform: "Instagram", score: 87, stage: "active", daysSinceAction: 1, followUpDue: false, followers: "35K" },
  { id: "CR-014", handle: "@tiki_tina", name: "Tina Nguyen", tier: "Nano", niche: "Tiki", platform: "TikTok", score: 70, stage: "active", daysSinceAction: 3, followUpDue: false, followers: "9.4K" },
  { id: "CR-015", handle: "@classiccocktails", name: "William Hart", tier: "Micro", niche: "Classic Cocktails", platform: "Instagram", score: 76, stage: "first_sale", daysSinceAction: 2, followUpDue: false, followers: "19K" },
  { id: "CR-016", handle: "@party_host_pro", name: "Kayla Stevens", tier: "Mid-Tier", niche: "Entertaining", platform: "Both", score: 83, stage: "active", daysSinceAction: 0, followUpDue: false, followers: "55K" },
  { id: "CR-017", handle: "@shake_stir_pour", name: "Alex Morgan", tier: "Nano", niche: "Cocktails", platform: "TikTok", score: 55, stage: "inactive", daysSinceAction: 28, followUpDue: true, followers: "3.2K" },
  { id: "CR-018", handle: "@boozy_brunch", name: "Olivia Martinez", tier: "Micro", niche: "Brunch", platform: "Instagram", score: 68, stage: "inactive", daysSinceAction: 35, followUpDue: true, followers: "14K" },
];

const tierBadgeVariant: Record<string, "default" | "secondary" | "warning" | "success" | "outline"> = {
  Nano: "secondary",
  Micro: "outline",
  "Mid-Tier": "default",
  Macro: "warning",
};

const nicheOptions = ["All", "Cocktails", "Mixology", "Home Bar", "Lifestyle", "Bartending", "Home Decor", "Tiki", "Classic Cocktails", "Entertaining", "Brunch"];
const tierOptions = ["All", "Nano", "Micro", "Mid-Tier", "Macro"];
const platformOptions = ["All", "Instagram", "TikTok", "Both"];

export default function PipelinePage() {
  const [nicheFilter, setNicheFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");

  const filteredCreators = creatorCards.filter((c) => {
    if (nicheFilter !== "All" && c.niche !== nicheFilter) return false;
    if (tierFilter !== "All" && c.tier !== tierFilter) return false;
    if (platformFilter !== "All" && c.platform !== platformFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Creator Pipeline</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Track creators through your partnership pipeline</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" className="text-xs">
            <LayoutGrid className="h-3.5 w-3.5 mr-1" />
            Kanban
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <List className="h-3.5 w-3.5 mr-1" />
            List
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-[var(--muted-foreground)]" />
        <div className="flex items-center gap-1">
          <span className="text-xs text-[var(--muted-foreground)]">Niche:</span>
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="text-xs rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1.5 text-[var(--foreground)]"
          >
            {nicheOptions.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-[var(--muted-foreground)]">Tier:</span>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="text-xs rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1.5 text-[var(--foreground)]"
          >
            {tierOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-[var(--muted-foreground)]">Platform:</span>
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="text-xs rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1.5 text-[var(--foreground)]"
          >
            {platformOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3" style={{ minWidth: `${pipelineStages.length * 250}px` }}>
          {pipelineStages.map((stage) => {
            const stageCreators = filteredCreators.filter((c) => c.stage === stage.key);
            return (
              <div key={stage.key} className="flex-1 min-w-[230px]">
                {/* Column Header */}
                <div className="rounded-t-lg p-3 mb-2 border border-[var(--border)] bg-[var(--muted)]/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: stage.color }} />
                      <span className="text-xs font-semibold">{stage.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-[10px] px-1.5">{stageCreators.length}</Badge>
                  </div>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {stageCreators.map((creator) => (
                    <Card
                      key={creator.id}
                      className="cursor-grab active:cursor-grabbing hover:shadow-md hover:border-[var(--accent)]/30 transition-all"
                    >
                      <CardContent className="p-3 space-y-2">
                        {/* Handle + Name */}
                        <div className="flex items-start justify-between gap-1">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold truncate">{creator.handle}</p>
                            <p className="text-[10px] text-[var(--muted-foreground)] truncate">{creator.name}</p>
                          </div>
                          {creator.followUpDue && (
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex items-center gap-1 flex-wrap">
                          <Badge variant={tierBadgeVariant[creator.tier]} className="text-[9px] px-1.5 py-0">
                            {creator.tier}
                          </Badge>
                          <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                            {creator.niche}
                          </Badge>
                        </div>

                        {/* Platform + Score */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                            {(creator.platform === "Instagram" || creator.platform === "Both") && (
                              <Instagram className="h-3 w-3" />
                            )}
                            {(creator.platform === "TikTok" || creator.platform === "Both") && (
                              <Music2 className="h-3 w-3" />
                            )}
                            <span className="text-[9px]">{creator.followers}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-1.5 w-12 rounded-full bg-[var(--muted)] overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${creator.score}%`,
                                  backgroundColor: creator.score >= 80 ? "#22c55e" : creator.score >= 60 ? "#f59e0b" : "#ef4444",
                                }}
                              />
                            </div>
                            <span className="text-[9px] font-medium">{creator.score}</span>
                          </div>
                        </div>

                        {/* Days since action */}
                        <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                          <Clock className="h-2.5 w-2.5" />
                          <span className={`text-[9px] ${creator.daysSinceAction > 7 ? "text-amber-400 font-medium" : ""}`}>
                            {creator.daysSinceAction === 0 ? "Today" : `${creator.daysSinceAction}d ago`}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {stageCreators.length === 0 && (
                    <div className="rounded-lg border border-dashed border-[var(--border)] p-4 text-center">
                      <p className="text-[10px] text-[var(--muted-foreground)]">No creators</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
