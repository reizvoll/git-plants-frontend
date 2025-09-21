"use client";

import farmer from "@/assets/images/farmer.webp";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CtaSection = () => {
  const t = useTranslations("feature.cta");
  const router = useRouter();
  const { user, login } = useAuth();

  // 로그인 상태 확인
  const isLoggedIn = !!user;

  const handleStartButtonClick = () => {
    if (isLoggedIn) {
      router.push("/shop");
    } else {
      login(); // GitHub OAuth 로그인 실행
    }
  };

  const handleMoreInfo = () => {
    window.open("https://github.com/reizvoll/git-plants-frontend", "_blank", "noopener,noreferrer");
  };

  return (
    <section
      aria-labelledby="cta-title"
      className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-center py-[3.75rem]"
    >
      <div className="flex w-full flex-row items-center justify-center gap-44">
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start justify-center gap-6">
            <h2 id="cta-title" className="font-pretendard text-title1 font-bold text-text-04">
              {t("title")}
            </h2>
            <p className="whitespace-pre-line font-pretendard text-subtitle font-medium text-text-04">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-row items-start justify-center gap-4">
            <Button
              variant="primary"
              size="md"
              className="flex items-center justify-center px-8 py-3"
              onClick={handleStartButtonClick}
            >
              {isLoggedIn ? t("storeButton") : t("startButton")}
            </Button>

            <Button
              variant="primaryLine"
              size="md"
              className="flex items-center justify-center px-8 py-3"
              onClick={handleMoreInfo}
            >
              {t("moreInfoButton")}
            </Button>
          </div>
        </div>

        <figure className="flex flex-col items-center justify-center">
          <Image src={farmer} alt="Farmer illustration" loading="lazy" />
          <figcaption className="sr-only">{t("title")}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default CtaSection;
