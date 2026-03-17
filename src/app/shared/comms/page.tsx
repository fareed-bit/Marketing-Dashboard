"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle, Users, Clock, Send, AlertTriangle
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  lastUpdate: string;
  recentUpdates: string[];
}

interface StakeholderUpdate {
  id: string;
  stakeholder: string;
  role: string;
  date: string;
  summary: string;
  priority: "high" | "normal" | "low";
  requiresAction: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: "TM-001", name: "Gosia", role: "Social Media Manager",
    initials: "G",
    lastUpdate: "10 min ago",
    recentUpdates: [
      "Scheduled 3 posts for this week — spring cocktail theme",
      "Reviewed community queue — 14 DMs pending response",
      "Briefed India on Margarita Day content",
    ],
  },
  {
    id: "TM-002", name: "India", role: "Content Creator",
    initials: "I",
    lastUpdate: "1 hr ago",
    recentUpdates: [
      "Delivered Spring Martini Reel — ready for review",
      "Started production on Barsys 360 Unboxing TikTok",
      "Scouted 3 new trending audios for next week",
    ],
  },
  {
    id: "TM-003", name: "Kelly", role: "Marketing Director",
    initials: "K",
    lastUpdate: "3 hrs ago",
    recentUpdates: [
      "Approved Williams-Sonoma partnership budget",
      "Set Q2 creator program targets — 15 new creators",
      "Reviewed monthly performance report draft",
    ],
  },
  {
    id: "TM-004", name: "Ops Team", role: "Operations",
    initials: "OT",
    lastUpdate: "2 hrs ago",
    recentUpdates: [
      "Stock alert: Barsys 360 at 45 units — restock ETA March 23",
      "iOS app connectivity fix in progress — 24-48 hr ETA",
      "USPS delays in Northeast — 2-3 day impact",
    ],
  },
];

const stakeholderUpdates: StakeholderUpdate[] = [
  { id: "SU-001", stakeholder: "Logistics", role: "Fulfillment", date: "Mar 16, 2 hrs ago", summary: "Barsys 360 stock critical — 45 units remaining. Next shipment ETA: March 23. Consider pausing paid ads.", priority: "high", requiresAction: true },
  { id: "SU-002", stakeholder: "Engineering", role: "Product", date: "Mar 16, 3 hrs ago", summary: "iOS app connectivity hotfix in progress. Estimated deployment: 24-48 hours. Pre-approved DM response available.", priority: "high", requiresAction: true },
  { id: "SU-003", stakeholder: "Finance", role: "Accounting", date: "Mar 15", summary: "March creator payouts delayed by 2 business days due to banking maintenance. Creators notified via email.", priority: "normal", requiresAction: false },
  { id: "SU-004", stakeholder: "Legal", role: "Compliance", date: "Mar 15", summary: "FTC disclosure audit found 3 creator posts missing proper disclosures. Need to re-brief affected creators.", priority: "normal", requiresAction: true },
  { id: "SU-005", stakeholder: "Sales", role: "Business Dev", date: "Mar 14", summary: "Williams-Sonoma in-store demo partnership officially signed. Beverly Hills location, April 5. Marketing materials needed by March 28.", priority: "normal", requiresAction: false },
  { id: "SU-006", stakeholder: "Product", role: "Product", date: "Mar 14", summary: "Spring 2026 recipe pack (12 new cocktails) will be available in app March 20. Marketing can begin teasing content.", priority: "low", requiresAction: false },
];

const priorityBadgeVariant: Record<string, "error" | "warning" | "secondary"> = {
  high: "error",
  normal: "warning",
  low: "secondary",
};

export default function CommsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-[var(--accent)]" />
          Stakeholder Communication Hub
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Team updates and stakeholder communications</p>
      </div>

      {/* Team Members */}
      <div>
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Team Updates
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="hover:border-[var(--accent)]/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center text-sm font-bold shrink-0">
                    {member.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-sm font-semibold">{member.name}</span>
                        <span className="text-xs text-[var(--muted-foreground)] ml-2">{member.role}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[var(--muted-foreground)]">
                        <Clock className="h-3 w-3" />
                        <span className="text-[10px]">{member.lastUpdate}</span>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {member.recentUpdates.map((update, i) => (
                        <li key={i} className="text-xs text-[var(--muted-foreground)] flex items-start gap-1.5">
                          <span className="text-[var(--accent)] mt-1 shrink-0">&#8226;</span>
                          {update}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stakeholder Updates */}
      <div>
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Latest Operations Updates
        </h2>
        <div className="space-y-3">
          {stakeholderUpdates.map((update) => (
            <Card
              key={update.id}
              className={`${update.priority === "high" ? "border-l-2 border-l-red-500" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-semibold">{update.stakeholder}</span>
                      <Badge variant="outline" className="text-[10px]">{update.role}</Badge>
                      <Badge variant={priorityBadgeVariant[update.priority]} className="text-[10px] capitalize">{update.priority}</Badge>
                      {update.requiresAction && (
                        <Badge variant="warning" className="text-[10px]">Action Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{update.summary}</p>
                    <span className="text-[10px] text-[var(--muted-foreground)] mt-1 block">{update.date}</span>
                  </div>
                  {update.requiresAction && (
                    <Button variant="outline" size="sm" className="text-xs shrink-0">
                      <Send className="h-3 w-3 mr-1" />
                      Respond
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
