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
import NoteModal from "./NoteModal";

const NoteSection = () => {
  const t = useTranslations("plants-note");
  const { language } = useLanguageStore();
  const [monthlyPlant, setMonthlyPlant] = useState<MonthlyPlant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <section
      className="mx-auto w-full max-w-[1200px] px-3 py-6 xs:px-4 xs:py-8 sm:px-6 sm:py-10 mb:px-8 mb:py-12 tb:px-8 tb:py-16 lt:px-16 lt:py-20"
      aria-labelledby="monthly-plant-title"
    >
      {isLoading ? (
        <>
          {/* mobile */}
          <div className="relative aspect-[1000/634] w-full overflow-hidden mb:hidden">
            <Image src={note} alt="Note" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <LoadingText text="Loading..." className="text-body1 text-white xs:text-title2 sm:text-title1" />
            </div>
          </div>

          {/* desktop */}
          <div className="hidden mb:flex mb:w-full mb:justify-center">
            <div className="relative aspect-[1000/634] w-full max-w-[1000px]">
              <Image
                src={note}
                alt="Note"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width:1200px) 1000px, (min-width:768px) 90vw, 100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <LoadingText text="Loading..." className="text-title1 text-white tb:text-subHeading lt:text-heading" />
              </div>
            </div>
          </div>
        </>
      ) : error || !monthlyPlant ? (
        <>
          {/* mobile */}
          <div className="relative aspect-[1000/634] w-full overflow-hidden tb:hidden">
            <Image src={note} alt="Note" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-body1 text-white xs:text-title2 sm:text-title1">준비중입니다.</span>
            </div>
          </div>

          {/* desktop */}
          <div className="hidden mb:flex mb:w-full mb:justify-center">
            <div className="relative aspect-[1000/634] w-full max-w-[1000px]">
              <Image
                src={note}
                alt="Note"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width:1200px) 1000px, (min-width:768px) 90vw, 100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-title1 text-white tb:text-subHeading lt:text-heading">준비중입니다.</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* mobile */}
          <div
            className="relative aspect-[1000/634] w-full cursor-pointer overflow-hidden mb:hidden"
            onClick={() => setIsModalOpen(true)}
          >
            <Image src={note} alt="Note" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
              <h2
                id="monthly-plant-title"
                className="text-center text-body1 font-bold text-primary-strong xs:text-title2 sm:text-title1 tb:text-subHeading"
              >
                {t("title")}
              </h2>
              <p className="text-center text-caption font-medium text-primary-strong xs:text-body1 sm:text-subtitle tb:text-title1">
                {getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}
              </p>
              <div className="relative h-[clamp(50px,12vw,120px)] w-[clamp(50px,12vw,120px)] flex-shrink-0 rounded-full bg-bg-01">
                <Image
                  src={monthlyPlant.iconUrl}
                  alt="Monthly plant icon"
                  fill
                  quality={75}
                  className="rounded-full object-cover"
                  sizes="(min-width:768px) 120px, (min-width:480px) 80px, 60px"
                />
              </div>
            </div>
          </div>

          {/* tablet */}
          <div className="relative hidden aspect-[1000/634] w-full overflow-hidden mb:flex mb:w-full mb:justify-center tb:hidden">
            <Image src={note} alt="Note" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
              <h2
                id="monthly-plant-title"
                className="text-center text-body1 font-bold text-primary-strong xs:text-title2 sm:text-title1 tb:text-subHeading"
              >
                {t("title")}
              </h2>
              <div className="relative h-[clamp(50px,12vw,120px)] w-[clamp(50px,12vw,120px)] flex-shrink-0 rounded-full bg-bg-01">
                <Image
                  src={monthlyPlant.iconUrl}
                  alt="Monthly plant icon"
                  fill
                  quality={75}
                  className="rounded-full object-cover"
                  sizes="(min-width:768px) 120px, (min-width:480px) 80px, 60px"
                />
              </div>
              <dl className="m-0 flex flex-col items-center gap-[clamp(12px,2.5vw,20px)]">
                <dt className="text-center text-title2 text-primary-strong">
                  {getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}
                </dt>
                <dd className="text whitespace-pre-line text-center text-text-04 mb:text-caption">
                  {getTranslated(monthlyPlant.description, monthlyPlant.ko?.description, language)}
                </dd>
              </dl>
            </div>
          </div>

          {/* desktop */}
          <div className="hidden tb:flex tb:w-full tb:justify-center lt:flex lt:w-full lt:justify-center">
            <div className="relative aspect-[1000/634] w-full max-w-[1000px]">
              <Image
                src={note}
                alt="Note"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width:1200px) 1000px, (min-width:1024px) 90vw, 100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center px-12 py-20">
                <div className="flex w-full flex-row items-center justify-center gap-20">
                  {/* Left Frame */}
                  <div className="flex flex-col items-center justify-center gap-[clamp(12px,3vw,24px)]">
                    {/* Section heading */}
                    <h2 id="monthly-plant-title-desktop" className="text-center text-title1 text-primary-strong">
                      {t("title")}
                    </h2>

                    {/* API: title/description → definition list */}
                    <dl className="m-0 flex flex-col items-center gap-[clamp(12px,2.5vw,20px)]">
                      <dt className="text-center text-title1 text-primary-strong">
                        {getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}
                      </dt>
                      <dd className="whitespace-pre-line text-center text-body2 text-primary-strong">
                        {getTranslated(monthlyPlant.description, monthlyPlant.ko?.description, language)}
                      </dd>
                    </dl>

                    {/* Plant Image */}
                    <div
                      style={{
                        width: "calc(280px + (350px - 280px) * ((100vw - 768px) / (1024px - 768px)))",
                        height: "calc(187px + (233px - 187px) * ((100vw - 768px) / (1024px - 768px)))",
                        maxWidth: "350px",
                        maxHeight: "233px",
                        minWidth: "280px",
                        minHeight: "187px"
                      }}
                    >
                      <Image
                        src={monthlyPlant.mainImageUrl}
                        width={350}
                        height={233}
                        alt="monthly_plant_main"
                        quality={75}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-[clamp(16px,4vw,48px)]">
                    <div
                      className="rounded-full bg-bg-01"
                      style={{
                        width: "calc(140px + (196px - 140px) * ((100vw - 768px) / (1024px - 768px)))",
                        height: "calc(140px + (196px - 140px) * ((100vw - 768px) / (1024px - 768px)))",
                        maxWidth: "196px",
                        maxHeight: "196px",
                        minWidth: "140px",
                        minHeight: "140px"
                      }}
                    >
                      <Image
                        src={monthlyPlant.iconUrl}
                        width={196}
                        height={196}
                        alt="Monthly plant icon"
                        quality={75}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <div className="flex flex-row gap-[clamp(12px,3.5vw,32px)]">
                        <div className="flex w-auto flex-grow flex-col items-start gap-4">
                          <div className="h-[43px] w-12">
                            <Image src={plant} alt="" role="presentation" loading="lazy" />
                          </div>
                          <dl className="m-0">
                            <dt className="font-pretendard text-title2 font-bold text-text-04">
                              {t("growth_stage.title")}
                            </dt>
                            <dd className="whitespace-pre-line font-pretendard text-caption text-text-04">
                              {t("growth_stage.description")}
                            </dd>
                          </dl>
                        </div>

                        <div className="flex w-auto flex-grow flex-col items-start gap-4">
                          <div className="h-[43px] w-12">
                            <Image src={plant} alt="" role="presentation" loading="lazy" />
                          </div>
                          <dl className="m-0">
                            <dt className="font-pretendard text-title2 font-bold text-text-04">
                              {t("start_now.title")}
                            </dt>
                            <dd className="whitespace-pre-line font-pretendard text-caption text-text-04">
                              {t("start_now.description")}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Modal */}
      {monthlyPlant && (
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          monthlyPlant={monthlyPlant}
          language={language}
        />
      )}
    </section>
  );
};

export default NoteSection;
