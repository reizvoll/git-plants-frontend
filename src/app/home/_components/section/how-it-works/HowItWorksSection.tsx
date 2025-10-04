"use client";

import { useTranslations } from "next-intl";
import ContributionsTab from "./ContributionsTab";

const HowItWorksSection = () => {
  const t = useTranslations("feature.how-it-works");

  return (
    <section
      aria-labelledby="howitworks-title"
      className="relative mx-auto flex w-full max-w-[1000px] items-center justify-center rounded-xl bg-brown-100 px-4 py-6 mb:rounded-2xl mb:px-8 mb:py-10 tb:px-[96px]"
    >
      <div className="flex w-full flex-col items-center justify-center gap-6 mb:gap-10">
        <div className="flex flex-col gap-4 text-center mb:gap-6">
          <h2 id="howitworks-title" className="text-title2 text-text-04 mb:text-subtitle">
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
