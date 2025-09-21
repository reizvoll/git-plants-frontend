import { formatDate } from "@/lib/utils/formatDate";
import { UserItem } from "@/lib/types/api/profile";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PotItemProps {
  pot: UserItem;
}

const PotItem = ({ pot }: PotItemProps) => {
  const t = useTranslations("mypage.collectionSection");

  return (
    <li className="group relative size-[66px]">
      <Image src={pot.item.iconUrl} alt={pot.item.name} width={66} height={66} className="object-cover" />
      <span
        aria-hidden="true"
        className="group-hover:shadow-emphasize absolute left-1/2 top-[-8px] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-bg-01 px-4 py-3 text-center opacity-0 transition-all duration-200 group-hover:opacity-100"
      >
        <span className="block text-body2 text-primary-default">{pot.item.name}</span>
        <span className="text-mini text-brown-500">
          {t("acquiredAt")} {formatDate(pot.acquiredAt)}
        </span>
      </span>
    </li>
  );
};

export default PotItem;