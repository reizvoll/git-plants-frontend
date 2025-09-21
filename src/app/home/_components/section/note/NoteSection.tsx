"use client";

import { getMonthlyPlant } from "@/api/public";
import note from "@/assets/images/note.webp";
import plant from "@/assets/images/plant_icon.png";
import LoadingText from "@/components/shared/LoadingText";
import { getTranslated, useLanguageStore } from "@/lib/store/languageStore";
import { MonthlyPlant } from "@/lib/types/api/public";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const NoteSection = () => {
  const t = useTranslations("plants-note");
  const { language } = useLanguageStore();
  const [monthlyPlant, setMonthlyPlant] = useState<MonthlyPlant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getMonthlyPlant(language)
      .then((data) => {
        if (data && data.mainImageUrl && data.iconUrl) {
          setMonthlyPlant(data);
        } else {
          setError(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("API 에러:", err);
        setError(true);
        setIsLoading(false);
      });
  }, [language]);

  return (
    <section className="flex w-full justify-center" aria-labelledby="monthly-plant-title">
      <div className="relative h-[634px] w-[1000px]">
        <Image src={note} alt="Note" className="object-cover" loading="lazy" />

        {(isLoading || error || !monthlyPlant) && (
          <>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingText text="Loading..." className="text-title1 text-primary-default" />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                <span className="text-title1 text-text-01">준비중입니다.</span>
              </div>
            )}
          </>
        )}

        {monthlyPlant && monthlyPlant.mainImageUrl && monthlyPlant.iconUrl && (
          <div className="absolute inset-0 flex items-center justify-center px-12 py-20">
            <div className="flex w-full flex-row items-center justify-center gap-20">
              {/* Left Frame */}
              <div className="flex flex-col items-center justify-center gap-6">
                {/* Section heading */}
                <h2 id="monthly-plant-title" className="text-center font-galmuri text-title1 text-primary-strong">
                  {t("title")}
                </h2>

                {/* API: title/description → definition list */}
                <dl className="m-0 flex flex-col items-center gap-6">
                  <dt className="text-center font-galmuri text-title1 text-primary-strong">
                    {getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}
                  </dt>
                  <dd className="whitespace-pre-line text-center font-galmuri text-body2 text-primary-strong">
                    {getTranslated(monthlyPlant.description, monthlyPlant.ko?.description, language)}
                  </dd>
                </dl>

                {/* Plant Image */}
                <div className="h-[233px] w-[350px]">
                  <Image
                    src={monthlyPlant.mainImageUrl}
                    width={350}
                    height={233}
                    alt="monthly_plant_main"
                    quality={75}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-16">
                <div className="h-[196px] w-[196px] rounded-full bg-bg-01">
                  <Image
                    src={monthlyPlant.iconUrl}
                    width={196}
                    height={196}
                    alt="Monthly plant icon"
                    quality={75}
                    className="rounded-full object-cover"
                  />
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-row gap-8">
                    <dl className="m-0 grid grid-cols-2 gap-8">
                      <div className="flex w-auto flex-grow flex-col items-start gap-4">
                        <div className="h-[43px] w-12">
                          <Image src={plant} alt="" role="presentation" loading="lazy" />
                        </div>
                        <dt className="font-pretendard text-title2 font-bold text-text-04">
                          {t("growth_stage.title")}
                        </dt>
                        <dd className="whitespace-pre-line font-pretendard text-caption text-text-04">
                          {t("growth_stage.description")}
                        </dd>
                      </div>

                      <div className="flex w-auto flex-grow flex-col items-start gap-4">
                        <div className="h-[43px] w-12">
                          <Image src={plant} alt="" role="presentation" loading="lazy" />
                        </div>
                        <dt className="font-pretendard text-title2 font-bold text-text-04">{t("start_now.title")}</dt>
                        <dd className="whitespace-pre-line font-pretendard text-caption text-text-04">
                          {t("start_now.description")}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NoteSection;
