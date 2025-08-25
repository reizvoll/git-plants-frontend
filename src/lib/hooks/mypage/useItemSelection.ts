import { Item, UserItem } from "@/lib/types/api/profile";
import { useEffect, useState } from "react";
import { useItemEquip } from "./useItemEquip";

interface ItemSelectionParams {
  items: UserItem[];
  currentMode: string;
  category: "background" | "pot";
  equipped: { backgrounds: Item[]; pots: Item[] };
}

export const useItemSelection = ({ items, currentMode, category, equipped }: ItemSelectionParams) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { equipItem, isLoading } = useItemEquip();

  // equipped 객체
  const isEquipped = equipped || { backgrounds: [], pots: [] };

  // 현재 장착된 아이템 찾기
  const equippedItem =
    category === "background"
      ? isEquipped.backgrounds?.find((bg: Item) => bg.mode === currentMode)
      : isEquipped.pots?.[0];

  // 선택된 아이템 계산
  const selectedItem = equippedItem
    ? items.find((item) => item.item.id === equippedItem.id) || items[selectedIndex] || items[0] || null
    : items[selectedIndex] || items[0] || null;

  // 모드 변경 시 인덱스 리셋 (배경화면용)
  useEffect(() => {
    if (category === "background") {
      setSelectedIndex(0);
    }
  }, [currentMode, category]);

  // 아이템 선택/장착 처리
  const handleItemSelect = (index: number) => {
    setSelectedIndex(index);

    const item = items[index];
    if (item) {
      const isCurrentlyEquipped = isItemEquipped(item);
      equipItem({
        userItemId: item.id,
        equipped: !isCurrentlyEquipped,
        category,
        currentMode
      });
    }
  };

  // 아이템 장착 상태 확인
  const isItemEquipped = (userItem: UserItem) => {
    if (category === "background") {
      return isEquipped.backgrounds?.some((bg: Item) => bg.id === userItem.item.id && bg.mode === currentMode) || false;
    } else {
      return isEquipped.pots?.some((pot: Item) => pot.id === userItem.item.id) || false;
    }
  };

  return {
    selectedItem,
    selectedIndex,
    handleItemSelect,
    isItemEquipped,
    isLoading
  };
};
