import ScrollTopButton from "@/components/shared/ScrollTopButton";
import CtaSection from "./_components/section/cta/CtaSection";
import FeatureSection from "./_components/section/feature/FeatureSection";
import HeroSection from "./_components/section/hero/HeroSection";
import HowItWorksSection from "./_components/section/how-it-works/HowItWorksSection";
import NoteSection from "./_components/section/note/NoteSection";

const MainPage = () => {
  return (
    <div className="relative -ml-[calc(50vw-50%)] w-screen">
      <HeroSection />
      <div className="w-full bg-bg-02">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-60 pb-48 pt-32">
          <NoteSection />
          <FeatureSection />
          <HowItWorksSection />
          <CtaSection />
        </div>
      </div>
      <ScrollTopButton />
    </div>
  );
};

export default MainPage;
