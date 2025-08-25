import type { Crop, UserItem } from "@/lib/types/api/profile";
import { useMemo, useState } from "react";

export type SortType = "LATEST" | "MOST_GROWN" | "A_Z";
export type CollectionMode = "CROP" | "BACKGROUND" | "POT";

interface UseCollectionSortParams {
  items: UserItem[] | null;
  crops: Crop[] | null;
}

const sortFunctions = {
  crops: {
    LATEST: (a: Crop, b: Crop) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    MOST_GROWN: (a: Crop, b: Crop) => b.quantity - a.quantity,
    A_Z: (a: Crop, b: Crop) => a.monthlyPlant.name.localeCompare(b.monthlyPlant.name, "ko")
  },
  items: {
    LATEST: (a: UserItem, b: UserItem) => new Date(b.acquiredAt).getTime() - new Date(a.acquiredAt).getTime(),
    A_Z: (a: UserItem, b: UserItem) => a.item.name.localeCompare(b.item.name, "ko")
  }
};

const sortOptions = {
  LATEST: { label: "최신순", value: "LATEST" as const },
  MOST_GROWN: { label: "보유순", value: "MOST_GROWN" as const },
  A_Z: { label: "가나다순", value: "A_Z" as const }
};

export const useCollectionSort = ({ items, crops }: UseCollectionSortParams) => {
  const [currentSort, setCurrentSort] = useState<SortType>("LATEST");

  const sortedData = useMemo(() => {
    if (!items) return { backgrounds: [], pots: [], crops: [] };

    const [backgroundItems, potItems] = [
      items.filter((item) => item.item.category === "background"),
      items.filter((item) => item.item.category === "pot")
    ];

    // 작물 정렬
    const sortedCrops = crops ? [...crops].sort(sortFunctions.crops[currentSort]) : [];

    // 아이템 정렬 (MOST_GROWN은 작물에만 적용)
    const itemSortFn = sortFunctions.items[currentSort as keyof typeof sortFunctions.items];
    const sortedBackgrounds = itemSortFn ? [...backgroundItems].sort(itemSortFn) : backgroundItems;
    const sortedPots = itemSortFn ? [...potItems].sort(itemSortFn) : potItems;

    return {
      backgrounds: sortedBackgrounds,
      pots: sortedPots,
      crops: sortedCrops
    };
  }, [items, crops, currentSort]);

  const resetToDefault = () => {
    setCurrentSort("LATEST");
  };

  const getSortOptions = (mode: CollectionMode) => {
    const options = [sortOptions.LATEST, sortOptions.A_Z] as Array<(typeof sortOptions)[keyof typeof sortOptions]>;

    if (mode === "CROP") {
      options.splice(1, 0, sortOptions.MOST_GROWN);
    }

    return options.map((option) => ({
      label: option.label,
      onClick: () => setCurrentSort(option.value),
      active: currentSort === option.value
    }));
  };

  return {
    currentSort,
    sortedData,
    handleSortChange: setCurrentSort,
    resetToDefault,
    getSortOptions
  };
};
