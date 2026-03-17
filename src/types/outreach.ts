export type OutreachChannel = "instagram_dm" | "tiktok_dm" | "email" | "reacher" | "other";
export type OutreachStatus = "drafted" | "sent" | "delivered" | "opened" | "responded" | "no_response" | "declined";

export interface OutreachEntry {
  id: string;
  creatorId: string;
  channel: OutreachChannel;
  status: OutreachStatus;
  sentAt: string | null;
  respondedAt: string | null;
  followUpDue: string | null;
  followUpCount: number;
  maxFollowUps: number;
  notes: string;
}
