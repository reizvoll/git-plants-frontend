"use client";

import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useCurrentUpdateStore } from "@/lib/store/currentUpdateStore";
import Image from "next/image";

const PotSectionCard = () => {
  const { data: currentUpdate, isLoading, error } = useCurrentUpdateStore();
  const potItems = currentUpdate?.newItems.filter((item) => item.category === "pot") || [];

  if (isLoading) {
    return <div>{/* <LoadingSpinner /> */}</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className="mx-auto flex h-[700px] w-full flex-col items-center justify-center gap-10 rounded-2xl px-[60px] py-12 py-[3.75rem]">
      <div className="w-full text-center text-heading text-primary-default">따끈-한 신상 업데이트</div>

      <div className="flex w-full flex-col gap-10">
        {potItems.length > 0 ? (
          <div className="flex w-full flex-row items-center justify-center gap-10">
            {potItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center justify-center gap-6">
                <picture className="flex w-full justify-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="object-cover"
                    priority
                  />
                </picture>
                <div className="flex flex-row items-center gap-4">
                  <Image src={seed} alt="seed" width={24} height={33} />
                  <span className="text-title1 text-text-03">{item.price}</span>
                </div>
                <Button
                  size="md"
                  variant="secondaryLine"
                  className="flex items-center justify-center px-8 text-body1 !font-medium"
                >
                  구매하기
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div>추후 업데이트 예정입니다.</div>
        )}
      </div>
    </div>
  );
};

export default PotSectionCard;
