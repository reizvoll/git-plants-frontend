/**
 * Breakpoints (pixels)
 * Matches tailwind.config.ts screen values
 */
export const BREAKPOINTS = {
  XS: 280,
  S: 320,
  SM: 380,
  MB: 480,
  ML: 640,
  TB: 768,
  LT: 1024,
  XL: 1200
} as const;

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
