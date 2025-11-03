import SlidersHorizontal from "@/assets/icons/sliders-horizontal.svg";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

type Mode = "GARDEN" | "MINI";

interface SizeControlsProps {
  currentMode: Mode;
  customSize: { width: number; height: number };
  onOpenSizeModal: () => void;
  onResetToDefault: () => void;
}

const SizeControls = ({ customSize, onOpenSizeModal, onResetToDefault }: SizeControlsProps) => {
  const t = useTranslations("mypage.styleSection");

  return (
    <div className="flex flex-col items-center gap-4 xs:gap-6">
      <div className="text-center text-caption text-text-03 xs:text-body1">
        {t("currentSize")}
        <br />
        <span className="text-caption text-text-03 xs:text-body1">
          {customSize.width} × {customSize.height} px
        </span>
      </div>

      <div className="flex w-full flex-col gap-1.5 xs:gap-2">
        <Button
          variant="primary"
          size="md"
          className="flex w-full flex-row items-center justify-center gap-2 px-3 py-2 text-caption xs:px-4 xs:py-2.5 xs:text-body1"
          onClick={onOpenSizeModal}
          aria-haspopup="dialog"
        >
          {t("adjustSize")}
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        <Button
          variant="primaryLine"
          size="md"
          className="flex w-full flex-row items-center justify-center gap-2 px-3 py-2 text-caption xs:px-4 xs:py-2.5 xs:text-body1"
          onClick={onResetToDefault}
        >
          {t("resetToDefault")}
        </Button>
      </div>
    </div>
  );
};

export default SizeControls;
