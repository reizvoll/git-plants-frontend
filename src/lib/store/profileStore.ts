import { authApi } from "@/api/auth";
import { ProfileState } from "@/lib/types/api/profile";
import { create } from "zustand";

export const useProfileStore = create<ProfileState>((set, get) => ({
  user: null,
  seedCount: 0,
  badges: [],
  newBadges: [],
  items: [],
  crops: [],
  equipped: {
    backgrounds: [],
    pots: []
  },
  plants: [],
  isLoading: false,
  error: null,
  fetchProfile: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.getProfile();

      if (response.success && response.data) {
        const { user, seedCount, badges, newBadges, items, crops, equipped, plants } = response.data;
        set({ user, seedCount, badges, newBadges, items, crops, equipped, plants, isLoading: false });
      } else {
        throw new Error("No profile data received");
      }
    } catch (error) {
      console.error("Profile API Exception:", error);
      set({
        error: error instanceof Error ? error.message : "Failed to fetch profile",
        isLoading: false
      });
    }
  },

  updateItemEquipStatus: (changes: Array<{ userItemId: string; equipped: boolean }>) => {
    const currentState = get();
    const updatedItems = currentState.items.map((item) => {
      const change = changes.find((c) => c.userItemId === item.id);
      if (change) {
        return { ...item, equipped: change.equipped };
      }
      return item;
    });

    const equippedBackgrounds = updatedItems
      .filter((item) => item.equipped && item.item.category === "background")
      .map((item) => item.item);

    const equippedPots = updatedItems
      .filter((item) => item.equipped && item.item.category === "pot")
      .map((item) => item.item);

    set({
      items: updatedItems,
      equipped: {
        backgrounds: equippedBackgrounds,
        pots: equippedPots
      }
    });
  },

  decrementCropQuantity: (cropId: string) => {
    set((state) => ({
      crops: state.crops
        .map((crop) => (crop.id === cropId && crop.quantity > 0 ? { ...crop, quantity: crop.quantity - 1 } : crop))
        .filter((crop) => crop.quantity > 0)
    }));
  },

  restoreCropQuantity: (restorations: Array<{ cropId: string; count: number }>) => {
    set((state) => ({
      crops: state.crops.map((crop) => {
        const restoration = restorations.find((r) => r.cropId === crop.id);
        return restoration ? { ...crop, quantity: crop.quantity + restoration.count } : crop;
      })
    }));
  }
}));
