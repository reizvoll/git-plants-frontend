"use client";

import inventory from "@/assets/images/inventory.webp";
import { useCollectionSort, type CollectionMode, type SortType } from "@/lib/hooks/mypage/useCollectionSort";
import { useProfileStore } from "@/lib/store/profileStore";
import { useToastStore } from "@/lib/store/useToaststore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CollectionControls from "./CollectionControls";
import CollectionGrid from "./CollectionGrid";

interface CollectionSectionProps {
  initialMode?: CollectionMode;
}

const CollectionSection = ({ initialMode = "CROP" }: CollectionSectionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentMode, setCurrentMode] = useState<CollectionMode>(initialMode);
  const { items, crops } = useProfileStore();
  const addToast = useToastStore((s) => s.addToast);
  const t = useTranslations("mypage.collectionSection");

  // URL에서 정렬 상태 가져오기
  const currentSort = (searchParams.get("sort") as SortType) || "latest";

  const { sortedData, getSortOptions } = useCollectionSort({ items, crops, currentSort });
  const { backgrounds, pots, crops: ownedCrops } = sortedData;

  const handleModeChange = (mode: CollectionMode) => {
    setCurrentMode(mode);

    // 모드 변경 시 현재 정렬이 해당 모드에서 지원되지 않으면 기본값으로 초기화
    if (mode !== "CROP" && currentSort === "most_grown") {
      const params = new URLSearchParams(searchParams);
      params.delete("sort"); // 기본값(latest)으로 초기화
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  // 정렬 상태 변경 시 URL 업데이트
  const handleSortChange = (sort: SortType) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // 정렬 초기화 시 URL에서 sort 파라미터 제거
  const handleResetToDefault = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sort");
    router.push(`?${params.toString()}`, { scroll: false });
    addToast(t("resetSortMessage"), "success");
  };

  // update currentMode when initialMode changes
  useEffect(() => {
    setCurrentMode(initialMode);
  }, [initialMode]);

  const hasShownToast = useRef(false);

  useEffect(() => {
    const hasNoItems =
      (currentMode === "CROP" && ownedCrops.length === 0) ||
      (currentMode === "BACKGROUND" && backgrounds.length === 0) ||
      (currentMode === "POT" && pots.length === 0);

    if (hasNoItems && !hasShownToast.current) {
      hasShownToast.current = true;
      addToast(t("noItemMessage"), "warning");
    }
  }, [currentMode, backgrounds.length, pots.length, ownedCrops.length, addToast, t]);

  return (
    <section aria-labelledby="collection-title" className="flex w-full justify-center">
      <h2 id="collection-title" className="sr-only">
        collection
      </h2>

      <div className="relative flex w-full flex-col gap-10 rounded-2xl bg-brown-100 px-12 py-12">
        <CollectionControls
          currentMode={currentMode}
          onModeChange={handleModeChange}
          sortOptions={getSortOptions(currentMode)}
          onSortChange={handleSortChange}
          onResetSort={handleResetToDefault}
        />

        <div className="flex w-full flex-col gap-6">
          <div className="relative flex w-full flex-col">
            <Image src={inventory} alt="inventory" priority />
            <div className="absolute inset-0 flex px-9 py-9">
              <CollectionGrid mode={currentMode} backgrounds={backgrounds} pots={pots} crops={ownedCrops} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
