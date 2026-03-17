"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Image, Film, LayoutGrid, Music2, Plus, Filter,
  Star, Instagram, Download, Eye
} from "lucide-react";

type PlatformFilter = "all" | "instagram" | "tiktok";
type StatusFilter = "all" | "available" | "in_use" | "archived";

interface Asset {
  id: string;
  title: string;
  platform: "Instagram" | "TikTok" | "Both";
  format: "Reel" | "Carousel" | "Story" | "TikTok" | "Static";
  status: "available" | "in_use" | "archived";
  availableForPaid: boolean;
  qualityRating: number;
  dateCreated: string;
  creator: string;
  thumbnail: string;
}

const assets: Asset[] = [
  { id: "A-001", title: "Spring Martini Mix — Hero Reel", platform: "Instagram", format: "Reel", status: "available", availableForPaid: true, qualityRating: 5, dateCreated: "Mar 15", creator: "India", thumbnail: "bg-gradient-to-br from-rose-500/20 to-amber-500/20" },
  { id: "A-002", title: "5 Easy Cocktails Carousel", platform: "Instagram", format: "Carousel", status: "in_use", availableForPaid: true, qualityRating: 4, dateCreated: "Mar 14", creator: "Gosia", thumbnail: "bg-gradient-to-br from-blue-500/20 to-purple-500/20" },
  { id: "A-003", title: "POV: Barsys Arrives", platform: "TikTok", format: "TikTok", status: "available", availableForPaid: false, qualityRating: 4, dateCreated: "Mar 13", creator: "India", thumbnail: "bg-gradient-to-br from-pink-500/20 to-violet-500/20" },
  { id: "A-004", title: "Behind the Scenes — Content Day", platform: "Instagram", format: "Story", status: "available", availableForPaid: false, qualityRating: 3, dateCreated: "Mar 12", creator: "Gosia", thumbnail: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20" },
  { id: "A-005", title: "Aperol Spritz Season Reel", platform: "Instagram", format: "Reel", status: "available", availableForPaid: true, qualityRating: 5, dateCreated: "Mar 11", creator: "India", thumbnail: "bg-gradient-to-br from-orange-500/20 to-red-500/20" },
  { id: "A-006", title: "Product Lifestyle — Home Bar", platform: "Both", format: "Static", status: "in_use", availableForPaid: true, qualityRating: 5, dateCreated: "Mar 10", creator: "India", thumbnail: "bg-gradient-to-br from-amber-500/20 to-yellow-500/20" },
  { id: "A-007", title: "Weekend Cocktail Inspo", platform: "TikTok", format: "TikTok", status: "available", availableForPaid: true, qualityRating: 4, dateCreated: "Mar 9", creator: "India", thumbnail: "bg-gradient-to-br from-sky-500/20 to-blue-500/20" },
  { id: "A-008", title: "Espresso Martini Recipe Card", platform: "Instagram", format: "Static", status: "archived", availableForPaid: false, qualityRating: 3, dateCreated: "Mar 5", creator: "Gosia", thumbnail: "bg-gradient-to-br from-stone-500/20 to-slate-500/20" },
];

const formatIcons: Record<string, React.ReactNode> = {
  Reel: <Film className="h-4 w-4" />,
  Carousel: <LayoutGrid className="h-4 w-4" />,
  Story: <Image className="h-4 w-4" />,
  TikTok: <Music2 className="h-4 w-4" />,
  Static: <Image className="h-4 w-4" />,
};

const statusBadgeVariant: Record<string, "success" | "default" | "secondary"> = {
  available: "success",
  in_use: "default",
  archived: "secondary",
};

function QualityStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < rating ? "text-amber-400 fill-amber-400" : "text-[var(--muted)]"}`}
        />
      ))}
    </div>
  );
}

export default function AssetsPage() {
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = assets.filter((a) => {
    if (platformFilter === "instagram" && a.platform !== "Instagram" && a.platform !== "Both") return false;
    if (platformFilter === "tiktok" && a.platform !== "TikTok" && a.platform !== "Both") return false;
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Asset Library</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{assets.length} assets across all platforms</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Upload Asset
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Filter className="h-4 w-4 text-[var(--muted-foreground)]" />
        <div className="flex items-center gap-1">
          <span className="text-xs text-[var(--muted-foreground)]">Platform:</span>
          {(["all", "instagram", "tiktok"] as PlatformFilter[]).map((p) => (
            <Button
              key={p}
              variant={platformFilter === p ? "default" : "outline"}
              size="sm"
              onClick={() => setPlatformFilter(p)}
              className="text-xs capitalize"
            >
              {p}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-[var(--muted-foreground)]">Status:</span>
          {(["all", "available", "in_use", "archived"] as StatusFilter[]).map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(s)}
              className="text-xs capitalize"
            >
              {s.replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((asset) => (
          <Card key={asset.id} className="overflow-hidden hover:border-[var(--accent)]/30 transition-colors cursor-pointer group">
            {/* Thumbnail Placeholder */}
            <div className={`h-40 ${asset.thumbnail} flex items-center justify-center relative`}>
              <div className="text-[var(--muted-foreground)]">
                {formatIcons[asset.format]}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="sm" className="text-xs h-7">
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button variant="secondary" size="sm" className="text-xs h-7">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <CardContent className="p-3 space-y-2">
              <p className="text-sm font-medium truncate">{asset.title}</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant="outline" className="text-[9px]">
                  {asset.platform === "Instagram" && <Instagram className="h-2.5 w-2.5 mr-0.5" />}
                  {asset.platform === "TikTok" && <Music2 className="h-2.5 w-2.5 mr-0.5" />}
                  {asset.platform}
                </Badge>
                <Badge variant="secondary" className="text-[9px]">{asset.format}</Badge>
                <Badge variant={statusBadgeVariant[asset.status]} className="text-[9px] capitalize">{asset.status.replace("_", " ")}</Badge>
              </div>
              {asset.availableForPaid && (
                <Badge variant="success" className="text-[9px]">Available for Paid</Badge>
              )}
              <div className="flex items-center justify-between pt-1">
                <QualityStars rating={asset.qualityRating} />
                <span className="text-[10px] text-[var(--muted-foreground)]">{asset.creator} &middot; {asset.dateCreated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
