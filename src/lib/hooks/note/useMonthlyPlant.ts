import { getMonthlyPlant } from "@/api/public";
import { useLanguageStore } from "@/lib/store/languageStore";
import { MonthlyPlant } from "@/lib/types/api/public";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch monthly plant information with language support
 * @returns Query result with monthly plant data
 */
export const useMonthlyPlant = () => {
  const { language } = useLanguageStore();

  return useQuery({
    queryKey: ["monthlyPlant", language],
    queryFn: async () => {
      const response = await getMonthlyPlant(language);

      // validate response data structure
      if (response && response.mainImageUrl && response.iconUrl) {
        return response as MonthlyPlant;
      }
      return null;
    },
    staleTime: 30 * 60 * 1000, // 30min
    gcTime: 60 * 60 * 1000 // 1hr
  });
};
