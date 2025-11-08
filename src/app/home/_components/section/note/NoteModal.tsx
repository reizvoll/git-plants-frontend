"use client";

import plant from "@/assets/images/plant_icon.png";
import Modal from "@/components/ui/Modal";
import { getTranslated, Locale } from "@/lib/store/languageStore";
import { MonthlyPlant } from "@/lib/types/api/public";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyPlant: MonthlyPlant;
  language: Locale;
}

const NoteModal = ({ isOpen, onClose, monthlyPlant, language }: NoteModalProps) => {
  const t = useTranslations("plants-note");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  const modalContent = (
    <div className="flex w-full flex-col items-center justify-center gap-6">
        {/* Left Frame */}
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Section heading */}
          <h2 className="text-center text-subtitle font-bold text-primary-strong xs:text-title1">{t("title")}</h2>
          <p className="text-center text-subtitle font-bold text-primary-strong xs:text-title1">
            {getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}
          </p>

          {/* API: title/description → definition list */}
          <dl className="m-0 flex flex-col items-center gap-6">
            <dt className="sr-only">{getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}</dt>

            <div className="flex flex-col items-center justify-center gap-8">
              <div className="h-[120px] w-[120px] rounded-full bg-bg-01">
                <Image
                  src={monthlyPlant.iconUrl}
                  width={196}
                  height={196}
                  alt="Monthly plant icon"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
            <dd className="whitespace-pre-line text-center text-body2 text-primary-strong">
              {getTranslated(monthlyPlant.description, monthlyPlant.ko?.description, language)}
            </dd>
          </dl>

          {/* Plant Image */}
          <div className="h-auto w-full max-w-[280px]">
            <Image
              src={monthlyPlant.mainImageUrl}
              width={350}
              height={233}
              alt="monthly_plant_main"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-row gap-4">
            <div className="flex w-auto flex-grow flex-col items-start gap-4">
              <div className="h-[43px] w-12">
                <Image src={plant} alt="" role="presentation" loading="lazy" />
              </div>
              <dl className="m-0">
                <dt className="font-pretendard text-title2 font-bold text-text-04">{t("growth_stage.title")}</dt>
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
                <dt className="font-pretendard text-title2 font-bold text-text-04">{t("start_now.title")}</dt>
                <dd className="whitespace-pre-line font-pretendard text-caption text-text-04">
                  {t("start_now.description")}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
  );

  return isMobile ? (
    <Modal isOpen={isOpen} onClose={onClose} mode="mobile" maxWidth="800px" className="bg-bg-02" contentClassName="px-5 py-8">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center text-xl font-bold text-primary-strong hover:bg-bg-03"
        aria-label="Close modal"
      >
        ×
      </button>
      {modalContent}
    </Modal>
  ) : (
    <Modal isOpen={isOpen} onClose={onClose} mode="default" className="bg-bg-02">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center text-xl font-bold text-primary-strong hover:bg-bg-03"
        aria-label="Close modal"
      >
        ×
      </button>
      {modalContent}
    </Modal>
  );
};

export default NoteModal;
