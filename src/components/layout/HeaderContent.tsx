"use client";

import GithubIcon from "@/assets/icons/github";
import StoreIcon from "@/assets/icons/store";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useLanguageStore } from "@/lib/store/languageStore";
import { GearSixIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileImageCircle from "../shared/ProfileImageCircle";
import { Button } from "../ui/Button";
import Dropdown from "../ui/Dropdown";

const HeaderContent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { language, setLanguage } = useLanguageStore();
  const t = useTranslations("navigation");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as "ko" | "en");

    // 모든 언어에 대해 URL 파라미터 사용
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);

    // 새로고침으로 서버사이드에서 새 언어로 렌더링
    window.location.href = url.toString();
  };

  // 서버 사이드 렌더링 시에는 기본값 'en'을 사용
  const currentLanguage = mounted ? language : "en";

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-20 w-full max-w-[75rem] items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-galmuri text-subHeading text-text-04">Git-Plants</span>
        </Link>
        {/* User/Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* User Info or Login Button */}
          {user ? (
            <button
              className="flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3"
              onClick={() => router.push("/mypage")}
            >
              <div className="flex items-center gap-2">
                <ProfileImageCircle profileImage={user.image} nickname={user.username} size={24} />
                <span className="font-pretendard text-body1 text-text-04">{user.username}</span>
              </div>
            </button>
          ) : (
            <Button
              variant="gray"
              size="md"
              className="flex h-[2.9375rem] items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-3 md:px-[2.1875rem]"
              onClick={login}
            >
              <div className="flex items-center gap-2">
                <GithubIcon width={20} height={20} className="text-text-01" />
                <span className="hidden text-body1 text-white md:flex">{t("login")}</span>
              </div>
            </Button>
          )}
          {/* Language */}
          <Dropdown
            items={[
              { label: "English", onClick: () => handleLanguageChange("en"), active: currentLanguage === "en" },
              { label: "한국어", onClick: () => handleLanguageChange("ko"), active: currentLanguage === "ko" }
            ]}
            className="font-galmuri text-body1"
            triggerClassName="h-[30px]"
          />
          {/* Store Icon */}
          <Link href="/shop" className="flex items-center justify-center">
            <StoreIcon width={24} height={24} className="text-text-04" />
          </Link>
          {/* Gear Icon */}
          {user && (
            <Dropdown
              items={[
                { label: t("mypage"), onClick: () => router.push("/mypage") },
                { label: t("logout"), onClick: logout }
              ]}
              trigger={
                <button className="flex h-[1.875rem] w-[1.875rem] items-center justify-center" aria-label="설정">
                  <GearSixIcon size={30} className="[stroke-width:3]" />
                </button>
              }
              className="font-galmuri text-body1 text-text-04"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;
