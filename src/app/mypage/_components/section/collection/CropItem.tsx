"use client";

import seed from "@/assets/images/seed.webp";
import { formatDate } from "@/lib/utils/formatDate";
import { Crop } from "@/lib/types/api/profile";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface CropItemProps {
  crop: Crop;
}

const CropItem = ({ crop }: CropItemProps) => {
  const t = useTranslations("mypage.collectionSection");
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <li className="group relative size-[60px] mb:size-[76px]">
      <button
        type="button"
        className="relative size-full mb:pointer-events-none"
        onClick={() => setShowTooltip(!showTooltip)}
        aria-label={`${crop.monthlyPlant.name} 정보 보기`}
      >
        <div className="relative h-full w-full">
          <Image
            src={crop.monthlyPlant.cropImageUrl}
            alt={crop.monthlyPlant.name}
            className="object-contain"
            fill
          />
        </div>
        <div className="text-border absolute -bottom-1 -right-1 flex items-center justify-center text-body1 text-white mb:text-title1">
          {crop.quantity}
        </div>
      </button>
      {/* Mobile/Tablet tooltip - click to toggle */}
      {showTooltip && (
        <span
          className="shadow-emphasize absolute left-1/2 top-[-8px] z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center justify-center whitespace-nowrap rounded-2xl bg-bg-01 px-3 py-2 text-center mb:hidden"
          onClick={() => setShowTooltip(false)}
        >
          <span className="block text-body2 text-primary-default">{crop.monthlyPlant.name}</span>
          <span className="text-mini text-brown-500">
            {t("acquiredAt", { date: formatDate(crop.createdAt) })}
          </span>
          <span className="text-mini text-brown-500">
            {t("quantity", { quantity: crop.quantity })}
          </span>
          <span className="flex items-center gap-1 text-mini text-brown-500">
            {t("price")} <Image src={seed} alt="seed" width={9} height={9} /> 10
          </span>
        </span>
      )}
      {/* Desktop tooltip - hover */}
      <span
        aria-hidden="true"
        className="group-hover:shadow-emphasize absolute left-1/2 top-[-8px] hidden -translate-x-1/2 -translate-y-full flex-col items-center justify-center whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center opacity-0 transition-all duration-200 group-hover:opacity-100 mb:flex"
      >
        <span className="block text-body2 text-primary-default">{crop.monthlyPlant.name}</span>
        <span className="text-mini text-brown-500">
          {t("acquiredAt", { date: formatDate(crop.createdAt) })}
        </span>
        <span className="text-mini text-brown-500">
          {t("quantity", { quantity: crop.quantity })}
        </span>
        {/* TODO: 판매가격 필드 추가 필요 */}
        <span className="flex items-center gap-1 text-mini text-brown-500">
          {t("price")} <Image src={seed} alt="seed" width={9} height={9} /> 10
        </span>
      </span>
    </li>
  );
};

export default CropItem;