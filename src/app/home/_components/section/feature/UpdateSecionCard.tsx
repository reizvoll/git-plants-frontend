"use client";

import upcomingEvent from "@/assets/images/upcoming_event.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const UpdateSectionCard = () => {
  const t = useTranslations("feature.update");

  return (
    <article
      aria-labelledby="update-card-title"
      className="mx-auto flex h-[556px] w-full max-w-[800px] flex-col items-center justify-center rounded-2xl bg-secondary-light py-[3.75rem]"
    >
      <div className="flex flex-row items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-10">
          <h3 id="update-card-title" className="text-center text-title1 text-text-04">
            Update Soon!
          </h3>
          <p className="text-center font-galmuri text-body2 text-text-03">{t("description")}</p>
        </div>

        <figure className="flex w-[250px] flex-col items-center justify-center">
          <Image src={upcomingEvent} alt="Upcoming event illustration" loading="lazy" className="h-auto w-full" />
          <figcaption className="sr-only">Update preview</figcaption>
        </figure>
      </div>
    </article>
  );
};

export default UpdateSectionCard;
