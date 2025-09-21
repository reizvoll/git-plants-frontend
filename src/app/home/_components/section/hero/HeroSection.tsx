import BackgroundImage from "./BackgroundImage";
import MainHero from "./MainHero";

type HeroSectionProps = {
  backgroundBlur: string;
};

const HeroSection = ({ backgroundBlur }: HeroSectionProps) => {
  return (
    <section aria-labelledby="hero-title" className="relative h-[1080px] w-full">
      <BackgroundImage blurDataURL={backgroundBlur} />
      <div className="relative z-10 mx-auto h-full w-full max-w-[1200px] px-16 py-40">
        <MainHero />
      </div>
    </section>
  );
};

export default HeroSection;
