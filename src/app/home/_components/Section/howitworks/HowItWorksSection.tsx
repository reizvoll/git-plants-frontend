import ContributionsTab from "./ContributionsTab";

const HowItWorksSection = () => {
  return (
    <div className="bg-brown-100 relative mx-auto flex w-full max-w-[1000px] items-center justify-center rounded-2xl px-[96px] py-10">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-6">
          <div className="text-center font-galmuri text-subtitle text-text-04">
            기여도가 식물 성장에 미치는 영향 알아보기
          </div>
          <div className="text-center font-galmuri text-caption text-text-03">
            GitHub에서 일어나는 모든 기여는 식물의 성장과 정원 가꾸기에 영향을 줍니다.
            <br />
            기여도를 통해 나만의 정원을 가꿔봐요!
          </div>
        </div>
        <ContributionsTab />
      </div>
    </div>
  );
};

export default HowItWorksSection;
