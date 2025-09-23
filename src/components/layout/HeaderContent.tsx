"use client";

import GearSix from "@/assets/icons/gear-six.svg";
import GithubIcon from "@/assets/icons/github";
import List from "@/assets/icons/list.svg";
import StoreIcon from "@/assets/icons/store";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useLanguageStore } from "@/lib/store/languageStore";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ProfileImageCircle from "../shared/ProfileImageCircle";
import { Button } from "../ui/Button";
import Dropdown from "../ui/Dropdown";

const HeaderContent = () => {
  const { user, login, logout, isHydrated } = useAuth();
  const { language, setLanguage } = useLanguageStore();
  const t = useTranslations("navigation");
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageToggle = () => {
    const newLang = language === "ko" ? "en" : "ko";
    setLanguage(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.location.href = url.toString();
  };

  const currentLanguage = isHydrated ? language : "en";
  const isOnMypage = pathname === "/mypage";

  const menuItems = user
    ? [
        {
          label: currentLanguage === "ko" ? "한국어" : "English",
          onClick: handleLanguageToggle
        },
        {
          label: "Shop",
          onClick: () => router.push("/shop")
        },
        {
          label: isOnMypage ? t("home") : t("mypage"),
          onClick: () => router.push(isOnMypage ? "/" : "/mypage")
        },
        {
          label: t("logout"),
          onClick: logout
        }
      ]
    : [
        {
          label: currentLanguage === "ko" ? "한국어" : "English",
          onClick: handleLanguageToggle
        },
        {
          label: "Shop",
          onClick: () => router.push("/shop")
        }
      ];

  return (
    <header
      role="banner"
      className="fixed left-0 top-0 z-50 w-full bg-white"
      style={{ "--header-h": "clamp(60px, 15vw, 80px)" } as React.CSSProperties}
    >
      <section
        className="mx-auto flex w-full max-w-full items-center justify-between px-3 xs:px-4 sm:px-6 tb:max-w-[75rem] tb:px-8"
        style={{ height: "var(--header-h)" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="whitespace-nowrap text-body1 xs:text-title2 sm:text-title1 mb:text-subHeading tb:text-subHeading">
            Git-Plants
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 tb:flex">
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
              className="flex h-[2.9375rem] items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-3 text-title2 md:px-[2.1875rem]"
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
              { label: "English", onClick: handleLanguageToggle, active: currentLanguage === "en" },
              { label: "한국어", onClick: handleLanguageToggle, active: currentLanguage === "ko" }
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

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 tb:hidden">
          {/* GitHub Login Button (only if not logged in) */}
          {!user && (
            <Button
              variant="gray"
              size="sm"
              className="flex aspect-square items-center justify-center rounded-lg bg-gray-800 p-2 xs:p-2.5 sm:p-3"
              onClick={login}
              aria-label="Sign in GitHub"
            >
              <GithubIcon
                width={16}
                height={16}
                className="text-text-01 xs:h-4 xs:w-4 sm:h-4 sm:w-4"
                aria-hidden="true"
              />
            </Button>
          )}

          {/* User Profile (if logged in) */}
          {user && (
            <Link href="/mypage">
              <ProfileImageCircle
                profileImage={user.image}
                nickname={user.username}
                size={28}
                className="flex-shrink-0 border border-gray-100 xs:h-8 xs:w-8 sm:h-9 sm:w-9"
              />
            </Link>
          )}

          {/* Hamburger Menu */}
          <Dropdown
            items={menuItems.map((item) => ({
              label: item.label,
              onClick: item.onClick
            }))}
            trigger={
              <button
                className="flex items-center justify-center rounded-lg p-1.5 hover:bg-gray-100 xs:p-2 sm:p-2"
                aria-label="Menu"
                aria-haspopup="menu"
              >
                <List className="h-5 w-5 text-text-04 xs:h-5 xs:w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              </button>
            }
            className="text-body1 text-text-04"
          />
        </div>
      </section>
    </header>
  );
};

export default HeaderContent;
