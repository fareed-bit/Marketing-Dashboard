import { create } from "zustand";
import { produce } from "immer";
import type { Creator, PipelineStage } from "@/types/creator";
import { PIPELINE_STAGE_ORDER } from "@/lib/constants";

interface PipelineState {
  creators: Creator[];
  setCreators: (creators: Creator[]) => void;
  moveCreator: (creatorId: string, toStage: PipelineStage) => void;
  getCreatorsByStage: (stage: PipelineStage) => Creator[];
  getStageCounts: () => Record<PipelineStage, number>;
}

export const usePipelineStore = create<PipelineState>()((set, get) => ({
  creators: [],
  setCreators: (creators) => set({ creators }),
  moveCreator: (creatorId, toStage) =>
    set(
      produce((state: PipelineState) => {
        const creator = state.creators.find((c) => c.id === creatorId);
        if (!creator) return;
        creator.pipelineStage = toStage;
        const now = new Date().toISOString().split("T")[0];
        const dateMap: Partial<Record<PipelineStage, keyof Creator>> = {
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
        const field = dateMap[toStage];
        if (field) {
          (creator as any)[field] = now;
        }
        if (toStage === "inactive") {
          creator.isDormant = true;
          creator.dormantSinceDays = 0;
        } else if (creator.isDormant) {
          creator.isDormant = false;
          creator.dormantSinceDays = null;
        }
      })
    ),
  getCreatorsByStage: (stage) =>
    get().creators.filter((c) => c.pipelineStage === stage),
  getStageCounts: () => {
    const counts = {} as Record<PipelineStage, number>;
    for (const stage of PIPELINE_STAGE_ORDER) {
      counts[stage] = 0;
    }
    for (const creator of get().creators) {
      counts[creator.pipelineStage]++;
    }
    return counts;
  },
}));
