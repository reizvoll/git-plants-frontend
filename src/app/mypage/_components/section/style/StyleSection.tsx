"use client";

import { useAuth } from "@/lib/hooks/auth/useAuth";
import { useItemEquip } from "@/lib/hooks/mypage/useItemEquip";
import { useItemSelection } from "@/lib/hooks/mypage/useItemSelection";
import { useCustomSize, usePotPosition, useSelectedIndexes } from "@/lib/store/potPositionStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { useToastStore } from "@/lib/store/useToaststore";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PotPositionAdjustModal from "../../modal/PotPositionAdjustModal";
import SizeAdjustModal from "../../modal/SizeAdjustModal";
import SizeAdjustModalDesktop from "../../modal/SizeAdjustModalDesktop";
import BackgroundSection from "./BackgroundSection";
import PotSection from "./PotSection";
import PreviewArea from "./PreviewArea";
import PreviewAreaDesktop from "./PreviewAreaDesktop";
import SizeControls from "./SizeControls";
import SizeControlsDesktop from "./SizeControlsDesktop";
import StyleSectionNav from "./StyleSectionNav";

type Mode = "GARDEN" | "MINI";

interface StyleSectionProps {
  onNavigateToCollection: (mode: "CROP" | "BACKGROUND" | "POT") => void;
}

const StyleSection = ({ onNavigateToCollection }: StyleSectionProps) => {
  const { user } = useAuth();
  const { equipped, items, plants } = useProfileStore();
  const { addToast } = useToastStore();
  const [currentMode, setCurrentMode] = useState<Mode>(
    // 새로고침 시에도 선택한 모드 유지 (localStorage 사용)
    () => (typeof window !== "undefined" && (localStorage.getItem("preferredMode") as Mode)) || "MINI"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPotPositionModalOpen, setIsPotPositionModalOpen] = useState(false);

  const t = useTranslations("mypage.styleSection");

  const { potPosition, setPotPosition } = usePotPosition(currentMode);
  const { customSize, setCustomSize } = useCustomSize(currentMode);
  const { backgroundIndex, potIndex, setIndexes } = useSelectedIndexes(currentMode);

  const currentBackgrounds =
    items?.filter((item) => item.item.category === "background" && item.item.mode === currentMode) || [];
  const currentPots = items?.filter((item) => item.item.category === "pot") || [];

  // 자동 장착 옵션과 함께 useItemEquip 호출
  useItemEquip({
    currentMode,
    currentBackgrounds,
    currentPots,
    autoEquip: true
  });

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

  // 모드 변경 핸들러 (변경된 모드를 localStorage에 저장)
  const handleModeChange = (selectedLabel: string) => {
    const newMode = selectedLabel === t("item_mini") ? "MINI" : "GARDEN";
    setCurrentMode(newMode);
    typeof window !== "undefined" && localStorage.setItem("preferredMode", newMode);
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
    <section aria-labelledby="style-editor" className="flex w-full justify-center">
      <h2 id="style-editor" className="sr-only">
        style editor
      </h2>

      <div className="relative flex w-full flex-col gap-6 rounded-2xl bg-brown-100 px-6 py-8 mb:px-8 mb:py-12 tb:p-12">
        <StyleSectionNav
          currentMode={currentMode}
          onModeChange={handleModeChange}
          user={user}
          equipped={equipped}
          customSize={customSize}
          potPosition={potPosition}
          addToast={addToast}
        />

        {/* Mobile Layout */}
        <div className="flex flex-col gap-6 xs:gap-8 mb:hidden">
          <div className="flex w-full flex-col items-center gap-4 xs:gap-6">
            <PreviewArea
              selectedBackground={selectedBackground}
              selectedPot={selectedPot}
              currentPlant={currentPlant}
              customSize={customSize}
              potPosition={potPosition}
            />

            <SizeControls
              currentMode={currentMode}
              customSize={customSize}
              onOpenSizeModal={() => setIsModalOpen(true)}
              onResetToDefault={() => {
                const defaultSize = currentMode === "MINI" ? { width: 267, height: 400 } : { width: 400, height: 300 };
                setCustomSize(defaultSize);
                setPotPosition({ x: 50, y: 80 });
              }}
            />
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden flex-col gap-16 mb:flex tb:hidden">
          <div className="flex w-full flex-col items-center gap-6">
            <PreviewArea
              selectedBackground={selectedBackground}
              selectedPot={selectedPot}
              currentPlant={currentPlant}
              customSize={customSize}
              potPosition={potPosition}
            />

            <SizeControls
              currentMode={currentMode}
              customSize={customSize}
              onOpenSizeModal={() => setIsModalOpen(true)}
              onResetToDefault={() => {
                const defaultSize = currentMode === "MINI" ? { width: 267, height: 400 } : { width: 400, height: 300 };
                setCustomSize(defaultSize);
                setPotPosition({ x: 50, y: 80 });
              }}
            />
          </div>

          <div className="flex w-full flex-col gap-6">
            <BackgroundSection
              currentBackgrounds={currentBackgrounds}
              onBackgroundSelect={handleBackgroundSelect}
              backgroundSelection={backgroundSelection}
              onNavigateToCollection={onNavigateToCollection}
            />

            <PotSection
              currentPots={currentPots}
              onPotSelect={handlePotSelect}
              potSelection={potSelection}
              onOpenPotPositionModal={() => setIsPotPositionModalOpen(true)}
              onNavigateToCollection={onNavigateToCollection}
            />
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden flex-row gap-[60px] tb:flex">
          <div className="flex flex-shrink-0 flex-col items-center gap-6">
            <PreviewAreaDesktop
              selectedBackground={selectedBackground}
              selectedPot={selectedPot}
              currentPlant={currentPlant}
              customSize={customSize}
              potPosition={potPosition}
            />

            <SizeControlsDesktop
              currentMode={currentMode}
              customSize={customSize}
              onOpenSizeModal={() => setIsModalOpen(true)}
              onResetToDefault={() => {
                const defaultSize = currentMode === "MINI" ? { width: 267, height: 400 } : { width: 400, height: 300 };
                setCustomSize(defaultSize);
                setPotPosition({ x: 50, y: 80 });
              }}
            />
          </div>

          <div className="flex w-full flex-col gap-[60px]">
            <BackgroundSection
              currentBackgrounds={currentBackgrounds}
              onBackgroundSelect={handleBackgroundSelect}
              backgroundSelection={backgroundSelection}
              onNavigateToCollection={onNavigateToCollection}
            />

            <PotSection
              currentPots={currentPots}
              onPotSelect={handlePotSelect}
              potSelection={potSelection}
              onOpenPotPositionModal={() => setIsPotPositionModalOpen(true)}
              onNavigateToCollection={onNavigateToCollection}
            />
          </div>
        </div>
      </div>

      {/* Mobile - BottomSheet */}
      <div className="mb:hidden">
        <SizeAdjustModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentSize={customSize}
          onApply={handleApplySize}
        />
      </div>

      {/* Desktop/Tablet - Modal */}
      <div className="hidden mb:block">
        <SizeAdjustModalDesktop
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentSize={customSize}
          onApply={handleApplySize}
        />
      </div>

      {selectedPot && (
        <PotPositionAdjustModal
          isOpen={isPotPositionModalOpen}
          onClose={() => setIsPotPositionModalOpen(false)}
          currentPotPosition={potPosition}
          onApply={handleApplyPotPosition}
          selectedPot={selectedPot.item}
        />
      )}
    </section>
  );
};

export default StyleSection;
