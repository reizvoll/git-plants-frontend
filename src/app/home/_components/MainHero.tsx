import plant from "@/assets/images/plants.png";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const MainHero = () => {
  return (
    <div className="shadow-emphasize flex items-center justify-center gap-16 rounded-[1rem] bg-[#F4EBDC]/80 px-16 py-16">
      <div className="flex w-full flex-col items-start gap-20">
        <div className="flex w-full flex-col items-start gap-12">
          <div className="w-full font-galmuri text-heading text-primary-strong">
            코드로 자라는 식물친구,
            <br />
            <span className="font-galmuri text-heading">Git-Plants</span>
          </div>
          <div className="font-galmuri text-title2 text-primary-strong">
            GitHub활동을 바탕으로 식물을 키우고, 씨앗을 수확해요!
          </div>
        </div>
        <div className="flex w-full flex-row items-start gap-4">
          <Button variant="primary" size="md" className="flex items-center justify-center px-8 py-3">
            시작하기
          </Button>
          <Button variant="primaryLine" size="md" className="flex items-center justify-center px-8 py-3">
            마이페이지
          </Button>
        </div>
      </div>
      <div className="shadow-normal flex h-60 w-60 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-01">
        <Image src={plant} alt="plant" width={200} height={200} className="object-contain" />
      </div>
    </div>
  );
};

export default MainHero;
