"use client";

import seed from "@/assets/images/seed.webp";
import Pagination from "@/components/shared/Pagenation";
import { Button } from "@/components/ui/Button";
import { useShopStore } from "@/lib/store/shopStore";
import { ShopItem } from "@/lib/types/api/public";
import Image from "next/image";
import { useState } from "react";

interface BackgroundListProps {
  items: ShopItem[];
  loading: boolean;
}

const BackgroundList = ({ items, loading }: BackgroundListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  // shop store에서 구매 관련 기능 가져오기
  const { purchaseItem, isLoading: purchasing } = useShopStore();

  // 현재 페이지에 해당하는 아이템들
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentBackgroundItems = items.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // 구매 핸들러 추가
  const handlePurchase = (item: ShopItem) => {
    purchaseItem(item);
  };

  // TODO: 리팩토링 필요
  const SkeletonItem = () => (
    <div className="grid h-[400px] grid-rows-[1fr_auto] items-center gap-6">
      <div className="flex items-center justify-center">
        <div className="h-[300px] w-[200px] animate-pulse rounded-lg bg-gray-300"></div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="h-[33px] w-[24px] animate-pulse rounded bg-gray-300"></div>
          <div className="h-6 w-16 animate-pulse rounded bg-gray-300"></div>
        </div>
        <div className="h-10 w-24 animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  );

  return (
    <div className="shadow-strong relative mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-2xl bg-sageGreen-200 px-[60px] py-12 py-[3.75rem]">
      <div className="text-center text-heading text-primary-default">배경화면</div>

      <div className="flex w-full flex-col gap-10">
        {loading ? (
          <div className="flex w-full flex-row items-end justify-center gap-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </div>
        ) : currentBackgroundItems.length > 0 ? (
          <div className="flex w-full flex-row items-end justify-center gap-10">
            {currentBackgroundItems.map((item) => (
              <div key={item.id} className="grid h-[400px] grid-rows-[1fr_auto] items-center gap-6">
                <div className="flex items-center justify-center">
                  <picture className="relative h-[300px] w-[200px] justify-center overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={200}
                      height={300}
                      className="object-cover"
                      priority
                    />
                  </picture>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-row items-center gap-4">
                    <Image src={seed} alt="seed" width={24} height={33} />
                    <span className="text-title1 text-text-03">{item.price}</span>
                  </div>
                  <Button
                    size="md"
                    variant="secondaryLine"
                    className="flex items-center justify-center px-8 text-body1 !font-medium"
                    onClick={() => handlePurchase(item)}
                    disabled={purchasing}
                  >
                    {purchasing ? "구매 중..." : "구매하기"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[400px] w-full flex-row items-center justify-center">
            <div className="text-center text-body1 text-text-03">준비 중입니다.</div>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {items.length > limit && (
        <Pagination
          Results={{ total: items.length }}
          page={currentPage}
          handlePageChange={handlePageChange}
          limit={limit}
        />
      )}

      {/* 오버레이 적용 */}
      {!loading && items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
          <div className="text-center text-subtitle text-text-01">
            배경화면이 아직 준비되지 않았습니다.
            <br />
            추후 업데이트를 기대해주세요!
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundList;
