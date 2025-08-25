import { authApi } from "@/api/auth";
import { useProfileStore } from "@/lib/store/profileStore";
import { useToastStore } from "@/lib/store/useToaststore";
import { useMutation } from "@tanstack/react-query";

interface EquipItemParams {
  userItemId: string;
  equipped: boolean;
  category: "background" | "pot";
  currentMode?: string;
}

export const useItemEquip = () => {
  const { updateItemEquipStatus, items } = useProfileStore();
  const addToast = useToastStore((state) => state.addToast);

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
      addToast("아이템 장착에 실패했습니다.", "warning");
    },
    onSuccess: () => {
      addToast("아이템이 성공적으로 장착되었습니다.", "success");
    }
  });

  const equipItem = (params: EquipItemParams) => {
    mutation.mutate({
      userItemId: params.userItemId,
      equipped: params.equipped,
      category: params.category,
      currentMode: params.currentMode
    });
  };

  return {
    equipItem,
    isLoading: mutation.isPending,
    error: mutation.error
  };
};
