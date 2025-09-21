"use client";

import CaretCircleLeft from "@/assets/icons/caret-circle-left.svg";
import CaretCircleRight from "@/assets/icons/caret-circle-right.svg";
import { useEmblaNavigation } from "@/lib/hooks/useEmblaNavigation";
import ModeSectionCard from "./ModeSectionCard";
import RewardSectionCard from "./RewardSectionCard";
import SystemSectionCard from "./SystemSectionCard";
import UpdateSectionCard from "./UpdateSecionCard";

const FeatureSection = () => {
  const { emblaRef, canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useEmblaNavigation({ loop: false });

  return (
    <section
      className="relative mx-auto flex w-full max-w-[1000px] items-center justify-center"
      aria-labelledby="feature-title"
    >
      <h2 id="feature-title" className="sr-only">
        기능 소개
      </h2>

      <button
        className={`absolute left-0 z-10 text-text-03 transition-opacity ${
          !canScrollPrev ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="이전 슬라이드"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <CaretCircleLeft className="h-12 w-12" />
      </button>

      <button
        className={`absolute right-0 z-10 text-text-03 transition-opacity ${
          !canScrollNext ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="다음 슬라이드"
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <CaretCircleRight className="h-12 w-12" />
      </button>

      <div
        className="w-full overflow-hidden"
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="기능 카드 슬라이더"
      >
        <div className="flex w-full">
          <div className="flex shrink-0 basis-full justify-center">
            <ModeSectionCard />
          </div>
          <div className="flex shrink-0 basis-full justify-center">
            <RewardSectionCard />
          </div>
          <div className="flex shrink-0 basis-full justify-center">
            <SystemSectionCard />
          </div>
          <div className="flex shrink-0 basis-full justify-center">
            <UpdateSectionCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
