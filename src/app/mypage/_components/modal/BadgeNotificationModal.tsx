import Close from "@/assets/icons/Close";
import Modal from "@/components/ui/Modal";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("mypage.badgeNotification");
  return (
    <Modal isOpen={isOpen} onClose={onClose} mode="default">
      <article className="flex flex-col items-center gap-6">
        {/* 제목 */}
        <div className="flex w-full items-center justify-between">
          <h2 className="text-title1 text-primary-default">{t("title")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-heading text-primary-default transition-opacity hover:opacity-70"
          >
            <Close width={32} height={32} />
          </button>
        </div>

        {/* 뱃지 이미지 */}
        <figure className="flex flex-col items-center gap-4">
          <Image src={badge.imageUrl} alt={badge.name} width={120} height={120} />
          <figcaption>
            {/* 뱃지 이름 */}
            <h3 className="text-center text-title2 font-bold text-text-04">{badge.name}</h3>
          </figcaption>
        </figure>

        {/* 축하 메시지 */}
        <div className="text-center">
          <p className="mb-2 text-body1 text-primary-default">{t("congratulation")}</p>
          <p className="text-caption text-primary-light">{t("description")}</p>
        </div>

        {/* 확인 버튼 */}
        <div className="w-full">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-primary-default px-6 py-3 font-medium text-white"
          >
            {t("check")}
          </button>
        </div>
      </article>
    </Modal>
  );
};

export default BadgeNotificationModal;
