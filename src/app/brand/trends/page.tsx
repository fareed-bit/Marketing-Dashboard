"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, Hash, Music, Film, MessageCircle, Flame,
  Instagram, Music2, ExternalLink, Calendar
} from "lucide-react";

interface Trend {
  id: string;
  type: "hashtag" | "audio" | "format" | "topic" | "challenge";
  title: string;
  description: string;
  platform: "Instagram" | "TikTok" | "Both";
  relevanceScore: number;
  capturedDate: string;
  linkedContentIds?: string[];
}

const trends: Trend[] = [
  {
    id: "T-001", type: "audio", title: "\"One More Drink\" — Trending Sound",
    description: "Fast-rising audio on TikTok used for cocktail making transitions. Over 45K videos in the last 3 days. Perfect for Barsys 360 demo clips with quick cuts.",
    platform: "TikTok", relevanceScore: 9, capturedDate: "Mar 16, 2026",
    linkedContentIds: ["C-012"],
  },
  {
    id: "T-002", type: "hashtag", title: "#CocktailTok Spring",
    description: "Seasonal hashtag gaining traction. Lighter drinks, floral ingredients, pastel aesthetics. Over 12M views this week. Aligns with our Spring Martini content.",
    platform: "TikTok", relevanceScore: 8, capturedDate: "Mar 15, 2026",
    linkedContentIds: ["C-008", "C-015"],
  },
  {
    id: "T-003", type: "format", title: "POV Hosting Format",
    description: "First-person POV videos of hosting dinner parties / cocktail hours. Aesthetic setup shots, then cocktail making. High save rate. Works great for Barsys product placement.",
    platform: "Both", relevanceScore: 9, capturedDate: "Mar 15, 2026",
  },
  {
    id: "T-004", type: "topic", title: "\"Sober Curious\" Mocktail Trend",
    description: "Growing interest in non-alcoholic cocktails and low-ABV drinks. Barsys can position as versatile — makes mocktails too. Large audience overlap with wellness community.",
    platform: "Both", relevanceScore: 7, capturedDate: "Mar 14, 2026",
  },
  {
    id: "T-005", type: "challenge", title: "#MakeItBetter Challenge",
    description: "Users take a basic drink and 'level it up' with bar tools and techniques. Perfect for showing Barsys 360 vs. manual mixing comparison content.",
    platform: "TikTok", relevanceScore: 8, capturedDate: "Mar 14, 2026",
    linkedContentIds: ["C-020"],
  },
  {
    id: "T-006", type: "hashtag", title: "#HomeBarSetup",
    description: "Interior design meets mixology. People showing off their home bar setups. High engagement for aesthetic content. Barsys 360 as the centerpiece product.",
    platform: "Instagram", relevanceScore: 7, capturedDate: "Mar 13, 2026",
  },
  {
    id: "T-007", type: "audio", title: "\"Fancy Like\" Remix — Cocktail Version",
    description: "Remixed audio trending for fancy cocktail reveals. Quick transitions from ingredients to finished cocktail. 28K videos and climbing.",
    platform: "TikTok", relevanceScore: 6, capturedDate: "Mar 13, 2026",
  },
  {
    id: "T-008", type: "format", title: "Side-by-Side Taste Test",
    description: "Comparing homemade vs. professional vs. machine-made cocktails. Split screen format getting high engagement. Great opportunity for Barsys quality demonstration.",
    platform: "Both", relevanceScore: 8, capturedDate: "Mar 12, 2026",
    linkedContentIds: ["C-025"],
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  hashtag: <Hash className="h-3.5 w-3.5" />,
  audio: <Music className="h-3.5 w-3.5" />,
  format: <Film className="h-3.5 w-3.5" />,
  topic: <MessageCircle className="h-3.5 w-3.5" />,
  challenge: <Flame className="h-3.5 w-3.5" />,
};

const typeBadgeVariant: Record<string, "default" | "secondary" | "success" | "warning" | "outline"> = {
  hashtag: "default",
  audio: "secondary",
  format: "warning",
  topic: "outline",
  challenge: "success",
};

function RelevanceBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 w-1.5 rounded-sm transition-colors ${
              i < score
                ? score >= 8
                  ? "bg-emerald-400"
                  : score >= 6
                  ? "bg-amber-400"
                  : "bg-slate-400"
                : "bg-[var(--muted)]"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold">{score}/10</span>
    </div>
  );
}

export default function TrendsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[var(--accent)]" />
            Trending Now
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Social listening and trend capture for content ideation</p>
        </div>
        <Button size="sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          Capture Trend
        </Button>
      </div>

      {/* Type Legend */}
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(typeIcons).map(([type, icon]) => (
          <Badge key={type} variant={typeBadgeVariant[type]} className="text-xs capitalize">
            {icon}
            <span className="ml-1">{type}</span>
          </Badge>
        ))}
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {trends.map((trend) => (
          <Card key={trend.id} className="hover:border-[var(--accent)]/30 transition-colors">
            <CardContent className="p-5 space-y-3">
              {/* Top Row */}
              <div className="flex items-start justify-between gap-2">
                <Badge variant={typeBadgeVariant[trend.type]} className="text-[10px] capitalize shrink-0">
                  {typeIcons[trend.type]}
                  <span className="ml-1">{trend.type}</span>
                </Badge>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {trend.platform === "Instagram" && <Instagram className="h-2.5 w-2.5 mr-1" />}
                  {trend.platform === "TikTok" && <Music2 className="h-2.5 w-2.5 mr-1" />}
                  {trend.platform}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold leading-tight">{trend.title}</h3>

              {/* Description */}
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed line-clamp-3">{trend.description}</p>

              {/* Relevance */}
              <div>
                <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Relevance</p>
                <RelevanceBar score={trend.relevanceScore} />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                  <Calendar className="h-3 w-3" />
                  <span className="text-[10px]">{trend.capturedDate}</span>
                </div>
                {trend.linkedContentIds ? (
                  <Button variant="outline" size="sm" className="text-[10px] h-6 px-2">
                    <ExternalLink className="h-2.5 w-2.5 mr-1" />
                    Linked ({trend.linkedContentIds.length})
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="text-[10px] h-6 px-2">
                    Link to Content
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
