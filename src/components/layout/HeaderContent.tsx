"use client";

import GithubIcon from "@/assets/images/github";
import StoreIcon from "@/assets/images/store";
import { GearSixIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Button } from "../ui/Button";

const HeaderContent = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-20 w-full max-w-[75rem] items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-subHeading font-galmuri leading-[3rem] tracking-[-0.0025em] text-text-04">
            Git-Plants
          </span>
        </Link>
        {/* User/Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Login Button */}
          <Button
            asChild
            variant="whiteLine"
            size="md"
            className="flex h-[2.9375rem] items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-3 md:px-[2.1875rem]"
          >
            <Link href="/login" className="flex items-center gap-2">
              <GithubIcon className="h-5 w-5" />
              <span className="hidden text-body1 text-white md:flex">로그인</span>
            </Link>
          </Button>
          {/* Language */}
          <div className="hidden h-6 items-center justify-center px-2 md:flex">
            <span className="text-base font-galmuri font-normal leading-6 tracking-[-0.0015em] text-text-04">
              한국어
            </span>
          </div>
          {/* Store Icon */}
          <button className="flex h-[1.875rem] w-[1.875rem] items-center justify-center" aria-label="스토어">
            <StoreIcon className="h-[1.875rem] w-[1.875rem] text-text-04" />
          </button>
          {/* Gear Icon */}
          <button className="flex h-[1.875rem] w-[1.875rem] items-center justify-center" aria-label="설정">
            <GearSixIcon size={30} weight="regular" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderContent;
