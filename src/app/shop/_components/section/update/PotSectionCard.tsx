"use client";

import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useCurrentUpdate } from "@/lib/hooks/update/useCurrentUpdate";
import { useTranslations } from "next-intl";
import Image from "next/image";

const PotSectionCard = () => {
  const { data: currentUpdate, isLoading, error } = useCurrentUpdate();
  const potItems = currentUpdate?.newItems.filter((item) => item.category === "pot") || [];
  const t = useTranslations("shop.update");

  if (isLoading) {
    return <div>{/* <LoadingSpinner /> */}</div>;
  }

  if (error) {
    return <div>에러: {error.message}</div>;
  }

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-2xl px-5 py-12">
      <h2 className="text-center text-title2 text-primary-default xs:text-subtitle s:text-title1">{t("title")}</h2>

      <div className="flex w-full flex-col gap-10">
        {potItems.length > 0 ? (
          <ul className="flex w-full flex-wrap items-center justify-center gap-10">
            {potItems.map((item) => (
              <li key={item.id} className="flex w-[clamp(40px,20vw,100px)] flex-col items-center gap-4">
                <figure className="relative aspect-square w-full overflow-hidden">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority />
                  <figcaption className="sr-only">{item.name}</figcaption>
                </figure>

                <div className="flex flex-row items-center gap-2">
                  <Image src={seed} alt="seed" width={13} height={18} />
                  <span className="text-caption text-text-03">{item.price}</span>
                </div>

                <Button
                  size="sm"
                  variant="secondaryLine"
                  className="flex !h-[33px] w-full items-center justify-center text-mini s:text-small sm:!h-11"
                >
                  {t("purchase")}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div>{t("comingSoon")}</div>
        )}
      </div>
    </div>
  );
};

export default PotSectionCard;
