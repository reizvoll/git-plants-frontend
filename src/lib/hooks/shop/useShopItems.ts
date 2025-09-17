import { getShopItems } from "@/api/public";
import { useQuery } from "@tanstack/react-query";

export const useShopItems = () => {
  return useQuery({
    queryKey: ["shopItems"],
    queryFn: async () => {
      return await getShopItems();
    },
    staleTime: 30 * 60 * 1000, // 30분 - 거의 변경되지 않음
    gcTime: 60 * 60 * 1000 // 1시간 - 오래 캐싱
  });
};