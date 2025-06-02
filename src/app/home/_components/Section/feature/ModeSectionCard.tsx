import gardenMode from "@/assets/images/garden_mode.webp";
import miniMode from "@/assets/images/mini_mode.webp";
import Image from "next/image";

const ModeSectionCard = () => {
  return (
    <div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-10 rounded-2xl bg-secondary-light py-[3.75rem]">
      {/* Title */}
      <div className="w-full text-center font-galmuri text-title1 text-text-04">
        두 가지 모드로 나만의 정원을 더 따뜻하게, 더 풍성하게!
      </div>

      {/* Main Content Row */}
      <div className="flex w-full flex-col gap-10">
        {/* Mini Mode */}
        <div className="flex w-full flex-row items-center justify-center gap-10">
          <div className="h-[160px] w-[107px]">
            <Image src={miniMode} alt="miniMode" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-center font-pretendard text-body1 text-text-04">🌿 미니 모드</span>
            <br />
            <p className="text-center font-pretendard text-body1 text-text-04">
              작물 하나에 온전히 집중할 수 있는 모드예요.
              <br />
              차분한 실내 또는 야외 배경 속에서,
              <br />
              씨앗이 자라나는 모습을 지켜보며 힐링을 느껴보세요.
            </p>
          </div>
        </div>

        {/* Garden Mode */}
        <div className="flex w-full flex-row items-center justify-center gap-10">
          <div className="flex flex-col">
            <span className="text-center font-pretendard text-body1 text-text-04">🏅 정원 모드</span>
            <br />
            <p className="text-center font-pretendard text-body1 text-text-04">
              지금까지 키운 작물과 획득한 뱃지를 한눈에!
              <br />
              성과와 함께 자라난 정원을 바라보며,
              <br />
              당신의 꾸준함이 만든 이야기들을 즐겨보세요!
            </p>
          </div>
          <div className="h-[160px] w-[240px]">
            <Image src={gardenMode} alt="gardenMode" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSectionCard;
