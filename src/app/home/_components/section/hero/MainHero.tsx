import plant from "@/assets/images/plants.png";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MainHero = () => {
  const t = useTranslations("main-hero");

  return (
    <div className="shadow-emphasize flex items-center justify-center gap-16 rounded-[1rem] bg-[#F4EBDC]/80 px-16 py-16">
      <div className="flex w-full flex-col items-start gap-20">
        <div className="flex w-full flex-col items-start gap-12">
          <div className="w-full whitespace-pre-line font-galmuri text-heading text-primary-default">{t("title")}</div>
          <div className="text-subtitle2 whitespace-pre-line font-galmuri text-primary-default">{t("subtitle")}</div>
        </div>
        <div className="flex w-full flex-row items-start gap-4">
          <Button variant="primary" size="md" className="flex items-center justify-center px-8 py-3">
            {t("startButton")}
          </Button>
          <Button variant="primaryLine" size="md" className="flex items-center justify-center px-8 py-3">
            {t("myPageButton")}
          </Button>
        </div>
      </div>
      <div className="shadow-normal flex h-60 w-60 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-01">
        <Image src={plant} alt="plant" width={200} height={200} className="object-contain" />
      </div>
    </div>
  );
};

export default MainHero;
