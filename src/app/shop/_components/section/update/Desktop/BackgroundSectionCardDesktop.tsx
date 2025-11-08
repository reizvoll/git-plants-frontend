"use client";

import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useCurrentUpdate } from "@/lib/hooks/update/useCurrentUpdate";
import { useTranslations } from "next-intl";
import Image from "next/image";

const BackgroundSectionCardDesktop = () => {
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
    <div className="mx-auto flex max-h-[700px] w-full flex-col items-center justify-center gap-10 rounded-2xl p-12 tb:px-[60px]">
      <h2 className="w-full text-center text-title1 text-primary-default tb:text-subHeading lt:text-heading">
        {t("title")}
      </h2>

      <ul className="flex w-full flex-row items-center justify-center gap-6 ml:gap-8 tb:gap-10">
        {backgroundItems.length > 0 ? (
          backgroundItems.map((item) => (
            <li key={item.id} className="flex w-[clamp(100px,20vw,200px)] flex-col items-center justify-center gap-6">
              <figure
                className={`relative w-full overflow-hidden ${item.mode === "MINI" ? "aspect-[2/3]" : "aspect-[4/3]"}`}
              >
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority />
                <figcaption className="sr-only">{item.name}</figcaption>
              </figure>

              <dl className="flex flex-row items-center gap-2 tb:gap-4">
                <dt className="sr-only">price</dt>
                <dd className="flex items-center gap-2 tb:gap-4">
                  <Image src={seed} alt="seed" className="aspect-[8/11] w-[clamp(18px,2vw,24px)]" />
                  <span className="text-title2 text-text-03 tb:text-subtitle lt:text-title1">{item.price}</span>
                </dd>
              </dl>

              <Button size="md" variant="secondaryLine" className="flex items-center justify-center px-8 text-body1">
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

export default BackgroundSectionCardDesktop;
