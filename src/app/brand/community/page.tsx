"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare, Instagram, Music2, AtSign, Camera, Send,
  AlertTriangle, Archive, ChevronUp, Clock
} from "lucide-react";

type FilterTab = "all" | "dms" | "comments" | "mentions" | "ugc";
type PriorityFilter = "all" | "urgent" | "high" | "normal" | "low";

interface CommunityItem {
  id: number;
  type: "dm" | "comment" | "mention" | "ugc";
  platform: "instagram" | "tiktok";
  priority: "urgent" | "high" | "normal" | "low";
  senderHandle: string;
  senderName: string;
  preview: string;
  receivedAt: string;
  status: "new" | "pending" | "responded" | "archived";
  requiresOpsInput: boolean;
}

const communityItems: CommunityItem[] = [
  {
    id: 1, type: "dm", platform: "instagram", priority: "urgent",
    senderHandle: "@cocktail_lover_nyc", senderName: "Sarah Chen",
    preview: "I ordered my Barsys 360 two weeks ago and it still hasn't arrived. Order #38291. Can someone please help? This was supposed to be a birthday gift.",
    receivedAt: "5 min ago", status: "new", requiresOpsInput: true,
  },
  {
    id: 2, type: "dm", platform: "instagram", priority: "urgent",
    senderHandle: "@home_mixology", senderName: "Marcus Rivera",
    preview: "App won't connect to my Barsys device after the latest update. I've tried resetting WiFi and reinstalling. Nothing works.",
    receivedAt: "18 min ago", status: "new", requiresOpsInput: true,
  },
  {
    id: 3, type: "comment", platform: "instagram", priority: "high",
    senderHandle: "@weekend_hostess", senderName: "Priya Patel",
    preview: "Can you share the exact recipe for the spring martini from yesterday's reel? My guests loved it! Also, does the Barsys app have it?",
    receivedAt: "1 hr ago", status: "new", requiresOpsInput: false,
  },
  {
    id: 4, type: "dm", platform: "instagram", priority: "high",
    senderHandle: "@cocktail_queen", senderName: "Lisa Thompson",
    preview: "Love your content! I'm an influencer with 45K followers. Would love to collaborate on a cocktail tutorial series. Do you have a creator program?",
    receivedAt: "2 hrs ago", status: "pending", requiresOpsInput: false,
  },
  {
    id: 5, type: "mention", platform: "tiktok", priority: "normal",
    senderHandle: "@mixdrink_master", senderName: "Jake Williams",
    preview: "Just tagged @barsys in my new video showing off my home bar setup. The 360 is the centerpiece! Check it out.",
    receivedAt: "3 hrs ago", status: "new", requiresOpsInput: false,
  },
  {
    id: 6, type: "ugc", platform: "instagram", priority: "normal",
    senderHandle: "@partyvibes_dc", senderName: "Nadia Kowalski",
    preview: "Posted a reel making an Aperol Spritz with Barsys 360. Got 2.3K views already! Tagged @barsys.",
    receivedAt: "4 hrs ago", status: "new", requiresOpsInput: false,
  },
  {
    id: 7, type: "comment", platform: "tiktok", priority: "normal",
    senderHandle: "@drinkswithdan", senderName: "Dan Foster",
    preview: "How much does the Barsys 360 cost? Is there a payment plan option? Been wanting one forever.",
    receivedAt: "4 hrs ago", status: "pending", requiresOpsInput: true,
  },
  {
    id: 8, type: "dm", platform: "instagram", priority: "high",
    senderHandle: "@nola_bartender", senderName: "Antoine Dupree",
    preview: "I run a cocktail bar in New Orleans. Interested in bulk ordering for our venue. Who should I talk to about commercial partnerships?",
    receivedAt: "5 hrs ago", status: "new", requiresOpsInput: false,
  },
  {
    id: 9, type: "ugc", platform: "tiktok", priority: "low",
    senderHandle: "@friday_drinks_club", senderName: "Emma Zhang",
    preview: "Used the Barsys in the background of my apartment tour video. Got some questions about it in comments.",
    receivedAt: "6 hrs ago", status: "responded", requiresOpsInput: false,
  },
  {
    id: 10, type: "comment", platform: "instagram", priority: "normal",
    senderHandle: "@boozy_brunch", senderName: "Olivia Martinez",
    preview: "Do you ship to Canada? I've been following for months and really want to get one for my kitchen island.",
    receivedAt: "7 hrs ago", status: "pending", requiresOpsInput: true,
  },
];

