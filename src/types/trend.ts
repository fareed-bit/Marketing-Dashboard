import type { Platform } from "./common";

export type TrendType = "hashtag" | "audio" | "format" | "topic" | "challenge";

export interface Trend {
  id: string;
  type: TrendType;
  title: string;
  description: string;
  platform: Platform;
  relevanceScore: number;
  capturedAt: string;
  expiresAt: string | null;
  linkedContentIds: string[];
  notes: string;
}
