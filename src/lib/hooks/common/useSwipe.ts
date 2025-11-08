import { useState } from "react";

interface UseSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minSwipeDistance?: number;
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight, minSwipeDistance = 50 }: UseSwipeProps) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      setSwipeDirection("left");
      setIsTransitioning(true);
      setTimeout(() => {
        onSwipeLeft();
        setTimeout(() => {
          setIsTransitioning(false);
          setSwipeDirection(null);
        }, 50);
      }, 300);
    }

    if (isRightSwipe && onSwipeRight) {
      setSwipeDirection("right");
      setIsTransitioning(true);
      setTimeout(() => {
        onSwipeRight();
        setTimeout(() => {
          setIsTransitioning(false);
          setSwipeDirection(null);
        }, 50);
      }, 300);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isTransitioning,
    swipeDirection
  };
};
