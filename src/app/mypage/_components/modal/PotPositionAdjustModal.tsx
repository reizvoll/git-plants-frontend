"use client";

import Modal from "@/components/ui/Modal";
import { useModalKeyboard } from "@/lib/hooks/common/useModalKeyboard";
import { useLanguageStore } from "@/lib/store/languageStore";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("mypage.potPositionAdjustModal");

  const positionOptions = [
    { label: t("leftCenter"), x: 25, y: 50 },
    { label: t("center"), x: 50, y: 50 },
    { label: t("rightCenter"), x: 75, y: 50 },
    { label: t("leftBottom"), x: 25, y: 80 },
    { label: t("centerBottom"), x: 50, y: 80 },
    { label: t("rightBottom"), x: 75, y: 80 }
  ];

  useModalKeyboard({ isOpen, onClose });

  if (!isOpen) return null;

  const minWidthClass = language === "ko" ? "min-w-[120px]" : "min-w-[140px]";

  return (
    <Modal isOpen={isOpen} onClose={onClose} mode="default">
      <div className="flex flex-col gap-4">
        {selectedPot ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-center font-pretendard text-subtitle font-bold text-text-03">{t("title")}</h3>
              <p className="text-center font-pretendard text-body1 text-text-03">{t("description")}</p>
            </div>

            <div className="mx-auto grid grid-cols-3 gap-2">
              {positionOptions.map((pos) => {
                const isActive = currentPotPosition.x === pos.x && currentPotPosition.y === pos.y;
                return (
                  <button
                    key={`${pos.x}-${pos.y}`}
                    type="button"
                    onClick={() => onApply({ x: pos.x, y: pos.y })}
                    className={`w-full ${minWidthClass} whitespace-nowrap rounded px-3 py-2 text-center font-pretendard transition-colors ${
                      isActive
                        ? "bg-primary-default text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    title={pos.label}
                  >
                    {pos.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-body3 text-center text-text-04">{t("selectPotFirst")}</p>
        )}
      </div>
    </Modal>
  );
};

export default PotPositionAdjustModal;
