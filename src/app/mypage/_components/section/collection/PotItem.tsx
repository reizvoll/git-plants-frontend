"use client";

import { formatDate } from "@/lib/utils/formatDate";
import { UserItem } from "@/lib/types/api/profile";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface PotItemProps {
  pot: UserItem;
}

const PotItem = ({ pot }: PotItemProps) => {
  const t = useTranslations("mypage.collectionSection");
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <li className="group relative size-[52px] mb:size-[66px]">
      <button
        type="button"
        className="relative size-full mb:pointer-events-none"
        onClick={() => setShowTooltip(!showTooltip)}
        aria-label={`${pot.item.name} 정보 보기`}
      >
        <Image src={pot.item.iconUrl} alt={pot.item.name} width={66} height={66} className="object-cover" />
      </button>
      {/* Mobile/Tablet tooltip - click to toggle */}
      {showTooltip && (
        <span
          className="shadow-emphasize absolute left-1/2 top-[-8px] z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-bg-01 px-3 py-2 text-center mb:hidden"
          onClick={() => setShowTooltip(false)}
        >
          <span className="block text-body2 text-primary-default">{pot.item.name}</span>
          <span className="text-mini text-brown-500">
            {t("acquiredAt")} {formatDate(pot.acquiredAt)}
          </span>
        </span>
      )}
      {/* Desktop tooltip - hover */}
      <span
        aria-hidden="true"
        className="group-hover:shadow-emphasize absolute left-1/2 top-[-8px] hidden -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center opacity-0 transition-all duration-200 group-hover:opacity-100 mb:block"
      >
        <span className="block text-body2 text-primary-default">{pot.item.name}</span>
        <span className="text-mini text-brown-500">
          {t("acquiredAt")} {formatDate(pot.acquiredAt)}
        </span>
      </span>
    </li>
  );
};

export default PotItem;