import BackgroundImage from "./BackgroundImage";
import MainHero from "./MainHero";
import MainHeroDesktop from "./MainHeroDesktop";

type HeroSectionProps = {
  backgroundBlur: string;
};

const HeroSection = ({ backgroundBlur }: HeroSectionProps) => {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full"
      style={
        {
          "--header-h": "clamp(60px, 15vw, 80px)",
          "--hero-h": "calc(100svh - var(--header-h))"
        } as React.CSSProperties
      }
    >
      <div className="relative" style={{ height: "var(--hero-h)" }}>
        <BackgroundImage blurDataURL={backgroundBlur} />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1200px] items-center px-3 py-6 xs:px-4 xs:py-8 sm:px-6 sm:py-10 mb:px-8 mb:py-12 tb:px-8 tb:py-16 lt:px-16 lt:py-20">
          <MainHero />
          <MainHeroDesktop />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
