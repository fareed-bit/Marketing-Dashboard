import type { Platform } from "./common";
import type { ContentFormat, ContentPillar } from "./content";

export type BriefStatus = "draft" | "sent" | "in_production" | "review" | "revision_requested" | "approved" | "delivered";
export type BriefPriority = "urgent" | "high" | "normal" | "low";

export interface ProductionBrief {
  id: string;
  title: string;
  status: BriefStatus;
  priority: BriefPriority;
  assignedTo: string;
  createdBy: string;
  createdDate: string;
  dueDate: string;
  deliveredDate: string | null;
  hook: string;
  copyDirection: string;
  referenceUrls: string[];
  targetPlatform: Platform;
  targetFormat: ContentFormat;
  pillar: ContentPillar;
  feedbackHistory: { date: string; author: string; comment: string; type: "feedback" | "revision" | "approval" }[];
  contentId: string | null;
}
