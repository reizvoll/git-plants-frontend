import { getCurrentUpdate } from "@/api/public";
import { useLanguageStore } from "@/lib/store/languageStore";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch current update information with language support
 * @returns Query result with current update data
 */
export const useCurrentUpdate = () => {
  const { language } = useLanguageStore();

  return useQuery({
    queryKey: ["currentUpdate", language],
    queryFn: () => getCurrentUpdate(language),
    staleTime: 30 * 60 * 1000, // 30min
    gcTime: 60 * 60 * 1000 // 1hr
  });
};
