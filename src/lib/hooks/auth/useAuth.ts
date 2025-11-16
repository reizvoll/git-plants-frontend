import { authApi } from "@/api/auth";
import { useAuthStore } from "@/lib/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Custom hook to manage authentication state and actions
 * @param requireAuth - Whether authentication is required (default: false)
 * @returns Authentication state and actions (login, logout)
 */
export const useAuth = (requireAuth: boolean = false) => {
  const router = useRouter();
  const { user, setUser, clearUser } = useAuthStore();
  const queryClient = useQueryClient();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 세션 조회 - 클라이언트에서 항상 시도 (백엔드에서 refresh_token 자동 처리)
  const { data: sessionUser, isLoading } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      const response = await authApi.getSession();
      if (response.success && response.data?.user) {
        return { ...response.data.user, isAdmin: response.data.isAdmin };
      }
      return null;
    },
    enabled: true, // 클라이언트에서만 실행, 백엔드에서 토큰 처리
    retry: false, // 401 에러 시 재시도하지 않음
    refetchOnWindowFocus: true // 인증은 포커스 시 체크 필요
    // 나머지는 전역 설정 사용 (5분 staleTime, 15분 gcTime)
  });

  // 로그아웃
  const logoutMutation = useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      queryClient.clear();
      clearUser();
      localStorage.removeItem("auth-storage");

      // check current path is auth required path
      const currentPath = window.location.pathname;
      const authRequiredPaths = ["/mypage"];
      const needsAuth = authRequiredPaths.some((path) => currentPath.startsWith(path));

      if (needsAuth) {
        // redirect to home
        window.location.href = "/";
      } else {
        // reload current page
        window.location.reload();
      }
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    }
  });

  // 세션 데이터를 Zustand store에 동기화
  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    } else if (!isLoading && !sessionUser && user) {
      // 세션이 없으면서 localStorage에는 user가 있는 경우 = 세션 만료
      clearUser();
      if (requireAuth) {
        router.push("/");
      }
    }
  }, [sessionUser, isLoading, setUser, clearUser, router, requireAuth, user]);

  return {
    // 사용자 정보
    user: isHydrated ? sessionUser || user : null,
    isAuthenticated: isHydrated && !!sessionUser,

    // 로딩 상태
    isLoading,
    isHydrated,

    // 액션
    login: () => {
      // save current path
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirectAfterLogin", window.location.pathname + window.location.search);
      }
      authApi.signInWithGithub();
    },
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending
  };
};
