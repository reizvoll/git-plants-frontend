/**
 * Breakpoints (pixels)
 * Matches tailwind.config.ts screen values
 */
export const BREAKPOINTS = {
  xs: 280, // Extra small (≥280px)
  s: 320, // Small (≥320px)
  sm: 380, // Default mobile (≥380px)
  mb: 480, // Mobile (≥480px)
  ml: 640, // Small Tablet (≥640px)
  tb: 768, // Tablet (≥768px)
  lt: 1024, // Desktop (≥1024px)
  xl: 1200 // Large desktop (≥1200px)
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Pagination Constants
 */
export const ITEMS_PER_PAGE = {
  MOBILE: 3,
  DESKTOP: 6
} as const;

/**
 * Shop Item List - Responsive Limits
 * Items displayed per page at different breakpoints
 */
export const SHOP_ITEMS_LIMIT = {
  MOBILE: {
    xs: 1,
    s: 2,
    sm: 3
  },
  DESKTOP: {
    mb: 3,
    ml: 4,
    tb: 5,
    lt: 6
  }
} as const;

/**
 * Skeleton Loading - Number of items to show
 */
export const SKELETON_COUNT = {
  MOBILE: 3,
  DESKTOP: 6
} as const;

/**
 * Error Messages Mapping (Backend English -> Korean)
 */
export const ERROR_MESSAGES = {
  400: {
    NOT_ENOUGH_SEEDS: { label: "Not enough seeds", message: "씨앗이 부족합니다." },
    ALREADY_OWN_ITEM: { label: "You already own this item", message: "이미 보유한 아이템입니다." },
    VALID_SEED_COUNT_REQUIRED: { label: "Valid seed count is required", message: "씨앗이 필요합니다." }
  },
  404: {
    GARDEN_ITEM_NOT_FOUND: { label: "Garden item not found", message: "아이템을 찾을 수 없습니다." }
  },
  500: {
    ERROR_USING_SEEDS: { label: "Error using seeds", message: "Seed 사용 중 오류가 발생했습니다." }
  }
} as const;
