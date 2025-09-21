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

const SizeControls = ({
  currentMode,
  customSize,
  onOpenSizeModal,
  onResetToDefault
}: SizeControlsProps) => {
  const t = useTranslations("mypage.styleSection");

  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <div className="text-body2 text-text-03">
          {t("currentSize")}
          <br />
          <span className="text-body3 text-text-03">
            {customSize.width} × {customSize.height} px
          </span>
        </div>
      </div>

      <div className={`flex ${currentMode === "MINI" ? "flex-col items-center" : "flex-row items-start"} gap-2`}>
        <Button
          variant="primary"
          size="md"
          className="flex flex-row items-center gap-2 text-body1"
          onClick={onOpenSizeModal}
          aria-haspopup="dialog"
        >
          {t("adjustSize")}
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        <Button
          variant="primaryLine"
          size="md"
          className="flex flex-row items-center gap-2 text-body1"
          onClick={onResetToDefault}
        >
          {t("resetToDefault")}
        </Button>
      </div>
    </>
  );
};

export default SizeControls;