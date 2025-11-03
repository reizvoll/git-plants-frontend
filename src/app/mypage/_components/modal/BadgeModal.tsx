import Close from "@/assets/icons/Close";
import plant from "@/assets/images/plant_icon.png";
import { EmptyState } from "@/components/shared/EmptyState";
import FullScreenModal from "@/components/ui/FullScreenModal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

type Badge = {
  id: string;
  awardedAt: string;
  badge: {
    id: number;
    name: string;
    condition: string;
    imageUrl: string;
  };
};

type BadgeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
};

const BadgeModal = ({ isOpen, onClose, badges }: BadgeModalProps) => {
  const t = useTranslations("mypage.badgeModal");
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  return (
    <FullScreenModal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <section className="flex flex-1 flex-col items-center bg-bg-02 px-4 pt-8">
        <figure className="flex flex-row items-center justify-center gap-3 self-start">
          <Image src={plant} alt="plant" width={40} height={40} />
          <figcaption className="sr-only">plant</figcaption>
          <div className="flex flex-col items-start">
            <h3 className="font-pretendard text-caption font-bold text-text-04 xs:text-body1">{t("subTitle")}</h3>
            <p className="font-pretendard text-small text-text-03 xs:text-caption">{t("subDescription")}</p>
          </div>
        </figure>

        {badges.length > 0 ? (
          <article className="flex flex-col items-center gap-6 px-4 pt-5">
            <ul className="grid grid-cols-3 gap-5">
              {badges.map((badge) => (
                <li key={badge.id} className="group relative flex flex-col items-center">
                  <button type="button" onClick={() => setSelectedBadge(badge)} className="cursor-pointer">
                    <Image
                      src={badge.badge.imageUrl}
                      alt={badge.badge.name}
                      width={80}
                      height={80}
                      className="h-[80px] w-[80px] xs:h-[90px] xs:w-[90px] sm:h-[100px] sm:w-[100px]"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ) : (
          <EmptyState title={t("noBadge")} className="-translate-y-8 text-small xs:text-caption s:text-body1" />
        )}

        {/* 뱃지 상세 모달 */}
        {selectedBadge && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <article
              className="relative w-full max-w-[400px] rounded-2xl bg-bg-01 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBadge(null)}
                type="button"
                aria-label="close"
                className="absolute right-4 top-4 cursor-pointer"
              >
                <Close width={24} height={24} />
              </button>

              <div className="flex flex-col items-center gap-6">
                <h3 className="font-pretendard text-title1 font-bold text-text-04">{selectedBadge.badge.name}</h3>

                <Image
                  src={selectedBadge.badge.imageUrl}
                  alt={selectedBadge.badge.name}
                  width={120}
                  height={120}
                  className="h-[120px] w-[120px]"
                />

                <div className="flex flex-col items-center gap-2">
                  <p className="whitespace-pre-line text-center font-pretendard text-body2 text-text-03">
                    {/* TODO: 응답값 한국어도 받도록 수정할 것. */}
                    {selectedBadge.badge.condition}
                  </p>
                  <p className="font-pretendard text-caption text-text-03">
                    {t("earnedDate")}: {new Date(selectedBadge.awardedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </article>
          </div>
        )}
      </section>
    </FullScreenModal>
  );
};

export default BadgeModal;
