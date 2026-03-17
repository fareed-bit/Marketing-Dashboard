"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Send, Users, Clock, CheckCircle, Mail, MessageSquare,
  Instagram, AlertTriangle
} from "lucide-react";

interface OutreachEntry {
  id: string;
  creatorHandle: string;
  creatorName: string;
  channel: "email" | "dm_instagram" | "dm_tiktok";
  status: "sent" | "opened" | "replied" | "follow_up" | "no_response" | "declined";
  sentDate: string;
  followUpDue: string | null;
  followUpCount: number;
  isOverdue: boolean;
}

const outreachEntries: OutreachEntry[] = [
  { id: "O-001", creatorHandle: "@cocktail_enthusiast", creatorName: "Sophia Martinez", channel: "dm_instagram", status: "sent", sentDate: "Mar 14", followUpDue: "Mar 17", followUpCount: 0, isOverdue: false },
  { id: "O-002", creatorHandle: "@home_bar_hero", creatorName: "Tyler Brooks", channel: "email", status: "follow_up", sentDate: "Mar 10", followUpDue: "Mar 15", followUpCount: 1, isOverdue: true },
  { id: "O-003", creatorHandle: "@mixology_maven", creatorName: "Rachel Kim", channel: "dm_instagram", status: "replied", sentDate: "Mar 12", followUpDue: null, followUpCount: 0, isOverdue: false },
  { id: "O-004", creatorHandle: "@craft_cocktails_la", creatorName: "Derek Wang", channel: "email", status: "opened", sentDate: "Mar 9", followUpDue: "Mar 14", followUpCount: 1, isOverdue: true },
  { id: "O-005", creatorHandle: "@bar_cart_queen", creatorName: "Jasmine Patel", channel: "dm_instagram", status: "replied", sentDate: "Mar 11", followUpDue: null, followUpCount: 0, isOverdue: false },
  { id: "O-006", creatorHandle: "@sip_and_savor", creatorName: "Emma Collins", channel: "dm_tiktok", status: "sent", sentDate: "Mar 15", followUpDue: "Mar 18", followUpCount: 0, isOverdue: false },
  { id: "O-007", creatorHandle: "@weekend_mixologist", creatorName: "Ryan O'Brien", channel: "email", status: "no_response", sentDate: "Mar 5", followUpDue: "Mar 12", followUpCount: 2, isOverdue: true },
  { id: "O-008", creatorHandle: "@modern_cocktails", creatorName: "Natalie Foster", channel: "dm_instagram", status: "declined", sentDate: "Mar 8", followUpDue: null, followUpCount: 0, isOverdue: false },
  { id: "O-009", creatorHandle: "@fancy_drinks_at_home", creatorName: "Christina Park", channel: "email", status: "follow_up", sentDate: "Mar 7", followUpDue: "Mar 16", followUpCount: 1, isOverdue: true },
  { id: "O-010", creatorHandle: "@bartender_bob", creatorName: "Bob Sullivan", channel: "dm_tiktok", status: "sent", sentDate: "Mar 16", followUpDue: "Mar 19", followUpCount: 0, isOverdue: false },
];

const channelIcons: Record<string, React.ReactNode> = {
  email: <Mail className="h-3 w-3" />,
  dm_instagram: <Instagram className="h-3 w-3" />,
  dm_tiktok: <MessageSquare className="h-3 w-3" />,
};

const channelLabels: Record<string, string> = {
  email: "Email",
  dm_instagram: "IG DM",
  dm_tiktok: "TikTok DM",
};

const statusBadgeVariant: Record<string, "default" | "secondary" | "success" | "warning" | "error" | "outline"> = {
  sent: "secondary",
  opened: "default",
  replied: "success",
  follow_up: "warning",
  no_response: "error",
  declined: "outline",
};

const statusLabels: Record<string, string> = {
  sent: "Sent",
  opened: "Opened",
  replied: "Replied",
  follow_up: "Follow Up",
  no_response: "No Response",
  declined: "Declined",
};

export default function OutreachPage() {
  const totalOutreached = outreachEntries.length;
  const replied = outreachEntries.filter((e) => e.status === "replied").length;
  const responseRate = ((replied / totalOutreached) * 100).toFixed(0);
  const followUpsDue = outreachEntries.filter((e) => e.isOverdue).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Outreach Tracker</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Track creator outreach and follow-ups</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Outreached" value={totalOutreached} icon={<Send className="h-4 w-4" />} />
        <StatCard label="Response Rate" value={`${responseRate}%`} icon={<CheckCircle className="h-4 w-4" />} />
        <StatCard
          label="Follow-ups Due"
          value={followUpsDue}
          icon={<Clock className="h-4 w-4" />}
          alertLevel={followUpsDue > 0 ? "warning" : null}
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Creator</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Channel</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Sent Date</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Follow-up Due</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Follow-ups</th>
                  <th className="text-left text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {outreachEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors ${
                      entry.isOverdue ? "bg-red-500/5" : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-[var(--muted)] flex items-center justify-center text-[10px] font-semibold shrink-0">
                          {entry.creatorName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{entry.creatorHandle}</p>
                          <p className="text-[10px] text-[var(--muted-foreground)]">{entry.creatorName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant="outline" className="text-[10px]">
                        {channelIcons[entry.channel]}
                        <span className="ml-1">{channelLabels[entry.channel]}</span>
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={statusBadgeVariant[entry.status]} className="text-[10px]">
                        {statusLabels[entry.status]}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs">{entry.sentDate}</span>
                    </td>
                    <td className="px-5 py-3">
                      {entry.followUpDue ? (
                        <span className={`text-xs ${entry.isOverdue ? "text-red-400 font-medium" : ""}`}>
                          {entry.isOverdue && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                          {entry.followUpDue}
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--muted-foreground)]">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs">{entry.followUpCount}</span>
                    </td>
                    <td className="px-5 py-3">
                      {entry.status !== "replied" && entry.status !== "declined" && (
                        <Button variant="outline" size="sm" className="text-[10px] h-6">
                          <Send className="h-2.5 w-2.5 mr-1" />
                          Follow Up
                        </Button>
                      )}
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
