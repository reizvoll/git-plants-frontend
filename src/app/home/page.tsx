import ScrollTopButton from "@/components/shared/ScrollTopButton";
import BackgroundImage from "./_components/BackgroundImage";
import MainHero from "./_components/MainHero";

const MainPage = () => {
  return (
    <div className="relative -ml-[calc(50vw-50%)] h-[1080px] w-screen">
      <BackgroundImage />
      <div className="relative z-10 mx-auto h-full w-full max-w-[1200px] px-16 py-40">
        <MainHero />
      </div>
      <ScrollTopButton />
    </div>
  );
};

export default MainPage;
