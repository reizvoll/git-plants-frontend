import { getCurrentUpdate } from "@/api/public";
import { CurrentUpdate } from "@/lib/types/api/public";
import { create } from "zustand";

interface CurrentUpdateState {
  data: CurrentUpdate | null;
  isLoading: boolean;
  error: string | null;
  fetchCurrentUpdate: () => Promise<void>;
}

export const useCurrentUpdateStore = create<CurrentUpdateState>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  fetchCurrentUpdate: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getCurrentUpdate();

      // 응답 데이터 구조 검증 - updateNote가 null이어도 유효한 응답으로 처리
      if (response && typeof response === "object" && "updateNote" in response && "newItems" in response) {
        // updateNote가 null이거나 newItems가 비어있는 경우도 유효한 응답으로 처리
        set({ data: response as CurrentUpdate, isLoading: false });
      } else {
        console.error("Invalid response format:", response);
        set({ error: "잘못된 응답 형식입니다.", isLoading: false });
      }
    } catch (error) {
      console.error("Current update API Exception:", error);
      set({
        error: error instanceof Error ? error.message : "업데이트 정보 조회에 실패했습니다.",
        isLoading: false
      });
    }
  }
}));
