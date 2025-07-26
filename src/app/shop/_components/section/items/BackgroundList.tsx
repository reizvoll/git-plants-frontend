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

  if (loading) {
    return (
      <div className="shadow-strong mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-2xl bg-sageGreen-200 px-[60px] py-12 py-[3.75rem]">
        <div className="text-center text-heading text-primary-default">배경화면</div>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="shadow-strong mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-2xl bg-sageGreen-200 px-[60px] py-12 py-[3.75rem]">
      <div className="text-center text-heading text-primary-default">배경화면</div>

      <div className="flex w-full flex-col gap-10">
        {currentBackgroundItems.length > 0 ? (
          <div className="flex w-full flex-row items-end justify-center gap-10">
            {currentBackgroundItems.map((item) => (
              <div key={item.id} className="grid h-[400px] grid-rows-[1fr_auto] items-center gap-6">
                <div className="flex items-center justify-center">
                  <picture className="flex justify-center">
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
          <div>준비 중입니다.</div>
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
    </div>
  );
};

export default BackgroundList;
