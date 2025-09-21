import Close from "@/assets/icons/Close";
import badgeSlot from "@/assets/images/badge_slot.webp";
import Modal from "@/components/ui/Modal";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Badge = {
  id: string;
  badge: {
    imageUrl: string;
    name: string;
  };
};

type BadgeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
};

const BadgeModal = ({ isOpen, onClose, badges }: BadgeModalProps) => {
  const t = useTranslations("mypage.badgeModal");
  return (
    <Modal isOpen={isOpen} onClose={onClose} mode="image">
      <section className="flex flex-col items-center gap-9">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-subHeading text-text-01">{t("title")}</h2>
          <button onClick={onClose} type="button" aria-label="close" className="relative p-2 text-heading text-text-01">
            <div className="absolute inset-0 z-10" />
            <div className="relative z-0">
              <Close width={36} height={36} />
            </div>
          </button>
        </div>

        <figure className="relative">
          <Image src={badgeSlot} alt="Badge slot background" priority />
          <figcaption className="sr-only">title</figcaption>

          <div className="absolute inset-0 flex -translate-x-[3px] -translate-y-[72px] transform flex-col items-center justify-center">
            <ul className="grid grid-cols-6 gap-7">
              {badges.map((badge) => (
                <li key={badge.id} className="group relative flex flex-col items-center">
                  <Image src={badge.badge.imageUrl} alt={badge.badge.name} width={120} height={120} />
                  <span className="text-body group-hover:shadow-emphasize absolute left-1/2 top-[-8px] -translate-x-1/2 -translate-y-full rounded-lg bg-bg-01 px-4 py-2 text-center text-primary-default opacity-0 transition-all duration-200 group-hover:opacity-100">
                    {badge.badge.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </figure>
      </section>
    </Modal>
  );
};

export default BadgeModal;
