import type { PipelineStage } from "@/types/creator";

export interface PipelineStageConfig {
  key: PipelineStage;
  label: string;
  description: string;
  color: string;
}

export const pipelineStages: PipelineStageConfig[] = [
  { key: "sourced", label: "Sourced", description: "Identified as potential partner", color: "#94a3b8" },
  { key: "contacted", label: "Contacted", description: "Initial outreach sent", color: "#60a5fa" },
  { key: "responded", label: "Responded", description: "Creator has replied", color: "#38bdf8" },
  { key: "approved", label: "Approved", description: "Approved for partnership", color: "#34d399" },
  { key: "onboarded", label: "Onboarded", description: "Onboarding completed", color: "#a78bfa" },
  { key: "gifted", label: "Gifted", description: "Product sent to creator", color: "#f472b6" },
  { key: "posted", label: "Posted", description: "First content published", color: "#fb923c" },
  { key: "first_sale", label: "First Sale", description: "Generated first sale", color: "#facc15" },
  { key: "active", label: "Active", description: "Actively producing and selling", color: "#22c55e" },
  { key: "inactive", label: "Inactive", description: "No activity in 21+ days", color: "#6b7280" },
];
