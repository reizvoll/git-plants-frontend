import ScrollTopButton from "@/components/shared/ScrollTopButton";
import ModeSectionCard from "./_components/section/feature/ModeSectionCard";
import HeroSection from "./_components/section/hero/HeroSection";
import UpdateNote from "./_components/section/note/UpdateNote";

const MainPage = () => {
  return (
    <div className="relative -ml-[calc(50vw-50%)] w-screen">
      <HeroSection />
      <div className="w-full bg-bg-02">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-60 pb-20 pt-32">
          <UpdateNote />
          <ModeSectionCard />
        </div>
      </div>
      <ScrollTopButton />
    </div>
  );
};

export default MainPage;
