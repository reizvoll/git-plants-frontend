import { getShopItems } from "@/api/public";
import { shopApi } from "@/api/user";
import { Plant } from "@/lib/types/api/profile";
import { ShopItem } from "@/lib/types/api/public";
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { useProfileStore } from "./profileStore";
import { useToastStore } from "./useToaststore";

interface ShopState {
  // 아이템 상태
  backgroundItems: ShopItem[];
  potItems: ShopItem[];

  // 판매용 작물 선택 상태
  selectedCropsForSale: string[];

  // 로딩 및 에러 상태
  isLoading: boolean;
  error: string | null;

  // 아이템 관리 액션
  fetchShopItems: () => Promise<void>;

  // 구매 액션
  purchaseItem: (item: ShopItem) => Promise<void>;

  // 판매 액션
  toggleCropSelection: (cropId: string) => void;
  selectAllCrops: (crops: Plant[]) => void;
  clearSelection: () => void;
  sellSelectedCrops: (crops: Plant[]) => Promise<void>;
}

export const useShopStore = create<ShopState>((set, get) => ({
  backgroundItems: [],
  potItems: [],
  selectedCropsForSale: [],
  isLoading: false,
  error: null,

  fetchShopItems: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getShopItems();

      const backgroundItems = response.filter((item) => item?.category === "background") || [];
      const potItems = response.filter((item) => item?.category === "pot") || [];

      set({
        backgroundItems,
        potItems,
        isLoading: false
      });
    } catch (error) {
      console.error("Failed to fetch shop items:", error);
      set({
        error: "상점 아이템을 불러오는데 실패했습니다.",
        isLoading: false
      });
    }
  },

  purchaseItem: async (item: ShopItem) => {
    const { addToast } = useToastStore.getState();
    const { user } = useAuthStore.getState();
    const { fetchProfile } = useProfileStore.getState();

    // 로그인 상태 체크
    if (!user) {
      addToast("로그인이 필요합니다.", "warning");
      return;
    }

    try {
      set({ isLoading: true, error: null });

      // seed 사용하여 아이템 구매
      await shopApi.purchaseItem(item.id, item.price);

      // 프로필 정보 새로고침 (seed 개수 업데이트)
      await fetchProfile();

      addToast(`${item.name}을(를) 구매했습니다!`, "success");
      set({ isLoading: false });
    } catch (error) {
      console.error("Purchase failed:", error);
      const errorMessage = error instanceof Error ? error.message : "구매에 실패했습니다.";

      set({
        error: errorMessage,
        isLoading: false
      });
      addToast(errorMessage, "warning");
    }
  },

  toggleCropSelection: (cropId: string) => {
    set((state) => ({
      selectedCropsForSale: state.selectedCropsForSale.includes(cropId)
        ? state.selectedCropsForSale.filter((id) => id !== cropId)
        : [...state.selectedCropsForSale, cropId]
    }));
  },

  selectAllCrops: (crops: Plant[]) => {
    // 수확 가능한 작물들만 선택
    const harvestableIds = crops.filter((crop) => crop.stage === "HARVEST").map((crop) => crop.id);

    set({ selectedCropsForSale: harvestableIds });
  },

  clearSelection: () => {
    set({ selectedCropsForSale: [] });
  },

  sellSelectedCrops: async (crops: Plant[]) => {
    const { selectedCropsForSale } = get();
    const { addToast } = useToastStore.getState();
    const { user } = useAuthStore.getState();
    const { fetchProfile } = useProfileStore.getState();

    // 로그인 상태 체크
    if (!user) {
      addToast("로그인이 필요합니다.", "warning");
      return;
    }

    if (selectedCropsForSale.length === 0) {
      addToast("판매할 작물을 선택해주세요.", "warning");
      return;
    }

    try {
      set({ isLoading: true, error: null });

      // 선택된 작물들의 가격 계산 (임시로 개당 10 seed)
      const totalPrice = selectedCropsForSale.length * 10;

      // seed 적립
      await shopApi.sellCrops(selectedCropsForSale, totalPrice);

      // 프로필 정보 새로고침 (seed 개수 업데이트)
      await fetchProfile();

      // 선택 초기화
      set({ selectedCropsForSale: [] });

      addToast(`${selectedCropsForSale.length}개 작물을 판매했습니다! (+${totalPrice} seeds)`, "success");
      set({ isLoading: false });
    } catch (error) {
      console.error("Sell failed:", error);
      const errorMessage = error instanceof Error ? error.message : "판매에 실패했습니다.";

      set({
        error: errorMessage,
        isLoading: false
      });
      addToast(errorMessage, "warning");
    }
  }
}));
