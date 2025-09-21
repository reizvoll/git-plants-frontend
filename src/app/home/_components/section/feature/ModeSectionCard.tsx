"use client";

import gardenMode from "@/assets/images/garden_mode.webp";
import miniMode from "@/assets/images/mini_mode.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ModeSectionCard = () => {
  const t = useTranslations("feature.mode");

  return (
    <article
      aria-labelledby="mode-card-title"
      className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-10 rounded-2xl bg-secondary-light py-[3.75rem]"
    >
      <h3 id="mode-card-title" className="w-full text-center font-galmuri text-subtitle text-text-04">
        {t("title")}
      </h3>

      <dl className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-row items-center justify-center gap-10">
          <figure className="h-[160px] w-[107px]">
            <Image src={miniMode} alt="Mini mode preview" loading="lazy" className="h-full w-auto" />
            <figcaption className="sr-only">{t("miniMode.title")}</figcaption>
          </figure>

          <div className="flex flex-col items-center">
            <dt className="text-center font-galmuri text-body2 text-text-04">{t("miniMode.title")}</dt>
            <dd className="mt-3 whitespace-pre-line text-center font-galmuri text-caption text-text-04">
              {t("miniMode.description")}
            </dd>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-10">
          <div className="flex flex-col items-center">
            <dt className="text-center font-galmuri text-body2 text-text-04">{t("gardenMode.title")}</dt>
            <dd className="mt-3 whitespace-pre-line text-center font-galmuri text-caption text-text-04">
              {t("gardenMode.description")}
            </dd>
          </div>

          <figure className="h-[160px] w-[240px]">
            <Image src={gardenMode} alt="Garden mode preview" loading="lazy" className="h-full w-auto" />
            <figcaption className="sr-only">{t("gardenMode.title")}</figcaption>
          </figure>
        </div>
      </dl>
    </article>
  );
};

export default ModeSectionCard;
