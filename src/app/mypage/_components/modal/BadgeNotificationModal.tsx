import Close from "@/assets/icons/Close";
import Modal from "@/components/ui/Modal";
import { useIsMobile } from "@/lib/hooks/common/useBreakpoints";
import { useModalKeyboard } from "@/lib/hooks/common/useModalKeyboard";
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
  const isMobile = useIsMobile();

  useModalKeyboard({
    isOpen,
    onClose,
    onSubmit: onClose,
    enableSubmit: true
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} mode={isMobile ? "mobile" : "default"} className="bg-bg-01 px-5 py-6">
      <article className="flex flex-col items-center gap-6">
        {/* 제목 */}
        <div className="flex w-full items-center justify-between">
          <h2 className="text-body2 text-primary-default xs:text-subtitle mb:text-title1">{t("title")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-primary-default transition-opacity tb:hover:opacity-70"
          >
            <Close className="h-[clamp(20px,6vw,32px)] w-[clamp(20px,6vw,32px)]" />
          </button>
        </div>

        {/* 뱃지 이미지 */}
        <figure className="flex flex-col items-center gap-4">
          <Image src={badge.imageUrl} alt={badge.name} width={120} height={120} />
          <figcaption>
            {/* 뱃지 이름 */}
            <h3 className="text-center text-caption font-bold text-text-04 xs:text-body2 mb:text-title2">
              {badge.name}
            </h3>
          </figcaption>
        </figure>

        {/* 축하 메시지 */}
        <div className="text-center">
          <p className="mb-2 text-center text-caption font-bold text-primary-default xs:text-body2 mb:text-title2">
            {t("congratulation")}
          </p>
          <p className="text-center text-small font-bold text-primary-light xs:text-caption mb:text-body2">
            {t("description")}
          </p>
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
