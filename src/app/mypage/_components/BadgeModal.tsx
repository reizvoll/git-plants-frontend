import Close from "@/assets/icons/Close";
import badgeSlot from "@/assets/images/badge_slot.webp";
import ModalItem from "@/components/ui/Modal";
import Image from "next/image";

interface Badge {
  id: string;
  badge: {
    imageUrl: string;
    name: string;
  };
}

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
}

const BadgeModal = ({ isOpen, onClose, badges }: BadgeModalProps) => {
  return (
    <ModalItem isOpen={isOpen} onClose={onClose} mode="image">
      <div className="flex flex-col items-center gap-9">
        <div className="flex w-full items-center justify-between">
          <span className="text-subHeading text-text-01">뱃지 보관함</span>
          <button onClick={onClose} className="text-heading text-text-01">
            <Close width={36} height={36} />
          </button>
        </div>
        <Image src={badgeSlot} alt="badgeSlot" priority />
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="grid grid-cols-4 gap-6">
            {badges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center gap-2">
                <Image src={badge.badge.imageUrl} alt={badge.badge.name} width={80} height={80} />
                <span className="text-body text-white">{badge.badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalItem>
  );
};

export default BadgeModal;
