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
      className={cn("flex min-h-screen flex-col items-center justify-center bg-bg-01 p-8 text-center", className)}
    >
      <div className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center">
        <h1 className="m-0 text-center text-title1 text-text-04">
          {t("processing")}
          <LoadingDots />
        </h1>
        <div className="mt-8 flex w-full justify-center">
          <LoadingText text={t("loading")} className="text-body1 text-text-04" />
        </div>
      </div>
    </section>
  );
}
