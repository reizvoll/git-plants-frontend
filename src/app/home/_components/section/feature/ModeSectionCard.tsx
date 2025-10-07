"use client";

import gardenMode from "@/assets/images/garden_mode.webp";
import miniMode from "@/assets/images/mini_mode.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ModeSectionCard = () => {
  const t = useTranslations("feature.mode");

  return (
    <article
      aria-labelledby="mode-card-title-mobile"
      className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-3 rounded-xl bg-secondary-light px-3 py-5 xs:gap-4 xs:px-4 xs:py-6 sm:gap-5 sm:px-5 sm:py-7"
    >
      <h3
        id="mode-card-title"
        className="w-full text-center text-caption text-text-04 xs:text-body1 sm:text-title2"
      >
        {t("title")}
      </h3>

      <div className="flex w-full flex-col gap-3 xs:gap-4 sm:gap-5">
        {/* Mini Mode */}
        <div className="flex w-full flex-col items-center justify-center gap-2 xs:gap-3">
          <figure className="h-[60px] w-[40px] xs:h-[80px] xs:w-[54px] sm:h-[100px] sm:w-[67px]">
            <Image src={miniMode} alt="Mini mode preview" loading="lazy" className="h-full w-auto" />
            <figcaption className="sr-only">{t("miniMode.title")}</figcaption>
          </figure>

          <dl className="flex flex-col items-center gap-1">
            <dt className="text-center text-[11px] text-text-04 xs:text-caption sm:text-body2">
              {t("miniMode.title")}
            </dt>
            <dd className="whitespace-pre-line px-2 text-center text-[9px] text-text-04 xs:text-[10px] sm:text-[11px]">
              {t("miniMode.description")}
            </dd>
          </dl>
        </div>

        {/* Garden Mode */}
        <div className="flex w-full flex-col items-center justify-center gap-2 xs:gap-3">
          <figure className="h-[45px] w-[68px] xs:h-[60px] xs:w-[90px] sm:h-[80px] sm:w-[120px]">
            <Image src={gardenMode} alt="Garden mode preview" loading="lazy" className="h-full w-auto" />
            <figcaption className="sr-only">{t("gardenMode.title")}</figcaption>
          </figure>

          <dl className="flex flex-col items-center gap-1">
            <dt className="text-center text-[11px] text-text-04 xs:text-caption sm:text-body2">
              {t("gardenMode.title")}
            </dt>
            <dd className="whitespace-pre-line px-2 text-center text-[9px] text-text-04 xs:text-[10px] sm:text-[11px]">
              {t("gardenMode.description")}
            </dd>
          </dl>
        </div>
      </div>
    </article>
  );
};

export default ModeSectionCard;
