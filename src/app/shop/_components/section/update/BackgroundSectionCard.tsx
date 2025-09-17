"use client";

import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useCurrentUpdate } from "@/lib/hooks/update/useCurrentUpdate";
import { useTranslations } from "next-intl";
import Image from "next/image";

const BackgroundSectionCard = () => {
  const { data: currentUpdate, isLoading, error } = useCurrentUpdate();
  const backgroundItems = currentUpdate?.newItems.filter((item) => item.category === "background") || [];
  const t = useTranslations("shop.update");

  if (isLoading) {
    return <div>{/* <LoadingSpinner /> */}</div>;
  }

  if (error) {
    return <div>에러: {error.message}</div>;
  }

  return (
    <div className="mx-auto flex h-[700px] w-full flex-col items-center justify-center gap-10 rounded-2xl px-[60px] py-12 py-[3.75rem]">
      <div className="w-full text-center text-heading text-primary-default">{t("title")}</div>

      <div className="flex w-full flex-col gap-10">
        {backgroundItems.length > 0 ? (
          <div className="flex w-full flex-row items-center justify-center gap-10">
            {backgroundItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center justify-center gap-6">
                <picture className="flex w-full justify-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={200}
                    height={300}
                    className="object-cover"
                    priority
                  />
                </picture>
                <div className="flex flex-row items-center gap-4">
                  <Image src={seed} alt="seed" width={24} height={33} />
                  <span className="text-title1 text-text-03">{item.price}</span>
                </div>
                <Button
                  size="md"
                  variant="secondaryLine"
                  className="flex items-center justify-center px-8 text-body1 !font-medium"
                >
                  {t("purchase")}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div>{t("comingSoon")}</div>
        )}
      </div>
    </div>
  );
};

export default BackgroundSectionCard;
