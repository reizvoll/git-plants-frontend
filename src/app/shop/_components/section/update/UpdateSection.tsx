"use client";

import { CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NewUpdatesCard from "./NewUpdatesCard";

// Import Swiper styles
import { useCurrentUpdateStore } from "@/lib/store/currentUpdateStore";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BackgroundSectionCard from "./BackgroundSectionCard";
import PotSectionCard from "./PotSectionCard";
import UpdateNoteModal from "./UpdateNoteModal";

const UpdateSection = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: currentUpdate, error, isLoading } = useCurrentUpdateStore();

  // UpdateSection에서 한 번만 API 호출
  useEffect(() => {
    const updateState = useCurrentUpdateStore.getState();
    updateState.fetchCurrentUpdate();
  }, []);

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
        {/* Custom Navigation Buttons */}
        <button
          className={`feature-swiper-prev absolute left-0 z-10 text-text-03 ${
            isBeginning ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-label="이전 슬라이드"
          disabled={isBeginning}
        >
          <CaretCircleLeftIcon size={48} />
        </button>
        <button
          className={`feature-swiper-next absolute right-0 z-10 text-text-03 ${
            isEnd ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-label="다음 슬라이드"
          disabled={isEnd}
        >
          <CaretCircleRightIcon size={48} />
        </button>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation={{
            prevEl: ".feature-swiper-prev",
            nextEl: ".feature-swiper-next"
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          onFromEdge={() => {
            setIsBeginning(false);
            setIsEnd(false);
          }}
          className="feature-swiper w-full"
        >
          <SwiperSlide className="flex justify-center">
            <NewUpdatesCard isModalOpen={handleModalOpen} />
          </SwiperSlide>

          {/* newItems가 있을 때만 BackgroundSectionCard 표시 */}
          {currentUpdate.newItems && currentUpdate.newItems.some((item) => item.category === "background") && (
            <SwiperSlide className="flex justify-center">
              <BackgroundSectionCard />
            </SwiperSlide>
          )}

          {/* newItems가 있을 때만 PotSectionCard 표시 */}
          {currentUpdate.newItems && currentUpdate.newItems.some((item) => item.category === "pot") && (
            <SwiperSlide className="flex justify-center">
              <PotSectionCard />
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Modal rendered outside Swiper container */}
      {currentUpdate?.updateNote && (
        <UpdateNoteModal updateNote={currentUpdate.updateNote} isOpen={isModalOpen} onClose={handleModalClose} />
      )}
    </>
  );
};

export default UpdateSection;
