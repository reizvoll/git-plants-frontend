"use client";

import farmer from "@/assets/images/shop_farmer.webp";
import title from "@/assets/images/shop_title.webp";
import wagon from "@/assets/images/shop_wagon.webp";
import TypingAnimation from "@/components/shared/TypingAnimation";
import Image from "next/image";

const ShopHero = () => {
  return (
    <>
      <picture className="h-[380px] w-auto">
        <Image src={title} alt="title" className="h-full w-auto" priority />
      </picture>
      <div className="relative flex w-full flex-row items-end justify-between">
        <picture className="h-[280px] w-auto">
          <Image src={farmer} alt="title" className="h-full w-auto" priority />
        </picture>
        <picture className="h-[320px] w-auto">
          <Image src={wagon} alt="title" className="h-full w-auto" priority />
        </picture>
        <div className="absolute -top-10 left-40">
          <TypingAnimation
            text={["어서 오게, 장보러 왔나?", "좋은 물건 가져 왔다네.\n 보고 가시게나."]}
            speed={200}
            className="px-4 py-2 text-subHeading text-text-03"
          />
        </div>
      </div>
    </>
  );
};

export default ShopHero;
