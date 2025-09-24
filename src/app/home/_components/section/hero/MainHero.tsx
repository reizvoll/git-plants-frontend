"use client";

import plant from "@/assets/images/plants.png";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MainHero = () => {
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
      className="shadow-emphasize w-full rounded-2xl bg-[#F4EBDC]/80 p-4 xs:p-5 sm:p-6 mb:p-8 tb:p-12 xl:p-16"
    >
      <div className="flex flex-col items-center gap-4 xs:gap-5 sm:gap-6">
        {/* Text | Image area */}
        <div className="flex w-full flex-col items-center gap-4 xs:gap-5 sm:gap-6 mb:flex-row mb:items-center mb:justify-between mb:gap-8">
          <div className="flex w-full flex-col items-center gap-3 xs:gap-4 sm:gap-4 mb:items-start">
            <h1
              id="hero-title"
              className="w-full whitespace-pre-line text-center text-body1 font-bold text-primary-default xs:text-title1 sm:text-subHeading mb:text-left tb:text-heading"
            >
              {t("title")}
            </h1>
            <p
              id="hero-subtitle"
              className="whitespace-pre-line text-center text-caption leading-relaxed text-primary-default xs:text-body1 sm:text-subtitle mb:text-left"
            >
              {t("subtitle")}
            </p>

            <figure
              className="shadow-normal relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-01 mb:hidden"
              style={{ width: "clamp(80px, 20vw, 128px)", height: "clamp(80px, 20vw, 128px)" }}
            >
              <Image
                src={plant}
                alt="Plant illustration"
                fill
                className="object-contain"
                sizes="(max-width: 480px) 80px, 128px"
                priority
              />
              <figcaption className="sr-only">{t("title")}</figcaption>
            </figure>
          </div>

          <figure className="shadow-normal relative hidden flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-01 mb:flex mb:size-32 tb:size-40 lt:size-48 xl:size-60">
            <Image
              src={plant}
              alt="Plant illustration"
              fill
              className="object-contain"
              sizes="(min-width:1200px) 240px, (min-width:1024px) 192px, (min-width:768px) 160px, (min-width:480px) 128px, 128px"
              priority
            />
            <figcaption className="sr-only">{t("title")}</figcaption>
          </figure>
        </div>

        {/* Desktop button */}
        <div className="hidden w-full flex-row items-start justify-start gap-4 mb:flex">
          <Button
            variant="primary"
            size="md"
            className="flex items-center justify-center px-6 py-3 text-caption tb:px-8 tb:text-body1"
            onClick={handleFirstButtonClick}
          >
            {isLoggedIn ? t("storeButton") : t("startButton")}
          </Button>
          <Button
            variant="primaryLine"
            size="md"
            className="flex items-center justify-center px-6 py-3 text-caption tb:px-8 tb:text-body1"
            onClick={() => router.push("/mypage")}
          >
            {t("myPageButton")}
          </Button>
        </div>

        {/* Mobile button */}
        <div className="flex w-full flex-col items-center justify-center gap-2 xs:gap-3 sm:gap-3 mb:hidden">
          <Button
            variant="primary"
            size="md"
            className="w-full max-w-[200px] px-6 text-caption"
            onClick={handleFirstButtonClick}
          >
            {isLoggedIn ? t("storeButton") : t("startButton")}
          </Button>

          <Button
            variant="primaryLine"
            size="md"
            className="w-full max-w-[200px] px-6 text-caption"
            onClick={() => router.push("/mypage")}
          >
            {t("myPageButton")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
