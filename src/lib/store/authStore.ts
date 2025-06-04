import { authApi } from "@/api/api";
import { AuthState } from "@/lib/types/auth";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isPending: false,
  error: null,
  login: () => {
    authApi.signInWithGithub();
  },
  logout: async () => {
    set({ isPending: true });
    try {
      await authApi.signOut();
      localStorage.removeItem("auth_token"); // 토큰 제거
      set({ user: null, error: null });
    } catch (error) {
      set({ error: "로그아웃에 실패했습니다." });
    } finally {
      set({ isPending: false });
    }
  },
  checkAuth: async () => {
    set({ isPending: true });
    try {
      const response = await authApi.getSession();

      if (response.data?.success && response.data?.data) {
        set({ user: response.data.data, error: null });
      } else if (response.data?.error) {
        console.log("Session error:", response.data.error);
        set({ user: null, error: response.data.error.message });
      } else {
        console.log("No valid session data");
        set({ user: null, error: "인증 정보가 없습니다." });
      }
    } catch (error) {
      console.error("Auth check error:", error);
      set({ error: "인증 확인에 실패했습니다.", user: null });
    } finally {
      set({ isPending: false });
    }
  }
}));
