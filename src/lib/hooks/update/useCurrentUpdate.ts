import { getCurrentUpdate } from "@/api/public";
import { useLanguageStore } from "@/lib/store/languageStore";
import { CurrentUpdate } from "@/lib/types/api/public";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

/**
 * Custom hook to fetch current update information with language support
 * @returns Query result with current update data
 */
export const useCurrentUpdate = () => {
  const { language } = useLanguageStore();
  const t = useTranslations("shop.hooks.update");

  return useQuery({
    queryKey: ["currentUpdate", language],
    queryFn: async () => {
      const response = await getCurrentUpdate(language);

      // 응답 데이터 구조 검증 - updateNote가 null이어도 유효한 응답으로 처리
      if (response && typeof response === "object" && "updateNote" in response && "newItems" in response) {
        return response as CurrentUpdate;
      } else {
        console.error("Invalid response format:", response);
        throw new Error(t("invalidResponse"));
      }
    },
    staleTime: 30 * 60 * 1000, // 30min
    gcTime: 60 * 60 * 1000 // 1hr
  });
};
