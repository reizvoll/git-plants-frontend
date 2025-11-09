"use client";

import { authApi } from "@/api/auth";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type ErrorClientProps = {
  error?: string;
};

export default function ErrorClient({ error }: ErrorClientProps) {
  const router = useRouter();
  const t = useTranslations("auth.callback");

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-01 p-4 text-center xs:p-5 s:p-6 mb:p-8 tb:gap-6">
      <h1 className="font-pretendard text-body2 text-status-danger s:text-title2 mb:text-subtitle ml:text-title1 tb:text-subHeading">
        {t("error")}
      </h1>
      <p className="whitespace-pre-line font-pretendard text-caption text-text-03 s:text-body2 mb:text-title2 ml:text-subtitle tb:text-title1">
        {t("errorMessage")}
      </p>
      {error && (
        <p className="whitespace-pre-line font-pretendard text-caption text-text-03 s:text-body2 mb:text-title2 ml:text-subtitle tb:text-title1">
          {error}
        </p>
      )}
      <div className="mt-2 flex flex-col gap-3 xs:gap-4 s:flex-row mb:mt-4 mb:space-x-3 tb:space-x-6">
        <Button
          onClick={() => authApi.signInWithGithub()}
          variant="gray"
          size="sm"
          className="text-small xs:text-caption s:text-body1 mb:text-title2"
        >
          {t("tryAgain")}
        </Button>
        <Button
          onClick={() => router.push("/")}
          variant="grayLine"
          size="sm"
          className="text-small xs:text-caption s:text-body1 mb:text-title2"
        >
          {t("goHome")}
        </Button>
      </div>
    </section>
  );
}
