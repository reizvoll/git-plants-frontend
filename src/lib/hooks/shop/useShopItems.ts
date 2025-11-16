import { getShopItems } from "@/api/public";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch shop items
 * @returns Query result with shop items data
 */
export const useShopItems = () => {
  return useQuery({
    queryKey: ["shopItems"],
    queryFn: async () => {
      return await getShopItems();
    },
    staleTime: 30 * 60 * 1000, // 30min
    gcTime: 60 * 60 * 1000 // 1hr
  });
};
