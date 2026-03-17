import type { Platform } from "./common";

export interface DailySocialMetrics {
  id: string;
  date: string;
  platform: Platform;
  followers: number;
  followerGrowth: number;
  followerGrowthRate: number;
  postsPublished: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalSaves: number;
  averageEngagementRate: number;
  totalReach: number;
  totalImpressions: number;
  dmsReceived: number;
  dmsResponded: number;
  averageResponseTime: number;
  websiteClicks: number;
  profileVisits: number;
}
