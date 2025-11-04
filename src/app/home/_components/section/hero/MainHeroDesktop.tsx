"use client";

import plant from "@/assets/images/plants.png";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MainHeroDesktop = () => {
  const t = useTranslations("main-hero");
  const router = useRouter();
  const { user, login } = useAuth();

  const isLoggedIn = !!user;

  const handleFirstButtonClick = () => {
    if (isLoggedIn) {
      router.push("/shop");
    } else {
      login();
    }
  };

  return (
    <section
      aria-labelledby="hero-title"
      aria-describedby="hero-subtitle"
      className="shadow-emphasize hidden w-full rounded-2xl bg-[#F4EBDC]/80 px-8 py-20 mb:block mb:px-8 mb:py-20 tb:px-12 tb:py-24 lt:px-16 lt:py-28"
    >
      <div className="flex w-full flex-row items-center justify-between gap-6">
        <div className="flex w-full flex-col items-start gap-12 tb:gap-16 lt:gap-20">
          <div className="flex flex-col gap-6 tb:gap-8 lt:gap-12">
            <h1
              id="hero-title"
              className="w-full whitespace-pre-line text-subHeading font-bold text-primary-default tb:text-[32px] lt:text-heading"
            >
              {t("title")}
            </h1>
            <p id="hero-subtitle" className="whitespace-pre-line text-body1 text-primary-default lt:text-subtitle">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex w-full flex-row items-start justify-start gap-2 lt:gap-4">
            <Button
              variant="primary"
              size="md"
              className="flex items-center justify-center !px-4 py-3 text-caption tb:!px-7 tb:text-body1 lt:!px-10 lt:text-title2"
              onClick={handleFirstButtonClick}
            >
              {isLoggedIn ? t("storeButton") : t("startButton")}
            </Button>
            <Button
              variant="primaryLine"
              size="md"
              className="flex items-center justify-center !px-4 py-3 text-caption tb:!px-7 tb:text-body1 lt:!px-10 lt:text-title2"
              onClick={() => router.push("/mypage")}
            >
              {t("myPageButton")}
            </Button>
          </div>
        </div>

        <figure
          className="shadow-normal relative flex h-[clamp(140px,25vw,250px)] w-[clamp(140px,25vw,250px)] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-01 lt:h-[250px] lt:w-[250px]"
        >
          <Image
            src={plant}
            alt="Plant illustration"
            fill
            className="object-contain"
            sizes="250px"
            priority
          />
          <figcaption className="sr-only">{t("title")}</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default MainHeroDesktop;
