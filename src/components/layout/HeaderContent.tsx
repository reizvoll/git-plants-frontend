"use client";

import GearSix from "@/assets/icons/gear-six.svg";
import GithubIcon from "@/assets/icons/github";
import StoreIcon from "@/assets/icons/store";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useLanguageStore } from "@/lib/store/languageStore";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileImageCircle from "../shared/ProfileImageCircle";
import { Button } from "../ui/Button";
import Dropdown from "../ui/Dropdown";

const HeaderContent = () => {
  const { user, login, logout, isHydrated } = useAuth();
  const { language, setLanguage } = useLanguageStore();
  const t = useTranslations("navigation");
  const router = useRouter();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as "ko" | "en");
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
  };

  const currentLanguage = isHydrated ? language : "en";

  return (
    <header role="banner" className="fixed left-0 top-0 z-50 w-full bg-white">
      <section className="mx-auto flex h-20 w-full max-w-[75rem] items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-subHeading text-text-04">Git-Plants</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-4 md:gap-6">
          {user ? (
            <Link
              href="/mypage"
              className="flex h-12 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3"
            >
              <ProfileImageCircle profileImage={user.image} nickname={user.username} size={24} />
              <span className="font-pretendard text-body1 text-text-04">{user.username}</span>
            </Link>
          ) : (
            <Button
              variant="gray"
              size="md"
              className="flex h-[2.9375rem] items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-3 md:px-[2.1875rem]"
              onClick={login}
              aria-label="Sign in GitHub"
            >
              <div className="flex items-center gap-2">
                <GithubIcon width={20} height={20} className="text-text-01" aria-hidden="true" />
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
            className="text-body1"
            triggerClassName="h-[30px]"
          />

          <Link href="/shop" className="flex items-center justify-center" aria-label="Go to Shop">
            <StoreIcon width={24} height={24} className="text-text-04" aria-hidden="true" focusable="false" />
            <span className="sr-only">Go to Shop</span>
          </Link>

          {user && (
            <Dropdown
              items={[
                { label: t("mypage"), onClick: () => router.push("/mypage") },
                { label: t("logout"), onClick: logout }
              ]}
              trigger={
                <button
                  className="flex h-[1.875rem] w-[1.875rem] items-center justify-center"
                  aria-label="Settings"
                  aria-haspopup="menu"
                >
                  <GearSix className="h-[30px] w-[30px]" strokeWidth={3} aria-hidden="true" focusable="false" />
                </button>
              }
              className="text-body1 text-text-04"
            />
          )}
        </nav>
      </section>
    </header>
  );
};

export default HeaderContent;
