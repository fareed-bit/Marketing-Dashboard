import type { Platform } from "./common";

export type CommunityItemType = "dm" | "comment" | "mention" | "ugc" | "review";
export type CommunityPriority = "urgent" | "high" | "normal" | "low";
export type CommunityStatus = "new" | "in_progress" | "responded" | "escalated" | "archived";

export interface CommunityQueueItem {
  id: string;
  type: CommunityItemType;
  platform: Platform;
  priority: CommunityPriority;
  status: CommunityStatus;
  senderHandle: string;
  senderName: string;
  preview: string;
  fullMessage: string;
  theme: string;
  requiresOpsInput: boolean;
  responseText: string | null;
  respondedAt: string | null;
  receivedAt: string;
  assignedTo: string;
  isUgcCandidate: boolean;
}
