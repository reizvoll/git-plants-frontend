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
      className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-10 rounded-2xl bg-secondary-light px-8 py-[3.75rem] tb:px-5"
    >
      <h3 id="mode-card-title" className="w-full whitespace-pre-line text-center text-subtitle text-text-04 tb:hidden">
        {t("titleMobile")}
      </h3>
      <h3 className="hidden w-full text-center text-subtitle text-text-04 tb:block" aria-hidden="true">
        {t("title")}
      </h3>

      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-row items-center justify-center gap-4 tb:gap-10">
          <figure className="h-[160px] w-[107px]">
            <Image src={miniMode} alt="Mini mode preview" loading="lazy" className="h-full w-auto" />
            <figcaption className="sr-only">{t("miniMode.title")}</figcaption>
          </figure>

          <dl className="flex flex-col items-center">
            <dt className="text-center text-body2 text-text-04">{t("miniMode.title")}</dt>
            <dd className="mt-3 whitespace-pre-line text-center text-caption text-text-04">
              {t("miniMode.description")}
            </dd>
          </dl>
        </div>

        {/* TODO: 가든 모드 기능 완성 시 status 제거 예정 */}
        <div className="flex w-full flex-row items-center justify-center gap-4 tb:gap-10">
          <dl className="flex flex-col items-center">
            <dt className="flex flex-col items-center text-center text-body2 text-text-04">
              <span>{t("gardenMode.title")}</span>
              <span className="text-caption text-text-03">{t("gardenMode.status")}</span>
            </dt>
            <dd className="mt-3 whitespace-pre-line text-center text-caption text-text-04">
              {t("gardenMode.description")}
            </dd>
          </dl>

          <figure className="h-[160px] w-[240px]">
            <Image src={gardenMode} alt="Garden mode preview" loading="lazy" className="h-full w-auto" />
            <figcaption className="sr-only">{t("gardenMode.title")}</figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
};

export default ModeSectionCard;
