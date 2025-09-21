import Image from "next/image";
import { UserItem } from "@/lib/types/api/profile";

interface ItemGridProps {
  items: UserItem[];
  onItemSelect: (index: number) => void;
  isItemEquipped: (item: UserItem) => boolean;
  isLoading: boolean;
  itemSize?: number;
  emptyMessage: string;
}

const ItemGrid = ({
  items,
  onItemSelect,
  isItemEquipped,
  isLoading,
  itemSize = 80,
  emptyMessage
}: ItemGridProps) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {items.length > 0 ? (
        items.map((item, index) => {
          const isEquipped = isItemEquipped(item);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onItemSelect(index)}
                disabled={isLoading}
                className={`relative block cursor-pointer rounded transition-all duration-200 hover:opacity-80 ${
                  isEquipped ? "ring-2 ring-primary-default" : ""
                } ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                aria-pressed={isEquipped}
                aria-label={item.item.name}
              >
                <Image
                  src={item.item.iconUrl}
                  alt={item.item.name || "Item"}
                  className="rounded object-cover"
                  width={itemSize}
                  height={itemSize}
                />
                {isEquipped && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-default text-[10px] text-white">
                    ✓
                  </span>
                )}
              </button>
            </li>
          );
        })
      ) : (
        <li className="text-body3 text-text-04">{emptyMessage}</li>
      )}
    </ul>
  );
};

export default ItemGrid;