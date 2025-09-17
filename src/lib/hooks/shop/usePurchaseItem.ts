import { shopApi } from "@/api/user";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useToastStore } from "@/lib/store/useToaststore";
import { ShopItem } from "@/lib/types/api/public";
import { ERROR_MESSAGES } from "@/lib/utils/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// BE Message > KO Message
const getErrorMessage = (backendMessage: string): string => {
  for (const statusErrors of Object.values(ERROR_MESSAGES)) {
    for (const error of Object.values(statusErrors)) {
      if (error.label === backendMessage) return error.message;
    }
  }
  return backendMessage;
};

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
    onError: (error: any) => {
      let errorMessage = "구매에 실패했습니다.";

      if (error.response?.data?.message) {
        errorMessage = getErrorMessage(error.response.data.message);
      } else if (error.message) {
        errorMessage = getErrorMessage(error.message);
      } else if (error.data?.message) {
        errorMessage = getErrorMessage(error.data.message);
      }

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
