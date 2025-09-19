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
    <section className="flex min-h-screen flex-col items-center justify-center bg-bg-01 text-center">
      <h1 className="font-pretendard text-title1 text-status-danger">Authentication Error</h1>
      <p className="mt-2 whitespace-pre-line font-pretendard text-text-03">{t("errorMessage")}</p>
      {error && <p className="mt-2 font-pretendard text-caption text-text-02">{error}</p>}
      <div className="mt-6 space-x-4">
        <Button onClick={() => authApi.signInWithGithub()} variant="gray" size="md">
          {t("tryAgain")}
        </Button>
        <Button onClick={() => router.push("/")} variant="grayLine" size="md">
          {t("goHome")}
        </Button>
      </div>
    </section>
  );
}
