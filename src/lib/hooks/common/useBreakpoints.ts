import { BREAKPOINTS } from "@/lib/constants/constants";
import { useEffect, useState } from "react";

/**
 * Custom hook to detect media query matches
 * @param query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

/**
 * Custom hook to detect current breakpoint
 * @returns 'mobile' | 'tablet' | 'desktop'
 * - mobile: < 480px (mb)
 * - tablet: 480px - 767px (mb ~ tb)
 * - desktop: ≥ 768px (tb)
 */
export const useBreakpoint = (): "mobile" | "tablet" | "desktop" => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mb - 1}px)`);
  const isTablet = useMediaQuery(`(min-width: ${BREAKPOINTS.mb}px) and (max-width: ${BREAKPOINTS.tb - 1}px)`);

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
};

/**
 * Custom hook to calculate grid columns for inventory slots
 * @returns number of columns based on current breakpoint
 * - lt (≥1024px): 10 columns
 * - tb (≥768px): 8 columns
 * - ml (≥640px): 6 columns
 * - default: 4 columns
 */
export const useInventoryColumns = (): number => {
  const isLt = useMediaQuery(`(min-width: ${BREAKPOINTS.lt}px)`);
  const isTb = useMediaQuery(`(min-width: ${BREAKPOINTS.tb}px)`);
  const isMl = useMediaQuery(`(min-width: ${BREAKPOINTS.ml}px)`);

  if (isLt) return 10;
  if (isTb) return 8;
  if (isMl) return 6;
  return 4;
};
