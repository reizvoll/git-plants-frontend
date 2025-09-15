import Modal from "@/components/ui/Modal";
import { useLanguageStore } from "@/lib/store/languageStore";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface PotPositionAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPotPosition: { x: number; y: number };
  onApply: (position: { x: number; y: number }) => void;
  selectedPot?: {
    id: number;
    name: string;
    iconUrl: string;
  } | null;
}

const PotPositionAdjustModal = ({
  isOpen,
  onClose,
  currentPotPosition,
  onApply,
  selectedPot
}: PotPositionAdjustModalProps) => {
  const { language } = useLanguageStore();
  const handlePositionSelect = (position: { x: number; y: number }) => {
    onApply(position);
  };
  const t = useTranslations("mypage.potPositionAdjustModal");

  const positionOptions = [
    { label: t("leftCenter"), x: 25, y: 50 },
    { label: t("center"), x: 50, y: 50 },
    { label: t("rightCenter"), x: 75, y: 50 },
    { label: t("leftBottom"), x: 25, y: 80 },
    { label: t("centerBottom"), x: 50, y: 80 },
    { label: t("rightBottom"), x: 75, y: 80 }
  ];

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleGlobalKeyDown);
      return () => {
        document.removeEventListener("keydown", handleGlobalKeyDown);
      };
    }
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {selectedPot ? (
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-center font-pretendard text-subtitle font-bold text-text-03">{t("title")}</div>
                <span className="text-center font-pretendard text-body1 text-text-03">{t("description")}</span>
              </div>
              <div className="mx-auto grid grid-cols-3 gap-2">
                {positionOptions.map((pos) => (
                  <button
                    key={`${pos.x}-${pos.y}`}
                    onClick={() => handlePositionSelect({ x: pos.x, y: pos.y })}
                    className={`w-full ${language === "ko" ? "min-w-[120px]" : "min-w-[140px]"} whitespace-nowrap rounded px-3 py-2 text-center font-pretendard transition-colors ${
                      currentPotPosition.x === pos.x && currentPotPosition.y === pos.y
                        ? "bg-primary-default text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    title={pos.label}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-body3 text-center text-text-04">{t("selectPotFirst")}</div>
        )}
      </div>
    </Modal>
  );
};

export default PotPositionAdjustModal;
