import Question from "@/assets/icons/question.svg";
import { Plant, UserItem } from "@/lib/types/api/profile";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PreviewAreaProps {
  selectedBackground: UserItem | null;
  selectedPot: UserItem | null;
  currentPlant: Plant | null;
  customSize: { width: number; height: number };
  potPosition: { x: number; y: number };
}

const PreviewArea = ({ selectedBackground, selectedPot, currentPlant, customSize, potPosition }: PreviewAreaProps) => {
  const t = useTranslations("mypage.styleSection");
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const mobileWidth = Math.min(customSize.width, 320);
  const mobileHeight = (customSize.height / customSize.width) * mobileWidth;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  return (
    <div className="flex w-full flex-col items-center gap-1.5 xs:gap-2">
      {selectedBackground ? (
        <figure className="relative w-full" aria-label="preview">
          <div
            className="relative mx-auto"
            style={{ width: `${mobileWidth}px`, height: `${mobileHeight}px`, maxWidth: "100%" }}
          >
            {/* Question Icon and Tooltip - Mobile Only */}
            <div ref={tooltipRef}>
              <button
                className="absolute right-2 top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full mb:hidden"
                onClick={() => setShowTooltip(!showTooltip)}
                aria-label="Show size info"
              >
                <Question className="h-6 w-6 fill-white text-text-01" />
              </button>

              {/* Tooltip */}
              {showTooltip && (
                <div className="absolute right-2 top-10 z-20 max-w-[200px] rounded-lg bg-bg-01 px-3 py-2 text-caption text-text-04 shadow-lg mb:hidden">
                  <div className="whitespace-pre-line text-center">{t("tooltip")}</div>
                </div>
              )}
            </div>
            <Image
              src={selectedBackground.item.imageUrl}
              alt={selectedBackground.item.name || "Background"}
              fill
              className="object-cover"
              sizes={`${mobileWidth}px`}
              priority={false}
            />

            {selectedPot && (
              <div
                className="absolute cursor-move"
                style={{
                  left: `${potPosition.x}%`,
                  top: `${potPosition.y}%`,
                  transform: "translate(-50%, -80%)"
                }}
                onClick={(e) => e.stopPropagation()}
                aria-label="potPosition"
              >
                <Image src={selectedPot.item.iconUrl} alt={selectedPot.item.name || "Pot"} width={60} height={60} />

                {currentPlant && (
                  <div
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "-52px",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                      width: "75px",
                      height: "75px",
                      position: "absolute"
                    }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={currentPlant.currentImageUrl}
                        alt={currentPlant.monthlyPlant.name || "Plant"}
                        fill
                        className="object-contain"
                        sizes="75px"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <figcaption className="sr-only">
            {t("currentSize")} {customSize.width}×{customSize.height}px
          </figcaption>
        </figure>
      ) : (
        <div
          className="flex w-full items-center justify-center rounded-lg bg-gray-200"
          style={{
            width: `${mobileWidth}px`,
            height: `${mobileHeight}px`,
            maxWidth: "100%",
            margin: "0 auto"
          }}
        >
          <div className="xs:text-body3 text-caption text-text-04">{t("noBackground")}</div>
        </div>
      )}
    </div>
  );
};

export default PreviewArea;
