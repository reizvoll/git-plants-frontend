import { BREAKPOINTS } from "@/lib/constants/constants";
import { useEffect, useState } from "react";

interface UseResponsiveLimitOptions {
  xs?: number;
  s?: number;
  sm?: number;
  mb?: number;
  ml?: number;
  tb?: number;
  lt?: number;
  xl?: number;
}

/**
 * Custom hook to get responsive item limit based on viewport width
 * @param breakpoints - Object containing item limits for each breakpoint
 * @returns Current item limit based on viewport width
 */
export const useResponsiveLimit = (breakpoints: UseResponsiveLimitOptions) => {
  const [limit, setLimit] = useState(breakpoints.sm || 3);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width >= BREAKPOINTS.XL && breakpoints.xl !== undefined) {
        setLimit(breakpoints.xl);
      } else if (width >= BREAKPOINTS.LT && breakpoints.lt !== undefined) {
        setLimit(breakpoints.lt);
      } else if (width >= BREAKPOINTS.TB && breakpoints.tb !== undefined) {
        setLimit(breakpoints.tb);
      } else if (width >= BREAKPOINTS.ML && breakpoints.ml !== undefined) {
        setLimit(breakpoints.ml);
      } else if (width >= BREAKPOINTS.MB && breakpoints.mb !== undefined) {
        setLimit(breakpoints.mb);
      } else if (width >= BREAKPOINTS.SM && breakpoints.sm !== undefined) {
        setLimit(breakpoints.sm);
      } else if (width >= BREAKPOINTS.S && breakpoints.s !== undefined) {
        setLimit(breakpoints.s);
      } else if (breakpoints.xs !== undefined) {
        setLimit(breakpoints.xs);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, [breakpoints]);

  return limit;
};
