"use client";

import { CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ModeSectionCard from "./ModeSectionCard";
import RewardSectionCard from "./RewardSectionCard";
import SystemSectionCard from "./SystemSectionCard";
import UpdateSectionCard from "./UpdateSecionCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeatureSlider = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative mx-auto flex w-full max-w-[1000px] items-center justify-center">
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
          <ModeSectionCard />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <RewardSectionCard />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <SystemSectionCard />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <UpdateSectionCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FeatureSlider;
