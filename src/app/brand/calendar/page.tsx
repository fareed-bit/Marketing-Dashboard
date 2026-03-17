"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft, ChevronRight, Film, LayoutGrid, Clock,
  Lightbulb, Instagram, Music2, Image
} from "lucide-react";

const statusColors: Record<string, string> = {
  published: "bg-emerald-500",
  scheduled: "bg-green-400",
  approved: "bg-emerald-400",
  review: "bg-amber-500",
  in_production: "bg-purple-400",
  briefed: "bg-blue-400",
  idea: "bg-slate-400",
};

const statusLabels: Record<string, string> = {
  published: "Published",
  scheduled: "Scheduled",
  approved: "Approved",
  review: "In Review",
  in_production: "In Production",
  briefed: "Briefed",
  idea: "Idea",
};

const formatIcons: Record<string, React.ReactNode> = {
  Reel: <Film className="h-3 w-3" />,
  Carousel: <LayoutGrid className="h-3 w-3" />,
  Story: <Clock className="h-3 w-3" />,
  TikTok: <Music2 className="h-3 w-3" />,
  Static: <Image className="h-3 w-3" />,
};

interface ContentItem {
  id: string;
  title: string;
  format: string;
  platform: "IG" | "TikTok";
  status: string;
  source: "India" | "Gosia";
  time?: string;
}

const weekDates = [
  { day: "Mon", date: "Mar 16" },
  { day: "Tue", date: "Mar 17" },
  { day: "Wed", date: "Mar 18" },
  { day: "Thu", date: "Mar 19" },
  { day: "Fri", date: "Mar 20" },
  { day: "Sat", date: "Mar 21" },
  { day: "Sun", date: "Mar 22" },
];

const calendarItems: Record<string, ContentItem[]> = {
  "Mon": [
    { id: "1", title: "Spring Martini Mix — 3 Ways to Elevate Your Evening", format: "Reel", platform: "IG", status: "scheduled", source: "India", time: "11:00 AM" },
  ],
  "Tue": [
    { id: "2", title: "5 Easy Cocktails You Can Make With Barsys 360", format: "Carousel", platform: "IG", status: "approved", source: "Gosia", time: "2:00 PM" },
    { id: "3", title: "POV: Your Barsys arrives", format: "TikTok", platform: "TikTok", status: "in_production", source: "India", time: "6:00 PM" },
  ],
  "Wed": [
    { id: "4", title: "Behind the Scenes — Cocktail Content Day", format: "Story", platform: "IG", status: "briefed", source: "Gosia", time: "10:00 AM" },
  ],
  "Thu": [
    { id: "5", title: "Aperol Spritz Season is Here", format: "Reel", platform: "IG", status: "review", source: "India", time: "12:00 PM" },
  ],
  "Fri": [
    { id: "6", title: "Friday Night Cocktail Hour LIVE", format: "Reel", platform: "IG", status: "scheduled", source: "Gosia", time: "5:00 PM" },
    { id: "7", title: "Weekend Cocktail Inspo", format: "TikTok", platform: "TikTok", status: "approved", source: "India", time: "7:00 PM" },
  ],
  "Sat": [],
  "Sun": [
    { id: "8", title: "Week Recap — Best Moments", format: "Carousel", platform: "IG", status: "idea", source: "Gosia" },
  ],
};

const unscheduledIdeas: ContentItem[] = [
  { id: "u1", title: "Barsys vs. Manual Mixing Challenge", format: "TikTok", platform: "TikTok", status: "idea", source: "India" },
  { id: "u2", title: "Top 5 Summer Cocktails for 2026", format: "Carousel", platform: "IG", status: "idea", source: "Gosia" },
  { id: "u3", title: "User Spotlight — Best Home Bars", format: "Reel", platform: "IG", status: "idea", source: "India" },
  { id: "u4", title: "Espresso Martini Taste Test", format: "TikTok", platform: "TikTok", status: "idea", source: "Gosia" },
];

type PlatformFilter = "All" | "IG" | "TikTok";

