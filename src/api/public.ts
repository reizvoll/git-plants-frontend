import { CurrentUpdate, MonthlyPlant, ShopItem } from "@/lib/types/api/public";
import API from "./api";

export const getMonthlyPlant = async (): Promise<MonthlyPlant> => {
  try {
    const response = await API.get("/api/public/monthly-plant");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch monthly plant:", error);
    throw error;
  }
};

export const getCurrentUpdate = async (): Promise<CurrentUpdate> => {
  try {
    const response = await API.get("/api/public/current-update");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch current update:", error);
    throw error;
  }
};

export const getShopItems = async (): Promise<ShopItem[]> => {
  try {
    const response = await API.get("/api/public/items");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch shop items:", error);
    throw error;
  }
};
