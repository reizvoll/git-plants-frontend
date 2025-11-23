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
