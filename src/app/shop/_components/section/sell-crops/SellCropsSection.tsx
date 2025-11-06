"use client";

import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useSellCrops } from "@/lib/hooks/shop/useSellCrops";
import { useProfileStore } from "@/lib/store/profileStore";
import { useShopStore } from "@/lib/store/shopStore";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SellCropsSection = () => {
  const { crops } = useProfileStore();
  const { selectedCropsForSale, toggleCropSelection, clearSelection } = useShopStore();
  const { handleSell } = useSellCrops();
  const t = useTranslations("shop.sellCrops");

  // 수확된 작물들 (crops 배열을 직접 사용)
  const harvestableCrops = crops || [];

  // quantity > 0인 작물들만 필터링
  const availableCrops = harvestableCrops.filter((crop) => crop.quantity > 0);

  // 선택된 작물 개수와 총 판매가 계산
  const selectedCount = selectedCropsForSale.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = selectedCount * 100; // 임시로 개당 100 seed

  const handleSellCrops = () => {
    handleSell(selectedCropsForSale, harvestableCrops);
    clearSelection();
  };
  const handleCancel = () => clearSelection();

  return (
    <section
      aria-labelledby="sell-crops-section"
      className="shadow-strong mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-xl bg-sageGreen-200 px-5 py-12 mb:hidden"
    >
      <h2
        id="sell-crops-section"
        className="text-center text-title2 text-primary-default xs:text-subtitle s:text-title1"
      >
        {t("title")}
      </h2>

      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full items-center justify-center">
          <p className="text-center text-caption text-text-03 xs:text-body2 s:text-title2">
            {t("selectedCrops")} {selectedCount} {t("unit")}
          </p>
        </div>

        <figure className="flex w-full flex-col">
          {/* TODO: 인벤토리 슬롯, 추후 적용 예정 */}
          {/* <Image src={inventory} alt="inventory" priority /> */}
          <figcaption className="sr-only">inventory</figcaption>

          <div className="flex w-full">
            <div className="grid w-full grid-cols-4 gap-3 s:gap-5">
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
                      className={`relative aspect-square cursor-pointer ${isSelected ? "" : "hover:border-primary-200"}`}
                      aria-pressed={isSelected}
                      title={crop.monthlyPlant.name}
                    >
                      <div className="relative h-full max-h-[60px] w-auto sm:h-16 sm:max-h-16">
                        <Image
                          src={crop.monthlyPlant.cropImageUrl}
                          alt={crop.monthlyPlant.name}
                          className="object-contain"
                          fill
                        />
                      </div>

                      {isSelected && (
                        <span
                          className="absolute -inset-1 rounded-md bg-primary-default bg-opacity-30 s:-inset-2"
                          aria-hidden="true"
                        />
                      )}

                      <span className="text-border sm:title1 absolute bottom-[clamp(-20px,-4vw,-8px)] right-[clamp(-6px,-1vw,-2px)] flex items-center justify-center text-body2 text-white xs:text-title2 s:text-subtitle sm:-bottom-2 sm:-right-1">
                        {remaining}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="col-span-8 flex h-full items-center justify-center rounded-lg bg-black/50 py-16 text-center text-caption text-text-01 xs:text-body2 s:text-title2">
                  {t("noCrops")}
                </div>
              )}
            </div>
          </div>
        </figure>

        <div className="flex w-full flex-row items-center justify-center gap-2 xs:gap-3 s:gap-4">
          <p className="ttext-center text-caption text-text-03 xs:text-body2 s:text-title2">{t("totalPrice")}</p>
          <Image src={seed} alt="seed" width={18} height={24} />
          <small className="text-center text-caption text-text-03 xs:text-body2 s:text-title2">
            {totalPrice.toLocaleString()}
          </small>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-3 xs:gap-4 s:gap-5">
        <Button
          size="md"
          variant="primary"
          className="flex w-full items-center justify-center text-caption xs:text-body2 s:!py-[10px] s:text-title2"
          onClick={handleSellCrops}
        >
          {t("sell")}
        </Button>
        <Button
          size="md"
          variant="disabledLine"
          className="flex w-full items-center justify-center text-caption xs:text-body2 s:!py-[10px] s:text-title2"
          onClick={handleCancel}
        >
          {t("cancel")}
        </Button>
      </div>
    </section>
  );
};

export default SellCropsSection;
