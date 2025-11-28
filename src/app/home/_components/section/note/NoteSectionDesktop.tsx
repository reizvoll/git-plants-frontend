"use client";

import note from "@/assets/images/note.webp";
import plant from "@/assets/images/plant_icon.png";
import LoadingText from "@/components/shared/LoadingText";
import { useMonthlyPlant } from "@/lib/hooks/note/useMonthlyPlant";
import { getTranslated, useLanguageStore } from "@/lib/store/languageStore";
import { useTranslations } from "next-intl";
import Image from "next/image";

const NoteSectionDesktop = () => {
  const t = useTranslations("plants-note");
  const { language } = useLanguageStore();
  const { data: monthlyPlant, isLoading, isError } = useMonthlyPlant();

  return (
    <section
      className="mx-auto hidden w-full max-w-[1200px] px-8 py-12 mb:block tb:px-8 tb:py-16 lt:px-16 lt:py-20"
      aria-labelledby="monthly-plant-title"
    >
      {isLoading ? (
        <div className="flex w-full justify-center">
          <div className="relative aspect-[1000/634] w-full max-w-[1000px]">
            <Image
              src={note}
              alt="Note"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(min-width: 1000px) 1000px, 100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <LoadingText
                text="Loading..."
                className="whitespace-pre-line text-center text-title2 text-text-01 tb:text-subtitle lt:text-title1"
              />
            </div>
          </div>
        </div>
      ) : isError || !monthlyPlant ? (
        <div className="flex w-full justify-center">
          <div className="relative aspect-[1000/634] w-full max-w-[1000px]">
            <Image
              src={note}
              alt="Note"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(min-width: 1000px) 1000px, 100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-center text-title2 text-text-01 tb:text-subtitle lt:text-title1">
                {t("notReady")}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* tablet */}
          <div className="relative aspect-[1000/634] w-full overflow-hidden tb:flex tb:w-full tb:justify-center lt:hidden">
            <Image src={note} alt="Note" fill className="object-cover" sizes="(min-width: 1000px) 1000px, 100vw" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
              {/* 한 줄: mb까지 */}
              <h2
                id="monthly-plant-title"
                className="text-center text-subtitle text-primary-strong ml:text-title1 tb:hidden"
              >
                {t("title")} {getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}
              </h2>

              {/* 두 줄: tb부터 */}
              <div className="hidden flex-col items-center gap-2 tb:flex">
                <h2 className="text-center text-subHeading text-primary-strong">{t("title")}</h2>
                <p className="text-center text-subHeading text-primary-strong">
                  {getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}
                </p>
              </div>

              <div className="relative h-[clamp(50px,12vw,120px)] w-[clamp(50px,12vw,120px)] flex-shrink-0 rounded-full bg-bg-01">
                <Image
                  src={monthlyPlant.iconUrl}
                  alt="Monthly plant icon"
                  fill
                  className="rounded-full object-cover"
                  sizes="120px"
                />
              </div>
              <dl className="m-0 flex flex-col items-center gap-[clamp(12px,2.5vw,20px)]">
                <dd className="text whitespace-pre-line text-center text-small text-text-04 ml:text-caption tb:text-body2">
                  {getTranslated(monthlyPlant.description, monthlyPlant.ko?.description, language)}
                </dd>
              </dl>
            </div>
          </div>

          {/* desktop */}
          <div className="hidden lt:flex lt:w-full lt:justify-center">
            <div className="relative aspect-[1000/634] w-full max-w-[1000px]">
              <Image
                src={note}
                alt="Note"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width: 1000px) 1000px, 100vw"
              />
              <div className="absolute inset-0 flex items-center justify-center px-12 py-20">
                <div className="flex w-full flex-row items-center justify-center gap-12 xl:gap-20">
                  {/* Left Frame */}
                  <div className="flex flex-col items-center justify-center gap-[clamp(12px,3vw,24px)]">
                    {/* Section heading */}
                    <div className="flex flex-col xl:gap-4">
                      <h2 id="monthly-plant-title-desktop" className="text-center text-title1 text-primary-strong">
                        {t("title")}
                      </h2>
                      <p className="text-center text-title1 text-primary-strong">
                        {getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}
                      </p>
                    </div>

                    {/* API: title/description → definition list */}
                    <dl className="m-0 flex flex-col items-center gap-[clamp(12px,2.5vw,20px)]">
                      <dd className="whitespace-pre-line text-center text-body2 text-primary-strong">
                        {getTranslated(monthlyPlant.description, monthlyPlant.ko?.description, language)}
                      </dd>
                    </dl>

                    {/* Plant Image */}
                    <div className="h-[clamp(130px,18vw,175px)] w-[clamp(260px,36vw,350px)]">
                      <Image
                        src={monthlyPlant.mainImageUrl}
                        width={350}
                        height={175}
                        alt="monthly_plant_main"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-[clamp(16px,4vw,48px)]">
                    <div className="h-[clamp(140px,20vw,196px)] w-[clamp(140px,20vw,196px)] rounded-full bg-bg-01">
                      <Image
                        src={monthlyPlant.iconUrl}
                        width={196}
                        height={196}
                        alt="Monthly plant icon"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <div className="flex flex-row gap-[clamp(12px,3.5vw,32px)]">
                        <div className="flex w-auto flex-grow flex-col items-center gap-4">
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

                        <div className="flex w-auto flex-grow flex-col items-center gap-4">
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
    </section>
  );
};

export default NoteSectionDesktop;
