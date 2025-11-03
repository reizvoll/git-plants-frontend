"use client";

import { UserItem } from "@/lib/types/api/profile";
import { formatDate } from "@/lib/utils/formatDate";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface BackgroundItemProps {
  background: UserItem;
}

const BackgroundItem = ({ background }: BackgroundItemProps) => {
  const t = useTranslations("mypage.collectionSection");
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <li className="group relative size-[60px] mb:size-[76px]">
      <button
        type="button"
        className="relative size-full mb:pointer-events-none"
        onClick={() => setShowTooltip(!showTooltip)}
        aria-label={`${background.item.name} 정보 보기`}
      >
        <Image
          src={background.item.iconUrl}
          alt={background.item.name}
          className="object-cover"
          width={76}
          height={76}
          priority
        />
      </button>
      {/* Mobile/Tablet tooltip - click to toggle */}
      {showTooltip && (
        <span
          className="shadow-emphasize absolute left-1/2 top-[-8px] z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-bg-01 px-3 py-2 text-center mb:hidden"
          onClick={() => setShowTooltip(false)}
        >
          <span className="block text-body2 text-primary-default">{background.item.name}</span>
          <span className="text-mini text-brown-500">
            {t("acquiredAt")} {formatDate(background.acquiredAt)}
          </span>
        </span>
      )}
      {/* Desktop tooltip - hover */}
      <span
        aria-hidden="true"
        className="group-hover:shadow-emphasize absolute left-1/2 top-[-8px] hidden -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center opacity-0 transition-all duration-200 group-hover:opacity-100 mb:block"
      >
        <span className="block text-body2 text-primary-default">{background.item.name}</span>
        <span className="text-mini text-brown-500">
          {t("acquiredAt")} {formatDate(background.acquiredAt)}
        </span>
      </span>
    </li>
  );
};

export default BackgroundItem;
