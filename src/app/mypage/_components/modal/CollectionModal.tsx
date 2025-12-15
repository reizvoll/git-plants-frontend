"use client";

import plant from "@/assets/images/plant_icon.png";
import { EmptyState } from "@/components/shared/EmptyState";
import FullScreenModal from "@/components/ui/FullScreenModal";
import { useProfileStore } from "@/lib/store/profileStore";
import { useToastStore } from "@/lib/store/useToaststore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";

type CollectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CollectionModal = ({ isOpen, onClose }: CollectionModalProps) => {
  const { items, crops } = useProfileStore();
  const addToast = useToastStore((s) => s.addToast);
  const t = useTranslations("mypage.collectionSection.modal");
  const ts = useTranslations("mypage.collectionSection");

  // 아이템 분류
  const backgrounds = items.filter((item) => item.item.category === "background");
  const pots = items.filter((item) => item.item.category === "pot");
  const ownedCrops = crops;

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      hasShownToast.current = false;
      return;
    }

    const hasNoItems = ownedCrops.length === 0 && backgrounds.length === 0 && pots.length === 0;

    if (hasNoItems && !hasShownToast.current) {
      hasShownToast.current = true;
      addToast(ts("noItemMessage"), "warning");
    }
  }, [isOpen, backgrounds.length, pots.length, ownedCrops.length, addToast, ts]);

  const hasAnyItems = ownedCrops.length > 0 || backgrounds.length > 0 || pots.length > 0;

  return (
    <FullScreenModal isOpen={isOpen} onClose={onClose} title={t("title")}>
      <section className="flex flex-1 flex-col items-center gap-[8vw] bg-bg-02 px-3 py-6 xs:px-4 xs:py-8">
        <figure className="flex flex-row items-center justify-center gap-2 self-start xs:gap-3">
          <Image src={plant} alt="plant" width={32} height={32} className="xs:h-10 xs:w-10" />
          <figcaption className="sr-only">{t("title")}</figcaption>
          <div className="flex flex-col items-start">
            <h3 className="font-pretendard text-caption font-bold text-text-04 xs:text-body1">{t("subTitle")}</h3>
            <p className="font-pretendard text-small text-text-03 xs:text-caption">{t("subDescription")}</p>
          </div>
        </figure>

        {hasAnyItems ? (
          <article className="flex w-full flex-col gap-[8vw] px-1 xs:px-2">
            {/* 작물 섹션 */}
            {ownedCrops.length > 0 && (
              <div className="flex flex-col gap-3 xs:gap-4">
                <h4 className="text-body1 font-bold text-text-04 xs:text-title2">{ts("crop")}</h4>
                <ul className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide xs:gap-4">
                  {ownedCrops.map((crop) => (
                    <li key={crop.id} className="relative flex-shrink-0">
                      <div className="relative size-[50px] xs:size-[60px] s:size-[60px]">
                        <Image
                          src={crop.monthlyPlant.cropImageUrl}
                          alt={crop.monthlyPlant.name}
                          className="object-contain"
                          fill
                        />
                      </div>
                      <span className="text-border absolute -bottom-1 -right-1 flex items-center justify-center text-mini text-white xs:text-caption s:text-body2">
                        {crop.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 배경화면 섹션 */}
            {backgrounds.length > 0 && (
              <div className="flex flex-col gap-3 xs:gap-4">
                <h4 className="text-body1 font-bold text-text-04 xs:text-title2">{ts("background")}</h4>
                <ul className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide xs:gap-4">
                  {backgrounds.map((background) => (
                    <li key={background.id} className="relative flex-shrink-0">
                      <Image
                        src={background.item.iconUrl}
                        alt={background.item.name}
                        width={60}
                        height={60}
                        className="h-[50px] w-[50px] object-cover xs:h-[60px] xs:w-[60px] s:h-[60px] s:w-[60px]"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 화분 섹션 */}
            {pots.length > 0 && (
              <div className="flex flex-col gap-3 xs:gap-4">
                <h4 className="text-body1 font-bold text-text-04 xs:text-title2">{ts("pot")}</h4>
                <ul className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide xs:gap-4">
                  {pots.map((pot) => (
                    <li key={pot.id} className="relative flex-shrink-0">
                      <Image
                        src={pot.item.iconUrl}
                        alt={pot.item.name}
                        width={60}
                        height={60}
                        className="h-[50px] w-[50px] object-cover xs:h-[60px] xs:w-[60px] s:h-[60px] s:w-[60px]"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ) : (
          <EmptyState title={t("noItems")} className="-translate-y-8 text-small xs:text-caption s:text-body1" />
        )}
      </section>
    </FullScreenModal>
  );
};

export default CollectionModal;
