interface ShopItemSkeletonProps {
  variant: "mobile" | "desktop";
  itemType: "pot" | "background";
  aspectRatio?: "square" | "2/3" | "4/3";
}

const ShopItemSkeleton = ({ variant, itemType, aspectRatio = "square" }: ShopItemSkeletonProps) => {
  // 모바일 버전
  if (variant === "mobile") {
    return (
      <li className="flex flex-col items-center gap-3">
        {/* 이미지 */}
        {itemType === "pot" ? (
          <div className="h-[60px] w-[60px] animate-pulse rounded-lg bg-gray-300" />
        ) : (
          <div className="h-[140px] w-[93px] animate-pulse rounded-lg bg-gray-300" />
        )}
        {/* 가격 */}
        <div className="flex flex-row items-center gap-2">
          <div className="h-[18px] w-[13px] animate-pulse rounded bg-gray-300" />
          <div className="h-4 w-10 animate-pulse rounded bg-gray-300" />
        </div>
        {/* 버튼 */}
        <div className="h-8 w-16 animate-pulse rounded bg-gray-300" />
      </li>
    );
  }

  // 데스크톱 버전 - 화분
  if (itemType === "pot") {
    return (
      <li className="grid h-[180px] grid-rows-[1fr_auto] items-center justify-center gap-4 mb:h-[200px] mb:gap-5 lt:h-[220px] lt:gap-6">
        <div className="flex flex-col items-center justify-center gap-4 mb:gap-5 lt:gap-6">
          <div className="h-[70px] w-[70px] animate-pulse rounded-lg bg-gray-300 mb:h-[85px] mb:w-[85px] lt:h-[100px] lt:w-[100px]" />
          <div className="flex flex-row items-center gap-3 mb:gap-4">
            <div className="h-[24px] w-[18px] animate-pulse rounded bg-gray-300 mb:h-[28px] mb:w-[20px] lt:h-[33px] lt:w-[24px]" />
            <div className="h-5 w-12 animate-pulse rounded bg-gray-300 mb:h-6 mb:w-14 lt:h-6 lt:w-16" />
          </div>
        </div>
        <div className="h-10 w-full animate-pulse rounded bg-gray-300 ml:h-11 lt:h-12" />
      </li>
    );
  }

  // 데스크톱 버전 - 배경화면
  const aspectRatioClass = aspectRatio === "2/3" ? "aspect-[2/3]" : "aspect-[4/3]";

  return (
    <li className="grid grid-rows-[1fr_auto] items-center gap-4 mb:gap-6">
      <div className="flex w-full items-center justify-center">
        <div className={`w-full animate-pulse rounded-lg bg-gray-300 ${aspectRatioClass}`} />
      </div>
      <div className="flex flex-col items-center gap-3 mb:gap-4">
        <div className="flex flex-row items-center gap-3 mb:gap-4">
          <div className="h-[24px] w-[18px] animate-pulse rounded bg-gray-300 mb:h-[28px] mb:w-[20px] lt:h-[33px] lt:w-[24px]" />
          <div className="h-5 w-12 animate-pulse rounded bg-gray-300 mb:h-6 mb:w-14 lt:h-6 lt:w-16" />
        </div>
        <div className="h-10 w-full animate-pulse rounded bg-gray-300 ml:h-11 lt:h-12" />
      </div>
    </li>
  );
};

export default ShopItemSkeleton;
