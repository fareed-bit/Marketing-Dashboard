export type ActivationType = "happy_hour" | "mixlist_session" | "external_collaboration" | "pop_up" | "brand_partnership";
export type ActivationStatus = "concept" | "planning" | "confirmed" | "in_progress" | "completed" | "cancelled";

export interface Activation {
  id: string;
  name: string;
  type: ActivationType;
  status: ActivationStatus;
  date: string;
  time: string;
  location: string;
  venue: string | null;
  description: string;
  mixlist: { cocktailName: string; ingredients: string[]; notes: string }[];
  contentPlanNotes: string;
  linkedContentIds: string[];
  createdBy: string;
  updatedAt: string;
}
