"use client";

import SquaresFour from "@/assets/icons/squares-four.svg";
import inventoryEight from "@/assets/images/inventory-lg.webp";
import inventorySix from "@/assets/images/inventory-md.webp";
import inventoryFour from "@/assets/images/inventory-sm.webp";
import inventoryTen from "@/assets/images/inventory-xl.webp";
import { Button } from "@/components/ui/Button";
import { useBreakpoint } from "@/lib/hooks/common/useBreakpoints";
import { useCollectionSort, type CollectionMode, type SortType } from "@/lib/hooks/mypage/useCollectionSort";
import { useProfileStore } from "@/lib/store/profileStore";
import { useToastStore } from "@/lib/store/useToaststore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CollectionModal from "../../modal/CollectionModal";
import CollectionControls from "./CollectionControls";
import CollectionGrid from "./CollectionGrid";

interface CollectionSectionProps {
  initialMode?: CollectionMode;
}

const CollectionSection = ({ initialMode = "CROP" }: CollectionSectionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentMode, setCurrentMode] = useState<CollectionMode>(initialMode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items, crops } = useProfileStore();
  const addToast = useToastStore((s) => s.addToast);
  const t = useTranslations("mypage.collectionSection");
  const breakpoint = useBreakpoint();

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

  const shownToastModes = useRef<Set<CollectionMode>>(new Set());

  // prop 동기화
  useEffect(() => {
    setCurrentMode(initialMode);
  }, [initialMode]);

  // breakpoint 기반 UI 반응
  useEffect(() => {
    if (breakpoint !== "mobile" && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [breakpoint, isModalOpen]);

  useEffect(() => {
    if (breakpoint === "mobile") return;

    const items = { CROP: ownedCrops, BACKGROUND: backgrounds, POT: pots }[currentMode];
    if (items.length === 0 && !shownToastModes.current.has(currentMode)) {
      shownToastModes.current.add(currentMode);
      addToast(t("noItemMessage"), "warning");
    }
  }, [currentMode]);

  return (
    <section aria-labelledby="collection-title" className="flex w-full justify-center">
      <h2 id="collection-title" className="sr-only">
        collection
      </h2>

      {/* Mobile - 안내 문구와 버튼만 표시 */}
      <div className="relative flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-brown-100 px-3 py-8 xs:gap-6 xs:px-4 xs:py-12 mb:hidden">
        <p className="whitespace-pre-line text-center font-pretendard text-mini leading-relaxed text-text-03 xs:text-caption s:text-body1">
          {t("mobileNotice")}
        </p>
        <Button
          variant="primary"
          className="flex items-center gap-2 px-4 py-2.5 text-mini xs:text-caption s:px-6 s:py-3 s:text-body1"
          onClick={() => setIsModalOpen(true)}
        >
          {t("viewCollection")}
          <SquaresFour className="h-4 w-4 fill-white s:h-6 s:w-6" />
        </Button>
      </div>

      {/* 모바일 전용 모달 */}
      <CollectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Tablet & Desktop Layout */}
      <div className="relative hidden w-full flex-col gap-5 rounded-2xl bg-brown-100 px-4 py-5 mb:flex mb:gap-10 mb:px-12 mb:py-12">
        <CollectionControls
          currentMode={currentMode}
          onModeChange={handleModeChange}
          sortOptions={getSortOptions(currentMode)}
          onSortChange={handleSortChange}
          onResetSort={handleResetToDefault}
        />

        {/* 픽셀 프레임 이미지 + CSS 그리드 */}
        <div className="relative w-full">
          {/* 프레임 이미지 */}
          <Image src={inventoryFour} alt="inventory" priority className="w-full ml:hidden" />
          <Image src={inventorySix} alt="inventory" priority className="hidden w-full ml:block tb:hidden" />
          <Image src={inventoryEight} alt="inventory" priority className="hidden w-full tb:block lt:hidden" />
          <Image src={inventoryTen} alt="inventory" priority className="hidden w-full lt:block" />
          {/* CSS 그리드 오버레이 */}
          <div className="absolute inset-0 p-[10%] ml:p-[8%] tb:p-[6%] lt:p-[4%]">
            <CollectionGrid mode={currentMode} backgrounds={backgrounds} pots={pots} crops={ownedCrops} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
