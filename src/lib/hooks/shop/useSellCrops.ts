import { shopApi } from "@/api/user";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useToastStore } from "@/lib/store/useToaststore";
import { Crop } from "@/lib/types/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

interface SellCropsParams {
  selectedCropsForSale: Array<{ plantId: string; count: number }>;
  crops: Crop[];
}

/**
 * Custom hook to handle selling crops
 * @returns Sell mutation and handler
 */
export const useSellCrops = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { addToast, addErrorToast } = useToastStore();
  const t = useTranslations("shop.hooks.sell");

  const mutation = useMutation({
    mutationFn: async ({ selectedCropsForSale }: SellCropsParams) => {
      if (!user) {
        throw new Error(t("loginRequired"));
      }

      if (selectedCropsForSale.length === 0) {
        throw new Error(t("noCropsSelected"));
      }

      // calculate the price of the selected crops
      const totalCount = selectedCropsForSale.reduce((sum, item) => sum + item.count, 0);
      // TODO: 백엔드에서 판매가격 필드(sellingPrice) 추가 시 삭제 예정
      const totalPrice = totalCount * 100;

      // prepare the data to send to the server
      const plantIds = selectedCropsForSale.flatMap((item) => Array(item.count).fill(item.plantId));

      // call the crop sell API
      const response = await shopApi.sellCrops(plantIds, totalPrice);
      return { response, totalCount, totalPrice };
    },
    onSuccess: ({ response, totalPrice }) => {
      // invalidate profile (refresh)
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      // get the information from the server response
      const { soldCropsCount } = response.data;
      // totalPrice: increase seeds count (seeds.count is not used because it is the final seed count)
      addToast(t("success", { count: soldCropsCount, seeds: totalPrice }), "success");
    },
    onError: (error: unknown) => {
      addErrorToast(error, t("error"));
    }
  });

  const handleSell = (selectedCropsForSale: Array<{ plantId: string; count: number }>, crops: Crop[]) => {
    if (selectedCropsForSale.length === 0) {
      addToast(t("noCropsSelected"), "warning");
      return;
    }
    mutation.mutate({ selectedCropsForSale, crops });
  };

  return {
    ...mutation,
    handleSell
  };
};
