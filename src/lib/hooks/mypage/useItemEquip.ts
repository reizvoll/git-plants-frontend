import { authApi } from "@/api/auth";
import { useProfileStore } from "@/lib/store/profileStore";
import { useToastStore } from "@/lib/store/useToaststore";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface EquipItemParams {
  userItemId: string;
  equipped: boolean;
  category: "background" | "pot";
  currentMode?: string;
  silent?: boolean; // 토스트 알림 표시 안함
}

interface UseItemEquipOptions {
  currentMode?: string;
  currentBackgrounds?: any[];
  currentPots?: any[];
  autoEquip?: boolean; // 자동 장착 활성화 여부
}

export const useItemEquip = (options?: UseItemEquipOptions) => {
  const { updateItemEquipStatus, items, equipped } = useProfileStore();
  const addToast = useToastStore((state) => state.addToast);
  const t = useTranslations("mypage.styleSection");

  const mutation = useMutation({
    mutationFn: async ({ userItemId, equipped }: { userItemId: string; equipped: boolean }) => {
      return authApi.equipItem(userItemId, equipped);
    },
    onMutate: async ({ userItemId, equipped, category, currentMode }: EquipItemParams) => {
      // 낙관적 업데이트를 위한 이전 상태 저장
      const previousState = useProfileStore.getState();

      // 같은 카테고리의 다른 아이템들을 먼저 해제해야 할 수도 있음
      const changes: Array<{ userItemId: string; equipped: boolean }> = [];

      if (equipped && category === "background") {
        // 같은 모드의 배경화면이 이미 장착되어 있다면 해제
        const currentEquippedBackground = items?.find(
          (item) => item.equipped && item.item.category === "background" && item.item.mode === currentMode
        );

        if (currentEquippedBackground && currentEquippedBackground.id !== userItemId) {
          changes.push({ userItemId: currentEquippedBackground.id, equipped: false });
        }
      } else if (equipped && category === "pot") {
        // 현재 장착된 화분이 있다면 해제
        const currentEquippedPot = items?.find((item) => item.equipped && item.item.category === "pot");

        if (currentEquippedPot && currentEquippedPot.id !== userItemId) {
          changes.push({ userItemId: currentEquippedPot.id, equipped: false });
        }
      }

      // 새로운 아이템 장착/해제
      changes.push({ userItemId, equipped });

      // 낙관적 업데이트 적용
      updateItemEquipStatus(changes);

      return { previousState, changes };
    },
    onError: (error, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousState) {
        useProfileStore.setState(context.previousState);
      }

      console.error("Failed to equip/unequip item:", error);
      addToast(t("errorEquip"), "warning");
    },
    onSuccess: (data, variables) => {
      if (!variables.silent) {
        const message = variables.equipped ? t("successEquip") : t("successUnEquip");
        addToast(message, "success");
      }
    }
  });

  const equipItem = (params: EquipItemParams) => {
    mutation.mutate({
      userItemId: params.userItemId,
      equipped: params.equipped,
      category: params.category,
      currentMode: params.currentMode,
      silent: params.silent
    });
  };

  // 자동 장착: equipped가 없을 때 첫 번째 아이템을 자동으로 장착
  useEffect(() => {
    if (!options?.autoEquip || !options?.currentMode || !options?.currentBackgrounds) return;

    const hasEquippedBackground = equipped?.backgrounds?.some((bg) => bg.mode === options.currentMode);
    if (!hasEquippedBackground && options.currentBackgrounds.length > 0) {
      equipItem({
        userItemId: options.currentBackgrounds[0].id,
        equipped: true,
        category: "background",
        currentMode: options.currentMode,
        silent: true
      });
    }
  }, [options?.currentMode, options?.currentBackgrounds?.length]);

  useEffect(() => {
    if (!options?.autoEquip || !options?.currentPots) return;

    const hasEquippedPot = equipped?.pots?.length > 0;
    if (!hasEquippedPot && options.currentPots.length > 0) {
      equipItem({
        userItemId: options.currentPots[0].id,
        equipped: true,
        category: "pot",
        silent: true
      });
    }
  }, [options?.currentPots?.length]);

  return {
    equipItem,
    isLoading: mutation.isPending,
    error: mutation.error
  };
};
