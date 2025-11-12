import { SHOP_ITEMS_LIMIT } from "@/lib/constants/constants";
import { useEmblaNavigation } from "@/lib/hooks/common/useEmblaNavigation";
import { useResponsiveLimit } from "@/lib/hooks/common/useResponsiveLimit";
import { useCallback, useEffect, useState } from "react";

interface UseEmblaSliderOptions {
  breakpoints?: {
    xs?: number;
    s?: number;
    sm?: number;
    mb?: number;
    ml?: number;
    tb?: number;
    lt?: number;
    xl?: number;
  };
}

export const useEmblaSlider = <T>(items: T[], options?: UseEmblaSliderOptions) => {
  const { breakpoints = SHOP_ITEMS_LIMIT.MOBILE } = options || {};
  const [currentPage, setCurrentPage] = useState(1);

  // 반응형 limit 훅
  const limit = useResponsiveLimit(breakpoints);

  // Embla 캐러셀
  const { emblaRef, emblaApi } = useEmblaNavigation({ loop: false, align: "start" });

  // Embla 선택 시 페이지 업데이트
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentPage(emblaApi.selectedScrollSnap() + 1);
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(newPage - 1);
      }
    },
    [emblaApi]
  );

  // 아이템을 limit 크기로 그룹화
  const groupedItems: T[][] = [];
  for (let i = 0; i < items.length; i += limit) {
    groupedItems.push(items.slice(i, i + limit));
  }

  const totalPages = groupedItems.length;

  return {
    emblaRef,
    currentPage,
    limit,
    groupedItems,
    totalPages,
    handlePageChange
  };
};
