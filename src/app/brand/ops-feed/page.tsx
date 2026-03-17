"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Radio, AlertTriangle, AlertCircle, Info, ChevronDown,
  ChevronRight, MessageSquare, Shield
} from "lucide-react";

type Severity = "critical" | "warning" | "info";
type FilterType = "all" | "critical" | "warning" | "info";

interface OpsUpdate {
  id: string;
  severity: Severity;
  source: string;
  title: string;
  body: string;
  timestamp: string;
  affectsPublicComms: boolean;
  suggestedResponse?: string;
  isRead: boolean;
}

const opsUpdates: OpsUpdate[] = [
  {
    id: "OPS-001", severity: "critical", source: "Logistics",
    title: "Barsys 360 Stock Critical — 45 Units Remaining",
    body: "Current inventory at fulfillment center is down to 45 units. At current sell rate (12/day), stock will be depleted in ~4 days. Next shipment ETA: March 23. Consider pausing paid ads and adjusting social content to avoid driving purchase traffic until restocked.",
    timestamp: "2 hrs ago", affectsPublicComms: true,
    suggestedResponse: "Thanks for reaching out! The Barsys 360 is temporarily on high demand. We expect to be fully restocked by March 23. We'll notify you as soon as it's available — you can also join our waitlist at barsys.com/notify.",
    isRead: false,
  },
  {
    id: "OPS-002", severity: "critical", source: "Support",
    title: "App Connectivity Issue — iOS 19.3 Update",
    body: "Multiple customer reports of Barsys app failing to connect to device after iOS 19.3 update. Engineering team is aware and working on a hotfix. Estimated patch: 24-48 hours. Affects approximately 15% of iOS users.",
    timestamp: "3 hrs ago", affectsPublicComms: true,
    suggestedResponse: "We're aware of a connectivity issue affecting some iOS users after the latest update. Our team is working on a fix right now — we expect it within 24-48 hours. In the meantime, try force-closing the app and reconnecting. Sorry for the inconvenience!",
    isRead: false,
  },
  {
    id: "OPS-003", severity: "warning", source: "Logistics",
    title: "USPS Delays in Northeast Region",
    body: "USPS reporting 2-3 day delays for packages in the Northeast corridor (NY, NJ, CT, MA). This may affect delivery estimates for recent orders. UPS and FedEx unaffected.",
    timestamp: "4 hrs ago", affectsPublicComms: true,
    suggestedResponse: "We're seeing some shipping delays in the Northeast due to carrier issues. Your order is on its way! You can track it with your confirmation email link. Reach out if you need anything else.",
    isRead: false,
  },
  {
    id: "OPS-004", severity: "warning", source: "Product",
    title: "TikTok Shop Listing Under Review",
    body: "Our TikTok Shop listing for Barsys 360 bundle has been flagged for additional review. This is likely due to the 'alcohol-related' category. Legal team is handling. Do not reference TikTok Shop purchasing in any content until resolved.",
    timestamp: "5 hrs ago", affectsPublicComms: true,
    suggestedResponse: undefined,
    isRead: true,
  },
  {
    id: "OPS-005", severity: "info", source: "Product",
    title: "New Recipe Pack Release — Spring Collection",
    body: "The Spring 2026 recipe pack (12 new cocktails) will be available in the Barsys app starting March 20. Marketing can begin teasing content. Full recipe list available in shared drive.",
    timestamp: "6 hrs ago", affectsPublicComms: false,
    isRead: true,
  },
  {
    id: "OPS-006", severity: "warning", source: "Finance",
    title: "Creator Payout Processing Delay",
    body: "March creator payouts will be delayed by 2 business days due to banking system maintenance. Affected creators have been notified via email. If any creators reach out on social, redirect to creator@barsys.com.",
    timestamp: "8 hrs ago", affectsPublicComms: true,
    suggestedResponse: "Thanks for reaching out! Creator payouts for March are processing with a slight delay. You should see your payment by March 20. For specific questions, please email creator@barsys.com and our team will help!",
    isRead: true,
  },
  {
    id: "OPS-007", severity: "info", source: "Marketing",
    title: "Williams-Sonoma Partnership Confirmed",
    body: "The Williams-Sonoma in-store demo partnership has been officially signed. Beverly Hills location on April 5. Marketing materials and demo script needed by March 28.",
    timestamp: "10 hrs ago", affectsPublicComms: false,
    isRead: true,
  },
  {
    id: "OPS-008", severity: "info", source: "Product",
    title: "Firmware Update v3.2.1 Rollout Complete",
    body: "Firmware update v3.2.1 has been rolled out to all connected Barsys 360 devices. Includes improved pour accuracy and new cocktail measurement presets. No customer-facing issues reported.",
    timestamp: "12 hrs ago", affectsPublicComms: false,
    isRead: true,
  },
  {
    id: "OPS-009", severity: "info", source: "Support",
    title: "Support Ticket Volume — Weekly Summary",
    body: "Support tickets this week: 142 total (down 8% from last week). Top categories: Shipping inquiries (38%), App issues (25%), Recipe questions (18%), Returns (12%), Other (7%). CSAT score: 4.2/5.",
    timestamp: "1 day ago", affectsPublicComms: false,
    isRead: true,
  },
  {
    id: "OPS-010", severity: "warning", source: "Legal",
    title: "FTC Disclosure Reminder — Creator Content",
    body: "Reminder: All creator content must include proper FTC disclosures (#ad, #sponsored, or paid partnership label). Recent audit found 3 posts missing proper disclosure. Please re-brief affected creators.",
    timestamp: "1 day ago", affectsPublicComms: false,
    isRead: true,
  },
];

