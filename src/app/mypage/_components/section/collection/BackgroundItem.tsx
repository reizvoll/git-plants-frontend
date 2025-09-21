import { formatDate } from "@/lib/utils/formatDate";
import { UserItem } from "@/lib/types/api/profile";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface BackgroundItemProps {
  background: UserItem;
}

const BackgroundItem = ({ background }: BackgroundItemProps) => {
  const t = useTranslations("mypage.collectionSection");

  return (
    <li className="group relative size-[76px]">
      <Image
        src={background.item.iconUrl}
        alt={background.item.name}
        className="object-cover"
        width={76}
        height={76}
        priority
      />
      <span
        aria-hidden="true"
        className="group-hover:shadow-emphasize absolute left-1/2 top-[-8px] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center opacity-0 transition-all duration-200 group-hover:opacity-100"
      >
        <span className="block text-body2 text-primary-default">{background.item.name}</span>
        <span className="text-mini text-brown-500">
          {t("acquiredAt")} {formatDate(background.acquiredAt)}
        </span>
      </span>
    </li>
  );
};

export default BackgroundItem;