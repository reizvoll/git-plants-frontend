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
