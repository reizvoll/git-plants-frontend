import { authApi } from "@/api/auth";
import { useAuthStore } from "@/lib/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = (requireAuth: boolean = false) => {
  const router = useRouter();
  const { user, setUser, clearUser } = useAuthStore();
  const queryClient = useQueryClient();

  // 쿠키에서 세션 존재 여부 확인
  const hasSessionCookie = () => {
    if (typeof document === 'undefined') return false;
    return document.cookie.includes('access_token');
  };

  // 세션 조회 - 쿠키가 있을 때만 API 호출
  const {
    data: sessionUser,
    isLoading,
    error
  } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      const response = await authApi.getSession();
      if (response.success && response.data?.user) {
        return { ...response.data.user, isAdmin: response.data.isAdmin };
      }
      return null;
    },
    enabled: hasSessionCookie(), // 세션 쿠키가 있을 때만 API 호출
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
    } else if (error || (!isLoading && !sessionUser)) {
      clearUser();
      if (requireAuth) {
        router.push("/");
      }
    }
  }, [sessionUser, error, isLoading, setUser, clearUser, router, requireAuth]);

  return {
    // 사용자 정보
    user: sessionUser || user,
    isAuthenticated: !!sessionUser,

    // 로딩 상태
    isLoading,

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
