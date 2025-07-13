import { ApiResponse } from "@/lib/types/api";
import API from "./api";

// Seed 관련 API
export const seedApi = {
  getSeeds: () => API.get<ApiResponse<{ userId: string; count: number }>>("/api/seeds"),
  addSeeds: (count: number) => API.post<ApiResponse<{ message: string }>>("/api/seeds/add", { count })
};
