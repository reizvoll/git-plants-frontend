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

      if (response && typeof response === "object" && "month" in response && "year" in response) {
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
