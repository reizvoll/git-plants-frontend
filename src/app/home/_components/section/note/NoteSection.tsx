import corn1 from "@/assets/images/corn1.webp";
import corn2 from "@/assets/images/corn2.webp";
import note from "@/assets/images/note.webp";
import plant from "@/assets/images/plant_icon.png";
import { useTranslations } from "next-intl";
import Image from "next/image";

//Todo : refactoring code, and explore strategies for connecting with the back office.
const NoteSection = () => {
  const t = useTranslations("plants-note");
  return (
    <div className="flex w-full justify-center">
      <div className="relative h-[634px] w-[1000px]">
        <Image src={note} alt="Note" className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center px-12 py-20">
          <div className="flex w-full flex-row items-center justify-center gap-20">
            {/* Left Frame - Content Section */}
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Section Title */}
              <div className="flex flex-col items-center gap-6">
                {/* Heading */}
                <div className="text-center font-galmuri text-title1 text-primary-strong">
                  {t("title")}
                  <br />
                  {t("plant")}
                </div>

                {/* Text */}
                <div className="whitespace-pre-line text-center font-galmuri text-body2 text-primary-strong">
                  {t("description")}
                </div>
              </div>

              {/* Plant Image */}
              <div className="h-[233px] w-[350px]">
                <Image src={corn2} alt="corn" />
              </div>
            </div>

            {/* Right Frame */}
            <div className="flex flex-col items-center justify-center gap-16">
              {/* Main Character Image */}
              <div className="h-[196px] w-[196px] rounded-full bg-bg-01">
                <Image src={corn1} alt="corn" />
              </div>

              {/* Content */}
              <div className="flex flex-col items-center gap-4">
                {/* Row */}
                <div className="flex flex-row gap-8">
                  {/* First List Item */}
                  <div className="flex w-auto flex-grow flex-col items-start gap-4">
                    {/* Icon */}
                    <div className="h-[43px] w-12">
                      <Image src={plant} alt="icon" />
                    </div>

                    {/* Subheading */}
                    <div className="font-pretendard text-title2 font-bold text-text-04">{t("growth_stage.title")}</div>

                    {/* Text */}
                    <p className="whitespace-pre-line font-pretendard text-caption text-text-04">
                      {t("growth_stage.description")}
                    </p>
                  </div>

                  {/* Second List Item */}
                  <div className="flex w-auto flex-grow flex-col items-start gap-4">
                    {/* Icon */}
                    <div className="h-[43px] w-12">
                      <Image src={plant} alt="icon" />
                    </div>

                    {/* Subheading */}
                    <div className="font-pretendard text-title2 font-bold text-text-04">{t("start_now.title")}</div>

                    {/* Text */}
                    <p className="whitespace-pre-line font-pretendard text-caption text-text-04">
                      {t("start_now.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteSection;
