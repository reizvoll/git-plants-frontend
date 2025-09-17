import { UserProfile } from "@/lib/types/api/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// now Zustand, UI State only (user info is handled by TanStack Query)
interface AuthUIState {
  user: (UserProfile & { isAdmin?: boolean }) | null;
  setUser: (user: AuthUIState["user"]) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthUIState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null })
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user })
    }
  )
);
