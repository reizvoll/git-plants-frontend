"use client";

import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useTranslations } from "next-intl";
import { useEffect, useState, type KeyboardEvent } from "react";

interface SizeAdjustModalDesktopProps {
  isOpen: boolean;
  onClose: () => void;
  currentSize: { width: number; height: number };
  onApply: (size: { width: number; height: number }) => void;
}

const SizeAdjustModalDesktop = ({ isOpen, onClose, currentSize, onApply }: SizeAdjustModalDesktopProps) => {
  const [tempSize, setTempSize] = useState(currentSize);
  const t = useTranslations("mypage.sizeAdjustModal");

  useEffect(() => {
    setTempSize(currentSize);
  }, [currentSize]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleGlobalKeyDown);
      return () => document.removeEventListener("keydown", handleGlobalKeyDown);
    }
  }, [isOpen, onClose]);

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
    <Modal isOpen={isOpen} onClose={onClose} mode="default">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleApply();
        }}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        className="flex flex-col gap-4"
      >
        <h3 className="font-pretendard text-subtitle font-bold text-text-04">{t("title")}</h3>

        <fieldset className="m-0 border-0 p-0">
          <legend className="sr-only">{t("title")}</legend>

          <div className="flex items-center justify-center gap-3">
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
              className="rounded-lg bg-gray-50 px-3 py-4 text-center font-pretendard text-body1 text-text-04 outline-none"
              required
            />

            <span aria-hidden className="font-pretendard text-title2 text-text-03">
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
              className="rounded-lg bg-gray-50 px-3 py-4 text-center font-pretendard text-body1 text-text-04 outline-none"
              required
            />

            <span className="font-pretendard text-title2 text-text-03">px</span>
          </div>
        </fieldset>

        <p className="text-center font-pretendard text-caption text-text-03">{t("description")}</p>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" size="md" className="w-full text-body1 text-text-01">
            {t("apply")}
          </Button>
          <Button
            type="button"
            variant="disabled"
            size="md"
            className="w-full text-body1 text-text-03"
            onClick={onClose}
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SizeAdjustModalDesktop;
