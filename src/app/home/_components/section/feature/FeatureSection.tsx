"use client";

import { useEmblaNavigation } from "@/lib/hooks/useEmblaNavigation";
import { CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react";
import ModeSectionCard from "./ModeSectionCard";
import RewardSectionCard from "./RewardSectionCard";
import SystemSectionCard from "./SystemSectionCard";
import UpdateSectionCard from "./UpdateSecionCard";

const FeatureSection = () => {
  const { emblaRef, canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useEmblaNavigation({ loop: false });

  return (
    <section className="relative mx-auto flex w-full max-w-[1000px] items-center justify-center" aria-label="기능 소개">
      <button
        className={`absolute left-0 z-10 text-text-03 transition-opacity ${
          !canScrollPrev ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="이전 슬라이드"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <CaretCircleLeftIcon size={48} />
      </button>
      <button
        className={`absolute right-0 z-10 text-text-03 transition-opacity ${
          !canScrollNext ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="다음 슬라이드"
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <CaretCircleRightIcon size={48} />
      </button>
      <div className="w-full overflow-hidden" ref={emblaRef} role="region" aria-label="기능 카드 슬라이더">
        <div className="flex">
          <div className="flex min-w-0 flex-[0_0_100%] justify-center">
            <ModeSectionCard />
          </div>
          <div className="flex min-w-0 flex-[0_0_100%] justify-center">
            <RewardSectionCard />
          </div>
          <div className="flex min-w-0 flex-[0_0_100%] justify-center">
            <SystemSectionCard />
          </div>
          <div className="flex min-w-0 flex-[0_0_100%] justify-center">
            <UpdateSectionCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
