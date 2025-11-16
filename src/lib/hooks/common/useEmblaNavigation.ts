import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook for Embla Carousel navigation
 * Provides previous/next button controls and scroll state management
 * @param options - Embla carousel options (default: { loop: false })
 * @returns Embla ref, API, scroll state, and navigation handlers
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
