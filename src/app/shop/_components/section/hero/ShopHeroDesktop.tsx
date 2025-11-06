"use client";

import farmer from "@/assets/images/shop_farmer.webp";
import title from "@/assets/images/shop_title.webp";
import wagon from "@/assets/images/shop_wagon.webp";
import TypingAnimation from "@/components/shared/TypingAnimation";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ShopHeroDesktop = () => {
  const t = useTranslations("shop.hero");

  return (
    <section
      aria-labelledby="shop-hero-title"
      className="hidden w-full flex-col items-center justify-center mb:flex"
      style={
        {
          "--header-h": "clamp(60px, 15vw, 80px)",
          minHeight: "calc(100svh - var(--header-h))"
        } as React.CSSProperties
      }
    >
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <h2 id="shop-hero-title" className="sr-only">
          Shop Hero Section
        </h2>

        <figure className="aspect-[602/458] h-auto w-[clamp(350px,45vw,500px)]">
          <Image src={title} alt="Shop title banner" className="h-auto w-full object-contain" priority />
          <figcaption className="sr-only">shop banner</figcaption>
        </figure>

        <div className="relative flex w-full flex-row items-end justify-between">
          <figure className="aspect-[216/324] h-auto w-[clamp(100px,18vw,192px)]">
            <Image src={farmer} alt="Shop farmer illustration" className="h-auto w-full object-contain" priority />
            <figcaption className="sr-only">Farmer</figcaption>
          </figure>

          <figure className="aspect-[437/414] h-auto w-[clamp(200px,30vw,420px)]">
            <Image src={wagon} alt="Shop wagon illustration" className="h-auto w-full object-contain" priority />
            <figcaption className="sr-only">Wagon</figcaption>
          </figure>

          <div className="absolute left-[clamp(60px,18vw,140px)] top-[clamp(-48px,-4vh,-40px)] lt:left-40">
            <TypingAnimation
              text={[t("typingMessage"), t("typingMessage2")]}
              speed={200}
              className="text-subtitle text-text-03 ml:text-title1 tb:text-subHeading"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopHeroDesktop;