const severityIcons: Record<Severity, React.ReactNode> = {
  critical: <AlertTriangle className="h-4 w-4" />,
  warning: <AlertCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

const severityColors: Record<Severity, string> = {
  critical: "border-red-500/50 bg-red-500/5",
  warning: "border-amber-500/30 bg-amber-500/5",
  info: "border-[var(--border)]",
};

const severityBadgeVariant: Record<Severity, "error" | "warning" | "secondary"> = {
  critical: "error",
  warning: "warning",
  info: "secondary",
};

export default function OpsFeedPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedResponses, setExpandedResponses] = useState<Set<string>>(new Set());

  const unreadCount = opsUpdates.filter((u) => !u.isRead).length;

  const filtered = opsUpdates.filter((u) => {
    if (filter === "all") return true;
    return u.severity === filter;
  });

  const toggleResponse = (id: string) => {
    setExpandedResponses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Radio className="h-6 w-6 text-[var(--accent)]" />
            Operations Feed
          </h1>
          {unreadCount > 0 && (
            <Badge variant="error" className="text-xs">{unreadCount} unread</Badge>
          )}
        </div>
        <Button variant="outline" size="sm" className="text-xs">Mark All Read</Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-1">
        {(["all", "critical", "warning", "info"] as FilterType[]).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
            className="text-xs capitalize"
          >
            {f !== "all" && (
              <span className={`mr-1 ${f === "critical" ? "text-red-400" : f === "warning" ? "text-amber-400" : "text-blue-400"}`}>
                {severityIcons[f as Severity]}
              </span>
            )}
            {f}
            <Badge variant="secondary" className="text-[10px] ml-1.5 px-1.5">
              {f === "all" ? opsUpdates.length : opsUpdates.filter((u) => u.severity === f).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Critical Alerts */}
      {filter === "all" && (
        <div className="space-y-2">
          {opsUpdates
            .filter((u) => u.severity === "critical" && !u.isRead)
            .map((update) => (
              <div
                key={`alert-${update.id}`}
                className="rounded-lg border-2 border-red-500/50 bg-red-500/5 p-4 flex items-start gap-3"
              >
                <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{update.title}</span>
                    <Badge variant="error" className="text-[10px]">{update.source}</Badge>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)]">{update.body}</p>
                </div>
                <span className="text-[10px] text-[var(--muted-foreground)] shrink-0">{update.timestamp}</span>
              </div>
            ))}
        </div>
      )}

      {/* Feed Items */}
      <div className="space-y-3">
        {filtered.map((update) => (
          <Card
            key={update.id}
            className={`transition-colors ${severityColors[update.severity]} ${!update.isRead ? "border-l-2 border-l-[var(--accent)]" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Severity Icon */}
                <div className={`shrink-0 mt-0.5 ${
                  update.severity === "critical" ? "text-red-400" :
                  update.severity === "warning" ? "text-amber-400" :
                  "text-blue-400"
                }`}>
                  {severityIcons[update.severity]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant={severityBadgeVariant[update.severity]} className="text-[10px] capitalize">
                      {update.severity}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">{update.source}</Badge>
                    <span className="text-[10px] text-[var(--muted-foreground)] ml-auto shrink-0">{update.timestamp}</span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{update.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{update.body}</p>

                  {/* Affects Public Comms */}
                  {update.affectsPublicComms && (
                    <div className="mt-3">
                      <Badge variant="warning" className="text-[10px]">
                        <Shield className="h-2.5 w-2.5 mr-1" />
                        Affects Public Communications
                      </Badge>
                    </div>
                  )}

                  {/* Suggested Response */}
                  {update.suggestedResponse && (
                    <div className="mt-3">
                      <button
                        className="flex items-center gap-1 text-xs font-medium text-[var(--accent)] hover:underline"
                        onClick={() => toggleResponse(update.id)}
                      >
                        <MessageSquare className="h-3 w-3" />
                        Suggested Response
                        {expandedResponses.has(update.id) ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </button>
                      {expandedResponses.has(update.id) && (
                        <div className="mt-2 rounded-lg bg-[var(--muted)] p-3 border border-[var(--border)]">
                          <p className="text-xs text-[var(--muted-foreground)] italic leading-relaxed">
                            &ldquo;{update.suggestedResponse}&rdquo;
                          </p>
                          <Button variant="outline" size="sm" className="text-[10px] mt-2 h-6">
                            Copy Response
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
