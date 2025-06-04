import farmer from "@/assets/images/farmer.webp";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const CtaSection = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center justify-center py-[3.75rem]">
      <div className="flex w-full flex-row items-center justify-center gap-44">
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col items-start justify-center gap-6">
            <div className="font-pretendard text-title1 font-bold text-text-04">지금, 당신의 여정을 시작해보세요!</div>
            <div className="font-pretendard text-subtitle font-medium text-text-04">
              지금 가입하고, 매일 작은 성장을 함께 기록하며 <br /> 당신만의 정원을 가꿔봐요!
            </div>
          </div>
          <div className="flex flex-row items-start justify-center gap-4">
            <Button variant="primary" size="md" className="flex items-center justify-center px-8 py-3">
              가입하기
            </Button>
            <Button variant="primaryLine" size="md" className="flex items-center justify-center px-8 py-3">
              더 알아보기
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Image src={farmer} alt="cta" />
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
