import { ApiResponse } from "@/lib/types/api/api";
import { SeedResponse } from "@/lib/types/api/profile";
import API from "./api";

// Seed 관련 API
export const seedApi = {
  getSeeds: () => API.get<ApiResponse<SeedResponse>>("/api/seeds"),

  addSeeds: (count: number) => API.post<ApiResponse<SeedResponse>>("/api/seeds/add", { count }),

  useSeeds: (count: number, itemId: number) => API.post<ApiResponse<SeedResponse>>("/api/seeds/use", { count, itemId })
};

export const shopApi = {
  purchaseItem: async (itemId: number, price: number) => {
    return seedApi.useSeeds(price, itemId);
  },

  sellCrops: async (cropIds: string[], totalPrice: number) => {
    return API.post("/api/garden/user-crops/sell", { cropIds, totalPrice });
  }
};
