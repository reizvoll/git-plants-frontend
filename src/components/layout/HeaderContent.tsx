"use client";

import GithubIcon from "@/assets/icons/github";
import StoreIcon from "@/assets/icons/store";
import { useAuthStore } from "@/lib/store/authStore";
import { GearSixIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect } from "react";
import ProfileImageCircle from "../shared/ProfileImageCircle";
import { Button } from "../ui/Button";
import Dropdown from "../ui/Dropdown";

const HeaderContent = () => {
  const { user, login, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
            <div className="border-747474 flex h-12 items-center justify-center gap-2 rounded-lg border bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <ProfileImageCircle profileImage={user.image} nickname={user.username} size={24} />
                <span className="font-pretendard text-body1 text-text-04">{user.username}</span>
              </div>
            </div>
          ) : (
            <Button
              variant="gray"
              size="md"
              className="flex h-[2.9375rem] items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-3 md:px-[2.1875rem]"
              onClick={login}
            >
              <div className="flex items-center gap-2">
                <GithubIcon className="text-text-01" width={20} height={20} />
                <span className="hidden text-body1 text-white md:flex">로그인</span>
              </div>
            </Button>
          )}
          {/* Language */}
          <div className="hidden h-6 items-center justify-center px-2 md:flex">
            <Dropdown
              items={[{ label: "English" }, { label: "한국어", active: true }]}
              className="font-galmuri text-body1"
            />
          </div>
          {/* Store Icon */}
          <button className="flex h-[1.875rem] w-[1.875rem] items-center justify-center" aria-label="스토어">
            <StoreIcon className="h-[1.875rem] w-[1.875rem] text-text-04" />
          </button>
          {/* Gear Icon */}
          <button className="flex h-[1.875rem] w-[1.875rem] items-center justify-center" aria-label="설정">
            <GearSixIcon size={30} className="[stroke-width:3]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;
