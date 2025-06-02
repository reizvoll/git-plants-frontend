import ScrollTopButton from "@/components/shared/ScrollTopButton";
import FeatureSlider from "./_components/section/feature/FeatureSlider";
import HeroSection from "./_components/section/hero/HeroSection";
import HowItWorksIntro from "./_components/section/howitworks/HowItWorksIntro";
import NoteSection from "./_components/section/note/NoteSection";

const MainPage = () => {
  return (
    <div className="relative -ml-[calc(50vw-50%)] w-screen">
      <HeroSection />
      <div className="w-full bg-bg-02">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-60 pb-20 pt-32">
          <NoteSection />
          <FeatureSlider />
          <HowItWorksIntro />
        </div>
      </div>
      <ScrollTopButton />
    </div>
  );
};

export default MainPage;
