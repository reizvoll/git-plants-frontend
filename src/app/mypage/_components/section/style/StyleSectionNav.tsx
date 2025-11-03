import Export from "@/assets/icons/export.svg";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { useTranslations } from "next-intl";

type Mode = "GARDEN" | "MINI";

interface Equipped {
  backgrounds?: unknown[];
  pots?: unknown[];
}

interface User {
  username: string;
}

interface StyleSectionNavProps {
  currentMode: Mode;
  onModeChange: (selectedLabel: string) => void;
  user: User | null;
  equipped: Equipped | null;
  customSize: { width: number; height: number };
  potPosition: { x: number; y: number };
  addToast: (message: string, type: "success" | "warning") => void;
}

const StyleSectionNav = ({
  currentMode,
  onModeChange,
  user,
  equipped,
  customSize,
  potPosition,
  addToast
}: StyleSectionNavProps) => {
  const t = useTranslations("mypage.styleSection");

  const handleCopyLink = async () => {
    try {
      if (user?.username) {
        const hasEquippedBackground = equipped?.backgrounds && equipped.backgrounds.length > 0;
        const hasEquippedPot = equipped?.pots && equipped.pots.length > 0;
        if (!hasEquippedBackground || !hasEquippedPot) {
          addToast(t("haveEquipped"), "warning");
          return;
        }
        const baseUrl = window.location.origin;
        const apiUrl = `${baseUrl}/api/mypage/${user.username}?format=gif&mode=${currentMode}&width=${customSize.width}&height=${customSize.height}&potX=${potPosition.x}&potY=${potPosition.y}`;
        const mdx = `[![${user.username}'s Garden](${apiUrl})](${baseUrl})`;
        await navigator.clipboard.writeText(mdx);
        addToast(t("copyLinkSuccess"), "success");
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      addToast(t("copyLinkError"), "warning");
    }
  };

  return (
    <>
      {/* Mobile Nav */}
      <div className="flex w-full flex-row items-start justify-end gap-[10px] mb:hidden">
        <div className="hidden s:inline sm:hidden">
          <Dropdown
            items={[
              {
                label: t("item_mini"),
                displayLabel: t("item_mini_mobile"),
                onClick: () => onModeChange(t("item_mini")),
                active: currentMode === "MINI"
              },
              {
                label: t("item_garden"),
                displayLabel: t("item_garden_mobile"),
                onClick: () => onModeChange(t("item_garden")),
                active: currentMode === "GARDEN"
              }
            ]}
            className="font-pretendard text-caption text-sageGreen-900 xs:text-body1"
            mode="click"
          />
        </div>

        <div className="hidden sm:inline">
          <Dropdown
            items={[
              {
                label: t("item_mini"),
                displayLabel: t("item_mini_mobile"),
                onClick: () => onModeChange(t("item_mini")),
                active: currentMode === "MINI"
              },
              {
                label: t("item_garden"),
                displayLabel: t("item_garden_mobile"),
                onClick: () => onModeChange(t("item_garden")),
                active: currentMode === "GARDEN"
              }
            ]}
            className="font-pretendard text-caption text-sageGreen-900 xs:text-body1"
            mode="click"
          />
        </div>

        <Button
          variant="secondaryLine"
          size="md"
          className="shadow-normal flex items-center gap-2 text-caption xs:text-body1"
          aria-label="copyLink"
          onClick={handleCopyLink}
        >
          {t("copyLinkMobile")}
          <Export className="h-5 w-5" />
        </Button>
      </div>

      {/* Desktop/Tablet Nav */}
      <div className="hidden h-12 w-full flex-row items-start justify-end gap-[10px] mb:flex">
        <Dropdown
          items={[
            {
              label: t("item_mini"),
              onClick: () => onModeChange(t("item_mini")),
              active: currentMode === "MINI"
            },
            {
              label: t("item_garden"),
              onClick: () => onModeChange(t("item_garden")),
              active: currentMode === "GARDEN"
            }
          ]}
          className="font-pretendard text-caption text-sageGreen-900 xs:text-body1"
          mode="click"
        />

        <Button
          variant="secondaryLine"
          size="md"
          className="shadow-normal flex items-center gap-2 text-caption xs:text-body1"
          aria-label="copyLink"
          onClick={handleCopyLink}
        >
          {t("copyLink")}
          <Export className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default StyleSectionNav;
