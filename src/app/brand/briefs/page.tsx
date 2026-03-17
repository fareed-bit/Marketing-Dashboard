"use client";

import { useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText, Plus, AlertTriangle, CheckCircle, Clock, Film,
  Instagram, Music2, LayoutGrid, Image
} from "lucide-react";

interface Brief {
  id: string;
  title: string;
  status: "draft" | "briefed" | "in_production" | "review" | "revision" | "approved" | "delivered" | "overdue";
  priority: "high" | "medium" | "low";
  assignedTo: string;
  dueDate: string;
  platform: "IG" | "TikTok" | "Both";
  format: string;
  isOverdue: boolean;
}

const briefs: Brief[] = [
  {
    id: "B-001", title: "Spring Cocktail Collection — Hero Reel",
    status: "in_production", priority: "high", assignedTo: "India",
    dueDate: "Mar 18, 2026", platform: "IG", format: "Reel", isOverdue: false,
  },
  {
    id: "B-002", title: "Barsys 360 Unboxing Experience",
    status: "overdue", priority: "high", assignedTo: "India",
    dueDate: "Mar 14, 2026", platform: "TikTok", format: "TikTok Video", isOverdue: true,
  },
  {
    id: "B-003", title: "5 Cocktails Under 5 Minutes Carousel",
    status: "review", priority: "medium", assignedTo: "Gosia",
    dueDate: "Mar 19, 2026", platform: "IG", format: "Carousel", isOverdue: false,
  },
  {
    id: "B-004", title: "Easter Brunch Cocktails Guide",
    status: "briefed", priority: "medium", assignedTo: "India",
    dueDate: "Mar 25, 2026", platform: "Both", format: "Reel + TikTok", isOverdue: false,
  },
  {
    id: "B-005", title: "Creator Spotlight — @mixmaster_mike",
    status: "delivered", priority: "low", assignedTo: "Gosia",
    dueDate: "Mar 12, 2026", platform: "IG", format: "Carousel", isOverdue: false,
  },
  {
    id: "B-006", title: "Barsys App Update Announcement",
    status: "overdue", priority: "high", assignedTo: "Gosia",
    dueDate: "Mar 13, 2026", platform: "IG", format: "Story", isOverdue: true,
  },
  {
    id: "B-007", title: "Home Bar Setup Inspiration Series",
    status: "draft", priority: "low", assignedTo: "India",
    dueDate: "Mar 28, 2026", platform: "TikTok", format: "TikTok Video", isOverdue: false,
  },
  {
    id: "B-008", title: "Margarita Day Campaign Creative",
    status: "approved", priority: "high", assignedTo: "India",
    dueDate: "Mar 22, 2026", platform: "Both", format: "Reel + TikTok", isOverdue: false,
  },
];

const statusBadgeVariant: Record<string, "default" | "secondary" | "success" | "warning" | "error" | "outline"> = {
  draft: "secondary",
  briefed: "outline",
  in_production: "default",
  review: "warning",
  revision: "warning",
  approved: "success",
  delivered: "success",
  overdue: "error",
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  briefed: "Briefed",
  in_production: "In Production",
  review: "In Review",
  revision: "Revision",
  approved: "Approved",
  delivered: "Delivered",
  overdue: "Overdue",
};

const priorityBadgeVariant: Record<string, "error" | "warning" | "secondary"> = {
  high: "error",
  medium: "warning",
  low: "secondary",
};

const formatIcons: Record<string, React.ReactNode> = {
  Reel: <Film className="h-3 w-3" />,
  Carousel: <LayoutGrid className="h-3 w-3" />,
  Story: <Image className="h-3 w-3" />,
  "TikTok Video": <Music2 className="h-3 w-3" />,
  "Reel + TikTok": <Film className="h-3 w-3" />,
};

export default function BriefsPage() {
  const totalBriefs = briefs.length;
  const inProduction = briefs.filter((b) => b.status === "in_production" || b.status === "review").length;
  const overdue = briefs.filter((b) => b.isOverdue).length;
  const delivered = briefs.filter((b) => b.status === "delivered" || b.status === "approved").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Production Briefs</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Track content briefs from ideation to delivery</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Brief
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Briefs" value={totalBriefs} icon={<FileText className="h-4 w-4" />} />
        <StatCard label="In Production" value={inProduction} icon={<Clock className="h-4 w-4" />} />
        <StatCard
          label="Overdue"
          value={overdue}
          icon={<AlertTriangle className="h-4 w-4" />}
          alertLevel={overdue > 0 ? "critical" : null}
        />
        <StatCard label="Delivered" value={delivered} icon={<CheckCircle className="h-4 w-4" />} />
      </div>

      {/* Briefs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Brief</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Priority</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Assigned To</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Due Date</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Platform</th>
                </tr>
              </thead>
              <tbody>
                {briefs.map((brief) => (
                  <tr
                    key={brief.id}
                    className={`border-b border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors cursor-pointer ${
                      brief.isOverdue ? "bg-red-500/5" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="text-[var(--muted-foreground)]">{formatIcons[brief.format]}</div>
                        <div>
                          <p className="text-sm font-medium">{brief.title}</p>
                          <p className="text-[10px] text-[var(--muted-foreground)]">{brief.id} &middot; {brief.format}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusBadgeVariant[brief.status]} className="text-[10px]">
                        {brief.isOverdue && <AlertTriangle className="h-2.5 w-2.5 mr-1" />}
                        {statusLabels[brief.status]}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={priorityBadgeVariant[brief.priority]} className="text-[10px] capitalize">
                        {brief.priority}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm">{brief.assignedTo}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-sm ${brief.isOverdue ? "text-red-400 font-medium" : ""}`}>
                        {brief.dueDate}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        {(brief.platform === "IG" || brief.platform === "Both") && (
                          <Instagram className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                        )}
                        {(brief.platform === "TikTok" || brief.platform === "Both") && (
                          <Music2 className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
