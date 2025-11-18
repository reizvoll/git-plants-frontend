import { shopApi } from "@/api/user";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useToastStore } from "@/lib/store/useToaststore";
import { ShopItem } from "@/lib/types/api/public";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

/**
 * Custom hook to handle shop item purchases
 * @returns Purchase mutation and handler
 */
export const usePurchaseItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { addToast, addErrorToast } = useToastStore();
  const t = useTranslations("shop.hooks.purchase");

  const mutation = useMutation({
    mutationFn: async (item: ShopItem) => {
      if (!user) {
        throw new Error(t("loginRequired"));
      }

      const response = await shopApi.purchaseItem(item.id, item.price);
      return { item, response };
    },
    onSuccess: ({ item }) => {
      // invalidate profile (refresh)
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      addToast(t("success", { itemName: item.name }), "success");
    },
    onError: (error: unknown) => {
      addErrorToast(error, t("error"));
    }
  });

  const handlePurchase = (item: ShopItem) => {
    mutation.mutate(item);
  };

  return {
    ...mutation,
    handlePurchase
  };
};
