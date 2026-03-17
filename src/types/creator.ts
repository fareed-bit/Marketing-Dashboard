import type { Platform } from "./common";

export type PipelineStage =
  | "sourced" | "contacted" | "responded" | "approved" | "onboarded"
  | "gifted" | "posted" | "first_sale" | "active" | "inactive";

export type PartnershipType = "affiliate" | "gifting" | "campaign" | "ambassador" | "reactivation" | "nurture";
export type CreatorTier = "nano" | "micro" | "mid" | "macro" | "mega";
export type CreatorNiche =
  | "cocktail_mixology" | "bartender" | "hosting_entertaining" | "home_kitchen"
  | "gift_guide" | "tech_gadget" | "food_cooking" | "date_night_couples"
  | "luxury_lifestyle" | "ugc_specialist" | "amazon_finds";

export interface Creator {
  id: string;
  name: string;
  handle: string;
  email: string;
  platform: Platform;
  secondaryPlatforms: Platform[];
  profileUrl: string;
  avatarUrl: string;
  location: string;
  bio: string;
  niche: CreatorNiche;
  secondaryNiches: CreatorNiche[];
  tier: CreatorTier;
  followerCount: number;
  averageEngagementRate: number;
  pipelineStage: PipelineStage;
  partnershipType: PartnershipType;
  sourcedDate: string;
  contactedDate: string | null;
  respondedDate: string | null;
  approvedDate: string | null;
  onboardedDate: string | null;
  giftedDate: string | null;
  firstPostDate: string | null;
  firstSaleDate: string | null;
  lastActiveDate: string | null;
  affiliateCode: string | null;
  affiliateCodeStatus: "active" | "expired" | "pending_qa" | "not_assigned";
  totalClicks: number;
  totalCodeRedemptions: number;
  totalOrders: number;
  totalRevenue: number;
  conversionRate: number;
  totalContentPieces: number;
  averageContentQuality: number;
  campaignIds: string[];
  notes: string;
  tags: string[];
  qualificationScore: number;
  isStarPerformer: boolean;
  isDormant: boolean;
  dormantSinceDays: number | null;
}
