"use client";

import { Button } from "@/components/ui/Button";
import { useCurrentUpdateStore } from "@/lib/store/currentUpdateStore";
import Image from "next/image";
import { useEffect } from "react";

interface NewUpdatesCardProps {
  isModalOpen: () => void;
}

const NewUpdatesCard = ({ isModalOpen }: NewUpdatesCardProps) => {
  const { data: currentUpdate, isLoading, error, fetchCurrentUpdate } = useCurrentUpdateStore();

  useEffect(() => {
    fetchCurrentUpdate();
  }, [fetchCurrentUpdate]);

  if (isLoading) {
    return <div>{/* <LoadingSpinner /> */}</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-10 rounded-2xl bg-secondary-light py-[3.75rem]">
      <div className="w-full text-center text-heading text-primary-default">따끈-한 신상 업데이트</div>

      <div className="flex w-full flex-col gap-10">
        {currentUpdate ? (
          <div className="flex w-full flex-col gap-10">
            <picture className="flex w-full justify-center">
              <Image
                src={currentUpdate.updateNote.imageUrl}
                alt="update note"
                width={700}
                height={360}
                className="object-cover"
                priority
              />
            </picture>
            <div className="flex w-full flex-row items-center justify-center gap-10">
              <Button
                size="lg"
                variant="secondary"
                className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
                onClick={isModalOpen}
              >
                상세보기
              </Button>
              <Button
                size="lg"
                variant="secondaryLine"
                className="flex items-center justify-center px-[60px] py-4 text-body1 !font-medium"
              >
                사러가기
              </Button>
            </div>
          </div>
        ) : (
          <div>추후 업데이트 예정입니다.</div>
        )}
      </div>
    </div>
  );
};

export default NewUpdatesCard;
