import { authApi } from "@/api/api";
import { ProfileState } from "@/lib/types/profile";
import { create } from "zustand";

export const useProfileStore = create<ProfileState>((set) => ({
  user: null,
  seedCount: 0,
  badges: [],
  equipped: {
    background: null,
    pot: null
  },
  plants: [],
  isLoading: false,
  error: null,
  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await authApi.getProfile();

      if (response.data) {
        const { user, seedCount, badges, equipped, plants } = response.data;
        set({
          user,
          seedCount,
          badges,
          equipped,
          plants,
          isLoading: false
        });
      } else {
        set({
          error: "No profile data received",
          isLoading: false
        });
      }
    } catch (error) {
      console.error("Profile API Exception:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to fetch profile",
        isLoading: false
      });
    }
  }
}));
