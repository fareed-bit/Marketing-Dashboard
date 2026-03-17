import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Role } from "@/types/common";

interface RoleState {
  activeRole: Role;
  userName: string;
  setActiveRole: (role: Role) => void;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      activeRole: "brand",
      userName: "Gosia",
      setActiveRole: (role) =>
        set({
          activeRole: role,
          userName: role === "brand" ? "Gosia" : "Lexi",
        }),
    }),
    { name: "barsys-role" }
  )
);
