"use client";

import { LoadingDots } from "@/components/shared/LoadingDots";
import LoadingText from "@/components/shared/LoadingText";
import { useAuthStore } from "@/lib/store/authStore";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CallbackClient({ error }: { error?: string }) {
  const router = useRouter();
  const { checkAuth } = useAuthStore();
  const hasRun = useRef(false);
  const t = useTranslations("auth.callback");

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (error) {
      router.push(`/error?message=${encodeURIComponent(error)}`);
      return;
    }

    checkAuth()
      .then(() => {
        router.push("/");
      })
      .catch((err: Error) => {
        console.error("FetchSession error:", err);
        router.push(`/error?message=${encodeURIComponent(t("failMessage"))}`);
      });
  }, [error, router, checkAuth, t]);

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
