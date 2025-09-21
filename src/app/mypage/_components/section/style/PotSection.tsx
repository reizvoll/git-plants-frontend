import ArrowsOutCardinal from "@/assets/icons/arrows-out-cardinal.svg";
import DotsThree from "@/assets/icons/dots-three.svg";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UserItem } from "@/lib/types/api/profile";
import ItemGrid from "./ItemGrid";

interface PotSectionProps {
  currentPots: UserItem[];
  onPotSelect: (index: number) => void;
  potSelection: {
    isItemEquipped: (item: UserItem) => boolean;
    isLoading: boolean;
  };
  onOpenPotPositionModal: () => void;
  onNavigateToCollection: (mode: "POT") => void;
}

const PotSection = ({
  currentPots,
  onPotSelect,
  potSelection,
  onOpenPotPositionModal,
  onNavigateToCollection
}: PotSectionProps) => {
  const t = useTranslations("mypage.styleSection");
  const [showPotTooltip, setShowPotTooltip] = useState(false);
  const [showPotAdjustTooltip, setShowPotAdjustTooltip] = useState(false);

  return (
    <section aria-labelledby="pot-heading" className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-row items-center justify-between">
        <h3 id="pot-heading" className="text-body2 text-text-03">
          {t("pot")}
        </h3>
        <div className="flex flex-row items-center gap-4">
          <div className="relative">
            <button
              className="group flex items-center justify-center text-text-03"
              onClick={onOpenPotPositionModal}
              onMouseEnter={() => setShowPotAdjustTooltip(true)}
              onMouseLeave={() => setShowPotAdjustTooltip(false)}
              onFocus={() => setShowPotAdjustTooltip(true)}
              onBlur={() => setShowPotAdjustTooltip(false)}
              aria-describedby="pot-adj-tooltip"
              aria-label="adjustPotPosition"
            >
              <ArrowsOutCardinal className="h-4 w-4" />
            </button>
            <span
              id="pot-adj-tooltip"
              role="tooltip"
              aria-hidden={!showPotAdjustTooltip}
              className={`shadow-emphasize pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center transition-opacity ${
                showPotAdjustTooltip ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-caption text-primary-default">{t("adjustPotPosition")}</span>
            </span>
          </div>

          <div className="relative">
            <button
              className="group flex items-center justify-center text-text-04"
              onClick={() => onNavigateToCollection("POT")}
              onMouseEnter={() => setShowPotTooltip(true)}
              onMouseLeave={() => setShowPotTooltip(false)}
              onFocus={() => setShowPotTooltip(true)}
              onBlur={() => setShowPotTooltip(false)}
              aria-describedby="pot-tooltip"
              aria-label="more"
            >
              <DotsThree className="h-5 w-5" />
            </button>
            <span
              id="pot-tooltip"
              role="tooltip"
              aria-hidden={!showPotTooltip}
              className={`shadow-emphasize pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center transition-opacity ${
                showPotTooltip ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-caption text-primary-default">{t("more")}</span>
            </span>
          </div>
        </div>
      </div>

      <ItemGrid
        items={currentPots}
        onItemSelect={onPotSelect}
        isItemEquipped={potSelection.isItemEquipped}
        isLoading={potSelection.isLoading}
        itemSize={60}
        emptyMessage={t("noPot")}
      />
    </section>
  );
};

export default PotSection;