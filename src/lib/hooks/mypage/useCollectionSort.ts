import type { Crop, UserItem } from "@/lib/types/api/profile";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export type SortType = "latest" | "most_grown" | "a_z";
export type CollectionMode = "CROP" | "BACKGROUND" | "POT";

interface UseCollectionSortParams {
  items: UserItem[] | null;
  crops: Crop[] | null;
  currentSort: SortType;
}

const sortFunctions = {
  crops: {
    latest: (a: Crop, b: Crop) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    most_grown: (a: Crop, b: Crop) => b.quantity - a.quantity,
    a_z: (a: Crop, b: Crop) => a.monthlyPlant.name.localeCompare(b.monthlyPlant.name, "ko")
  },
  items: {
    latest: (a: UserItem, b: UserItem) => new Date(b.acquiredAt).getTime() - new Date(a.acquiredAt).getTime(),
    a_z: (a: UserItem, b: UserItem) => a.item.name.localeCompare(b.item.name, "ko")
  }
};

export const useCollectionSort = ({ items, crops, currentSort }: UseCollectionSortParams) => {
  const t = useTranslations("mypage.collectionSection.sort");

  const sortOptions = {
    latest: { label: t("latest"), value: "latest" as const },
    most_grown: { label: t("most_grown"), value: "most_grown" as const },
    a_z: { label: t("a_z"), value: "a_z" as const }
  };

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

  const getSortOptions = (mode: CollectionMode) => {
    const options = [sortOptions.latest, sortOptions.a_z] as Array<(typeof sortOptions)[keyof typeof sortOptions]>;

    if (mode === "CROP") {
      options.splice(1, 0, sortOptions.most_grown);
    }

    return options.map((option) => ({
      label: option.label,
      value: option.value,
      active: currentSort === option.value
    }));
  };

  return {
    currentSort,
    sortedData,
    getSortOptions
  };
};
