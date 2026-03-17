import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TourState {
  isActive: boolean;
  currentStep: number;
  hasCompletedTour: boolean;
  startTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  completeTour: () => void;
  goToStep: (step: number) => void;
}

export const useTourStore = create<TourState>()(
  persist(
    (set) => ({
      isActive: false,
      currentStep: 0,
      hasCompletedTour: false,

      startTour: () => set({ isActive: true, currentStep: 0 }),

      nextStep: () =>
        set((state) => ({ currentStep: state.currentStep + 1 })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(0, state.currentStep - 1),
        })),

      skipTour: () =>
        set({ isActive: false, currentStep: 0, hasCompletedTour: true }),

      completeTour: () =>
        set({ isActive: false, currentStep: 0, hasCompletedTour: true }),

      goToStep: (step: number) => set({ currentStep: step }),
    }),
    { name: "barsys-tour" }
  )
);
