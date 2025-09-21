"use client";

import sysflow from "@/assets/images/system_flow.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const RewardSectionCard = () => {
  const t = useTranslations("feature.reward");

  return (
    <article
      aria-labelledby="reward-card-title"
      className="mx-auto flex h-[556px] w-full max-w-[800px] flex-col items-center justify-center gap-10 rounded-2xl bg-secondary-light py-[3.75rem]"
    >
      <h3 id="reward-card-title" className="w-full text-center text-subtitle text-text-04">
        {t("title")}
      </h3>

      <figure className="h-auto w-[200px]">
        <Image src={sysflow} alt="System flow illustration" loading="lazy" className="h-full w-auto" />
        <figcaption className="sr-only">{t("title")}</figcaption>
      </figure>

      <p className="w-full whitespace-pre-line text-center text-body2 text-text-03">{t("description")}</p>
    </article>
  );
};

export default RewardSectionCard;
