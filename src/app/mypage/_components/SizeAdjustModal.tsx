import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
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

  const handleApply = () => {
    onApply(tempSize);
    onClose();
  };

  const handleCancel = () => {
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
        <div className="font-pretendard text-subtitle font-bold text-text-04">{t("title")}</div>
        <div className="flex items-center justify-center gap-3">
          <input
            value={tempSize.width}
            onChange={(e) => setTempSize((prev) => ({ ...prev, width: Number(e.target.value) }))}
            onKeyDown={handleKeyDown}
            className="rounded-lg bg-gray-50 px-3 py-4 text-center font-pretendard text-body1 text-text-04 outline-none"
          />
          <span className="font-pretendard text-title2 text-text-03">x</span>
          <input
            value={tempSize.height}
            onChange={(e) => setTempSize((prev) => ({ ...prev, height: Number(e.target.value) }))}
            onKeyDown={handleKeyDown}
            className="rounded-lg bg-gray-50 px-3 py-4 text-center font-pretendard text-body1 text-text-04 outline-none"
          />
          <span className="font-pretendard text-title2 text-text-03">px</span>
        </div>
        <div className="text-center font-pretendard text-caption text-text-03">{t("description")}</div>
        <div className="flex gap-3">
          <Button type="submit" variant="primary" size="md" className="w-full text-body1 text-text-01">
            {t("apply")}
          </Button>
          <Button
            type="button"
            variant="disabled"
            size="md"
            className="w-full text-body1 text-text-03"
            onClick={handleCancel}
          >
            {t("cancel")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SizeAdjustModal;
