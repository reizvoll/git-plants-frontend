"use client";

import { Button } from "@/components/ui/Button";
import { useCurrentUpdate } from "@/lib/hooks/update/useCurrentUpdate";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface NewUpdatesCardDesktopProps {
  isModalOpen: () => void;
}

const NewUpdatesCardDesktop = ({ isModalOpen }: NewUpdatesCardDesktopProps) => {
  const { data: currentUpdate, isLoading, error } = useCurrentUpdate();
  const t = useTranslations("shop.update");

  const hasValidData = currentUpdate && currentUpdate.updateNote && currentUpdate.updateNote.imageUrl;

  if (isLoading) {
    return <div>{/* <LoadingSpinner /> */}</div>;
  }

  return (
    <div className="mx-auto flex max-h-[700px] w-full flex-col items-center justify-center gap-10 rounded-2xl p-12 tb:px-[60px]">
      <h2 className="w-full text-center text-title1 text-primary-default tb:text-subHeading lt:text-heading">
        {t("title")}
      </h2>

      <div className="flex w-full flex-col items-center gap-10">
        {hasValidData ? (
          <div className="flex w-full flex-col gap-10">
            <figure className="relative mx-auto aspect-[700/360] w-full max-w-[700px]">
              <Image
                src={currentUpdate!.updateNote!.imageUrl}
                alt="Update note"
                fill
                className="object-cover"
                priority
              />
              <figcaption className="sr-only">{t("title")}</figcaption>
            </figure>

            <div className="flex w-full flex-row items-center justify-center gap-6 tb:gap-10">
              <Button
                size="md"
                variant="secondary"
                className="flex items-center justify-center px-10 py-4 text-body1 tb:px-[60px]"
                onClick={isModalOpen}
              >
                {t("seeInfo")}
              </Button>
              <Button
                size="md"
                variant="secondaryLine"
                className="flex items-center justify-center px-10 py-4 text-body1 tb:px-[60px]"
              >
                {t("buyNow")}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto flex aspect-[700/360] w-full max-w-[700px] items-center justify-center rounded-lg bg-gray-100">
              <div className="text-center text-body1 text-text-03">{t("comingSoon")}</div>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-10">
              <Button
                size="md"
                variant="secondary"
                className="flex items-center justify-center px-10 py-4 text-body1 tb:px-[60px]"
                onClick={isModalOpen}
              >
                {t("seeInfo")}
              </Button>
              <Button
                size="md"
                variant="secondaryLine"
                className="flex items-center justify-center px-10 py-4 text-body1 tb:px-[60px]"
              >
                {t("buyNow")}
              </Button>
            </div>
          </>
        )}
      </div>

      {(error || !hasValidData) && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
          <div className="whitespace-pre-line text-center text-title2 text-text-01 tb:text-subtitle lt:text-title1">
            {error ? <span>{t("errorMessage")}</span> : <span>{t("notReady")}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUpdatesCardDesktop;
