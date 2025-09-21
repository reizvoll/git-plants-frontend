import seed from "@/assets/images/seed.webp";
import { formatDate } from "@/lib/utils/formatDate";
import { Crop } from "@/lib/types/api/profile";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface CropItemProps {
  crop: Crop;
}

const CropItem = ({ crop }: CropItemProps) => {
  const t = useTranslations("mypage.collectionSection");

  return (
    <li className="group relative size-[76px]">
      <div className="relative h-full w-full">
        <Image
          src={crop.monthlyPlant.cropImageUrl}
          alt={crop.monthlyPlant.name}
          className="object-contain"
          fill
        />
      </div>
      <div className="text-border absolute -bottom-1 -right-1 flex items-center justify-center text-title1 text-white">
        {crop.quantity}
      </div>
      <span
        aria-hidden="true"
        className="group-hover:shadow-emphasize absolute left-1/2 top-[-8px] flex -translate-x-1/2 -translate-y-full flex-col items-center justify-center whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center opacity-0 transition-all duration-200 group-hover:opacity-100"
      >
        <span className="block text-body2 text-primary-default">{crop.monthlyPlant.name}</span>
        <span className="text-mini text-brown-500">
          {t("acquiredAt")} {formatDate(crop.createdAt)}
        </span>
        <span className="text-mini text-brown-500">
          {t("quantity")} {crop.quantity} {t("unit")}
        </span>
        {/* TODO: 판매가격 필드 추가 필요 */}
        <span className="flex items-center gap-1 text-mini text-brown-500">
          {t("price")} <Image src={seed} alt="seed" width={9} height={9} /> 10
        </span>
      </span>
    </li>
  );
};

export default CropItem;