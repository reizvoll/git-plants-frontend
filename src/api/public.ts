import { ApiResponse } from "@/lib/types/api/api";
import { CurrentUpdate, MonthlyPlant } from "@/lib/types/api/public";
import API from "./api";

export const getMonthlyPlant = async (): Promise<ApiResponse<MonthlyPlant>> => {
  try {
    const response = await API.get("/api/public/monthly-plant");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch monthly plant:", error);
    throw error;
  }
};

export const getCurrentUpdate = async (): Promise<ApiResponse<CurrentUpdate>> => {
  try {
    const response = await API.get("/api/public/current-update");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch current update:", error);
    throw error;
  }
};
