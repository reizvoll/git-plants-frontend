"use client";

import DotIndicators from "@/components/ui/DotIndicators";
import SlideWrapper from "@/components/ui/SlideWrapper";
import SliderNavigationButtons from "@/components/ui/SliderNavigationButtons";
import { useCurrentUpdate } from "@/lib/hooks/update/useCurrentUpdate";
import { useEmblaNavigation } from "@/lib/hooks/useEmblaNavigation";
import { useEffect, useState } from "react";
import BackgroundSectionCard from "./BackgroundSectionCard";
import BackgroundSectionCardDesktop from "./Desktop/BackgroundSectionCardDesktop";
import NewUpdatesCardDesktop from "./Desktop/NewUpdatesCardDesktop";
import PotSectionCardDesktop from "./Desktop/PotSectionCardDesktop";
import NewUpdatesCard from "./NewUpdatesCard";
import PotSectionCard from "./PotSectionCard";
import UpdateNoteModal from "./UpdateNoteModal";

const UpdateSection = () => {
  const { emblaRef: emblaRefMobile, emblaApi: emblaApiMobile } = useEmblaNavigation({ loop: false });
  const {
    emblaRef: emblaRefDesktop,
    emblaApi: emblaApiDesktop,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext
  } = useEmblaNavigation({
    loop: false
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMobile, setSelectedMobile] = useState(0);
  const [selectedDesktop, setSelectedDesktop] = useState(0);
  const { data: currentUpdate, error, isLoading } = useCurrentUpdate();

  // 모바일 선택 상태 동기화
  useEffect(() => {
    if (!emblaApiMobile) return;
    const update = () => setSelectedMobile(emblaApiMobile.selectedScrollSnap());
    update();
    emblaApiMobile.on("select", update).on("reInit", update);
  }, [emblaApiMobile]);

  // 데스크톱 선택 상태 동기화
  useEffect(() => {
    if (!emblaApiDesktop) return;
    const update = () => setSelectedDesktop(emblaApiDesktop.selectedScrollSnap());
    update();
    emblaApiDesktop.on("select", update).on("reInit", update);
  }, [emblaApiDesktop]);

  const scrollToMobile = (index: number) => emblaApiMobile?.scrollTo(index);
  const scrollToDesktop = (index: number) => emblaApiDesktop?.scrollTo(index);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  // 로딩 중이거나 에러가 있거나 데이터가 없을 때는 NewUpdatesCard만 표시
  if (isLoading || error || !currentUpdate) {
    return (
      <section aria-labelledby="updates-title" className="relative mx-auto flex w-full items-center justify-center">
        <h2 id="updates-title" className="sr-only">
          Updates Section
        </h2>
        <NewUpdatesCard isModalOpen={handleModalOpen} />
      </section>
    );
  }

  // updateNote가 없거나 newItems가 비어있을 때도 NewUpdatesCard만 표시
  if (!currentUpdate.updateNote && (!currentUpdate.newItems || currentUpdate.newItems.length === 0)) {
    return (
      <section aria-labelledby="updates-title" className="relative mx-auto flex w-full items-center justify-center">
        <h2 id="updates-title" className="sr-only">
          Updates Section
        </h2>
        {/* Mobile */}
        <div className="w-full mb:hidden">
          <NewUpdatesCard isModalOpen={handleModalOpen} />
        </div>
        {/* Desktop */}
        <div className="hidden w-full mb:block">
          <NewUpdatesCardDesktop isModalOpen={handleModalOpen} />
        </div>
      </section>
    );
  }

  // 총 슬라이드 개수 계산
  const hasBackgroundItems = currentUpdate.newItems?.some((item) => item.category === "background");
  const hasPotItems = currentUpdate.newItems?.some((item) => item.category === "pot");
  const totalSlides = 1 + (hasBackgroundItems ? 1 : 0) + (hasPotItems ? 1 : 0);

  return (
    <>
      <section aria-labelledby="updates-section" className="relative mx-auto flex w-full items-center justify-center">
        <h2 id="updates-section" className="sr-only">
          Updates Section
        </h2>

        {/* 데스크톱 화살표 버튼 */}
        <SliderNavigationButtons
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          onPrevClick={scrollPrev}
          onNextClick={scrollNext}
          showFrom="tb"
        />

        {/* 모바일 슬라이더 + Dot */}
        <div className="flex w-full flex-col items-center gap-4 mb:hidden">
          {totalSlides === 1 ? (
            <NewUpdatesCard isModalOpen={handleModalOpen} />
          ) : (
            <>
              <div
                className="w-full overflow-hidden"
                ref={emblaRefMobile}
                role="region"
                aria-roledescription="carousel"
                aria-label="업데이트 슬라이더"
              >
                <div className="flex">
                  <SlideWrapper>
                    <NewUpdatesCard isModalOpen={handleModalOpen} />
                  </SlideWrapper>

                  {hasBackgroundItems && (
                    <SlideWrapper>
                      <BackgroundSectionCard />
                    </SlideWrapper>
                  )}

                  {hasPotItems && (
                    <SlideWrapper>
                      <PotSectionCard />
                    </SlideWrapper>
                  )}
                </div>
              </div>
              <DotIndicators totalSlides={totalSlides} selectedIndex={selectedMobile} onSelect={scrollToMobile} />
            </>
          )}
        </div>

        {/* 데스크톱 슬라이더 */}
        <div className="hidden w-full mb:block">
          {totalSlides === 1 ? (
            <NewUpdatesCardDesktop isModalOpen={handleModalOpen} />
          ) : (
            <div
              className="w-full overflow-hidden"
              ref={emblaRefDesktop}
              role="region"
              aria-roledescription="carousel"
              aria-label="업데이트 슬라이더"
            >
              <div className="flex">
                <SlideWrapper>
                  <NewUpdatesCardDesktop isModalOpen={handleModalOpen} />
                </SlideWrapper>

                {hasBackgroundItems && (
                  <SlideWrapper>
                    <BackgroundSectionCardDesktop />
                  </SlideWrapper>
                )}

                {hasPotItems && (
                  <SlideWrapper>
                    <PotSectionCardDesktop />
                  </SlideWrapper>
                )}
              </div>
            </div>
          )}
          {/* Tablet Dot */}
          {totalSlides > 1 && (
            <div className="mt-4 tb:hidden">
              <DotIndicators totalSlides={totalSlides} selectedIndex={selectedDesktop} onSelect={scrollToDesktop} />
            </div>
          )}
        </div>
      </section>

      {/* Modal rendered outside carousel container */}
      {currentUpdate?.updateNote && (
        <UpdateNoteModal updateNote={currentUpdate.updateNote} isOpen={isModalOpen} onClose={handleModalClose} />
      )}
    </>
  );
};

export default UpdateSection;
