"use client";

import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import { useEffect, useState, type KeyboardEvent } from "react";

interface SizeAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSize: { width: number; height: number };
  onApply: (size: { width: number; height: number }) => void;
}

const SizeAdjustModal = ({ isOpen, onClose, currentSize, onApply }: SizeAdjustModalProps) => {
  const [tempSize, setTempSize] = useState(currentSize);
  const t = useTranslations("mypage.sizeAdjustModal");

  useEffect(() => {
    setTempSize(currentSize);
  }, [currentSize]);

  const handleApply = () => {
    onApply(tempSize);
    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
    }
  };

  if (!isOpen) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        className="flex flex-col gap-4 xs:gap-6"
      >
        <h3 className="text-center font-pretendard font-bold text-body1 text-text-04 xs:text-subtitle">
          {t("title")}
        </h3>
        <p className="whitespace-pre-line text-center font-pretendard text-caption text-text-03">
          {t("mobiledescription")}
        </p>

        <fieldset className="m-0 border-0 p-0">
          <legend className="sr-only">{t("title")}</legend>

          <div className="flex w-full items-center gap-1.5 xs:gap-2">
            <label htmlFor="size-width" className="sr-only">
              widthLabel
            </label>
            <input
              id="size-width"
              name="width"
              type="number"
              inputMode="numeric"
              value={Number.isFinite(tempSize.width) ? tempSize.width : 0}
              onChange={(e) => setTempSize((prev) => ({ ...prev, width: Math.max(1, Number(e.target.value || 0)) }))}
              className="w-0 flex-1 rounded-lg bg-gray-50 px-1.5 py-2.5 text-center font-pretendard text-caption text-text-04 outline-none xs:px-2 xs:py-3 xs:text-body1"
              required
            />

            <span aria-hidden className="shrink-0 font-pretendard text-caption text-text-03 xs:text-body1">
              ×
            </span>

            <label htmlFor="size-height" className="sr-only">
              heightLabel
            </label>
            <input
              id="size-height"
              name="height"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={Number.isFinite(tempSize.height) ? tempSize.height : 0}
              onChange={(e) => setTempSize((prev) => ({ ...prev, height: Math.max(1, Number(e.target.value || 0)) }))}
              className="w-0 flex-1 rounded-lg bg-gray-50 px-1.5 py-2.5 text-center font-pretendard text-caption text-text-04 outline-none xs:px-2 xs:py-3 xs:text-body1"
              required
            />

            <span className="shrink-0 font-pretendard text-caption text-text-03 xs:text-body1">px</span>
          </div>
        </fieldset>

        <div className="flex gap-2 xs:gap-3">
          <Button type="submit" variant="primary" size="md" className="w-full text-caption text-text-01 xs:text-body1">
            {t("apply")}
          </Button>
          <Button
            type="button"
            variant="disabled"
            size="md"
            className="w-full text-caption text-text-03 xs:text-body1"
            onClick={onClose}
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
    </BottomSheet>
  );
};

export default SizeAdjustModal;