const priorityColors: Record<string, string> = {
  urgent: "error",
  high: "warning",
  normal: "default",
  low: "secondary",
};

const typeIcons: Record<string, React.ReactNode> = {
  dm: <MessageSquare className="h-3.5 w-3.5" />,
  comment: <MessageSquare className="h-3.5 w-3.5" />,
  mention: <AtSign className="h-3.5 w-3.5" />,
  ugc: <Camera className="h-3.5 w-3.5" />,
};

const statusBadgeVariant: Record<string, "success" | "warning" | "secondary" | "outline"> = {
  new: "warning",
  pending: "secondary",
  responded: "success",
  archived: "outline",
};

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const filtered = communityItems.filter((item) => {
    if (activeTab !== "all" && item.type !== (activeTab === "dms" ? "dm" : activeTab)) return false;
    if (priorityFilter !== "all" && item.priority !== priorityFilter) return false;
    return true;
  });

  const newCount = communityItems.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">Community Queue</h1>
          <Badge variant="warning" className="text-xs">{newCount} new</Badge>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          Mark All Read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 flex-wrap">
          {([
            { key: "all", label: "All", count: communityItems.length },
            { key: "dms", label: "DMs", count: communityItems.filter((i) => i.type === "dm").length },
            { key: "comments", label: "Comments", count: communityItems.filter((i) => i.type === "comment").length },
            { key: "mentions", label: "Mentions", count: communityItems.filter((i) => i.type === "mention").length },
            { key: "ugc", label: "UGC", count: communityItems.filter((i) => i.type === "ugc").length },
          ] as { key: FilterTab; label: string; count: number }[]).map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.key)}
              className="text-xs"
            >
              {tab.label}
              <Badge variant="secondary" className="text-[10px] ml-1.5 px-1.5">{tab.count}</Badge>
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-[var(--muted-foreground)] mr-1">Priority:</span>
          {(["all", "urgent", "high", "normal", "low"] as PriorityFilter[]).map((p) => (
            <Button
              key={p}
              variant={priorityFilter === p ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriorityFilter(p)}
              className="text-xs capitalize"
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {filtered.map((item) => (
          <Card key={item.id} className={`transition-colors hover:border-[var(--accent)]/30 ${item.status === "new" ? "border-l-2 border-l-[var(--accent)]" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Priority + Type */}
                <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
                  <Badge variant={priorityColors[item.priority] as "error" | "warning" | "default" | "secondary"} className="text-[10px] capitalize w-14 justify-center">
                    {item.priority}
                  </Badge>
                  <div className="text-[var(--muted-foreground)]">
                    {item.platform === "instagram" ? <Instagram className="h-3.5 w-3.5" /> : <Music2 className="h-3.5 w-3.5" />}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{item.senderHandle}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">{item.senderName}</span>
                    <div className="flex items-center gap-1 text-[var(--muted-foreground)] ml-auto shrink-0">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px]">{item.receivedAt}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-2">{item.preview}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {typeIcons[item.type]}
                      <span className="ml-1">{item.type}</span>
                    </Badge>
                    <Badge variant={statusBadgeVariant[item.status]} className="text-[10px] capitalize">
                      {item.status}
                    </Badge>
                    {item.requiresOpsInput && (
                      <Badge variant="error" className="text-[10px]">
                        <AlertTriangle className="h-2.5 w-2.5 mr-1" />
                        Requires Ops Input
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    <Send className="h-3 w-3 mr-1" />
                    Respond
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Escalate
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Archive className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-8 w-8 text-[var(--muted-foreground)] mx-auto mb-3" />
          <p className="text-sm text-[var(--muted-foreground)]">No items match your filters</p>
        </div>
      )}
    </div>
  );
}
