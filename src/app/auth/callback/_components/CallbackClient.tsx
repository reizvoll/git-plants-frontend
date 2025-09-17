"use client";

import { LoadingDots } from "@/components/shared/LoadingDots";
import LoadingText from "@/components/shared/LoadingText";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CallbackClient({ error }: { error?: string }) {
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
        router.push("/");
      } else {
        router.push(`/error?message=${encodeURIComponent(t("failMessage"))}`);
      }
    }
  }, [error, router, user, isLoading, t]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-01 p-8 text-center">
      <div className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center">
        <h1 className="m-0 text-center text-title1 text-text-04">
          {t("processing")}
          <LoadingDots />
        </h1>
        <div className="mt-8 flex w-full justify-center">
          <LoadingText text={t("loading")} className="text-body1 text-text-04" />
        </div>
      </div>
    </div>
  );
}
