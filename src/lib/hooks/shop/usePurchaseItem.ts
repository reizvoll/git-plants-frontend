import { shopApi } from "@/api/user";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useToastStore } from "@/lib/store/useToaststore";
import { ShopItem } from "@/lib/types/api/public";
import { useMutation, useQueryClient } from "@tanstack/react-query";


// TODO: update translations message
export const usePurchaseItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const addToast = useToastStore((state) => state.addToast);

  const mutation = useMutation({
    mutationFn: async (item: ShopItem) => {
      if (!user) {
        throw new Error("로그인이 필요합니다.");
      }

      const response = await shopApi.purchaseItem(item.id, item.price);

      if (response.status >= 400) {
        throw response;
      }

      return { item, response };
    },
    onSuccess: ({ item }) => {
      // invalidate profile (refresh)
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      addToast(`${item.name}을(를) 구매했습니다!`, "success");
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : "구매에 실패했습니다.";
      addToast(errorMessage, "warning");
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
