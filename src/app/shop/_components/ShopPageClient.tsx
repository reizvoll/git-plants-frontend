"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import ShopHero from "./section/hero/ShopHero";
import SellCropsSection from "./section/sell-crops/SellCropsSection";
import UpdateSection from "./section/update/UpdateSection";

const ShopPageClient = () => {
  return (
    <>
      <div className="relative w-full bg-sageGreen-100">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center gap-16 px-8 pb-48 pt-12">
          <ShopHero />
          <SellCropsSection />
          <UpdateSection />
        </div>
      </div>
      <ScrollTopButton />
    </>
  );
};

export default ShopPageClient;
