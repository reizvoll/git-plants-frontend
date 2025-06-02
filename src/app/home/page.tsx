import ScrollTopButton from "@/components/shared/ScrollTopButton";
import FeatureSection from "./_components/section/feature/FeatureSection";
import HeroSection from "./_components/section/hero/HeroSection";
import HowItWorksSection from "./_components/section/howitworks/HowItWorksSection";
import NoteSection from "./_components/section/note/NoteSection";

const MainPage = () => {
  return (
    <div className="relative -ml-[calc(50vw-50%)] w-screen">
      <HeroSection />
      <div className="w-full bg-bg-02">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-60 pb-20 pt-32">
          <NoteSection />
          <FeatureSection />
          <HowItWorksSection />
        </div>
      </div>
      <ScrollTopButton />
    </div>
  );
};

export default MainPage;
