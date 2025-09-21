"use client";

import seed from "@/assets/images/seed.webp";
import Pagination from "@/components/shared/Pagenation";
import { Button } from "@/components/ui/Button";
import { usePurchaseItem } from "@/lib/hooks/shop/usePurchaseItem";
import { ShopItem } from "@/lib/types/api/public";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface PotListProps {
  items: ShopItem[];
  loading: boolean;
}

const PotList = ({ items, loading }: PotListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const t = useTranslations("shop.pot");

  // 구매 훅 사용
  const { handlePurchase, isPending: purchasing } = usePurchaseItem();

  // 현재 페이지에 해당하는 아이템들
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentPotItems = items.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // TODO: 리팩토링 필요
  const SkeletonItem = () => (
    <li className="grid h-[220px] grid-rows-[1fr_auto] items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="h-[100px] w-[100px] animate-pulse rounded-lg bg-gray-300" />
        <div className="flex flex-row items-center gap-4">
          <div className="h-[33px] w-[24px] animate-pulse rounded bg-gray-300" />
          <div className="h-6 w-16 animate-pulse rounded bg-gray-300" />
        </div>
      </div>
      <div className="h-10 w-24 animate-pulse rounded bg-gray-300" />
    </li>
  );

  return (
    <section
      aria-labelledby="pot-list-title"
      className="shadow-strong relative mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-2xl bg-sageGreen-200 px-[60px] py-12 py-[3.75rem]"
    >
      <h2 id="pot-list-title" className="text-center text-heading text-primary-default">
        {t("title")}
      </h2>

      <div className="flex w-full flex-col gap-10">
        {loading ? (
          <ul className="flex w-full flex-row items-center justify-center gap-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </ul>
        ) : currentPotItems.length > 0 ? (
          <ul className="flex w-full flex-row items-center justify-center gap-10">
            {currentPotItems.map((item) => (
              <li key={item.id} className="grid h-[220px] grid-rows-[1fr_auto] items-center justify-center gap-6">
                <div className="flex flex-col items-center justify-center gap-6">
                  <figure className="flex h-[100px] w-[100px] justify-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-cover"
                      priority
                    />
                    <figcaption className="sr-only">{item.name}</figcaption>
                  </figure>

                  <div className="flex flex-row items-center gap-4">
                    <Image src={seed} alt="seed" width={24} height={33} />
                    <span className="text-title1 text-text-03">{item.price}</span>
                  </div>
                </div>
                <Button
                  size="md"
                  variant="secondaryLine"
                  className="flex items-center justify-center px-8 text-body1 !font-medium"
                  onClick={() => handlePurchase(item)}
                  disabled={purchasing}
                >
                  {purchasing ? t("purchasing") : t("purchase")}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-[400px] w-full flex-row items-center justify-center">
            <div className="text-center text-body1 text-text-03">{t("notReady")}</div>
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
          <div className="text-center text-subtitle text-text-01">{t("notReady2")}</div>
        </div>
      )}
    </section>
  );
};

export default PotList;
