"use client";

import inventory from "@/assets/images/inventory.webp";
import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useProfileStore } from "@/lib/store/profileStore";
import { useShopStore } from "@/lib/store/shopStore";
import { useToastStore } from "@/lib/store/useToaststore";
import Image from "next/image";

const SellCropsSection = () => {
  const { crops } = useProfileStore();
  const { selectedCropsForSale, toggleCropSelection, selectAllCrops, clearSelection, sellSelectedCrops } =
    useShopStore();
  const { addToast } = useToastStore();

  // 수확된 작물들 (crops 배열을 직접 사용)
  const harvestableCrops = crops || [];

  // quantity > 0인 작물들만 필터링
  const availableCrops = harvestableCrops.filter((crop) => crop.quantity > 0);

  // 선택된 작물 개수와 총 판매가 계산
  const selectedCount = selectedCropsForSale.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = selectedCount * 100; // 임시로 개당 100 seed

  const handleSelectAll = () => {
    selectAllCrops(harvestableCrops);
  };

  const handleSell = () => {
    if (selectedCount === 0) {
      addToast("판매할 작물을 선택해주세요.", "warning");
      return;
    }
    sellSelectedCrops(harvestableCrops);
  };

  const handleCancel = () => {
    clearSelection();
  };

  return (
    <div className="shadow-strong mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-2xl bg-sageGreen-200 px-[60px] py-12 py-[3.75rem]">
      <div className="text-center text-heading text-primary-default">작물 판매하기</div>

      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-row items-center justify-between px-[50px]">
          <div className="flex flex-row items-center gap-6">
            <div className="text-center text-title1 text-text-03">선택된 작물 : {selectedCount}개</div>
            <Button size="sm" variant="primary" className="text-body1 !font-medium" onClick={handleSelectAll}>
              전체 선택하기
            </Button>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="text-center text-title1 text-text-03">총 판매가 :</div>
            <Image src={seed} alt="seed" width={24} height={33} />
            <small className="text-title1 text-text-03">{totalPrice.toLocaleString()}</small>
          </div>
        </div>

        <div className="relative flex w-full flex-col">
          <Image src={inventory} alt="inventory" priority />
          <div className="absolute inset-0 flex px-[45px] py-[40px]">
            <div className="grid w-full grid-cols-8 gap-4">
              {availableCrops.length > 0 ? (
                availableCrops.map((crop) => (
                  <div
                    key={crop.id}
                    className={`relative size-[74px] cursor-pointer ${
                      selectedCropsForSale.find((item) => item.plantId === crop.id)
                        ? ""
                        : "hover:border-primary-200 border-gray-300"
                    }`}
                    onClick={() => toggleCropSelection(crop.id)}
                  >
                    <Image
                      src={crop.monthlyPlant.cropImageUrl}
                      alt={crop.monthlyPlant.name}
                      className="object-cover"
                      width={74}
                      height={74}
                      priority
                    />
                    {selectedCropsForSale.find((item) => item.plantId === crop.id) && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-md bg-primary-default bg-opacity-30" />
                    )}
                    <div className="text-border absolute -bottom-3 -right-1 flex items-center justify-center text-title1 text-white">
                      {crop.quantity - (selectedCropsForSale.find((item) => item.plantId === crop.id)?.count || 0)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-8 flex items-center justify-center rounded-lg bg-black/50 text-center text-subtitle text-text-01">
                  수확 가능한 작물이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-10">
          <Button
            size="lg"
            variant="primary"
            className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
            onClick={handleSell}
          >
            판매하기
          </Button>
          <Button
            size="lg"
            variant="disabledLine"
            className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
            onClick={handleCancel}
          >
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellCropsSection;
