import CaretCircleLeft from "@/assets/icons/caret-circle-left.svg";
import CaretCircleRight from "@/assets/icons/caret-circle-right.svg";
import { cn } from "@/lib/utils/className";

interface SliderNavigationButtonsProps {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrevClick: () => void;
  onNextClick: () => void;
  showFrom?: "tb" | "mb";
  iconClassName?: string;
}

const SliderNavigationButtons = ({
  canScrollPrev,
  canScrollNext,
  onPrevClick,
  onNextClick,
  showFrom = "tb",
  iconClassName = "h-12 w-12"
}: SliderNavigationButtonsProps) => {
  const showClass = showFrom === "tb" ? "tb:block" : "mb:block";

  return (
    <>
      <button
        className={cn(
          "absolute left-0 z-10 hidden text-text-03 transition-opacity",
          showClass,
          !canScrollPrev ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        aria-label="이전 슬라이드"
        disabled={!canScrollPrev}
        onClick={onPrevClick}
      >
        <CaretCircleLeft className={iconClassName} />
      </button>

      <button
        className={cn(
          "absolute right-0 z-10 hidden text-text-03 transition-opacity",
          showClass,
          !canScrollNext ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        aria-label="다음 슬라이드"
        disabled={!canScrollNext}
        onClick={onNextClick}
      >
        <CaretCircleRight className={iconClassName} />
      </button>
    </>
  );
};

export default SliderNavigationButtons;
