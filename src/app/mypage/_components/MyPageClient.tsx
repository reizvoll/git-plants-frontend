"use client";

import { authApi } from "@/api/auth";
import LoadingText from "@/components/shared/LoadingText";
import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useProfileStore } from "@/lib/store/profileStore";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BadgeNotificationModal from "./BadgeNotificationModal";
import SelectTab from "./SelectTab";
import UserInfo from "./UserInfo";

const MyPageClient = () => {
  const router = useRouter();
  const { isLoading, fetchProfile, newBadges } = useProfileStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

  const stableFetchProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await authApi.getSession();
        if (!response.success) {
          alert("로그인이 필요한 서비스입니다.");
          router.push("/");
        } else {
          const currentState = useProfileStore.getState();
          if (!currentState.user && !currentState.isLoading) {
            await stableFetchProfile();
          }
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/");
      }
    };

    checkLoginStatus();
  }, [router, stableFetchProfile]);

  useEffect(() => {
    if (newBadges && newBadges.length > 0 && !isInitialLoad) {
      setShowBadgeNotification(true);
      setCurrentBadgeIndex(0);
    }
  }, [newBadges, isInitialLoad]);

  const handleCloseBadgeNotification = () => {
    setShowBadgeNotification(false);
    if (newBadges && currentBadgeIndex < newBadges.length - 1) {
      setCurrentBadgeIndex((prev) => prev + 1);
      setTimeout(() => {
        setShowBadgeNotification(true);
      }, 100);
    } else {
      fetchProfile();
      setCurrentBadgeIndex(0);
    }
  };

  if (isLoading || isInitialLoad) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-03">
        <LoadingText text="Loading..." className="text-subHeading text-primary-default" />
      </div>
    );
  }

  const currentBadge = newBadges && newBadges.length > 0 ? newBadges[currentBadgeIndex] : null;

  return (
    <>
      <div className="relative w-full bg-bg-03">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-16 px-8 pb-48 pt-20">
          <UserInfo />
          <SelectTab />
        </div>
      </div>
      <ScrollTopButton />

      {currentBadge && showBadgeNotification && (
        <BadgeNotificationModal
          isOpen={showBadgeNotification}
          onClose={handleCloseBadgeNotification}
          badge={{
            name: currentBadge.name,
            imageUrl: currentBadge.imageUrl
          }}
        />
      )}
    </>
  );
};

export default MyPageClient;
