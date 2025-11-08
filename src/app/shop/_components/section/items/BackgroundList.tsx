"use client";

import seed from "@/assets/images/seed.webp";
import Pagination from "@/components/shared/Pagenation";
import { Button } from "@/components/ui/Button";
import ShopItemSkeleton from "@/components/ui/ShopItemSkeleton";
import { SKELETON_COUNT } from "@/lib/constants/constants";
import { useEmblaSlider } from "@/lib/hooks/common/useEmblaSlider";
import { usePurchaseItem } from "@/lib/hooks/shop/usePurchaseItem";
import { ShopItem } from "@/lib/types/api/public";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface BackgroundListProps {
  items: ShopItem[];
  loading: boolean;
}

const BackgroundList = ({ items, loading }: BackgroundListProps) => {
  const t = useTranslations("shop.background");

  // 구매 훅 사용
  const { handlePurchase, isPending: purchasing } = usePurchaseItem();

  // Embla 슬라이더 훅
  const { emblaRef, currentPage, limit, groupedItems, totalPages, handlePageChange } = useEmblaSlider(items);

  return (
    <section
      aria-labelledby="background-list"
      className="relative mx-auto flex w-full flex-col items-center justify-center gap-10 px-5 py-12 mb:hidden"
    >
      <h2 id="background-list" className="text-center text-title2 text-primary-default xs:text-subtitle s:text-title1">
        {t("title")}
      </h2>

      <div className="flex w-full flex-col gap-4">
        {loading ? (
          <ul className="flex w-full flex-wrap items-center justify-center gap-6">
            {Array.from({ length: SKELETON_COUNT.MOBILE }).map((_, index) => (
              <ShopItemSkeleton key={index} variant="mobile" itemType="background" />
            ))}
          </ul>
        ) : items.length > 0 ? (
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {groupedItems.map((group, groupIndex) => (
                <div key={groupIndex} className="flex min-w-0 flex-[0_0_100%]">
                  <ul className="flex w-full flex-wrap items-center justify-center gap-6">
                    {group.map((item) => (
                      <li key={item.id} className="flex w-[clamp(40px,20vw,100px)] flex-col items-center gap-4">
                        <figure className="relative aspect-[2/3] w-full overflow-hidden">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority />
                          <figcaption className="sr-only">{item.name}</figcaption>
                        </figure>

                        <div className="flex flex-row items-center gap-2">
                          <Image src={seed} alt="seed" width={13} height={18} />
                          <span className="text-caption text-text-03">{item.price}</span>
                        </div>

                        <Button
                          size="sm"
                          variant="secondaryLine"
                          className="flex !h-[33px] w-full items-center justify-center text-mini s:text-small sm:!h-11"
                          onClick={() => handlePurchase(item)}
                          disabled={purchasing}
                        >
                          {purchasing ? t("purchasing") : t("purchase")}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-[200px] w-full items-center justify-center">
            <div className="text-center text-caption text-text-03">{t("notReady")}</div>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <nav aria-label="paginationAria">
          <Pagination
            Results={{ total: items.length }}
            page={currentPage}
            handlePageChange={handlePageChange}
            limit={limit}
          />
        </nav>
      )}

      {/* 오버레이 적용 */}
      {!loading && items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50">
          <div className="whitespace-pre-line text-center text-caption text-text-01 xs:text-body2 s:text-title2">
            {t("notReady2")}
          </div>
        </div>
      )}
    </section>
  );
};

export default BackgroundList;
