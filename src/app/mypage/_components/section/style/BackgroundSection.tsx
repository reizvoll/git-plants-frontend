import DotsThree from "@/assets/icons/dots-three.svg";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UserItem } from "@/lib/types/api/profile";
import ItemGrid from "./ItemGrid";

interface BackgroundSectionProps {
  currentBackgrounds: UserItem[];
  onBackgroundSelect: (index: number) => void;
  backgroundSelection: {
    isItemEquipped: (item: UserItem) => boolean;
    isLoading: boolean;
  };
  onNavigateToCollection: (mode: "BACKGROUND") => void;
}

const BackgroundSection = ({
  currentBackgrounds,
  onBackgroundSelect,
  backgroundSelection,
  onNavigateToCollection
}: BackgroundSectionProps) => {
  const t = useTranslations("mypage.styleSection");
  const [showBackgroundTooltip, setShowBackgroundTooltip] = useState(false);

  return (
    <section aria-labelledby="bg-heading" className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-row items-center justify-between">
        <h3 id="bg-heading" className="text-body2 text-text-03">
          {t("background")}
        </h3>
        <div className="relative">
          <button
            className="group text-text-04"
            onClick={() => onNavigateToCollection("BACKGROUND")}
            onMouseEnter={() => setShowBackgroundTooltip(true)}
            onMouseLeave={() => setShowBackgroundTooltip(false)}
            onFocus={() => setShowBackgroundTooltip(true)}
            onBlur={() => setShowBackgroundTooltip(false)}
            aria-describedby="bg-tooltip"
            aria-label="more"
          >
            <DotsThree className="h-5 w-5" />
          </button>
          <span
            id="bg-tooltip"
            role="tooltip"
            aria-hidden={!showBackgroundTooltip}
            className={`shadow-emphasize pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center transition-opacity tb:block ${
              showBackgroundTooltip ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-caption text-primary-default">{t("more")}</span>
          </span>
        </div>
      </div>

      <ItemGrid
        items={currentBackgrounds}
        onItemSelect={onBackgroundSelect}
        isItemEquipped={backgroundSelection.isItemEquipped}
        isLoading={backgroundSelection.isLoading}
        itemSize={80}
        emptyMessage={t("noBackground")}
      />
    </section>
  );
};

export default BackgroundSection;