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

export default InventorySlot;
