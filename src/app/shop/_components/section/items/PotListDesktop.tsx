"use client";

import seed from "@/assets/images/seed.webp";
import Pagination from "@/components/shared/Pagenation";
import { Button } from "@/components/ui/Button";
import ShopItemSkeleton from "@/components/ui/ShopItemSkeleton";
import { SHOP_ITEMS_LIMIT, SKELETON_COUNT } from "@/lib/constants/constants";
import { usePagination } from "@/lib/hooks/common/usePagination";
import { useResponsiveLimit } from "@/lib/hooks/common/useResponsiveLimit";
import { usePurchaseItem } from "@/lib/hooks/shop/usePurchaseItem";
import { ShopItem } from "@/lib/types/api/public";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PotListProps {
  items: ShopItem[];
  loading: boolean;
}

const PotListDesktop = ({ items, loading }: PotListProps) => {
  const t = useTranslations("shop.pot");

  // 구매 훅 사용
  const { handlePurchase, isPending: purchasing } = usePurchaseItem();

  // 반응형 limit
  const limit = useResponsiveLimit(SHOP_ITEMS_LIMIT.DESKTOP);

  // 페이지네이션
  const { currentPage, currentItems: currentPotItems, handlePageChange } = usePagination({ items, limit });

  return (
    <section
      aria-labelledby="pot-list-title"
      className="shadow-strong relative mx-auto hidden w-full flex-col items-center justify-center gap-8 rounded-2xl bg-sageGreen-200 px-10 py-10 mb:flex mb:gap-10 mb:px-[60px] mb:py-12 lt:py-[3.75rem]"
    >
      <h2
        id="pot-list-title"
        className="text-center text-title1 text-primary-default mb:text-subHeading lt:text-heading"
      >
        {t("title")}
      </h2>

      <div className="flex w-full flex-col gap-8 tb:gap-10">
        {loading ? (
          <ul className="flex w-full flex-wrap items-center justify-center gap-6 ml:gap-8 tb:gap-10">
            {Array.from({ length: SKELETON_COUNT.DESKTOP }).map((_, index) => (
              <ShopItemSkeleton key={index} variant="desktop" itemType="pot" />
            ))}
          </ul>
        ) : currentPotItems.length > 0 ? (
          <ul className="flex w-full flex-wrap items-center justify-center gap-6 ml:gap-8 tb:gap-10">
            {currentPotItems.map((item) => (
              <li
                key={item.id}
                className="flex w-[calc((100%-48px)/3)] max-w-[100px] flex-col items-center justify-center gap-6 ml:w-[calc((100%-96px)/4)] tb:w-[calc((100%-160px)/5)] lt:w-[calc((100%-200px)/6)]"
              >
                <figure className="relative aspect-square w-full overflow-hidden">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority />
                  <figcaption className="sr-only">{item.name}</figcaption>
                </figure>

                <dl className="flex flex-row items-center gap-2 tb:gap-4">
                  <dt className="sr-only">price</dt>
                  <dd className="flex items-center gap-2 tb:gap-4">
                    <Image src={seed} alt="seed" className="aspect-[8/11] w-[clamp(18px,2vw,24px)]" />
                    <span className="text-title2 text-text-03 tb:text-subtitle lt:text-title1">{item.price}</span>
                  </dd>
                </dl>

                <Button
                  size="md"
                  variant="secondaryLine"
                  className="flex w-full items-center justify-center text-body1 mb:!px-3 ml:!px-5"
                  onClick={() => handlePurchase(item)}
                  disabled={purchasing}
                >
                  {purchasing ? t("purchasing") : t("purchase")}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-[280px] w-full flex-row items-center justify-center mb:h-[340px] lt:h-[400px]">
            <div className="text-center text-caption text-text-03 mb:text-body1">{t("notReady")}</div>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {items.length > limit && (
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
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
          <div className="text-center text-body1 text-text-01 mb:text-title1 lt:text-subtitle">{t("notReady2")}</div>
        </div>
      )}
    </section>
  );
};

export default PotListDesktop;
