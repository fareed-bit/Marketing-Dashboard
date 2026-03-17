export type AlertType =
  | "creator_followup_due" | "creator_dormant" | "content_deadline" | "performance_threshold"
  | "inventory_issue" | "cs_escalation" | "brief_overdue" | "outreach_followup"
  | "activation_upcoming" | "code_expiring";

export type AlertPriority = "critical" | "high" | "medium" | "low";
export type AlertRole = "brand" | "creator" | "both";

export interface Alert {
  id: string;
  type: AlertType;
  priority: AlertPriority;
  role: AlertRole;
  title: string;
  description: string;
  relatedEntityId: string | null;
  relatedEntityType: string | null;
  actionUrl: string | null;
  createdAt: string;
  isDismissed: boolean;
  isSnoozedUntil: string | null;
}
