import { Plant, UserItem } from "@/lib/types/api/profile";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PreviewAreaProps {
  selectedBackground: UserItem | null;
  selectedPot: UserItem | null;
  currentPlant: Plant | null;
  customSize: { width: number; height: number };
  potPosition: { x: number; y: number };
}

const PreviewAreaDesktop = ({
  selectedBackground,
  selectedPot,
  currentPlant,
  customSize,
  potPosition
}: PreviewAreaProps) => {
  const t = useTranslations("mypage.styleSection");

  return (
    <div className="flex flex-col items-center gap-2">
      {selectedBackground ? (
        <figure className="relative" aria-label="preview">
          <div className="relative" style={{ width: `${customSize.width}px`, height: `${customSize.height}px` }}>
            <Image
              src={selectedBackground.item.imageUrl}
              alt={selectedBackground.item.name || "Background"}
              fill
              className="object-cover"
              sizes={`${customSize.width}px`}
              priority={false}
            />

            {selectedPot && (
              <div
                className="absolute cursor-move"
                style={{
                  left: `${potPosition.x}%`,
                  top: `${potPosition.y}%`,
                  transform: "translate(-50%, -70%)",
                  width: "90px",
                  height: "90px"
                }}
                onClick={(e) => e.stopPropagation()}
                aria-label="potPosition"
              >
                <Image
                  src={selectedPot.item.iconUrl}
                  alt={selectedPot.item.name || "Pot"}
                  width={90}
                  height={90}
                  style={{ width: "100%", height: "100%" }}
                />

                {currentPlant && (
                  <div
                    className="absolute leading-none"
                    style={{
                      left: "50%",
                      top: "-167px",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                      width: "110px",
                      height: "210px",
                      position: "absolute"
                    }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={currentPlant.currentImageUrl}
                        alt={currentPlant.monthlyPlant.name || "Plant"}
                        fill
                        className="object-contain"
                        sizes="110px"
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
          className="flex items-center justify-center rounded-lg bg-gray-200"
          style={{
            width: `${customSize.width}px`,
            height: `${customSize.height}px`
          }}
        >
          <div className="text-body3 text-text-04">{t("noBackground")}</div>
        </div>
      )}
    </div>
  );
};

export default PreviewAreaDesktop;
