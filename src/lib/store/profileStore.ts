import { authApi } from "@/api/api";
import { create } from "zustand";

interface Badge {
  id: string;
  awardedAt: string;
  badge: {
    id: string;
    name: string;
    condition: string;
    imageUrl: string;
  };
}

interface Item {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  price: number;
}

interface Plant {
  id: string;
  name: string;
  stage: "SEED" | "SPROUT" | "GROWING" | "MATURE" | "HARVEST";
  currentContributions: number;
  createdAt: string;
  updatedAt: string;
}

interface ProfileState {
  user: {
    username: string;
    image: string | null;
  } | null;
  seedCount: number;
  badges: Badge[];
  equipped: {
    background: Item | null;
    pot: Item | null;
  };
  plants: Plant[];
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
}

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
