"use client";

import farmer from "@/assets/images/shop_farmer.webp";
import title from "@/assets/images/shop_title.webp";
import wagon from "@/assets/images/shop_wagon.webp";
import TypingAnimation from "@/components/shared/TypingAnimation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ShopHero = () => {
  const t = useTranslations("shop.hero");

  return (
    <section aria-labelledby="shop-hero-title" className="flex w-full flex-col items-center justify-center gap-8">
      <h2 id="shop-hero-title" className="sr-only">
        Shop Hero Section
      </h2>

      <figure className="h-[380px] w-auto">
        <Image src={title} alt="Shop title banner" className="h-full w-auto" priority />
        <figcaption className="sr-only">shop banner</figcaption>
      </figure>

      <div className="relative flex w-full flex-row items-end justify-between">
        <figure className="h-[280px] w-auto">
          <Image src={farmer} alt="Shop farmer illustration" className="h-full w-auto" priority />
          <figcaption className="sr-only">Farmer</figcaption>
        </figure>

        <figure className="h-[320px] w-auto">
          <Image src={wagon} alt="Shop wagon illustration" className="h-full w-auto" priority />
          <figcaption className="sr-only">Wagon</figcaption>
        </figure>

        <div className="absolute -top-10 left-40">
          <TypingAnimation
            text={[t("typingMessage"), t("typingMessage2")]}
            speed={200}
            className="px-4 py-2 text-subHeading text-text-03"
          />
        </div>
      </div>
    </section>
  );
};

export default ShopHero;
