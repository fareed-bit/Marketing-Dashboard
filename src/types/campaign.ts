export type CampaignStatus = "planning" | "sourcing" | "active" | "paused" | "completed" | "archived";
export type CampaignType = "product_launch" | "seasonal" | "always_on" | "event_driven" | "collaboration";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  budget: number;
  budgetSpent: number;
  creatorIds: string[];
  targetCreatorCount: number;
  totalContentPieces: number;
  totalReach: number;
  totalEngagement: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  roi: number | null;
  utmCampaign: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
