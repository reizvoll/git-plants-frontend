"use client";

import badges from "@/assets/images/badges.webp";
import seedRewards from "@/assets/images/seed_rewards.webp";
import { Button } from "@/components/ui/Button";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SystemSectionCard = () => {
  const t = useTranslations("feature.system");
  const router = useRouter();

  const handleStoreButtonClick = () => {
    router.push("/shop");
  };

  const handleBadgeButtonClick = () => {
    router.push("/mypage");
  };

  return (
    <>
      <article
        aria-labelledby="system-left-title system-right-title"
        className="mx-auto flex h-[556px] w-full max-w-[800px] flex-col items-center justify-center rounded-2xl bg-secondary-light py-[3.75rem]"
      >
        <div className="flex w-full flex-row items-center justify-center gap-20">
          <section className="flex flex-col items-center justify-center gap-10" aria-labelledby="system-left-title">
            <h3 id="system-left-title" className="whitespace-pre-line text-center font-galmuri text-body2 text-text-04">
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
            <h3
              id="system-right-title"
              className="whitespace-pre-line text-center font-galmuri text-body2 text-text-04"
            >
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
    </>
  );
};

export default SystemSectionCard;
