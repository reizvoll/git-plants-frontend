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
      className="mx-auto w-full max-w-[1200px] px-3 py-6 xs:px-4 xs:py-8 sm:px-6 sm:py-10 mb:hidden"
    >
      <div className="flex w-full flex-col items-center gap-4 xs:gap-5 sm:gap-6">
        <div className="flex w-full flex-col items-center gap-2 xs:gap-3 sm:gap-4">
          <h2
            id="cta-title"
            className="text-center font-pretendard text-body1 font-bold text-text-04 xs:text-title2 sm:text-subHeading"
          >
            {t("title")}
          </h2>
          <p className="whitespace-pre-line text-center font-pretendard text-caption font-medium text-text-04 xs:text-body1 sm:text-subtitle">
            {t("subtitle")}
          </p>

          <figure className="flex-shrink-0">
            <Image
              src={farmer}
              alt="Farmer illustration"
              loading="lazy"
              className="h-auto w-[80px] xs:w-[100px] sm:w-[120px]"
            />
            <figcaption className="sr-only">{t("title")}</figcaption>
          </figure>
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            variant="primary"
            size="md"
            className="h-12 max-w-[160px] flex-1 items-center justify-center px-3 text-caption xs:px-4"
            onClick={handleStartButtonClick}
          >
            {isLoggedIn ? t("storeButton") : t("startButton")}
          </Button>

          <Button
            variant="primaryLine"
            size="md"
            className="h-12 max-w-[160px] flex-1 items-center justify-center px-3 text-caption xs:px-4"
            onClick={handleMoreInfo}
          >
            {t("moreInfoButton")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
