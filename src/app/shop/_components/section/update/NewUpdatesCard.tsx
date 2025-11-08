"use client";

import { Button } from "@/components/ui/Button";
import { useCurrentUpdate } from "@/lib/hooks/update/useCurrentUpdate";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface NewUpdatesCardProps {
  isModalOpen: () => void;
}

const NewUpdatesCard = ({ isModalOpen }: NewUpdatesCardProps) => {
  const { data: currentUpdate, isLoading, error } = useCurrentUpdate();
  const t = useTranslations("shop.update");

  const hasValidData = currentUpdate && currentUpdate.updateNote && currentUpdate.updateNote.imageUrl;

  if (isLoading) {
    return <div>{/* <LoadingSpinner /> */}</div>;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 px-5 py-12">
      <h2 className="text-center text-title2 text-primary-default xs:text-subtitle s:text-title1">{t("title")}</h2>

      {hasValidData ? (
        <>
          <figure className="relative aspect-[700/360] w-full">
            <Image src={currentUpdate!.updateNote!.imageUrl} alt="Update note" fill className="object-cover" priority />
            <figcaption className="sr-only">{t("title")}</figcaption>
          </figure>

          <div className="flex w-full flex-col items-center justify-center gap-5">
            <Button
              size="md"
              variant="secondary"
              className="flex w-full items-center justify-center text-caption xs:text-body2 s:!py-[10px] s:text-title2"
              onClick={isModalOpen}
            >
              {t("seeInfo")}
            </Button>
            <Button
              size="md"
              variant="secondaryLine"
              className="flex w-full items-center justify-center text-caption xs:text-body2 s:!py-[10px] s:text-title2"
            >
              {t("buyNow")}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex aspect-[700/360] w-full items-center justify-center rounded-lg bg-gray-100">
            <div className="text-center text-body1 text-text-03">{t("comingSoon")}</div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-5">
            <Button
              size="md"
              variant="secondary"
              className="flex w-full items-center justify-center text-caption xs:text-body2 s:!py-[10px] s:text-title2"
            >
              {t("seeInfo")}
            </Button>
            <Button
              size="md"
              variant="secondaryLine"
              className="flex w-full items-center justify-center text-caption xs:text-body2 s:!py-[10px] s:text-title2"
            >
              {t("buyNow")}
            </Button>
          </div>
        </>
      )}

      {(error || !hasValidData) && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
          <div className="whitespace-pre-line text-center text-caption text-text-01 xs:text-body2 s:text-title2">
            {error ? <span>{t("errorMessage")}</span> : <span>{t("notReady")}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUpdatesCard;
