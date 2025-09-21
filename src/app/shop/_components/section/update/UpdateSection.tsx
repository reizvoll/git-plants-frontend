"use client";

import CaretCircleLeft from "@/assets/icons/caret-circle-left.svg";
import CaretCircleRight from "@/assets/icons/caret-circle-right.svg";
import { useCurrentUpdate } from "@/lib/hooks/update/useCurrentUpdate";
import { useEmblaNavigation } from "@/lib/hooks/useEmblaNavigation";
import { useState } from "react";
import BackgroundSectionCard from "./BackgroundSectionCard";
import NewUpdatesCard from "./NewUpdatesCard";
import PotSectionCard from "./PotSectionCard";
import UpdateNoteModal from "./UpdateNoteModal";

const UpdateSection = () => {
  const { emblaRef, canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useEmblaNavigation({ loop: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: currentUpdate, error, isLoading } = useCurrentUpdate();

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
        <NewUpdatesCard isModalOpen={handleModalOpen} />
      </section>
    );
  }

  return (
    <>
      <section aria-labelledby="updates-section" className="relative mx-auto flex w-full items-center justify-center">
        <h2 id="updates-section" className="sr-only">
          Updates Section
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
          aria-label="업데이트 슬라이더"
        >
          <div className="flex">
            <div className="flex shrink-0 basis-full justify-center">
              <NewUpdatesCard isModalOpen={handleModalOpen} />
            </div>

            {currentUpdate.newItems && currentUpdate.newItems.some((item) => item.category === "background") && (
              <div className="flex shrink-0 basis-full justify-center">
                <BackgroundSectionCard />
              </div>
            )}

            {currentUpdate.newItems && currentUpdate.newItems.some((item) => item.category === "pot") && (
              <div className="flex shrink-0 basis-full justify-center">
                <PotSectionCard />
              </div>
            )}
          </div>
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
