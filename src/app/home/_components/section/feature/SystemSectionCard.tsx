import badges from "@/assets/images/badges.webp";
import seedRewards from "@/assets/images/seed_rewards.webp";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SystemSectionCard = () => {
  const t = useTranslations("feature.system");
  return (
    <div className="mx-auto flex h-[556px] w-full max-w-[800px] flex-col items-center justify-center rounded-2xl bg-secondary-light py-[3.75rem]">
      <div className="flex w-full flex-row items-center justify-center gap-20">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="whitespace-pre-line text-center font-galmuri text-body2 text-text-04">{t("title-left")}</div>
          <div className="w-[250px]">
            <Image src={seedRewards} alt="seedRewards" loading="lazy" />
          </div>
          <Button
            variant="secondaryStrong"
            size="sm"
            className="flex items-center justify-center px-6 py-2 font-medium"
          >
            {t("storeButton")}
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center gap-10">
          <div className="whitespace-pre-line text-center font-galmuri text-body2 text-text-04">{t("title-right")}</div>
          <div className="w-[200px]">
            <Image src={badges} alt="badges" loading="lazy" />
          </div>
          <Button
            variant="secondaryStrong"
            size="sm"
            className="flex items-center justify-center px-6 py-2 font-medium"
          >
            {t("badgeButton")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemSectionCard;
