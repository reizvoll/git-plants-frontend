import { addLocaleParam, Locale } from "@/lib/store/languageStore";
import { CurrentUpdate, MonthlyPlant, ShopItem } from "@/lib/types/api/public";
import API from "./api";

export const getMonthlyPlant = async (locale?: Locale): Promise<MonthlyPlant> => {
  try {
    const url = addLocaleParam("/api/public/monthly-plant", locale);
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch monthly plant:", error);
    throw error;
  }
};

export const getCurrentUpdate = async (locale?: Locale): Promise<CurrentUpdate> => {
  try {
    const url = addLocaleParam("/api/public/current-update", locale);
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch current update:", error);
    throw error;
  }
};

export const getShopItems = async (locale?: Locale): Promise<ShopItem[]> => {
  try {
    const url = addLocaleParam("/api/public/items", locale);
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch shop items:", error);
    throw error;
  }
};
