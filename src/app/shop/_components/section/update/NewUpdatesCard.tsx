"use client";

import { Button } from "@/components/ui/Button";
import { useCurrentUpdateStore } from "@/lib/store/currentUpdateStore";
import Image from "next/image";

interface NewUpdatesCardProps {
  isModalOpen: () => void;
}

const NewUpdatesCard = ({ isModalOpen }: NewUpdatesCardProps) => {
  const { data: currentUpdate, isLoading, error } = useCurrentUpdateStore();

  if (isLoading) {
    return <div>{/* <LoadingSpinner /> */}</div>;
  }

  {
    /* 에러처리, 오버레이로 대체 */
  }

  return (
    <div className="mx-auto flex h-[700px] w-full flex-col items-center justify-center gap-10 rounded-2xl px-[60px] py-12 py-[3.75rem]">
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
          <>
            <div className="mx-auto flex h-[360px] w-[700px] items-center justify-center rounded-lg bg-gray-100">
              <div className="text-center text-body1 text-text-03">추후 업데이트 예정입니다.</div>
            </div>

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
          </>
        )}
      </div>

      {/* error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
          <div className="text-center text-subtitle text-text-01">
            정보를 불러올 수 없습니다.
            <br />
            잠시 후 다시 시도해주세요.
          </div>
        </div>
      )}
    </div>
  );
};

export default NewUpdatesCard;
