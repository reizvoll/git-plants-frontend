import { BREAKPOINTS, Breakpoint } from "@/lib/constants/constants";
import { useEffect, useState } from "react";

type UseResponsiveLimitOptions = Partial<Record<Breakpoint, number>>;

/**
 * Custom hook to get responsive item limit based on viewport width
 * @param limits - Object containing item limits for each breakpoint
 * @returns Current item limit based on viewport width
 */
export const useResponsiveLimit = (limits: UseResponsiveLimitOptions) => {
  const [limit, setLimit] = useState(limits.sm || 3);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width >= BREAKPOINTS.xl && limits.xl !== undefined) {
        setLimit(limits.xl);
      } else if (width >= BREAKPOINTS.lt && limits.lt !== undefined) {
        setLimit(limits.lt);
      } else if (width >= BREAKPOINTS.tb && limits.tb !== undefined) {
        setLimit(limits.tb);
      } else if (width >= BREAKPOINTS.ml && limits.ml !== undefined) {
        setLimit(limits.ml);
      } else if (width >= BREAKPOINTS.mb && limits.mb !== undefined) {
        setLimit(limits.mb);
      } else if (width >= BREAKPOINTS.sm && limits.sm !== undefined) {
        setLimit(limits.sm);
      } else if (width >= BREAKPOINTS.s && limits.s !== undefined) {
        setLimit(limits.s);
      } else if (limits.xs !== undefined) {
        setLimit(limits.xs);
      }
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, [limits]);

  return limit;
};
