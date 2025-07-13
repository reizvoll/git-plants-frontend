"use client";

import inventory from "@/assets/images/inventory.webp";
import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const SellCropsSection = () => {
  return (
    <div className="shadow-strong mx-auto flex w-full flex-col items-center justify-center gap-10 rounded-2xl bg-sageGreen-200 px-[60px] py-12 py-[3.75rem]">
      <div className="text-center text-heading text-primary-default">작물 판매하기</div>

      <div className="flex w-full flex-col gap-10">
        <div className="flex w-full flex-row items-center justify-between px-[50px]">
          <div className="flex flex-row items-center gap-6">
            <div className="text-center text-title1 text-text-03">선택된 작물 : n개</div>
            <Button size="sm" variant="primary" className="text-body1 !font-medium">
              전체 선택하기
            </Button>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="text-center text-title1 text-text-03">총 판매가 :</div>
            <Image src={seed} alt="seed" width={24} height={33} />
            {/* <small className="text-title1 text-text-03">{seedCount.toLocaleString()}</small> */}
          </div>
        </div>
        <div className="relative flex w-full flex-col">
          <Image src={inventory} alt="inventory" priority />
          <div className="absolute inset-0 flex px-9 py-9">
            <div className="flex flex-col gap-4">{/* TODO: 작물 업로드 후, 작동여부 확인필요*/}</div>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-10">
          <Button
            size="lg"
            variant="primary"
            className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
          >
            판매하기
          </Button>
          <Button
            size="lg"
            variant="disabledLine"
            className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
          >
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellCropsSection;
