"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useAuthStore } from "@/lib/store/authStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { useShopStore } from "@/lib/store/shopStore";
import { useEffect } from "react";
import ShopHero from "./section/hero/ShopHero";
import BackgroundList from "./section/items/BackgroundList";
import PotList from "./section/items/PotList";
import SellCropsSection from "./section/sell-crops/SellCropsSection";
import UpdateSection from "./section/update/UpdateSection";

const ShopPageClient = () => {
  const { user } = useAuthStore();
  const { backgroundItems, potItems, isLoading } = useShopStore();

  useEffect(() => {
    const shopState = useShopStore.getState();
    shopState.fetchShopItems();
  }, []);

  useEffect(() => {
    if (user) {
      const profileState = useProfileStore.getState();
      profileState.fetchProfile();
    }
  }, [user]);

  return (
    <>
      <div className="relative w-full bg-sageGreen-100">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center gap-16 px-8 pb-48 pt-12">
          <ShopHero />
          {user && <SellCropsSection />}
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
