import Close from "@/assets/icons/Close";
import ModalItem from "@/components/ui/Modal";
import Image from "next/image";

type BadgeNotificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  badge: {
    name: string;
    imageUrl: string;
  };
};

const BadgeNotificationModal = ({ isOpen, onClose, badge }: BadgeNotificationModalProps) => {
  return (
    <ModalItem isOpen={isOpen} onClose={onClose} mode="default">
      <div className="flex flex-col items-center gap-6">
        {/* 헤더 */}
        <div className="flex w-full items-center justify-between">
          <span className="text-title1 text-primary-default">New 뱃지!</span>
          <button
            onClick={onClose}
            className="relative p-2 text-heading text-primary-default transition-opacity hover:opacity-70"
          >
            <div className="absolute inset-0 z-10" />
            <div className="relative z-0">
              <Close width={32} height={32} />
            </div>
          </button>
        </div>

        {/* 뱃지 이미지 */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Image src={badge.imageUrl} alt={badge.name} width={120} height={120} />
          </div>

          {/* 뱃지 이름 */}
          <h3 className="text-center text-title2 font-bold text-text-04">{badge.name}</h3>
        </div>

        {/* 축하 메시지 */}
        <div className="text-center">
          <p className="mb-2 text-body1 text-primary-default">
            축하합니다! <br />
            새로운 뱃지를 획득했습니다.
          </p>
          <p className="text-caption text-primary-light">마이페이지에서 모든 뱃지를 확인할 수 있습니다.</p>
        </div>

        {/* 확인 버튼 */}
        <button onClick={onClose} className="w-full rounded-lg bg-primary-default px-6 py-3 font-medium text-white">
          확인
        </button>
      </div>
    </ModalItem>
  );
};

export default BadgeNotificationModal;
