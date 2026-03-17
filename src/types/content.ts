import type { Platform } from "./common";

export type ContentFormat = "reel" | "carousel" | "static" | "story" | "tiktok_video" | "live";
export type ContentStatus = "idea" | "briefed" | "in_production" | "review" | "approved" | "scheduled" | "published" | "archived";
export type ContentSource = "in_house" | "india_team" | "creator" | "ugc" | "collaboration";
export type ContentPillar = "product_demo" | "cocktail_recipe" | "hosting_lifestyle" | "behind_scenes" | "ugc_repost" | "trend_response" | "education" | "activation_recap";

export interface ContentMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
  reach: number;
  impressions: number;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  format: ContentFormat;
  pillar: ContentPillar;
  status: ContentStatus;
  source: ContentSource;
  scheduledDate: string | null;
  publishedDate: string | null;
  hook: string;
  caption: string;
  hashtags: string[];
  thumbnailUrl: string;
  seriesName: string | null;
  briefId: string | null;
  metrics: ContentMetrics | null;
  creatorId: string | null;
  campaignId: string | null;
  isAvailableForPaid: boolean;
  qualityRating: number | null;
  createdBy: string;
  updatedAt: string;
  tags: string[];
}
