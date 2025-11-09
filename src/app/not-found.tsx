"use client";

import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations("error");

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-01 p-4 text-center xs:p-5 s:p-6 mb:p-8 tb:gap-6">
      <h1 className="font-pretendard text-body2 text-status-danger s:text-title2 mb:text-subtitle ml:text-title1 tb:text-subHeading">
        {t("notFound")}
      </h1>
      <p className="font-pretendard text-caption text-text-03 s:text-body2 mb:text-title2 ml:text-subtitle tb:text-title1">
        {t("notFoundDescription")}
      </p>
      <Button
        onClick={() => router.push("/")}
        variant="grayLine"
        size="sm"
        className="mt-2 text-small xs:text-caption s:text-body1 mb:text-title2"
      >
        {t("goHome")}
      </Button>
    </section>
  );
}
