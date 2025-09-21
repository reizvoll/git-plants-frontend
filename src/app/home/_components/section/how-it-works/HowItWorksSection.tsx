"use client";

import { useTranslations } from "next-intl";
import ContributionsTab from "./ContributionsTab";

const HowItWorksSection = () => {
  const t = useTranslations("feature.how-it-works");

  return (
    <section
      aria-labelledby="howitworks-title"
      className="relative mx-auto flex w-full max-w-[1000px] items-center justify-center rounded-2xl bg-brown-100 px-[96px] py-10"
    >
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-6 text-center">
          <h2 id="howitworks-title" className="text-subtitle text-text-04">
            {t("title")}
          </h2>
          <p className="whitespace-pre-line text-caption text-text-03">{t("description")}</p>
        </div>

        <ContributionsTab />
      </div>
    </section>
  );
};

export default HowItWorksSection;
