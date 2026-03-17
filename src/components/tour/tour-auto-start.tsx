"use client";

import { useEffect } from "react";
import { useTourStore } from "@/stores/use-tour-store";

export function TourAutoStart() {
  useEffect(() => {
    const unsub = useTourStore.persist.onFinishHydration(() => {
      const state = useTourStore.getState();
      if (!state.hasCompletedTour && !state.isActive) {
        setTimeout(() => {
          const current = useTourStore.getState();
          if (!current.hasCompletedTour && !current.isActive) {
            current.startTour();
          }
        }, 600);
      }
    });

    // If already hydrated (hot reload / fast navigation)
    const state = useTourStore.getState();
    if (!state.hasCompletedTour && !state.isActive) {
      setTimeout(() => {
        const current = useTourStore.getState();
        if (!current.hasCompletedTour && !current.isActive) {
          current.startTour();
        }
      }, 600);
    }

    return unsub;
  }, []);

  return null;
}
