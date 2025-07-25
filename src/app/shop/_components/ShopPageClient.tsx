"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useShopStore } from "@/lib/store/shopStore";
import { useEffect } from "react";
import ShopHero from "./section/hero/ShopHero";
import BackgroundList from "./section/items/BackgroundList";
import PotList from "./section/items/PotList";
import SellCropsSection from "./section/sell-crops/SellCropsSection";
import UpdateSection from "./section/update/UpdateSection";

const ShopPageClient = () => {
  const { backgroundItems, potItems, isLoading, fetchShopItems } = useShopStore();

  useEffect(() => {
    fetchShopItems();
  }, [fetchShopItems]);

  return (
    <>
      <div className="relative w-full bg-sageGreen-100">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center gap-16 px-8 pb-48 pt-12">
          <ShopHero />
          <SellCropsSection />
          <UpdateSection />
          <BackgroundList items={backgroundItems} loading={isLoading} />
          <PotList items={potItems} loading={isLoading} />
        </div>
      </div>
      <ScrollTopButton />
    </>
  );
};

export default ShopPageClient;
