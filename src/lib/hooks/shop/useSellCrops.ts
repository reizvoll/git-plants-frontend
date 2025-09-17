import { shopApi } from "@/api/user";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useToastStore } from "@/lib/store/useToaststore";
import { Crop } from "@/lib/types/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SellCropsParams {
  selectedCropsForSale: Array<{ plantId: string; count: number }>;
  crops: Crop[];
}

export const useSellCrops = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const addToast = useToastStore((state) => state.addToast);

  const mutation = useMutation({
    mutationFn: async ({ selectedCropsForSale }: SellCropsParams) => {
      if (!user) {
        throw new Error("로그인이 필요합니다.");
      }

      if (selectedCropsForSale.length === 0) {
        throw new Error("판매할 작물을 선택해주세요.");
      }

      // calculate the price of the selected crops (temporary: 100 seed per crop)
      const totalCount = selectedCropsForSale.reduce((sum, item) => sum + item.count, 0);

      // prepare the data to send to the server
      const plantIds = selectedCropsForSale.flatMap((item) => Array(item.count).fill(item.plantId));

      // call the crop sell API
      const response = await shopApi.sellCrops(plantIds, totalCount);
      return { response, totalCount };
    },
    onSuccess: ({ response, totalCount }) => {
      // invalidate profile (refresh)
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      // get the information from the server response
      const { soldCropsCount, seeds } = response.data;
      addToast(`작물 ${soldCropsCount}개를 판매했습니다! (+${seeds.count} 시드)`, "success");
    },
    onError: (error: any) => {
      const errorMessage = error instanceof Error ? error.message : "판매에 실패했습니다.";
      addToast(errorMessage, "warning");
    }
  });

  const handleSell = (selectedCropsForSale: Array<{ plantId: string; count: number }>, crops: Crop[]) => {
    if (selectedCropsForSale.length === 0) {
      addToast("판매할 작물을 선택해주세요.", "warning");
      return;
    }
    mutation.mutate({ selectedCropsForSale, crops });
  };

  return {
    ...mutation,
    handleSell
  };
};
