"use client";

import badges from "@/assets/images/badges.webp";
import seedRewards from "@/assets/images/seed_rewards.webp";
import LoginRequiredModal from "@/components/shared/LoginRequiredModal";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SystemSectionCardProps {
  onLoginRequired: () => void;
}

const SystemSectionCard = ({ onLoginRequired }: SystemSectionCardProps) => {
  const t = useTranslations("feature.system");
  const router = useRouter();
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleStoreButtonClick = () => {
    router.push("/shop");
  };

  const handleBadgeButtonClick = () => {
    console.log("Badge button clicked, user:", user);
    if (!user) {
      console.log("Opening login modal");
      onLoginRequired?.();
    } else {
      router.push("/mypage");
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <article
        aria-labelledby="system-left-title system-right-title"
        className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-3 rounded-xl bg-secondary-light px-4 py-6 xs:gap-4"
      >
        <section
          className="flex flex-col items-center justify-center gap-2 xs:gap-3 sm:gap-4"
          aria-labelledby="system-left-title"
        >
          <h3
            id="system-left-title"
            className="whitespace-pre-line text-center text-[10px] text-text-04 xs:text-[11px] sm:text-caption"
          >
            {t("title-left")}
          </h3>
          <figure className="w-[100px] xs:w-[130px] sm:w-[160px]">
            <Image src={seedRewards} alt="Seed rewards preview" loading="lazy" className="h-auto w-full" />
            <figcaption className="sr-only">{t("title-left")}</figcaption>
          </figure>
          <Button
            variant="secondaryStrong"
            size="sm"
            className="flex items-center justify-center px-3 py-1 text-[10px] font-medium xs:px-4 xs:py-1.5 xs:text-[11px] sm:px-5 sm:text-caption"
            onClick={handleStoreButtonClick}
          >
            {t("storeButton")}
          </Button>
        </section>

        <section
          className="flex flex-col items-center justify-center gap-2 xs:gap-3 sm:gap-4"
          aria-labelledby="system-right-title"
        >
          <h3
            id="system-right-title"
            className="whitespace-pre-line text-center text-[10px] text-text-04 xs:text-[11px] sm:text-caption"
          >
            {t("title-right")}
          </h3>
          <figure className="w-[80px] xs:w-[110px] sm:w-[140px]">
            <Image src={badges} alt="Badges preview" loading="lazy" className="h-auto w-full" />
            <figcaption className="sr-only">{t("title-right")}</figcaption>
          </figure>
          <Button
            variant="secondaryStrong"
            size="sm"
            className="flex items-center justify-center px-3 py-1 text-[10px] font-medium xs:px-4 xs:py-1.5 xs:text-[11px] sm:px-5 sm:text-caption"
            onClick={handleBadgeButtonClick}
          >
            {t("badgeButton")}
          </Button>
        </section>
      </article>
      <LoginRequiredModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default SystemSectionCard;