export default function ContentCalendarPage() {
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>("All");
  const [weekOffset, setWeekOffset] = useState(0);

  const filteredItems = (items: ContentItem[]) => {
    if (platformFilter === "All") return items;
    return items.filter((i) => i.platform === platformFilter);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Calendar</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Plan and schedule content across platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="weekly">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Week Navigation + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setWeekOffset(weekOffset - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev Week
          </Button>
          <span className="text-sm font-medium px-3">
            {weekOffset === 0 ? "This Week" : weekOffset > 0 ? `+${weekOffset} Week${weekOffset > 1 ? "s" : ""}` : `${weekOffset} Week${weekOffset < -1 ? "s" : ""}`}
          </span>
          <Button variant="outline" size="sm" onClick={() => setWeekOffset(weekOffset + 1)}>
            Next Week
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--muted-foreground)] font-medium">Platform:</span>
          {(["All", "IG", "TikTok"] as PlatformFilter[]).map((p) => (
            <Button
              key={p}
              variant={platformFilter === p ? "default" : "outline"}
              size="sm"
              onClick={() => setPlatformFilter(p)}
              className="text-xs"
            >
              {p === "IG" && <Instagram className="h-3 w-3 mr-1" />}
              {p === "TikTok" && <Music2 className="h-3 w-3 mr-1" />}
              {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--muted-foreground)]">
        {Object.entries(statusColors).map(([key, color]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${color}`} />
            <span>{statusLabels[key]}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map(({ day, date }) => {
          const items = filteredItems(calendarItems[day] || []);
          const isToday = day === "Mon" && weekOffset === 0;
          return (
            <div key={day} className="min-h-[200px]">
              <div
                className={`text-center py-2 rounded-t-lg border-b-2 ${
                  isToday
                    ? "border-[var(--accent)] bg-[var(--accent)]/5"
                    : "border-[var(--border)] bg-[var(--muted)]/50"
                }`}
              >
                <p className={`text-xs font-semibold ${isToday ? "text-[var(--accent)]" : "text-[var(--muted-foreground)]"}`}>
                  {day}
                </p>
                <p className={`text-[10px] ${isToday ? "text-[var(--accent)]" : "text-[var(--muted-foreground)]"}`}>
                  {date}
                </p>
              </div>
              <div className="space-y-1.5 mt-2">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-2.5 hover:border-[var(--accent)]/40 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className={`h-2 w-2 rounded-full shrink-0 ${statusColors[item.status]}`} />
                        <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                          {formatIcons[item.format]}
                          <span className="text-[10px] font-medium">{item.format}</span>
                        </div>
                      </div>
                      <p className="text-[11px] font-medium leading-tight line-clamp-2 mb-1.5">{item.title}</p>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={item.platform === "TikTok" ? "secondary" : "outline"}
                          className="text-[9px] px-1.5 py-0"
                        >
                          {item.platform}
                        </Badge>
                        <span className="text-[9px] text-[var(--muted-foreground)]">{item.source}</span>
                      </div>
                      {item.time && (
                        <p className="text-[9px] text-[var(--muted-foreground)] mt-1">{item.time}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-[var(--border)] p-4 text-center opacity-40">
                    <p className="text-[10px] text-[var(--muted-foreground)]">No content</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unscheduled Ideas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            Unscheduled Ideas
            <Badge variant="secondary" className="text-[10px] ml-1">{unscheduledIdeas.length}</Badge>
          </CardTitle>
          <Button variant="outline" size="sm" className="text-xs">
            + Add Idea
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredItems(unscheduledIdeas).map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--muted)]/30 p-3 cursor-grab hover:border-[var(--accent)]/40 hover:shadow-md transition-all active:cursor-grabbing"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                    {formatIcons[item.format]}
                    <span className="text-[10px] font-medium">{item.format}</span>
                  </div>
                  <Badge
                    variant={item.platform === "TikTok" ? "secondary" : "outline"}
                    className="text-[9px] px-1.5 py-0 ml-auto"
                  >
                    {item.platform}
                  </Badge>
                </div>
                <p className="text-xs font-medium leading-tight line-clamp-2 mb-1.5">{item.title}</p>
                <span className="text-[9px] text-[var(--muted-foreground)]">{item.source}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
