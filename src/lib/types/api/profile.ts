import type { MonthlyPlant } from "./public";

export type Badge = {
  id: string;
  awardedAt: string;
  badge: {
    id: number;
    name: string;
    condition: string;
    imageUrl: string;
  };
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

export interface ProfileState {
  user: {
    username: string;
    image: string | null;
  } | null;
  seedCount: number;
  badges: Badge[];
  equipped: {
    backgrounds: Item[];
    pots: Item[];
  };
  plants: Plant[];
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
}
