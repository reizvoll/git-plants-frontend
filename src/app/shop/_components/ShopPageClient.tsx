"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useProfile } from "@/lib/hooks/mypage/useProfile";
import { useShopItems } from "@/lib/hooks/shop/useShopItems";
import { useAuthStore } from "@/lib/store/authStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { useEffect, useMemo } from "react";
import ShopHero from "./section/hero/ShopHero";
import BackgroundList from "./section/items/BackgroundList";
import PotList from "./section/items/PotList";
import SellCropsSection from "./section/sell-crops/SellCropsSection";
import UpdateSection from "./section/update/UpdateSection";

const ShopPageClient = () => {
  const { user } = useAuthStore();
  const { data: shopItems, isLoading } = useShopItems();
  const { data: profileData } = useProfile();
  const { setProfileData } = useProfileStore();

  // shopItems를 카테고리별로 분리
  const { backgroundItems, potItems } = useMemo(() => {
    if (!shopItems) return { backgroundItems: [], potItems: [] };

    return {
      backgroundItems: shopItems.filter((item) => item?.category === "background") || [],
      potItems: shopItems.filter((item) => item?.category === "pot") || []
    };
  }, [shopItems]);

  // 프로필 데이터를 Zustand store에 동기화
  useEffect(() => {
    if (profileData) {
      setProfileData(profileData);
    }
  }, [profileData, setProfileData]);

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
