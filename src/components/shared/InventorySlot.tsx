import Image from "next/image";
import { ReactNode } from "react";

// Wrapper style for inventory slot
export const SLOT_WRAPPER_STYLE =
  "group relative aspect-square rounded-md border-4 border-[#744427] bg-gradient-to-b from-[#ce9367] to-[#844f28] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-1px_2px_rgba(255,255,255,0.1)]";

// Content area style for inventory slot
export const SLOT_CONTENT_STYLE = "absolute inset-1 flex items-center justify-center rounded bg-[#915830]/50";

interface InventorySlotProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Component for empty inventory slot
 * Inventory slots with items should use SLOT_WRAPPER_STYLE and SLOT_CONTENT_STYLE directly
 */
const InventorySlot = ({ children, className = "" }: InventorySlotProps) => {
  return (
    <li className={`${SLOT_WRAPPER_STYLE} ${className}`}>
      <div className={SLOT_CONTENT_STYLE}>{children}</div>
    </li>
  );
};

// Badge slot component props
interface BadgeSlotProps {
  badge?: {
    imageUrl: string;
    name: string;
  };
  className?: string;
}

/**
 * Component for badge slot
 * Used to display badges in a 6x2 grid with wooden frame styling
 */
export const BadgeSlot = ({ badge, className = "" }: BadgeSlotProps) => {
  return (
    <li
      className={`group relative aspect-square rounded-md border-[clamp(2px,0.3vw,4px)] border-[#5a3a28] bg-gradient-to-b from-[#ce9367] to-[#844f28] ${className}`}
    >
      <div className="absolute inset-[clamp(2px,0.15vw,4px)] flex items-center justify-center rounded bg-[#915830]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
        {badge ? (
          <>
            <Image
              src={badge.imageUrl}
              alt={badge.name}
              fill
              sizes="(max-width: 768px) 15vw, 10vw"
              className="object-contain p-[5%]"
            />
            <span className="text-body group-hover:shadow-emphasize absolute left-1/2 top-[-8px] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-bg-01 px-4 py-2 text-center text-primary-default opacity-0 transition-all duration-200 group-hover:opacity-100">
              {badge.name}
            </span>
          </>
        ) : null}
      </div>
    </li>
  );
};

export default InventorySlot;
