import sysflow from "@/assets/images/system_flow.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const RewardSectionCard = () => {
  const t = useTranslations("feature.reward");
  return (
    <div className="mx-auto flex h-[556px] w-full max-w-[800px] flex-col items-center justify-center gap-10 rounded-2xl bg-secondary-light py-[3.75rem]">
      <div className="w-full text-center font-galmuri text-subtitle text-text-04">{t("title")}</div>

      <div className="h-auto w-[200px]">
        <Image src={sysflow} alt="systemFlow" loading="lazy" />
      </div>

      <div className="w-full whitespace-pre-line text-center font-galmuri text-body2 text-text-03">
        {t("description")}
      </div>
    </div>
  );
};

export default RewardSectionCard;
