"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useBreakpoint } from "@/lib/hooks/common/useBreakpoints";
import { useProfile } from "@/lib/hooks/mypage/useProfile";
import { useShopItems } from "@/lib/hooks/shop/useShopItems";
import { useProfileStore } from "@/lib/store/profileStore";
import { useEffect, useMemo } from "react";
import ShopHero from "./section/hero/ShopHero";
import ShopHeroDesktop from "./section/hero/ShopHeroDesktop";
import BackgroundList from "./section/items/BackgroundList";
import BackgroundListDesktop from "./section/items/BackgroundListDesktop";
import PotList from "./section/items/PotList";
import PotListDesktop from "./section/items/PotListDesktop";

import SellCropsSection from "./section/sell-crops/SellCropsSection";
import SellCropsSectionDesktop from "./section/sell-crops/SellCropsSectionDesktop";
import UpdateSection from "./section/update/UpdateSection";

const ShopPageClient = () => {
  const breakpoint = useBreakpoint();
  const { user } = useAuth();
  const { data: shopItems, isLoading } = useShopItems();
  const { data: profileData } = useProfile();
  const { setProfileData } = useProfileStore();

  // shopItems, 카테고리별로 분리
  const { backgroundItems, potItems } = useMemo(() => {
    if (!shopItems) return { backgroundItems: [], potItems: [] };

    return {
      backgroundItems: shopItems.filter((item) => item?.category === "background") || [],
      potItems: shopItems.filter((item) => item?.category === "pot") || []
    };
  }, [shopItems]);

  // 프로필 데이터, Zustand store에 동기화
  useEffect(() => {
    if (profileData) {
      setProfileData(profileData);
    }
  }, [profileData, setProfileData]);

  return (
    <>
      <main aria-labelledby="shop-title" className="relative -ml-[calc(50vw-50%)] w-screen bg-sageGreen-100">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center gap-[max(120px,calc(100vh-350px))] px-5 pb-48 mb:gap-[max(160px,calc(100vh-500px))] mb:px-8 tb:gap-[255px] lt:pt-12">
          <h1 id="shop-title" className="sr-only">
            Shop
          </h1>

          {/* Hero Section */}
          {breakpoint === "mobile" ? <ShopHero /> : <ShopHeroDesktop />}

          {/* Sell Crops Section */}
          {user && (breakpoint === "mobile" ? <SellCropsSection /> : <SellCropsSectionDesktop />)}

          {/* Update Section - Same for all */}
          <UpdateSection />

          {/* Background List */}
          {breakpoint === "mobile" ? (
            <BackgroundList items={backgroundItems} loading={isLoading} />
          ) : (
            <BackgroundListDesktop items={backgroundItems} loading={isLoading} />
          )}

          {/* Pot List */}
          {breakpoint === "mobile" ? (
            <PotList items={potItems} loading={isLoading} />
          ) : (
            <PotListDesktop items={potItems} loading={isLoading} />
          )}
        </div>
      </main>

      <ScrollTopButton />
    </>
  );
};

export default ShopPageClient;
