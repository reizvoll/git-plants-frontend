import { getCurrentUpdate } from "@/api/public";
import { CurrentUpdate } from "@/lib/types/api/public";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUpdate = () => {
  return useQuery({
    queryKey: ["currentUpdate"],
    queryFn: async () => {
      const response = await getCurrentUpdate();

      // 응답 데이터 구조 검증 - updateNote가 null이어도 유효한 응답으로 처리
      if (response && typeof response === "object" && "updateNote" in response && "newItems" in response) {
        return response as CurrentUpdate;
      } else {
        console.error("Invalid response format:", response);
        throw new Error("잘못된 응답 형식입니다.");
      }
    },
    staleTime: 30 * 60 * 1000, // 30분 - 거의 변경되지 않음
    gcTime: 60 * 60 * 1000 // 1시간 - 오래 캐싱
  });
};