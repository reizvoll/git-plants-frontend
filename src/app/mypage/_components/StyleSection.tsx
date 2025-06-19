import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { useProfileStore } from "@/lib/store/profileStore";
import { ExportIcon, SlidersHorizontalIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import SizeAdjustModal from "./SizeAdjustModal";

const StyleSection = () => {
  const { equipped } = useProfileStore();
  const [currentMode, setCurrentMode] = useState("GARDEN");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDefaultImageSize = (mode: string) => {
    return mode === "MINI" ? { width: 267, height: 400 } : { width: 400, height: 300 };
  };

  const [imageSize, setImageSize] = useState(getDefaultImageSize("GARDEN"));

  const currentBackgrounds = equipped?.backgrounds?.filter((bg) => bg.mode === currentMode) || [];
  const currentPots = equipped?.pots?.filter((pot) => pot.mode === currentMode) || [];

  const handleModeChange = (selectedMode: string) => {
    const newMode = selectedMode === "미니 모드" ? "MINI" : "GARDEN";
    setCurrentMode(newMode);
    setImageSize(getDefaultImageSize(newMode));
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
          <div className="flex flex-col items-center gap-6">
            {/* 현재 선택된 배경화면 표시 */}
            <div className="flex flex-col items-center gap-2">
              {currentBackgrounds.length > 0 ? (
                <div className="relative">
                  <Image
                    src={currentBackgrounds[0].imageUrl}
                    alt={currentBackgrounds[0].name}
                    style={{
                      width: `${imageSize.width}px`,
                      height: `${imageSize.height}px`
                    }}
                    width={imageSize.width}
                    height={imageSize.height}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center bg-gray-200">
                  <div className="text-body3 text-text-04">배경화면이 존재하지 않습니다.</div>
                </div>
              )}
            </div>
            <div className="text-body2 text-text-03">
              현재 사이즈 <br />
              {currentBackgrounds.length > 0 && (
                <span className="text-body3 text-text-03">
                  {currentBackgrounds[0].imageUrl && (
                    <>
                      {imageSize.width} X {imageSize.height} px
                    </>
                  )}
                </span>
              )}
            </div>
            <Button
              variant="primary"
              size="md"
              className="flex flex-row items-center gap-2 text-body1"
              onClick={() => setIsModalOpen(true)}
            >
              사이즈 조정하기
              <SlidersHorizontalIcon width={16} height={16} />
            </Button>
          </div>
          <div className="flex flex-col gap-[60px]">
            <div className="flex flex-col gap-6">
              <div className="text-body2 text-text-03">배경화면</div>
              <div className="flex flex-wrap gap-4">
                {currentBackgrounds.length > 0 ? (
                  currentBackgrounds.map((background) => (
                    <div key={background.id} className="relative">
                      <Image
                        src={background.iconUrl}
                        alt={background.name}
                        className="object-cover"
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
            <div className="flex flex-col gap-4">
              <div className="text-body2 text-text-03">화분</div>
              <div className="flex flex-wrap gap-4">
                {currentPots.length > 0 ? (
                  currentPots.map((pot) => (
                    <div key={pot.id} className="relative">
                      <Image src={pot.iconUrl} alt={pot.name} className="object-cover" width={80} height={80} />
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
        currentSize={imageSize}
        onApply={setImageSize}
      />
    </div>
  );
};

export default StyleSection;
