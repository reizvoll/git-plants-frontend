"use client";

import SquaresFour from "@/assets/icons/squares-four.svg";
import inventory from "@/assets/images/inventory.webp";
import { Button } from "@/components/ui/Button";
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

  // 화면 크기가 mb(480px) 이상이 되면 모달 자동 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 480 && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isModalOpen]);

  const hasShownToast = useRef(false);

  useEffect(() => {
    // mb 이상(태블릿/데스크톱)에서만 토스트 표시
    if (typeof window !== "undefined" && window.innerWidth < 480) {
      return;
    }

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

        <div className="flex w-full flex-col gap-4 mb:gap-6">
          <div className="relative flex w-full flex-col">
            <Image src={inventory} alt="inventory" priority />
            <div className="absolute inset-0 flex px-5 py-5 mb:px-9 mb:py-9">
              <CollectionGrid mode={currentMode} backgrounds={backgrounds} pots={pots} crops={ownedCrops} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
