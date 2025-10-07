"use client";

import CaretCircleLeft from "@/assets/icons/caret-circle-left.svg";
import CaretCircleRight from "@/assets/icons/caret-circle-right.svg";
import LoginRequiredModal from "@/components/shared/LoginRequiredModal";
import { useEmblaNavigation } from "@/lib/hooks/useEmblaNavigation";
import { useEffect, useState } from "react";

import ModeSectionCard from "./ModeSectionCard";
import RewardSectionCard from "./RewardSectionCard";
import SystemSectionCard from "./SystemSectionCard";
import UpdateSectionCard from "./UpdateSecionCard";

import ModeSectionCardDesktop from "./desktop/ModeSectionCardDesktop";
import RewardSectionCardDesktop from "./desktop/RewardSectionCardDesktop";
import SystemSectionCardDesktop from "./desktop/SystemSectionCardDesktop";
import UpdateSectionCardDesktop from "./desktop/UpdateSectionCardDesktop";

const TOTAL_SLIDES = 4;

// Dot Indicator component
interface DotIndicatorsProps {
  totalSlides: number;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const DotIndicators = ({ totalSlides, selectedIndex, onSelect }: DotIndicatorsProps) => (
  <div className="flex items-center justify-center gap-2" role="tablist" aria-label="slide indicators">
    {[...Array(totalSlides)].map((_, index) => (
      <button
        key={index}
        type="button"
        role="tab"
        aria-selected={index === selectedIndex}
        aria-label={`move to slide ${index + 1}`}
        className={`h-2 w-2 rounded-full transition-all ${
          index === selectedIndex ? "w-6 bg-sageGreen-800" : "bg-line-03"
        }`}
        onClick={() => onSelect(index)}
      />
    ))}
  </div>
);

// Slide Wrapper component
const SlideWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex shrink-0 basis-full justify-center">{children}</div>
);

const FeatureSection = () => {
  const { emblaRef: emblaRefMobile, emblaApi: emblaApiMobile } = useEmblaNavigation({ loop: false });
  const {
    emblaRef: emblaRefDesktop,
    emblaApi: emblaApiDesktop,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext
  } = useEmblaNavigation({ loop: false });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedMobile, setSelectedMobile] = useState(0);
  const [selectedDesktop, setSelectedDesktop] = useState(0);

  // Mobile 선택 상태 동기화
  useEffect(() => {
    if (!emblaApiMobile) return;
    const update = () => setSelectedMobile(emblaApiMobile.selectedScrollSnap());
    update();
    emblaApiMobile.on("select", update).on("reInit", update);
  }, [emblaApiMobile]);

  // Desktop 선택 상태 동기화
  useEffect(() => {
    if (!emblaApiDesktop) return;
    const update = () => setSelectedDesktop(emblaApiDesktop.selectedScrollSnap());
    update();
    emblaApiDesktop.on("select", update).on("reInit", update);
  }, [emblaApiDesktop]);

  const scrollToMobile = (index: number) => emblaApiMobile?.scrollTo(index);
  const scrollToDesktop = (index: number) => emblaApiDesktop?.scrollTo(index);
  const handleLoginRequired = () => setIsLoginModalOpen(true);

  return (
    <section
      className="relative mx-auto flex w-full max-w-[1000px] items-center justify-center"
      aria-labelledby="feature-title"
    >
      <h2 id="feature-title" className="sr-only">
        feature introduction
      </h2>

      {/* Desktop 화살표 버튼 */}
      <button
        className={`absolute left-0 z-10 hidden text-text-03 transition-opacity tb:block ${
          !canScrollPrev ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="previous slide"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <CaretCircleLeft className="h-12 w-12" />
      </button>

      <button
        className={`absolute right-0 z-10 hidden text-text-03 transition-opacity tb:block ${
          !canScrollNext ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="next slide"
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <CaretCircleRight className="h-12 w-12" />
      </button>

      {/* Mobile 슬라이더 + Dot */}
      <div className="flex w-full flex-col items-center gap-4 mb:hidden">
        <div
          className="w-full overflow-hidden"
          ref={emblaRefMobile}
          role="region"
          aria-roledescription="carousel"
          aria-label="feature card slider"
        >
          <div className="flex w-full">
            <SlideWrapper>
              <ModeSectionCard />
            </SlideWrapper>
            <SlideWrapper>
              <RewardSectionCard />
            </SlideWrapper>
            <SlideWrapper>
              <SystemSectionCard onLoginRequired={handleLoginRequired} />
            </SlideWrapper>
            <SlideWrapper>
              <UpdateSectionCard />
            </SlideWrapper>
          </div>
        </div>
        <DotIndicators totalSlides={TOTAL_SLIDES} selectedIndex={selectedMobile} onSelect={scrollToMobile} />
      </div>

      {/* Desktop 슬라이더 */}
      <div className="hidden w-full mb:block">
        <div
          className="w-full overflow-hidden"
          ref={emblaRefDesktop}
          role="region"
          aria-roledescription="carousel"
          aria-label="feature card slider"
        >
          <div className="flex w-full">
            <SlideWrapper>
              <ModeSectionCardDesktop />
            </SlideWrapper>
            <SlideWrapper>
              <RewardSectionCardDesktop />
            </SlideWrapper>
            <SlideWrapper>
              <SystemSectionCardDesktop onLoginRequired={handleLoginRequired} />
            </SlideWrapper>
            <SlideWrapper>
              <UpdateSectionCardDesktop />
            </SlideWrapper>
          </div>
        </div>
        {/* Tablet Dot */}
        <div className="mt-4 tb:hidden">
          <DotIndicators totalSlides={TOTAL_SLIDES} selectedIndex={selectedDesktop} onSelect={scrollToDesktop} />
        </div>
      </div>

      <LoginRequiredModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </section>
  );
};

export default FeatureSection;
