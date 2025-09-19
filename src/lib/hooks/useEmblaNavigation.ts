import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

/**
 * Embla Carousel 네비게이션 훅
 * 이전/다음 버튼과 상태 관리를 제공합니다
 */
export function useEmblaNavigation(options: EmblaOptionsType = { loop: false }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const updateScrollButtons = useCallback(() => {
    if (emblaApi) {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      updateScrollButtons();
      emblaApi.on("select", updateScrollButtons);
      emblaApi.on("reInit", updateScrollButtons);
    }
  }, [emblaApi, updateScrollButtons]);

  return {
    emblaRef,
    emblaApi,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext
  };
}
