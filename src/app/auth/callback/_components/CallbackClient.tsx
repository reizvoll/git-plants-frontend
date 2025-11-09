"use client";

import { LoadingDots } from "@/components/shared/LoadingDots";
import LoadingText from "@/components/shared/LoadingText";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { cn } from "@/lib/utils/className";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type CallbackClientProps = {
  error?: string;
  className?: string;
};

export default function CallbackClient(props: CallbackClientProps) {
  const { error, className } = props;
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const hasRun = useRef(false);
  const t = useTranslations("auth.callback");

  useEffect(() => {
    if (error) {
      router.push(`/error?message=${encodeURIComponent(error)}`);
      return;
    }

    // useAuth will handle authentication automatically
    if (!isLoading) {
      if (hasRun.current) return;
      hasRun.current = true;

      if (user) {
        // 저장된 리다이렉트 경로 확인
        const redirectPath = sessionStorage.getItem("redirectAfterLogin");
        if (redirectPath) {
          sessionStorage.removeItem("redirectAfterLogin");
          router.push(redirectPath);
        } else {
          router.push("/home");
        }
      } else {
        router.push(`/error?message=${encodeURIComponent(t("failMessage"))}`);
      }
    }
  }, [error, router, user, isLoading, t]);

  return (
    <section
      className={cn(
        "flex min-h-screen flex-col items-center justify-center bg-bg-01 p-4 text-center xs:p-5 s:p-6 mb:p-8",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center">
        <h1 className="text-body2 text-text-04 s:text-title2 mb:text-subtitle ml:text-title1 tb:text-subHeading">
          {t("processing")}
          <LoadingDots />
        </h1>
        <div className="mt-4 flex w-full justify-center xs:mt-5 s:mt-6 mb:mt-8">
          <LoadingText
            text={t("loading")}
            className="text-caption text-text-03 s:text-body2 mb:text-title2 ml:text-subtitle tb:text-title1"
          />
        </div>
      </div>
    </section>
  );
}
