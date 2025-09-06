import { useTranslations } from "next-intl";
import ContributionsTab from "./ContributionsTab";

const HowItWorksSection = () => {
  const t = useTranslations("feature.how-it-works");
  return (
    <div className="relative mx-auto flex w-full max-w-[1000px] items-center justify-center rounded-2xl bg-brown-100 px-[96px] py-10">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-6">
          <div className="text-center font-galmuri text-subtitle text-text-04">{t("title")}</div>
          <div className="whitespace-pre-line text-center font-galmuri text-caption text-text-03">
            {t("description")}
          </div>
        </div>
        <ContributionsTab />
      </div>
    </div>
  );
};

export default HowItWorksSection;
