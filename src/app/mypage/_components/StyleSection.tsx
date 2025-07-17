import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { useCustomSize, usePotPosition, useSelectedIndexes } from "@/lib/store/potPostionStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { ExportIcon, SlidersHorizontalIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import PotPositionAdjustModal from "./PotPositionAdjustModal";
import SizeAdjustModal from "./SizeAdjustModal";

const StyleSection = () => {
  const { equipped, plants } = useProfileStore();
  const [currentMode, setCurrentMode] = useState("GARDEN");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPotPositionModalOpen, setIsPotPositionModalOpen] = useState(false);

  const { potPosition, setPotPosition } = usePotPosition(currentMode);
  const { customSize, setCustomSize } = useCustomSize(currentMode);
  const { backgroundIndex, potIndex, setIndexes } = useSelectedIndexes(currentMode);

  const currentBackgrounds =
    equipped?.backgrounds?.filter((bg) => bg.mode === currentMode || bg.mode === "DEFAULT") || [];
  const currentPots = equipped?.pots || [];

  const selectedBackground = currentBackgrounds[backgroundIndex] || currentBackgrounds[0] || null;
  const selectedPot = currentPots[potIndex] || currentPots[0] || null;
  const currentPlant = plants && plants.length > 0 ? plants[0] : null;

  const handleModeChange = (selectedMode: string) => {
    setCurrentMode(selectedMode === "미니 모드" ? "MINI" : "GARDEN");
  };

  const handleApplySize = (size: { width: number; height: number }) => {
    setCustomSize(size);
  };

  const handleApplyPotPosition = (position: { x: number; y: number }) => {
    setPotPosition(position);
  };

  const handleBackgroundSelect = (index: number) => {
    setIndexes(index, potIndex);
  };

  const handlePotSelect = (index: number) => {
    setIndexes(backgroundIndex, index);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="relative flex w-full flex-col gap-6 rounded-2xl bg-brown-100 px-12 py-12">
        <div className="flex h-12 w-full flex-row items-start justify-end gap-[10px]">
          <Dropdown
            items={[
              {
                label: "미니 모드",
                onClick: () => handleModeChange("미니 모드"),
                active: currentMode === "MINI"
              },
              {
                label: "정원 모드",
                onClick: () => handleModeChange("정원 모드"),
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
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            링크 복사하기
            <ExportIcon width={20} height={20} />
          </Button>
        </div>

        {/* Todo : separate contents for each mode */}
        <div className="flex flex-row gap-[60px]">
          <div className="flex flex-shrink-0 flex-col items-center gap-6">
            {/* display the currently selected background with pot */}
            <div className="flex flex-col items-center gap-2">
              {selectedBackground ? (
                <div className="relative">
                  <Image
                    src={selectedBackground.imageUrl}
                    alt={selectedBackground.name}
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
                      <Image src={selectedPot.iconUrl} alt={selectedPot.name} width={80} height={80} />

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
                  <div className="text-body3 text-text-04">배경화면이 존재하지 않습니다.</div>
                </div>
              )}
            </div>

            <div className="text-body2 text-text-03">
              현재 사이즈 <br />
              {selectedBackground && (
                <span className="text-body3 text-text-03">
                  {customSize.width} X {customSize.height} px
                </span>
              )}
            </div>
            <div className={`flex ${currentMode === "MINI" ? "flex-col" : "flex-row"} gap-2`}>
              <Button
                variant="primary"
                size="md"
                className="flex flex-row items-center gap-2 text-body1"
                onClick={() => setIsModalOpen(true)}
              >
                사이즈 조정하기
                <SlidersHorizontalIcon width={16} height={16} />
              </Button>
              <Button
                variant="primaryLine"
                size="md"
                className="flex flex-row items-center gap-2 text-body1"
                onClick={() => {
                  setCustomSize({ width: 400, height: 300 });
                  setPotPosition({ x: 50, y: 80 });
                }}
              >
                기본값으로 설정하기
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-[60px]">
            <div className="flex flex-1 flex-col gap-6">
              <div className="text-body2 text-text-03">배경화면</div>
              <div className="flex flex-wrap gap-4">
                {currentBackgrounds.length > 0 ? (
                  currentBackgrounds.map((background, index) => (
                    <div
                      key={background.id}
                      className="relative cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleBackgroundSelect(index)}
                    >
                      <Image
                        src={background.iconUrl}
                        alt={background.name}
                        className="rounded object-cover"
                        width={80}
                        height={80}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-body3 text-text-04">배경화면이 없습니다.</div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="text-body2 text-text-03">화분</div>
                <Button
                  variant="primaryLine"
                  size="md"
                  className="flex flex-row items-center gap-2 text-body1"
                  onClick={() => setIsPotPositionModalOpen(true)}
                >
                  위치 조정하기
                  <SlidersHorizontalIcon width={16} height={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                {currentPots.length > 0 ? (
                  currentPots.map((pot, index) => (
                    <div
                      key={pot.id}
                      className="relative cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handlePotSelect(index)}
                    >
                      <Image src={pot.iconUrl} alt={pot.name} className="rounded object-cover" width={60} height={60} />
                    </div>
                  ))
                ) : (
                  <div className="text-body3 text-text-03">화분이 없습니다.</div>
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
      <PotPositionAdjustModal
        isOpen={isPotPositionModalOpen}
        onClose={() => setIsPotPositionModalOpen(false)}
        currentPotPosition={potPosition}
        onApply={handleApplyPotPosition}
        selectedPot={selectedPot}
      />
    </div>
  );
};

export default StyleSection;
