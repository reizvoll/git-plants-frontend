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
      className="shadow-emphasize w-full rounded-2xl bg-[#F4EBDC]/80 px-3 py-8 xs:px-4 xs:py-10 s:px-5 s:py-12 mb:hidden"
    >
      <div className="flex flex-col items-center gap-8 xs:gap-10 s:gap-12">
        {/* Text | Image area */}
        <div className="flex w-full flex-col items-center gap-4 xs:gap-6">
          <h1
            id="hero-title"
            className="w-full whitespace-pre-line text-center text-subtitle font-bold text-primary-default xs:text-title1"
          >
            {t("title")}
          </h1>
          <p
            id="hero-subtitle"
            className="whitespace-pre-line text-center text-small text-primary-default xs:text-caption s:text-body2"
          >
            {t("subtitleMobile")}
          </p>

          <figure className="shadow-normal relative flex h-[clamp(80px,20vw,128px)] w-[clamp(80px,20vw,128px)] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-01">
            <Image src={plant} alt="Plant illustration" fill className="object-contain" sizes="128px" priority />
            <figcaption className="sr-only">{t("title")}</figcaption>
          </figure>
        </div>

        {/* Mobile button */}
        <div className="flex w-full flex-col items-center justify-center gap-2 xs:gap-3 sm:gap-3">
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
