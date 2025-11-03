"use client";

import useLockScroll from "@/lib/hooks/common/useLockScroll";
import clsx from "clsx";
import { useRef, useState, type MouseEvent, type ReactNode, type TouchEvent } from "react";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

const BottomSheet = ({ isOpen, onClose, children, className }: Props) => {
  useLockScroll(isOpen);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const startY = useRef(0);

  if (!isOpen) {
    if (hasAnimated) setHasAnimated(false);
    return null;
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const diff = e.touches[0].clientY - startY.current;

    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (translateY > 100) {
      onClose();
    }

    setTranslateY(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 animate-fadeIn"
      onMouseDown={handleOverlayClick}
    >
      <div
        className={clsx(
          "relative w-full rounded-t-2xl bg-bg-01 px-5 py-6 shadow-lg",
          !hasAnimated && "animate-slideIn",
          className
        )}
        style={{
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onAnimationEnd={() => setHasAnimated(true)}
      >
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-gray-300" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
