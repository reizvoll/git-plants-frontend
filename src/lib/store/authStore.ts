import { authApi } from "@/api/auth";
import { AuthState } from "@/lib/types/api/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
          set({ user: null, error: null });
          window.location.href = "/";
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

          if (response.success && response.data?.user) {
            set({ user: response.data.user, error: null });
          } else {
            set({ user: null, error: "인증 정보가 없습니다." });
          }
        } catch (error) {
          console.error("Auth check error:", error);
          set({ error: "인증 확인에 실패했습니다.", user: null });
        } finally {
          set({ isPending: false });
        }
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user })
    }
  )
);
