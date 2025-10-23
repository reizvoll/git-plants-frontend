"use client";

import ArrowUp from "@/assets/icons/arrow-up.svg";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

type ScrollTopButtonProps = {
  useFlexLayout?: boolean;
  extraBottomOffset?: number;
  isFloatingOpen?: boolean;
};

const ScrollTopButton = ({
  useFlexLayout = false,
  extraBottomOffset = 0,
  isFloatingOpen = false
}: ScrollTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false); // 애니메이션 효과를 위한 상태 (초기에는 true로 설정)

  // 스크롤 상태를 확인하여 버튼 표시 여부 결정
  const handleScroll = useCallback(() => {
    if (window.scrollY > 200) {
      // 200px 이상 스크롤 시 버튼 표시
      if (!isVisible) {
        setIsVisible(true);
        setAnimateIn(true);
        setTimeout(() => {
          setAnimateIn(false);
        }, 50);
      }
    } else {
      setIsVisible(false);
      setAnimateIn(false);
    }
  }, [isVisible]);

  // 컴포넌트 마운트될 때 스크롤 상태 바로 확인
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // isFloatingOpen이 true면 렌더링하지 않음 (조건부 렌더링, 모든 hook 호출 이후에 하기)
  if (isFloatingOpen) return null;

  // 최상단으로 이동 + 포커스 제거
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    (document.activeElement as HTMLElement)?.blur();
  };

  const buttonInlineStyle = isVisible
    ? {
        opacity: 1, // 나타날 때
        transform: animateIn ? "translateY(3rem)" : "translateY(0)",
        transition: "transform 0.4s ease-out, opacity 0.3s ease"
      }
    : {
        opacity: 0, // 사라질 때
        transform: "translateY(0)",
        transition: "opacity 0.3s ease"
      };

  return (
    <div
      className={clsx("z-40 h-fit w-fit", {
        // 단독 사용 시 FloatingButton과 동일한 위치 적용
        "fixed bottom-12 right-4 xs:right-6 sm:right-8 tb:right-12 lt:right-[6.875rem]": !useFlexLayout,

        // 부모가 flex 레이아웃일 때는 relative 적용
        relative: useFlexLayout
      })}
      style={useFlexLayout ? { bottom: `${12 + extraBottomOffset}px` } : {}}
    >
      <button
        onClick={scrollToTop}
        style={buttonInlineStyle}
        className={clsx(
          "shadow-strong flex items-center justify-center rounded-full bg-sageGreen-700 text-bg-01 focus:outline-none [@media(hover:hover)]:hover:bg-sageGreen-500",
          "h-[3rem] w-[3rem] mb:h-[3.5rem] mb:w-[3.5rem] tb:h-[4rem] tb:w-[4rem]"
        )}
        aria-label="최상단으로 이동"
      >
        <ArrowUp className="h-4 w-4 mb:h-5 mb:w-5 tb:h-6 tb:w-6" strokeWidth={3} />
      </button>
    </div>
  );
};

export default ScrollTopButton;
