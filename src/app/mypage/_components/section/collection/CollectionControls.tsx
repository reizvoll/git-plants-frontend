import Funnel from "@/assets/icons/funnel.svg";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { CollectionMode, SortType } from "@/lib/hooks/mypage/useCollectionSort";
import { useTranslations } from "next-intl";

interface CollectionControlsProps {
  currentMode: CollectionMode;
  onModeChange: (mode: CollectionMode) => void;
  sortOptions: Array<{ label: string; value: SortType; active: boolean }>;
  onSortChange: (sort: SortType) => void;
  onResetSort: () => void;
}

const CollectionControls = ({
  currentMode,
  onModeChange,
  sortOptions,
  onSortChange,
  onResetSort
}: CollectionControlsProps) => {
  const t = useTranslations("mypage.collectionSection");

  return (
    <div className="hidden h-12 w-full flex-row items-start justify-between gap-3 mb:flex">
      <Dropdown
        items={[
          { label: t("crop"), onClick: () => onModeChange("CROP"), active: currentMode === "CROP" },
          {
            label: t("background"),
            onClick: () => onModeChange("BACKGROUND"),
            active: currentMode === "BACKGROUND"
          },
          { label: t("pot"), onClick: () => onModeChange("POT"), active: currentMode === "POT" }
        ]}
        className="font-pretendard text-body1 text-sageGreen-900"
        mode="click"
      />
      <div className="flex flex-row gap-2 ml:gap-[10px]">
        <Dropdown
          items={sortOptions.map((option) => ({
            ...option,
            onClick: () => onSortChange(option.value)
          }))}
          className="font-pretendard text-body1 text-sageGreen-900"
          mode="click"
        />
        <Button
          variant="primary"
          size="md"
          className="shadow-normal flex items-center gap-2 text-body1"
          onClick={onResetSort}
        >
          <span className="max-w-[80px] truncate ml:max-w-none">{t("resetSort")}</span>
          <Funnel className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CollectionControls;
