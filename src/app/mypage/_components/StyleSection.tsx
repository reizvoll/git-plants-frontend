import ArrowsOutCardinal from "@/assets/icons/arrows-out-cardinal.svg";
import DotsThree from "@/assets/icons/dots-three.svg";
import Export from "@/assets/icons/export.svg";
import SlidersHorizontal from "@/assets/icons/sliders-horizontal.svg";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useItemSelection } from "@/lib/hooks/mypage/useItemSelection";
import { useCustomSize, usePotPosition, useSelectedIndexes } from "@/lib/store/potPositionStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { useToastStore } from "@/lib/store/useToaststore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import PotPositionAdjustModal from "./PotPositionAdjustModal";
import SizeAdjustModal from "./SizeAdjustModal";

interface StyleSectionProps {
  onNavigateToCollection: (mode: "CROP" | "BACKGROUND" | "POT") => void;
}

const StyleSection = ({ onNavigateToCollection }: StyleSectionProps) => {
  const { user } = useAuth();
  const { equipped, items, plants } = useProfileStore();
  const { addToast } = useToastStore();
  const [currentMode, setCurrentMode] = useState("GARDEN");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPotPositionModalOpen, setIsPotPositionModalOpen] = useState(false);
  const [showBackgroundTooltip, setShowBackgroundTooltip] = useState(false);
  const [showPotTooltip, setShowPotTooltip] = useState(false);
  const [showPotAdjustTooltip, setShowPotAdjustTooltip] = useState(false);

  const t = useTranslations("mypage.styleSection");
  const availableModes = useMemo(() => {
    if (!items || items.length === 0) return { garden: false, mini: false };

    const gardenBackgrounds = items.filter(
      (item) => item.item.category === "background" && item.item.mode === "GARDEN"
    );
    const miniBackgrounds = items.filter((item) => item.item.category === "background" && item.item.mode === "MINI");

    return {
      garden: gardenBackgrounds.length > 0,
      mini: miniBackgrounds.length > 0
    };
  }, [items]);

  // equipped 를 활용한 defaultMode 계산
  const defaultMode = useMemo(() => {
    // 현재 장착된 배경화면이 있는지 확인
    if (equipped && equipped.backgrounds && equipped.backgrounds.length > 0) {
      // 장착된 배경화면 중 첫 번째의 모드를 기본값으로 사용
      const equippedBackground = equipped.backgrounds[0];
      if (equippedBackground.mode === "GARDEN" && availableModes.garden) {
        return "GARDEN";
      }
      if (equippedBackground.mode === "MINI" && availableModes.mini) {
        return "MINI";
      }
    }

    // 장착된 배경화면이 없으면 이용 가능한 모드 중 우선순위대로
    if (availableModes.garden) return "GARDEN";
    if (availableModes.mini) return "MINI";
    return "GARDEN"; // 아무것도 없으면 기본값
  }, [equipped, availableModes]);

  useEffect(() => {
    setCurrentMode(defaultMode);
  }, [defaultMode]);

  const { potPosition, setPotPosition } = usePotPosition(currentMode);
  const { customSize, setCustomSize } = useCustomSize(currentMode);
  const { backgroundIndex, potIndex, setIndexes } = useSelectedIndexes(currentMode);

  const currentBackgrounds =
    items?.filter((item) => item.item.category === "background" && item.item.mode === currentMode) || [];
  const currentPots = items?.filter((item) => item.item.category === "pot") || [];

  const backgroundSelection = useItemSelection({
    items: currentBackgrounds,
    currentMode,
    category: "background",
    equipped
  });

  const potSelection = useItemSelection({
    items: currentPots,
    currentMode,
    category: "pot",
    equipped
  });

  const selectedBackground = backgroundSelection.selectedItem;
  const selectedPot = potSelection.selectedItem;
  const currentPlant = plants && plants.length > 0 ? plants[0] : null;

  const handleModeChange = (selectedMode: string) => {
    setCurrentMode(selectedMode === t("item_mini") ? "MINI" : "GARDEN");
  };

  const handleApplySize = (size: { width: number; height: number }) => {
    setCustomSize(size);
  };

  const handleApplyPotPosition = (position: { x: number; y: number }) => {
    setPotPosition(position);
  };

  const handleBackgroundSelect = (index: number) => {
    setIndexes(index, potIndex);
    backgroundSelection.handleItemSelect(index);
  };

  const handlePotSelect = (index: number) => {
    setIndexes(backgroundIndex, index);
    potSelection.handleItemSelect(index);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="relative flex w-full flex-col gap-6 rounded-2xl bg-brown-100 px-12 py-12">
        <div className="flex h-12 w-full flex-row items-start justify-end gap-[10px]">
          <Dropdown
            items={[
              {
                label: t("item_mini"),
                onClick: () => handleModeChange(t("item_mini")),
                active: currentMode === "MINI"
              },
              {
                label: t("item_garden"),
                onClick: () => handleModeChange(t("item_garden")),
                active: currentMode === "GARDEN"
              }
            ]}
            className="font-pretendard text-body1 text-sageGreen-900"
            mode="click"
          />
          <Button
            variant="secondaryLine"
            size="md"
            className="shadow-normal flex items-center gap-2 text-body1"
            onClick={async () => {
              try {
                if (user?.username) {
                  // Check if background and pot are equipped
                  const hasEquippedBackground = equipped?.backgrounds && equipped.backgrounds.length > 0;
                  const hasEquippedPot = equipped?.pots && equipped.pots.length > 0;

                  if (!hasEquippedBackground || !hasEquippedPot) {
                    addToast(t("haveEquipped"), "warning");
                    return;
                  }

                  const baseUrl = window.location.origin;
                  const apiUrl = `${baseUrl}/api/mypage/${user.username}?format=gif&mode=${currentMode}&width=${customSize.width}&height=${customSize.height}&potX=${potPosition.x}&potY=${potPosition.y}`;
                  const mdx = `[![${user.username}'s Garden](${apiUrl})](${baseUrl})`;
                  await navigator.clipboard.writeText(mdx);
                  addToast(t("copyLinkSuccess"), "success");
                } else {
                  await navigator.clipboard.writeText(window.location.href);
                }
              } catch {
                addToast(t("copyLinkError"), "warning");
              }
            }}
          >
            {t("copyLink")}
            <Export className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-row gap-[60px]">
          <div className="flex flex-shrink-0 flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              {selectedBackground ? (
                <div className="relative">
                  <Image
                    src={selectedBackground.item.imageUrl}
                    alt={selectedBackground.item.name}
                    style={{
                      width: `${customSize.width}px`,
                      height: `${customSize.height}px`
                    }}
                    width={customSize.width}
                    height={customSize.height}
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
                    >
                      <Image src={selectedPot.item.iconUrl} alt={selectedPot.item.name} width={80} height={80} />

                      {currentPlant && (
                        <picture
                          className="absolute size-[100px]"
                          style={{
                            left: "50%",
                            top: "-70px",
                            transform: "translateX(-50%)",
                            zIndex: 10
                          }}
                        >
                          <Image
                            src={currentPlant.currentImageUrl}
                            alt={currentPlant.monthlyPlant.name}
                            fill
                            className="object-contain"
                          />
                        </picture>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center bg-gray-200">
                  <div className="text-body3 text-text-04">{t("noBackground")}</div>
                </div>
              )}
            </div>

            <div className="flex flex-row items-center gap-4">
              <div className="text-body2 text-text-03">
                {t("currentSize")} <br />
                {selectedBackground && (
                  <span className="text-body3 text-text-03">
                    {customSize.width} X {customSize.height} px
                  </span>
                )}
              </div>
            </div>
            <div className={`flex ${currentMode === "MINI" ? "flex-col items-center" : "flex-row items-start"} gap-2`}>
              <Button
                variant="primary"
                size="md"
                className="flex flex-row items-center gap-2 text-body1"
                onClick={() => setIsModalOpen(true)}
              >
                {t("adjustSize")}
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
              <Button
                variant="primaryLine"
                size="md"
                className="flex flex-row items-center gap-2 text-body1"
                onClick={() => {
                  const defaultSize =
                    currentMode === "MINI" ? { width: 267, height: 400 } : { width: 400, height: 300 };
                  setCustomSize(defaultSize);
                  setPotPosition({ x: 50, y: 80 });
                }}
              >
                {t("resetToDefault")}
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-[60px]">
            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="text-body2 text-text-03">{t("background")}</div>
                <div className="relative">
                  <button
                    className="group text-text-04"
                    onClick={() => onNavigateToCollection("BACKGROUND")}
                    onMouseEnter={() => setShowBackgroundTooltip(true)}
                    onMouseLeave={() => setShowBackgroundTooltip(false)}
                  >
                    <DotsThree className="h-5 w-5" />
                    {showBackgroundTooltip && (
                      <span className="group-hover:shadow-emphasize absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center">
                        <span className="text-caption text-primary-default">{t("more")}</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {currentBackgrounds.length > 0 ? (
                  currentBackgrounds.map((background, index) => (
                    <div
                      key={background.id}
                      className={`relative cursor-pointer transition-all duration-200 hover:opacity-80 ${
                        backgroundSelection.isItemEquipped(background) ? "ring-2 ring-primary-default" : ""
                      } ${backgroundSelection.isLoading ? "pointer-events-none opacity-50" : ""}`}
                      onClick={() => handleBackgroundSelect(index)}
                    >
                      <Image
                        src={background.item.iconUrl}
                        alt={background.item.name}
                        className="rounded object-cover"
                        width={80}
                        height={80}
                      />
                      {backgroundSelection.isItemEquipped(background) && (
                        <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-default">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-body3 text-text-04">{t("noBackground")}</div>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="text-body2 text-text-03">{t("pot")}</div>
                <div className="flex flex-row items-center gap-4">
                  <div className="relative">
                    <button
                      className="group flex items-center justify-center text-text-03"
                      onClick={() => setIsPotPositionModalOpen(true)}
                      onMouseEnter={() => setShowPotAdjustTooltip(true)}
                      onMouseLeave={() => setShowPotAdjustTooltip(false)}
                    >
                      <ArrowsOutCardinal className="h-4 w-4" />
                      {showPotAdjustTooltip && (
                        <span className="group-hover:shadow-emphasize absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center">
                          <span className="text-caption text-primary-default">{t("adjustPotPosition")}</span>
                        </span>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      className="group flex items-center justify-center text-text-04"
                      onClick={() => onNavigateToCollection("POT")}
                      onMouseEnter={() => setShowPotTooltip(true)}
                      onMouseLeave={() => setShowPotTooltip(false)}
                    >
                      <DotsThree className="h-5 w-5" />
                      {showPotTooltip && (
                        <span className="group-hover:shadow-emphasize absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center">
                          <span className="text-caption text-primary-default">{t("more")}</span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {currentPots.length > 0 ? (
                  currentPots.map((pot, index) => (
                    <div
                      key={pot.id}
                      className={`relative cursor-pointer transition-all duration-200 hover:opacity-80 ${
                        potSelection.isItemEquipped(pot) ? "ring-2 ring-primary-default" : ""
                      } ${potSelection.isLoading ? "pointer-events-none opacity-50" : ""}`}
                      onClick={() => handlePotSelect(index)}
                    >
                      <Image
                        src={pot.item.iconUrl}
                        alt={pot.item.name}
                        className="rounded object-cover"
                        width={60}
                        height={60}
                      />
                      {potSelection.isItemEquipped(pot) && (
                        <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary-default">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-body3 text-text-03">{t("noPot")}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SizeAdjustModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentSize={customSize}
        onApply={handleApplySize}
      />
      {selectedPot && (
        <PotPositionAdjustModal
          isOpen={isPotPositionModalOpen}
          onClose={() => setIsPotPositionModalOpen(false)}
          currentPotPosition={potPosition}
          onApply={handleApplyPotPosition}
          selectedPot={selectedPot.item}
        />
      )}
    </div>
  );
};

export default StyleSection;
