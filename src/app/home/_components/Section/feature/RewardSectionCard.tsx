import sysflow from "@/assets/images/system_flow.webp";
import Image from "next/image";

const RewardSectionCard = () => {
  return (
    <div className="mx-auto flex h-[556px] w-full max-w-[800px] flex-col items-center justify-center gap-10 rounded-2xl bg-secondary-light py-[3.75rem]">
      <div className="w-full text-center font-galmuri text-subtitle text-text-04">
        작물을 수확해 씨앗을 모으고, 나만의 정원을 꾸며보세요!
      </div>

      <div className="h-auto w-[200px]">
        <Image src={sysflow} alt="systemFlow" />
      </div>

      <div className="w-full text-center font-galmuri text-body2 text-text-03">
        열매나 꽃을 수확하면 씨앗을 얻을 수 있어요.
        <br />
        씨앗은 배경, 화분, 다양한 오브제를 구매하는 데 사용됩니다.
        <br />
        하나하나 모아가며, 나만의 정원을 더욱 풍성하게 꾸며보세요!
      </div>
    </div>
  );
};

export default RewardSectionCard;
