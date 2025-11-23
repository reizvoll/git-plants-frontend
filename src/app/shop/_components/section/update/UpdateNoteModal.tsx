import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useBreakpoint } from "@/lib/hooks/common/useBreakpoints";
import { useModalKeyboard } from "@/lib/hooks/common/useModalKeyboard";
import type { UpdateNote } from "@/lib/types/api/public";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface UpdateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateNote: UpdateNote;
}

const UpdateNoteModal = ({ isOpen, onClose, updateNote }: UpdateNoteModalProps) => {
  const t = useTranslations("shop.update.updateModal");
  const breakpoint = useBreakpoint();

  useModalKeyboard({ isOpen, onClose });

  if (!isOpen) return null;

  return breakpoint === "mobile" ? (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      mode="mobile"
      maxWidth="800px"
      className="bg-bg-01"
      contentClassName="px-5 py-8"
    >
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-4">
          <h2 className="text-center text-subtitle font-bold text-text-04 xs:text-title1 s:text-subHeading">
            {t("modalTitle")}
          </h2>
          <p className="text-center text-body2 text-text-03 xs:text-body1 s:text-subtitle">{updateNote.title}</p>
        </div>

        <figure className="relative aspect-[2/1] w-full max-w-[400px]">
          <Image src={updateNote.imageUrl} alt="update note" fill className="object-cover" priority />
          <figcaption className="sr-only">update note</figcaption>
        </figure>

        <p className="whitespace-pre-wrap text-center text-caption text-text-03 xs:text-body2">
          {updateNote.description}
        </p>

        <div className="flex w-full gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            className="w-full text-body2 text-text-01 xs:text-body1"
            onClick={onClose}
          >
            {t("modalClose")}
          </Button>
        </div>
      </div>
    </Modal>
  ) : (
    <Modal isOpen={isOpen} onClose={onClose} mode="default">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-4">
          <h2 className="font-pretendard text-subHeading font-bold text-text-04">{t("modalTitle")}</h2>
          <p className="text-subtitle text-text-03">{updateNote.title}</p>
        </div>

        <figure className="relative aspect-[2/1] w-full max-w-[400px]">
          <Image src={updateNote.imageUrl} alt="update note" fill className="object-cover" priority />
          <figcaption className="sr-only">update note</figcaption>
        </figure>

        <p className="whitespace-pre-wrap text-center text-caption text-text-03">{updateNote.description}</p>

        <div className="flex w-full gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            className="w-full text-body1 text-text-01"
            onClick={onClose}
          >
            {t("modalClose")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateNoteModal;
