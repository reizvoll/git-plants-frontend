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
        className="mx-auto flex h-[556px] w-full max-w-[800px] flex-col items-center justify-center rounded-2xl bg-secondary-light px-5 py-[3.75rem] tb:px-0"
      >
        <div className="flex w-full flex-row items-center justify-center gap-10 tb:gap-20">
          <section className="flex flex-col items-center justify-center gap-10" aria-labelledby="system-left-title">
            <h3 id="system-left-title" className="whitespace-pre-line text-center text-body2 text-text-04">
              {t("title-left")}
            </h3>
            <figure className="w-[250px]">
              <Image src={seedRewards} alt="Seed rewards preview" loading="lazy" className="h-auto w-full" />
              <figcaption className="sr-only">{t("title-left")}</figcaption>
            </figure>
            <Button
              variant="secondaryStrong"
              size="sm"
              className="flex items-center justify-center px-6 py-2 font-medium"
              onClick={handleStoreButtonClick}
            >
              {t("storeButton")}
            </Button>
          </section>

          <section className="flex flex-col items-center justify-center gap-10" aria-labelledby="system-right-title">
            <h3 id="system-right-title" className="whitespace-pre-line text-center text-body2 text-text-04">
              {t("title-right")}
            </h3>
            <figure className="w-[200px]">
              <Image src={badges} alt="Badges preview" loading="lazy" className="h-auto w-full" />
              <figcaption className="sr-only">{t("title-right")}</figcaption>
            </figure>
            <Button
              variant="secondaryStrong"
              size="sm"
              className="flex items-center justify-center px-6 py-2 font-medium"
              onClick={handleBadgeButtonClick}
            >
              {t("badgeButton")}
            </Button>
          </section>
        </div>
      </article>
      <LoginRequiredModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default SystemSectionCard;
