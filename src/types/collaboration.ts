export type CollaborationStatus = "research" | "outreach" | "negotiation" | "confirmed" | "active" | "completed" | "passed";

export interface Collaboration {
  id: string;
  partnerName: string;
  partnerContact: string;
  type: string;
  status: CollaborationStatus;
  description: string;
  startDate: string | null;
  endDate: string | null;
  budget: number | null;
  linkedActivationId: string | null;
  linkedCampaignId: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
