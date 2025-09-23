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
      className="mx-auto w-full max-w-[1200px] px-3 py-6 xs:px-4 xs:py-8 sm:px-6 sm:py-10 mb:px-8 mb:py-12 tb:px-8 tb:py-16 lt:py-20"
    >
      <div className="flex w-full flex-col items-center gap-4 xs:gap-5 sm:gap-6">
        <div className="flex w-full max-w-[800px] flex-col items-center gap-4 xs:gap-5 sm:gap-6 mb:flex-row mb:items-center mb:justify-between">
          <div className="flex flex-col items-center gap-2 xs:gap-3 sm:gap-4 mb:items-start mb:justify-center mb:gap-6">
            <h2
              id="cta-title"
              className="text-center font-pretendard text-body1 font-bold text-text-04 xs:text-title2 sm:text-subHeading mb:text-left"
            >
              {t("title")}
            </h2>
            <p className="whitespace-pre-line text-center font-pretendard text-caption font-medium text-text-04 xs:text-body1 sm:text-subtitle mb:text-left">
              {t("subtitle")}
            </p>

            {/* mobile image */}
            <figure className="flex-shrink-0 mb:hidden">
              <Image
                src={farmer}
                alt="Farmer illustration"
                loading="lazy"
                className="h-auto w-[80px] xs:w-[100px] sm:w-[120px]"
              />
              <figcaption className="sr-only">{t("title")}</figcaption>
            </figure>

            <div className="hidden w-full flex-row items-start justify-start gap-4 mb:flex">
              <Button
                variant="primary"
                size="md"
                className="flex items-center justify-center px-6 py-3 text-caption tb:px-8 tb:text-body1"
                onClick={handleStartButtonClick}
              >
                {isLoggedIn ? t("storeButton") : t("startButton")}
              </Button>

              <Button
                variant="primaryLine"
                size="md"
                className="flex items-center justify-center px-6 py-3 text-caption tb:px-8 tb:text-body1"
                onClick={handleMoreInfo}
              >
                {t("moreInfoButton")}
              </Button>
            </div>
          </div>

          {/* desktop image */}
          <figure className="hidden flex-shrink-0 mb:flex mb:flex-col mb:items-center mb:justify-center">
            <Image
              src={farmer}
              alt="Farmer illustration"
              loading="lazy"
              className="h-auto mb:w-[140px] tb:w-[160px] lt:w-[180px] xl:w-[200px]"
            />
            <figcaption className="sr-only">{t("title")}</figcaption>
          </figure>
        </div>

        {/* mobile button */}
        <div className="flex w-full flex-row items-center justify-center gap-3 sm:gap-4 mb:hidden">
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
