"use client";

import farmer from "@/assets/images/farmer.webp";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CtaSectionDesktop = () => {
  const t = useTranslations("feature.cta");
  const router = useRouter();
  const { user, login } = useAuth();

  const isLoggedIn = !!user;

  const handleStartButtonClick = () => {
    if (isLoggedIn) {
      router.push("/shop");
    } else {
      login();
    }
  };

  const handleMoreInfo = () => {
    window.open("https://github.com/reizvoll/git-plants-frontend", "_blank", "noopener,noreferrer");
  };

  return (
    <section
      aria-labelledby="cta-title"
      className="mx-auto hidden w-full max-w-[800px] px-8 py-12 mb:block tb:px-8 tb:py-16 lt:py-20"
    >
      <div className="flex w-full flex-row items-center justify-between tb:gap-7 lt:gap-9">
        <div className="flex flex-col items-start justify-center gap-6">
          <h2
            id="cta-title"
            className="text-left font-pretendard text-title1 font-bold text-text-04 tb:text-subHeading lt:text-heading"
          >
            {t("title")}
          </h2>
          <p className="whitespace-pre-line text-left font-pretendard text-body1 font-medium text-text-04 tb:text-title2 lt:text-subtitle">
            {t("subtitle")}
          </p>

          <div className="flex w-full flex-row items-start justify-start gap-2 tb:gap-4">
            <Button
              variant="primary"
              size="md"
              className="flex items-center justify-center !px-4 py-3 text-caption ml:!px-6 tb:!px-8 tb:text-body1"
              onClick={handleStartButtonClick}
            >
              {isLoggedIn ? t("storeButton") : t("startButton")}
            </Button>

            <Button
              variant="primaryLine"
              size="md"
              className="flex items-center justify-center !px-4 py-3 text-caption ml:!px-6 tb:!px-8 tb:text-body1"
              onClick={handleMoreInfo}
            >
              {t("moreInfoButton")}
            </Button>
          </div>
        </div>

        <figure className="flex flex-shrink-0 flex-col items-center justify-center">
          <Image
            src={farmer}
            alt="Farmer illustration"
            loading="lazy"
            className="h-auto w-[140px] tb:w-[160px] lt:w-[180px] xl:w-[200px]"
          />
          <figcaption className="sr-only">{t("title")}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default CtaSectionDesktop;
