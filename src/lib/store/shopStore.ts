import { Crop } from "@/lib/types/api/profile";
import { create } from "zustand";
import { useProfileStore } from "./profileStore";

interface ShopState {
  // 판매용 작물 선택 상태 - 개수 추적 (UI 상태만 관리)
  selectedCropsForSale: Array<{ plantId: string; count: number }>;

  // 판매 액션
  toggleCropSelection: (cropId: string) => void;
  selectAllCrops: (crops: Crop[]) => void;
  clearSelection: () => void;
}

export const useShopStore = create<ShopState>((set, get) => ({
  selectedCropsForSale: [],

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
  }
}));
