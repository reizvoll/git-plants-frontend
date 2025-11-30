import Close from "@/assets/icons/Close";
import badgeSlot from "@/assets/images/badge_slot.webp";
import { BadgeSlot } from "@/components/shared/InventorySlot";
import Modal from "@/components/ui/Modal";
import { useModalKeyboard } from "@/lib/hooks/common/useModalKeyboard";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Badge = {
  id: string;
  badge: {
    imageUrl: string;
    name: string;
  };
};

type BadgeModalDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
};

const BadgeModalDesktop = ({ isOpen, onClose, badges }: BadgeModalDesktopProps) => {
  const t = useTranslations("mypage.badgeModal");
  const totalSlots = 12;
  const slots = Array.from({ length: totalSlots }, (_, index) => badges[index] || null);
  useModalKeyboard({ isOpen, onClose });

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

          <div className="absolute inset-0 flex items-center justify-center p-[clamp(14px,4.2vw,42px)]">
            <ul className="grid h-full w-full grid-cols-6 grid-rows-2 gap-[clamp(5px,0.75vw,22px)] p-[clamp(3px,0.9vw,9px)]">
              {slots.map((badge, index) => (
                <BadgeSlot key={badge?.id || `empty-${index}`} badge={badge?.badge} />
              ))}
            </ul>
          </div>
        </figure>
      </section>
    </Modal>
  );
};

export default BadgeModalDesktop;
