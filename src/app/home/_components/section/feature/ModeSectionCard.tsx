import gardenMode from "@/assets/images/garden_mode.webp";
import miniMode from "@/assets/images/mini_mode.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ModeSectionCard = () => {
  const t = useTranslations("feature.mode");

  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-10 rounded-2xl bg-secondary-light py-[3.75rem]">
      <div className="w-full text-center font-galmuri text-subtitle text-text-04">{t("title")}</div>

      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-row items-center justify-center gap-10">
          <div className="h-[160px] w-[107px]">
            <Image src={miniMode} alt="miniMode" />
          </div>
          <div className="flex flex-col items-center">
            <div className="text-center font-galmuri text-body2 text-text-04">{t("miniMode.title")}</div>
            <br />
            <div className="whitespace-pre-line text-center font-galmuri text-caption text-text-04">
              {t("miniMode.description")}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-10">
          <div className="flex flex-col">
            <div className="text-center font-galmuri text-body2 text-text-04">{t("gardenMode.title")}</div>
            <br />
            <div className="whitespace-pre-line text-center font-galmuri text-caption text-text-04">
              {t("gardenMode.description")}
            </div>
          </div>
          <div className="h-[160px] w-[240px]">
            <Image src={gardenMode} alt="gardenMode" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSectionCard;
