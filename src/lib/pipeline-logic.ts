import type { PipelineStage } from "@/types/creator";
import { PIPELINE_STAGE_ORDER } from "./constants";

export function getNextStage(current: PipelineStage): PipelineStage | null {
  const idx = PIPELINE_STAGE_ORDER.indexOf(current);
  if (idx === -1 || idx >= PIPELINE_STAGE_ORDER.length - 1) return null;
  return PIPELINE_STAGE_ORDER[idx + 1];
}

export function getStageIndex(stage: PipelineStage): number {
  return PIPELINE_STAGE_ORDER.indexOf(stage);
}

export function canTransition(from: PipelineStage, to: PipelineStage): boolean {
  if (to === "inactive") return true;
  if (from === "inactive" && to === "contacted") return true;
  const fromIdx = getStageIndex(from);
  const toIdx = getStageIndex(to);
  return toIdx > fromIdx && toIdx <= fromIdx + 2;
}

export function getDateFieldForStage(stage: PipelineStage): string {
  const map: Record<PipelineStage, string> = {
    sourced: "sourcedDate",
    contacted: "contactedDate",
    responded: "respondedDate",
    approved: "approvedDate",
    onboarded: "onboardedDate",
    gifted: "giftedDate",
    posted: "firstPostDate",
    first_sale: "firstSaleDate",
    active: "lastActiveDate",
    inactive: "lastActiveDate",
  };
  return map[stage];
}
