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
  price: number;
};

export type Plant = {
  id: string;
  name: string;
  stage: "SEED" | "SPROUT" | "GROWING" | "MATURE" | "HARVEST";
  currentContributions: number;
  createdAt: string;
  updatedAt: string;
};

export interface ProfileState {
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
