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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 로딩 중이거나 에러가 있거나 데이터가 없을 때는 NewUpdatesCard만 표시
  if (isLoading || error || !currentUpdate) {
    return (
      <>
        <div className="relative mx-auto flex w-full items-center justify-center">
          <NewUpdatesCard isModalOpen={handleModalOpen} />
        </div>
      </>
    );
  }

  // updateNote가 없거나 newItems가 비어있을 때도 NewUpdatesCard만 표시
  if (!currentUpdate.updateNote && (!currentUpdate.newItems || currentUpdate.newItems.length === 0)) {
    return (
      <>
        <div className="relative mx-auto flex w-full items-center justify-center">
          <NewUpdatesCard isModalOpen={handleModalOpen} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="relative mx-auto flex w-full items-center justify-center">
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
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex">
            <div className="flex min-w-0 flex-[0_0_100%] justify-center">
              <NewUpdatesCard isModalOpen={handleModalOpen} />
            </div>

            {/* newItems가 있을 때만 BackgroundSectionCard 표시 */}
            {currentUpdate.newItems && currentUpdate.newItems.some((item) => item.category === "background") && (
              <div className="flex min-w-0 flex-[0_0_100%] justify-center">
                <BackgroundSectionCard />
              </div>
            )}

            {/* newItems가 있을 때만 PotSectionCard 표시 */}
            {currentUpdate.newItems && currentUpdate.newItems.some((item) => item.category === "pot") && (
              <div className="flex min-w-0 flex-[0_0_100%] justify-center">
                <PotSectionCard />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal rendered outside carousel container */}
      {currentUpdate?.updateNote && (
        <UpdateNoteModal updateNote={currentUpdate.updateNote} isOpen={isModalOpen} onClose={handleModalClose} />
      )}
    </>
  );
};

export default UpdateSection;
