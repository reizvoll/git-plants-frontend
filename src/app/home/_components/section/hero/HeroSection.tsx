import BackgroundImage from "./BackgroundImage";
import MainHero from "./MainHero";

type HeroSectionProps = {
  backgroundBlur: string;
};

const HeroSection = ({ backgroundBlur }: HeroSectionProps) => {
  return (
    <section className="relative h-[1080px] w-full">
      <BackgroundImage blurDataURL={backgroundBlur} />
      <header className="relative z-10 mx-auto h-full w-full max-w-[1200px] px-16 py-40">
        <MainHero />
      </header>
    </section>
  );
};

export default HeroSection;
