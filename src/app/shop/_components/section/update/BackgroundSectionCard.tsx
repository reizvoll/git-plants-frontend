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
    <div className="mx-auto flex h-[700px] w-full flex-col items-center justify-center gap-10 rounded-2xl px-[60px] py-[3.75rem]">
      <h2 className="w-full text-center text-heading text-primary-default">{t("title")}</h2>

      <ul className="flex w-full flex-row items-center justify-center gap-10">
        {backgroundItems.length > 0 ? (
          backgroundItems.map((item) => (
            <li key={item.id} className="flex flex-col items-center justify-center gap-6">
              <figure className="flex w-full justify-center">
                <Image src={item.imageUrl} alt={item.name} width={200} height={300} className="object-cover" priority />
                <figcaption className="sr-only">{item.name}</figcaption>
              </figure>

              <dl className="flex flex-row items-center gap-4">
                <dd className="flex flex-row items-center gap-2">
                  <Image src={seed} alt="seed" width={24} height={33} />
                  <span className="text-title1 text-text-03">{item.price}</span>
                </dd>
              </dl>

              <Button
                size="md"
                variant="secondaryLine"
                className="flex items-center justify-center px-8 text-body1 !font-medium"
              >
                {t("purchase")}
              </Button>
            </li>
          ))
        ) : (
          <p>{t("comingSoon")}</p>
        )}
      </ul>
    </div>
  );
};

export default BackgroundSectionCard;
