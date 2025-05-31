import ScrollTopButton from "@/components/shared/ScrollTopButton";
import HeroSection from "./_components/Section/Hero/HeroSection";
import UpdateNote from "./_components/Section/Note/UpdateNote";

const MainPage = () => {
  return (
    <div className="relative -ml-[calc(50vw-50%)] w-screen">
      <HeroSection />
      <div className="min-h-screen w-full bg-bg-02">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start pt-32">
          <UpdateNote />
        </div>
      </div>
      <ScrollTopButton />
    </div>
  );
};

export default MainPage;
