import type { MonthlyPlant } from "./public";

export type Badge = {
  id: string;
  awardedAt: string;
  badge: {
    id: number;
    name: string;
    condition: string;
    imageUrl: string;
    ko?: {
      name?: string;
      condition?: string;
    };
  };
};

export type NewBadge = {
  name: string;
  imageUrl: string;
};

export type Item = {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  iconUrl: string;
  price: number;
  mode: string;
  createdAt: string;
  updatedAt: string;
  updatedById: string;
  ko?: {
    name?: string;
  };
};

export type UserItem = {
  id: string;
  equipped: boolean;
  acquiredAt: string;
  item: Item;
};

export type SeedResponse = {
  userId: string;
  count: number;
};

export type Plant = {
  id: string;
  userId: string;
  monthlyPlantId: number;
  stage: "SEED" | "SPROUT" | "GROWING" | "MATURE" | "HARVEST";
  harvestCount: number;
  harvestedAt: string;
  updatedAt: string;
  monthlyPlant: MonthlyPlant;
  currentContributions: number;
  totalContributions: number;
  currentImageUrl: string;
};

export type EquipItemResponse = {
  category: string;
  changes: Array<{
    userItemId: string;
    equipped: boolean;
  }>;
};

export type Crop = {
  id: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  monthlyPlant: MonthlyPlant & {
    cropImageUrl: string;
  };
};
export interface ProfileState {
  user: {
    username: string;
    image: string | null;
    isAdmin?: boolean;
  } | null;
  seedCount: number;
  badges: Badge[];
  newBadges: NewBadge[];
  items: UserItem[];
  crops: Crop[];
  equipped: {
    backgrounds: Item[];
    pots: Item[];
  };
  plants: Plant[];
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateItemEquipStatus: (changes: Array<{ userItemId: string; equipped: boolean }>) => void;
  decrementCropQuantity: (cropId: string) => void;
  restoreCropQuantity: (restorations: Array<{ cropId: string; count: number }>) => void;
  clearNewBadges: () => void;
}
