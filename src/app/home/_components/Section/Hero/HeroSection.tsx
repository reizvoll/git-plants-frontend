import BackgroundImage from "./BackgroundImage";
import MainHero from "./MainHero";

const HeroSection = () => {
  return (
    <div className="relative h-[1080px] w-full">
      <BackgroundImage />
      <div className="relative z-10 mx-auto h-full w-full max-w-[1200px] px-16 py-40">
        <MainHero />
      </div>
    </div>
  );
};

export default HeroSection;
