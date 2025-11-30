"use client";

import inventoryEight from "@/assets/images/inventory-lg.webp";
import inventorySix from "@/assets/images/inventory-md.webp";
import inventoryFour from "@/assets/images/inventory-sm.webp";
import inventoryTen from "@/assets/images/inventory-xl.webp";
import seed from "@/assets/images/seed.webp";
import InventorySlot, { SLOT_CONTENT_STYLE, SLOT_WRAPPER_STYLE } from "@/components/shared/InventorySlot";
import { Button } from "@/components/ui/Button";
import { useInventoryColumns } from "@/lib/hooks/common/useBreakpoints";
import { useSellCrops } from "@/lib/hooks/shop/useSellCrops";
import { useProfileStore } from "@/lib/store/profileStore";
import { useShopStore } from "@/lib/store/shopStore";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ROWS = 4;

const SellCropsSectionDesktop = () => {
  const { crops } = useProfileStore();
  const { selectedCropsForSale, toggleCropSelection, selectAllCrops, clearSelection } = useShopStore();
  const { handleSell } = useSellCrops();
  const t = useTranslations("shop.sellCrops");

  const cols = useInventoryColumns();
  const slotCount = cols * ROWS;

  // 수확된 작물들 (crops 배열을 직접 사용)
  const harvestableCrops = crops || [];

  // quantity > 0인 작물들만 필터링
  const availableCrops = harvestableCrops.filter((crop) => crop.quantity > 0);

  // 선택된 작물 개수와 총 판매가 계산
  const selectedCount = selectedCropsForSale.reduce((sum, item) => sum + item.count, 0);
  // TODO: 백엔드에서 판매가격 필드(sellingPrice) 추가 시 삭제 예정
  const totalPrice = selectedCount * 100;

  const handleSelectAll = () => selectAllCrops(harvestableCrops);
  const handleSellCrops = () => {
    handleSell(selectedCropsForSale, harvestableCrops);
    clearSelection();
  };
  const handleCancel = () => clearSelection();

  // 빈 슬롯 렌더링
  const renderEmptySlots = () => {
    const emptyCount = Math.max(0, slotCount - availableCrops.length);
    return Array.from({ length: emptyCount }, (_, i) => <InventorySlot key={`empty-${i}`} />);
  };

  return (
    <section
      aria-labelledby="sell-crops-section"
      className="shadow-strong tb:px-13 mx-auto hidden w-full flex-col items-center justify-center gap-10 rounded-2xl bg-sageGreen-200 px-7 py-12 mb:flex ml:px-12 lt:px-[60px]"
    >
      <h2
        id="sell-crops-section"
        className="text-center text-title1 text-primary-default tb:text-subHeading lt:text-heading"
      >
        {t("title")}
      </h2>

      <div className="flex w-full flex-col gap-6 ml:gap-10">
        {/* ml 이상에서만 보이는 헤더 */}
        <div className="hidden w-full flex-row items-center justify-between px-2 ml:flex tb:px-10 lt:px-[50px]">
          <div className="flex flex-row items-center gap-4 tb:gap-6">
            <p className="text-center text-title2 text-text-03 tb:text-subtitle lt:text-title1">
              {t("selectedCrops", { count: selectedCount })}
            </p>
            <Button size="sm" variant="primary" className="text-body1" onClick={handleSelectAll}>
              {t("selectAll")}
            </Button>
          </div>
          <div className="flex flex-row items-center gap-2 tb:gap-4">
            <p className="text-center text-title2 text-text-03 tb:text-subtitle lt:text-title1">{t("totalPrice")}</p>
            <Image src={seed} alt="seed" width={24} height={33} />
            <small className="text-center text-title2 text-text-03 tb:text-subtitle lt:text-title1">
              {totalPrice.toLocaleString()}
            </small>
          </div>
        </div>

        {/* ml 미만에서만 보이는 헤더 */}
        <div className="flex w-full flex-row items-center justify-center gap-8 ml:hidden">
          <p className="text-center text-title2 text-text-03">{t("selectedCrops", { count: selectedCount })}</p>
          <Button size="sm" variant="primary" className="text-body1" onClick={handleSelectAll}>
            {t("selectAll")}
          </Button>
        </div>

        {/* 픽셀 프레임 이미지 + CSS 그리드 */}
        <figure className="relative flex w-full flex-col">
          <Image src={inventoryFour} alt="inventory" priority className="w-full ml:hidden" />
          <Image src={inventorySix} alt="inventory" priority className="hidden w-full ml:block tb:hidden" />
          <Image src={inventoryEight} alt="inventory" priority className="hidden w-full tb:block lt:hidden" />
          <Image src={inventoryTen} alt="inventory" priority className="hidden w-full lt:block" />
          <figcaption className="sr-only">inventory</figcaption>

          {/* CSS 그리드 오버레이 */}
          <div className="absolute inset-0 p-[10%] ml:p-[8%] tb:p-[6%] lt:p-[4%]">
            <ul className="m-0 grid h-full list-none grid-cols-4 gap-2 p-0 leading-none ml:grid-cols-6 tb:grid-cols-8 lt:grid-cols-10">
              {availableCrops.map((crop) => {
                const selectedItem = selectedCropsForSale.find((item) => item.plantId === crop.id);
                const isSelected = Boolean(selectedItem);
                const remaining = crop.quantity - (selectedItem?.count || 0);

                return (
                  <li key={crop.id} className={SLOT_WRAPPER_STYLE}>
                    <button
                      type="button"
                      onClick={() => toggleCropSelection(crop.id)}
                      className="relative size-full"
                      aria-pressed={isSelected}
                      title={crop.monthlyPlant.name}
                    >
                      <div className={SLOT_CONTENT_STYLE}>
                        <div className="relative h-full w-full">
                          <Image
                            src={crop.monthlyPlant.cropImageUrl}
                            alt={crop.monthlyPlant.name}
                            className="object-contain"
                            fill
                          />
                        </div>
                      </div>

                      {isSelected && (
                        <span
                          className="absolute inset-0 rounded-md bg-primary-default bg-opacity-30"
                          aria-hidden="true"
                        />
                      )}

                      <span className="text-border absolute -bottom-1 -right-1 flex items-center justify-center text-body1 text-white mb:text-title1">
                        {remaining}
                      </span>
                    </button>
                  </li>
                );
              })}
              {renderEmptySlots()}
            </ul>

            {/* No crops 메시지 - 슬롯 전체를 감싸는 오버레이 */}
            {availableCrops.length === 0 && (
              <div className="absolute inset-6 flex items-center justify-center rounded-lg bg-black/50">
                <p className="text-center text-title2 text-text-01 tb:text-subtitle">{t("noCrops")}</p>
              </div>
            )}
          </div>
        </figure>

        {/* ml 미만에서만 보이는 합계 */}
        <div className="flex w-full flex-row items-center justify-center gap-4 ml:hidden">
          <Image src={seed} alt="seed" width={24} height={33} />
          <p className="text-center text-title2 text-text-03 tb:text-subtitle">
            {t("totalPrice")} {totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-6">
        <Button
          size="lg"
          variant="primary"
          className="flex min-w-[clamp(140px,20vw,200px)] items-center justify-center py-3 text-title2 tb:py-4 tb:text-subtitle"
          onClick={handleSellCrops}
        >
          {t("sell")}
        </Button>
        <Button
          size="lg"
          variant="disabledLine"
          className="flex min-w-[clamp(140px,20vw,200px)] items-center justify-center py-3 text-title2 tb:py-4 tb:text-subtitle"
          onClick={handleCancel}
        >
          {t("cancel")}
        </Button>
      </div>
    </section>
  );
};

export default SellCropsSectionDesktop;
