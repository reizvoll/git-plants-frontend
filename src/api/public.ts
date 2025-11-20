import { addLocaleParam, Locale } from "@/lib/store/languageStore";
import { CurrentUpdate, MonthlyPlant, ShopItem } from "@/lib/types/api/public";
import { PublicAPI } from "./api";

export const getMonthlyPlant = async (locale?: Locale): Promise<MonthlyPlant | null> => {
  const url = addLocaleParam("/api/public/monthly-plant", locale);
  const response = await PublicAPI.get(url);

  return response.status === 404 ? null : response.data;
};

export const getCurrentUpdate = async (locale?: Locale): Promise<CurrentUpdate | null> => {
  const url = addLocaleParam("/api/public/current-update", locale);
  const response = await PublicAPI.get(url);

  return response.status === 404 ? null : response.data;
};

export const getShopItems = async (locale?: Locale): Promise<ShopItem[]> => {
  const url = addLocaleParam("/api/public/items", locale);
  const response = await PublicAPI.get(url);

  return response.status === 404 ? [] : response.data;
};
