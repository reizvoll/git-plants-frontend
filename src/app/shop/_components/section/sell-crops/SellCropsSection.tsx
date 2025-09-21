"use client";

import inventory from "@/assets/images/inventory.webp";
import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useSellCrops } from "@/lib/hooks/shop/useSellCrops";
import { useProfileStore } from "@/lib/store/profileStore";
import { useShopStore } from "@/lib/store/shopStore";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SellCropsSection = () => {
  const { crops } = useProfileStore();
  const { selectedCropsForSale, toggleCropSelection, selectAllCrops, clearSelection } = useShopStore();
  const { handleSell } = useSellCrops();
  const t = useTranslations("shop.sellCrops");

  // 수확된 작물들 (crops 배열을 직접 사용)
  const harvestableCrops = crops || [];

  // quantity > 0인 작물들만 필터링
  const availableCrops = harvestableCrops.filter((crop) => crop.quantity > 0);

  // 선택된 작물 개수와 총 판매가 계산
  const selectedCount = selectedCropsForSale.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = selectedCount * 100; // 임시로 개당 100 seed

  const handleSelectAll = () => selectAllCrops(harvestableCrops);
  const handleSellCrops = () => {
    handleSell(selectedCropsForSale, harvestableCrops);
    clearSelection();
  };
  const handleCancel = () => clearSelection();

  return (
    <section
      aria-labelledby="sell-crops-section"
      className="shadow-strong mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-2xl bg-sageGreen-200 px-[60px] py-12 py-[3.75rem]"
    >
      <h2 id="sell-crops-section" className="text-center text-heading text-primary-default">
        Sell Crops Section
      </h2>

      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-row items-center justify-between px-[50px]">
          <div className="flex flex-row items-center gap-6">
            <p className="text-center text-title1 text-text-03">
              {t("selectedCrops")} {selectedCount} {t("unit")}
            </p>
            <Button size="sm" variant="primary" className="text-body1 !font-medium" onClick={handleSelectAll}>
              {t("selectAll")}
            </Button>
          </div>
          <div className="flex flex-row items-center gap-4">
            <p className="text-center text-title1 text-text-03">{t("totalPrice")} :</p>
            <Image src={seed} alt="seed" width={24} height={33} />
            <small className="text-title1 text-text-03">{totalPrice.toLocaleString()}</small>
          </div>
        </div>

        <figure className="relative flex w-full flex-col">
          <Image src={inventory} alt="inventory" priority />
          <figcaption className="sr-only">inventory</figcaption>

          <div className="absolute inset-0 flex px-[45px] py-[40px]">
            <div className="grid w-full grid-cols-8 gap-4">
              {availableCrops.length > 0 ? (
                availableCrops.map((crop) => {
                  const selectedItem = selectedCropsForSale.find((item) => item.plantId === crop.id);
                  const isSelected = Boolean(selectedItem);
                  const remaining = crop.quantity - (selectedItem?.count || 0);

                  return (
                    <button
                      key={crop.id}
                      type="button"
                      onClick={() => toggleCropSelection(crop.id)}
                      className={`relative size-[82px] cursor-pointer ${isSelected ? "" : "hover:border-primary-200"}`}
                      aria-pressed={isSelected}
                      title={crop.monthlyPlant.name}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={crop.monthlyPlant.cropImageUrl}
                          alt={crop.monthlyPlant.name}
                          className="object-contain"
                          fill
                        />
                      </div>

                      {isSelected && (
                        <span
                          className="absolute inset-0 rounded-md bg-primary-default bg-opacity-30"
                          aria-hidden="true"
                        />
                      )}

                      <span className="text-border absolute -bottom-3 -right-1 flex items-center justify-center text-title1 text-white">
                        {remaining}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-8 flex items-center justify-center rounded-lg bg-black/50 text-center text-subtitle text-text-01">
                  {t("noCrops")}
                </div>
              )}
            </div>
          </div>
        </figure>

        <div className="flex w-full flex-row items-center justify-center gap-10">
          <Button
            size="lg"
            variant="primary"
            className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
            onClick={handleSellCrops}
          >
            {t("sell")}
          </Button>
          <Button
            size="lg"
            variant="disabledLine"
            className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
            onClick={handleCancel}
          >
            {t("cancel")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SellCropsSection;
