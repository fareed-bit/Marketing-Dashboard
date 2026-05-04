import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "@/types/common";

interface RoleState {
  activeRole: Role;
  setActiveRole: (role: Role) => void;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      activeRole: "brand",
      setActiveRole: (role) => set({ activeRole: role }),
    }),
    { name: "barsys-role" }
  )
);
