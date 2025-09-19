import upcomingEvent from "@/assets/images/upcoming_event.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const UpdateSectionCard = () => {
  const t = useTranslations("feature.update");

  return (
    <div className="mx-auto flex h-[556px] w-full max-w-[800px] flex-col items-center justify-center rounded-2xl bg-secondary-light py-[3.75rem]">
      <div className="flex flex-row items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="text-center font-galmuri text-title1 text-text-04">Update Soon!</div>
          <div className="text-center font-galmuri text-body2 text-text-03">{t("description")}</div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-[250px]">
            <Image src={upcomingEvent} alt="upcomingEvent" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSectionCard;
