import { getShopItems } from "@/api/public";
import { shopApi } from "@/api/user";
import { Crop } from "@/lib/types/api/profile";
import { ShopItem } from "@/lib/types/api/public";
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { useProfileStore } from "./profileStore";
import { useToastStore } from "./useToaststore";

interface ShopState {
  // 아이템 상태
  backgroundItems: ShopItem[];
  potItems: ShopItem[];

  // 판매용 작물 선택 상태 - 개수 추적
  selectedCropsForSale: Array<{ plantId: string; count: number }>;

  // 로딩 및 에러 상태
  isLoading: boolean;
  error: string | null;

  // 아이템 관리 액션
  fetchShopItems: () => Promise<void>;

  // 구매 액션
  purchaseItem: (item: ShopItem) => Promise<void>;

  // 판매 액션
  toggleCropSelection: (cropId: string) => void;
  selectAllCrops: (crops: Crop[]) => void;
  clearSelection: () => void;
  sellSelectedCrops: (crops: Crop[]) => Promise<void>;
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
    const { crops } = useProfileStore.getState();
    const { selectedCropsForSale } = get();

    const currentCrop = crops.find((crop) => crop.id === cropId);
    if (!currentCrop || currentCrop.quantity === 0) return;

    const existingIndex = selectedCropsForSale.findIndex((item) => item.plantId === cropId);

    let newSelections: typeof selectedCropsForSale;

    if (existingIndex >= 0) {
      const existing = selectedCropsForSale[existingIndex];
      newSelections =
        existing.count < currentCrop.quantity
          ? selectedCropsForSale.map((item, i) => (i === existingIndex ? { ...item, count: item.count + 1 } : item))
          : selectedCropsForSale.filter((_, i) => i !== existingIndex);
    } else {
      newSelections = [...selectedCropsForSale, { plantId: cropId, count: 1 }];
    }

    set({ selectedCropsForSale: newSelections });
  },

  selectAllCrops: (crops: Crop[]) => {
    // 수확 가능한 작물들 필터링하여 모두 선택
    const selections = crops
      .filter((crop) => crop.quantity > 0)
      .map((crop) => ({
        plantId: crop.id,
        count: crop.quantity
      }));

    set({ selectedCropsForSale: selections });
  },

  clearSelection: () => {
    // 단순히 선택 목록만 초기화
    set({ selectedCropsForSale: [] });
  },

  sellSelectedCrops: async (crops: Crop[]) => {
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

      // 선택된 작물들의 가격 계산 (임시로 개당 100 seed)
      const totalCount = selectedCropsForSale.reduce((sum, item) => sum + item.count, 0);
      const totalPrice = totalCount * 100;

      // 서버로 전송할 데이터 준비
      const plantIds = selectedCropsForSale.flatMap((item) => Array(item.count).fill(item.plantId));

      // 작물 판매 API 호출
      const response = await shopApi.sellCrops(plantIds, totalPrice);

      // 프로필 정보 새로고침 (서버에서 업데이트된 seeds와 crops 데이터 가져오기)
      await fetchProfile();

      // 선택 초기화
      set({ selectedCropsForSale: [] });

      // 서버 응답에서 정보 가져오기
      const { soldCropsCount, seeds } = response.data;
      addToast(`작물 ${soldCropsCount}개를 판매했습니다! (+${totalPrice} 시드)`, "success");
      set({ isLoading: false });
    } catch (error) {
      // 실패 시에는 복구 로직 불필요 (애초에 quantity를 건드리지 않았으므로)
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
