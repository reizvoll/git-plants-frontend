"use client";

import inventory from "@/assets/images/inventory.webp";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { useProfileStore } from "@/lib/store/profileStore";
import { useToastStore } from "@/lib/store/useToaststore";
import { formatDate } from "@/lib/utils/formatDate";
import { FunnelIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

interface CollectionSectionProps {
  initialMode?: "CROP" | "BACKGROUND" | "POT";
}

const CollectionSection = ({ initialMode = "CROP" }: CollectionSectionProps) => {
  const [currentMode, setCurrentMode] = useState<"CROP" | "BACKGROUND" | "POT">(initialMode);
  const [currentSort, setCurrentSort] = useState<"LATEST" | "MOST_GROWN" | "A_Z">("LATEST");
  const { items, crops } = useProfileStore();
  const addToast = useToastStore((state) => state.addToast);

  const handleModeChange = (mode: "CROP" | "BACKGROUND" | "POT") => {
    setCurrentMode(mode);
  };

  const handleSortChange = (sort: "LATEST" | "MOST_GROWN" | "A_Z") => {
    setCurrentSort(sort);
  };

  const {
    backgrounds,
    pots,
    crops: ownedCrops
  } = useMemo(() => {
    if (!items) return { backgrounds: [], pots: [], crops: [] };

    return {
      backgrounds: items.filter((item) => item.item.category === "background"),
      pots: items.filter((item) => item.item.category === "pot"),
      crops: crops || []
    };
  }, [items, crops]);

  // update currentMode when initialMode changes
  useEffect(() => {
    setCurrentMode(initialMode);
  }, [initialMode]);

  const hasShownToast = useRef(false);

  useEffect(() => {
    const hasNoItems =
      (currentMode === "CROP" && crops.length === 0) ||
      (currentMode === "BACKGROUND" && backgrounds.length === 0) ||
      (currentMode === "POT" && pots.length === 0);

    if (hasNoItems && !hasShownToast.current) {
      hasShownToast.current = true;
      addToast("아이템을 찾을 수 없어요.", "warning");
    }
  }, [currentMode, backgrounds.length, pots.length, crops.length, addToast]);

  const renderContent = () => {
    switch (currentMode) {
      case "CROP":
        return (
          <div className="grid auto-rows-min grid-cols-10 items-start gap-[10px] leading-none">
            {ownedCrops.length > 0 &&
              ownedCrops.map((crop) => (
                <picture key={crop.id} className="group relative size-[74px]">
                  <Image
                    src={crop.monthlyPlant.cropImageUrl}
                    alt={crop.monthlyPlant.name}
                    className="object-cover"
                    width={74}
                    height={74}
                    priority
                  />
                  <div className="text-border absolute -bottom-1 -right-1 flex items-center justify-center text-title1 text-white">
                    {crop.quantity}
                  </div>
                  <span className="group-hover:shadow-emphasize absolute left-1/2 top-[-8px] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center opacity-0 transition-all duration-200 group-hover:opacity-100">
                    <span className="block text-body2 text-primary-default">{crop.monthlyPlant.name}</span>
                  </span>
                </picture>
              ))}
          </div>
        );
      case "BACKGROUND":
        return (
          <div className="grid auto-rows-min grid-cols-10 items-start gap-[10px] leading-none">
            {backgrounds.length > 0 &&
              backgrounds.map((background) => (
                <picture key={background.id} className="group relative size-[76px]">
                  <Image
                    src={background.item.iconUrl}
                    alt={background.item.name}
                    className="object-cover"
                    width={76}
                    height={76}
                    priority
                  />
                  <span className="group-hover:shadow-emphasize absolute left-1/2 top-[-8px] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center opacity-0 transition-all duration-200 group-hover:opacity-100">
                    <span className="block text-body2 text-primary-default">{background.item.name}</span>
                    <span className="text-mini text-brown-500">(획득날짜 : {formatDate(background.acquiredAt)})</span>
                  </span>
                </picture>
              ))}
          </div>
        );
      case "POT":
        return (
          <div className="grid auto-rows-min grid-cols-10 items-start gap-[18px] px-1 py-1 leading-none">
            {pots.length > 0 &&
              pots.map((pot) => (
                <picture key={pot.id} className="group relative size-[66px]">
                  <Image src={pot.item.iconUrl} alt={pot.item.name} width={66} height={66} className="object-cover" />
                  <span className="group-hover:shadow-emphasize absolute left-1/2 top-[-8px] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center opacity-0 transition-all duration-200 group-hover:opacity-100">
                    <span className="block text-body2 text-primary-default">{pot.item.name}</span>
                    <span className="text-mini text-brown-500">(획득날짜 : {formatDate(pot.acquiredAt)})</span>
                  </span>
                </picture>
              ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="relative flex w-full flex-col gap-10 rounded-2xl bg-brown-100 px-12 py-12">
        <div className="flex h-12 w-full flex-row items-start justify-between">
          <Dropdown
            items={[
              {
                label: "작물",
                onClick: () => handleModeChange("CROP"),
                active: currentMode === "CROP"
              },
              {
                label: "배경화면",
                onClick: () => handleModeChange("BACKGROUND"),
                active: currentMode === "BACKGROUND"
              },
              {
                label: "화분",
                onClick: () => handleModeChange("POT"),
                active: currentMode === "POT"
              }
            ]}
            className="font-pretendard text-body1 text-sageGreen-900"
            mode="click"
          />
          <div className="flex flex-row gap-[10px]">
            <Dropdown
              items={[
                {
                  label: "최신순",
                  onClick: () => handleSortChange("LATEST"),
                  active: currentSort === "LATEST"
                },
                {
                  label: "보유순",
                  onClick: () => handleSortChange("MOST_GROWN"),
                  active: currentSort === "MOST_GROWN"
                },
                {
                  label: "가나다순",
                  onClick: () => handleSortChange("A_Z"),
                  active: currentSort === "A_Z"
                }
              ]}
              className="font-pretendard text-body1 text-sageGreen-900"
              mode="click"
            />
            <Button
              variant="primary"
              size="md"
              className="shadow-normal flex items-center gap-2 text-body1"
              onClick={() => {}}
            >
              자동 정렬
              <FunnelIcon width={20} height={20} />
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6">
          <div className="relative flex w-full flex-col">
            <Image src={inventory} alt="inventory" priority />
            <div className="absolute inset-0 flex px-9 py-9">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
