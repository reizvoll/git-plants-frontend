"use client";

import sysflow from "@/assets/images/system_flow.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const RewardSectionCard = () => {
  const t = useTranslations("feature.reward");

  return (
    <article
      aria-labelledby="reward-card-title"
      className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-3 rounded-xl bg-secondary-light px-4 py-6 xs:gap-4"
    >
      <h3 id="reward-card-title" className="w-full text-center text-caption text-text-04 xs:text-body1 sm:text-title2">
        {t("title")}
      </h3>

      <figure className="h-auto w-[80px] xs:w-[110px] sm:w-[140px]">
        <Image src={sysflow} alt="System flow illustration" loading="lazy" className="h-full w-auto" />
        <figcaption className="sr-only">{t("title")}</figcaption>
      </figure>

      <p className="w-full whitespace-pre-line px-2 text-center text-[9px] text-text-03 xs:text-[11px] sm:text-caption">
        {t("description")}
      </p>
    </article>
  );
};

export default RewardSectionCard;
