"use client";

import plant from "@/assets/images/plants.png";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MainHero = () => {
  const t = useTranslations("main-hero");
  const router = useRouter();
  const { user, login } = useAuthStore();

  // 로그인 상태 확인
  const isLoggedIn = !!user;

  const handleFirstButtonClick = () => {
    if (isLoggedIn) {
      router.push("/shop");
    } else {
      login(); // GitHub OAuth 로그인 실행
    }
  };

  return (
    <div className="shadow-emphasize flex items-center justify-center gap-16 rounded-[1rem] bg-[#F4EBDC]/80 px-16 py-16">
      <div className="flex w-full flex-col items-start gap-20">
        <div className="flex w-full flex-col items-start gap-12">
          <div className="w-full whitespace-pre-line font-galmuri text-heading text-primary-default">{t("title")}</div>
          <div className="whitespace-pre-line font-galmuri text-subtitle2 text-primary-default">{t("subtitle")}</div>
        </div>
        <div className="flex w-full flex-row items-start gap-4">
          <Button
            variant="primary"
            size="md"
            className="flex items-center justify-center px-8 py-3"
            onClick={handleFirstButtonClick}
          >
            {isLoggedIn ? t("storeButton") : t("startButton")}
          </Button>
          <Button
            variant="primaryLine"
            size="md"
            className="flex items-center justify-center px-8 py-3"
            onClick={() => router.push("/mypage")}
          >
            {t("myPageButton")}
          </Button>
        </div>
      </div>
      <div className="shadow-normal flex h-60 w-60 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-01">
        <Image src={plant} alt="plant" width={200} height={200} className="object-contain" />
      </div>
    </div>
  );
};

export default MainHero;
