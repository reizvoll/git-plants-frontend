import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";
import type { UpdateNote } from "@/lib/types/api/public";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

interface UpdateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateNote: UpdateNote;
}

const UpdateNoteModal = ({ isOpen, onClose, updateNote }: UpdateNoteModalProps) => {
  const t = useTranslations("shop.update.updateModal");

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

  if (!isOpen) return null;

  return (
    <ModalItem isOpen={isOpen} onClose={onClose} mode="default">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col items-center gap-4">
          <div className="font-pretendard text-subHeading font-bold text-text-04">{t("modalTitle")}</div>
          <div className="text-subtitle text-text-03">{updateNote.title}</div>
        </div>

        <picture className="flex w-full justify-center">
          <Image
            src={updateNote.imageUrl}
            alt="update note"
            width={400}
            height={200}
            className="object-cover"
            priority
          />
        </picture>
        <div className="whitespace-pre-wrap text-center text-caption text-text-03">{updateNote.description}</div>
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full text-body1 text-text-01"
            onClick={onClose}
          >
            {t("modalClose")}
          </Button>
        </div>
      </div>
    </ModalItem>
  );
};

export default UpdateNoteModal;
