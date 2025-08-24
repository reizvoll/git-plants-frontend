"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuthGuard = () => {
  const { user, checkAuth, isPending } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      if (!user) {
        try {
          await checkAuth();
        } catch (error) {
          console.error("Auth validation failed:", error);
          router.push("/");
          return;
        }
      }

      // checkAuth 후에도 user가 없으면 홈으로 리다이렉트
      const currentUser = useAuthStore.getState().user;
      if (!currentUser) {
        router.push("/");
        return;
      }

      setIsLoading(false);
    };

    validateAuth();
  }, [user, checkAuth, router]);

  return {
    isLoading: isLoading || isPending,
    user,
    isAuthenticated: !!user
  };
};
