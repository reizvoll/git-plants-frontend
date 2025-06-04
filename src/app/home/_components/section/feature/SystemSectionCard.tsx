import badges from "@/assets/images/badges.webp";
import seedRewards from "@/assets/images/seed_rewards.webp";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const SystemSectionCard = () => {
  return (
    <div className="mx-auto flex h-[556px] w-full max-w-[800px] flex-col items-center justify-center rounded-2xl bg-secondary-light py-[3.75rem]">
      <div className="flex w-full flex-row items-center justify-center gap-20">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="text-center font-galmuri text-body2 text-text-04">
            모은 씨앗을 활용하여
            <br />
            다양한 상품을 구매하세요!
          </div>
          <div className="w-[250px]">
            <Image src={seedRewards} alt="seedRewards" />
          </div>
          <Button variant="secondaryStrong" size="sm" className="flex items-center justify-center px-6 py-2">
            상점 바로가기
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center gap-10">
          <div className="text-center font-galmuri text-body2 text-text-04">
            작물 수확, 씨앗 획득 등의
            <br />
            다양한 활동을 진행하며
            <br />
            뱃지를 찾고, 획득 해보세요!
          </div>
          <div className="w-[200px]">
            <Image src={badges} alt="badges" />
          </div>
          <Button variant="secondaryStrong" size="sm" className="flex items-center justify-center px-6 py-2">
            뱃지 확인하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemSectionCard;
