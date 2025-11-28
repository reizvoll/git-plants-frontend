"use client";

import { useInventoryColumns } from "@/lib/hooks/common/useBreakpoints";
import { CollectionMode } from "@/lib/hooks/mypage/useCollectionSort";
import { Crop, UserItem } from "@/lib/types/api/profile";
import InventorySlot from "@/components/shared/InventorySlot";
import BackgroundItem from "./BackgroundItem";
import CropItem from "./CropItem";
import PotItem from "./PotItem";

interface CollectionGridProps {
  mode: CollectionMode;
  backgrounds: UserItem[];
  pots: UserItem[];
  crops: Crop[];
}

const ROWS = 4;

const CollectionGrid = ({ mode, backgrounds, pots, crops }: CollectionGridProps) => {
  const cols = useInventoryColumns();
  const slotCount = cols * ROWS;

  const renderEmptySlots = (itemCount: number) => {
    const emptyCount = Math.max(0, slotCount - itemCount);
    return Array.from({ length: emptyCount }, (_, i) => <InventorySlot key={`empty-${i}`} />);
  };

  const renderContent = () => {
    switch (mode) {
      case "CROP":
        return (
          <ul className="m-0 grid list-none grid-cols-4 gap-2 p-0 leading-none ml:grid-cols-6 tb:grid-cols-8 lt:grid-cols-10">
            {crops.map((crop) => (
              <CropItem key={crop.id} crop={crop} />
            ))}
            {renderEmptySlots(crops.length)}
          </ul>
        );

      case "BACKGROUND":
        return (
          <ul className="m-0 grid list-none grid-cols-4 gap-2 p-0 leading-none ml:grid-cols-6 tb:grid-cols-8 lt:grid-cols-10">
            {backgrounds.map((background) => (
              <BackgroundItem key={background.id} background={background} />
            ))}
            {renderEmptySlots(backgrounds.length)}
          </ul>
        );

      case "POT":
        return (
          <ul className="m-0 grid list-none grid-cols-4 gap-2 p-0 leading-none ml:grid-cols-6 tb:grid-cols-8 lt:grid-cols-10">
            {pots.map((pot) => (
              <PotItem key={pot.id} pot={pot} />
            ))}
            {renderEmptySlots(pots.length)}
          </ul>
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default CollectionGrid;
