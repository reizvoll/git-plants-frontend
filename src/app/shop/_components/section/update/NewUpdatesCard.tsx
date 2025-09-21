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
    <div className="mx-auto flex h-[700px] w-full flex-col items-center justify-center gap-10 rounded-2xl px-[60px] py-12 py-[3.75rem]">
      <h2 className="w-full text-center text-heading text-primary-default">{t("title")}</h2>

      <div className="flex w-full flex-col gap-10">
        {hasValidData ? (
          <div className="flex w-full flex-col gap-10">
            <figure className="flex w-full justify-center">
              <Image
                src={currentUpdate!.updateNote!.imageUrl}
                alt="Update note"
                width={700}
                height={360}
                className="object-cover"
                priority
              />
              <figcaption className="sr-only">{t("title")}</figcaption>
            </figure>

            <div className="flex w-full flex-row items-center justify-center gap-10">
              <Button
                size="lg"
                variant="secondary"
                className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
                onClick={isModalOpen}
              >
                {t("seeInfo")}
              </Button>
              <Button
                size="lg"
                variant="secondaryLine"
                className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
              >
                {t("buyNow")}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto flex h-[360px] w-[700px] items-center justify-center rounded-lg bg-gray-100">
              <div className="text-center text-body1 text-text-03">{t("comingSoon")}</div>
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-10">
              <Button
                size="lg"
                variant="secondary"
                className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
                onClick={isModalOpen}
              >
                {t("seeInfo")}
              </Button>
              <Button
                size="lg"
                variant="secondaryLine"
                className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
              >
                {t("buyNow")}
              </Button>
            </div>
          </>
        )}
      </div>

      {(error || !hasValidData) && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
          <div className="whitespace-pre-line text-center text-subtitle text-text-01">
            {error ? <span>{t("errorMessage")}</span> : <span>{t("notReady")}</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUpdatesCard;
