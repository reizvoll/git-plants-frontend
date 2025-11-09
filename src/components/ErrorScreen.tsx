"use client";

import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset?: () => void;
};

const ErrorScreen = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const router = useRouter();
  const t = useTranslations("error");

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-01 p-4 text-center xs:p-5 s:p-6 mb:p-8 tb:gap-6">
      <h2 className="font-pretendard text-body2 font-bold text-status-danger s:text-title2 mb:text-subtitle ml:text-title1 tb:text-subHeading">
        {t("title")}
      </h2>
      <p className="whitespace-pre-line font-pretendard text-caption font-medium text-text-03 s:text-body2 mb:text-title2 ml:text-subtitle tb:text-title1">
        {error.message}
      </p>

      <div className="mt-2 flex flex-col gap-3 xs:gap-4 s:flex-row mb:mt-4 mb:space-x-3 tb:space-x-6">
        <Button
          asChild
          variant="primary"
          size="sm"
          className="min-w-40 text-small xs:text-caption s:text-body1 mb:text-title2"
          onClick={() => router.push("/")}
        >
          {t("goHome")}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            startTransition(() => {
              router.refresh();
              reset?.();
            })
          }
          className="min-w-40 text-small xs:text-caption s:text-body1 mb:text-title2"
        >
          {t("retry")}
        </Button>
      </div>
    </section>
  );
};

export default ErrorScreen;
