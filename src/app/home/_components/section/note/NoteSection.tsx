"use client";

import note from "@/assets/images/note.webp";
import LoadingText from "@/components/shared/LoadingText";
import { useMonthlyPlant } from "@/lib/hooks/note/useMonthlyPlant";
import { getTranslated, useLanguageStore } from "@/lib/store/languageStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import NoteModal from "./NoteModal";

const NoteSection = () => {
  const t = useTranslations("plants-note");
  const { language } = useLanguageStore();
  const { data: monthlyPlant, isLoading, isError } = useMonthlyPlant();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="mx-auto w-full max-w-[480px] px-3 xs:px-4 s:px-6 sm:py-10 mb:hidden"
      aria-labelledby="monthly-plant-title"
    >
      {isLoading ? (
        <div className="relative aspect-[1000/634] w-full overflow-hidden">
          <Image src={note} alt="Note" fill className="object-cover" sizes="(min-width: 480px) 480px, 100vw" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <LoadingText
              text="Loading..."
              className="whitespace-pre-line text-center text-caption text-text-01 xs:text-body2 s:text-title2"
            />
          </div>
        </div>
      ) : isError || !monthlyPlant ? (
        <div className="relative aspect-[1000/634] w-full overflow-hidden">
          <Image src={note} alt="Note" fill className="object-cover" sizes="(min-width: 480px) 480px, 100vw" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="whitespace-pre-line text-center text-caption text-text-01 xs:text-body2 s:text-title2">
              {t("notReady")}
            </span>
          </div>
        </div>
      ) : (
        <>
          <div
            className="relative aspect-[1000/634] w-full cursor-pointer overflow-hidden"
            onClick={() => setIsModalOpen(true)}
          >
            <Image src={note} alt="Note" fill className="object-cover" sizes="(min-width: 480px) 480px, 100vw" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 s:gap-4">
              <h2
                id="monthly-plant-title"
                className="text-center text-caption text-primary-strong xs:text-body2 sm:text-title2"
              >
                {t("title")}
              </h2>
              <p className="text-center text-caption text-primary-strong xs:text-body2 sm:text-title2">
                {getTranslated(monthlyPlant.name, monthlyPlant.ko?.name, language)}
              </p>
              <div className="relative h-[clamp(50px,15vw,80px)] w-[clamp(50px,15vw,80px)] flex-shrink-0 rounded-full bg-bg-01">
                <Image
                  src={monthlyPlant.iconUrl}
                  alt="Monthly plant icon"
                  fill
                  className="rounded-full object-cover"
                  sizes="80px"
                />
              </div>
            </div>
          </div>

          {/* Mobile Modal */}
          <NoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            monthlyPlant={monthlyPlant}
            language={language}
          />
        </>
      )}
    </section>
  );
};

export default NoteSection;
