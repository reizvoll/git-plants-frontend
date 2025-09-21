"use client";

import LoadingText from "@/components/shared/LoadingText";
import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useProfile } from "@/lib/hooks/mypage/useProfile";
import { useProfileStore } from "@/lib/store/profileStore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import BadgeNotificationModal from "./BadgeNotificationModal";
import SelectTab from "./SelectTab";
import UserInfo from "./UserInfo";

const MyPageClient = () => {
  const { isLoading: authLoading, isAuthenticated } = useAuth(true); // requireAuth: true
  const { data: profileData, isLoading: profileLoading, error } = useProfile(isAuthenticated);
  const { newBadges, setProfileData, clearNewBadges } = useProfileStore();
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
  const t = useTranslations("mypage");

  // TanStack Query -> Zustand 동기화
  useEffect(() => {
    if (profileData && isAuthenticated) {
      setProfileData(profileData);
    }
  }, [profileData, isAuthenticated, setProfileData]);

  // 신규 뱃지 알림 제어
  useEffect(() => {
    if (newBadges && newBadges.length > 0 && !profileLoading) {
      setShowBadgeNotification(true);
      setCurrentBadgeIndex(0);
    }
  }, [newBadges, profileLoading]);

  const handleCloseBadgeNotification = () => {
    setShowBadgeNotification(false);
    if (newBadges && currentBadgeIndex < newBadges.length - 1) {
      setCurrentBadgeIndex((prev) => prev + 1);
      setTimeout(() => setShowBadgeNotification(true), 100);
    } else {
      clearNewBadges();
      setCurrentBadgeIndex(0);
    }
  };

  if (profileLoading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-03" role="status" aria-live="polite">
        <LoadingText text={t("loading")} className="text-subHeading text-primary-default" />
      </div>
    );
  }

  if (error) {
    throw error; // pass to the global error
  }

  const currentBadge = newBadges && newBadges.length > 0 ? newBadges[currentBadgeIndex] : null;

  return (
    <>
      <main aria-labelledby="mypage-title" className="relative w-full bg-bg-03">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-16 px-8 pb-48 pt-20">
          <h1 id="mypage-title" className="sr-only">
            My Page
          </h1>

          <section aria-labelledby="mypage-userinfo-heading" className="w-full">
            <h2 id="mypage-userinfo-heading" className="sr-only">
              User information
            </h2>
            <UserInfo />
          </section>

          <nav aria-label="Tab navigation" className="w-full">
            <SelectTab />
          </nav>
        </div>
      </main>

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
