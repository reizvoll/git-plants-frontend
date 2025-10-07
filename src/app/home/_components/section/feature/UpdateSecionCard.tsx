"use client";

import upcomingEvent from "@/assets/images/upcoming_event.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const UpdateSectionCard = () => {
  const t = useTranslations("feature.update");

  return (
    <article
      aria-labelledby="update-card-title"
      className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-3 rounded-xl bg-secondary-light px-3 py-5 xs:gap-4 xs:px-4 xs:py-6 sm:gap-5 sm:px-5 sm:py-7"
    >
      <div className="flex flex-col items-center justify-center gap-2 xs:gap-3 sm:gap-4">
        <h3 id="update-card-title" className="text-center text-caption text-text-04 xs:text-body1 sm:text-title2">
          Update Soon!
        </h3>
        <p className="text-center text-[9px] text-text-03 xs:text-[11px] sm:text-caption">{t("description")}</p>
      </div>

      <figure className="flex w-[100px] flex-col items-center justify-center xs:w-[130px] sm:w-[160px]">
        <Image src={upcomingEvent} alt="Upcoming event illustration" loading="lazy" className="h-auto w-full" />
        <figcaption className="sr-only">Update preview</figcaption>
      </figure>
    </article>
  );
};

export default UpdateSectionCard;
