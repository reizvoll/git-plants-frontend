import BackgroundImage from "./BackgroundImage";
import MainHero from "./MainHero";

type HeroSectionProps = {
  backgroundBlur: string;
};

const HeroSection = ({ backgroundBlur }: HeroSectionProps) => {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full"
      style={{ "--hero-h": "clamp(480px, 70svh, 800px)" } as React.CSSProperties}
    >
      <div className="relative" style={{ minHeight: "var(--hero-h)" }}>
        <BackgroundImage blurDataURL={backgroundBlur} />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1200px] items-center px-3 py-6 xs:px-4 xs:py-8 sm:px-6 sm:py-10 mb:px-8 mb:py-12 tb:px-8 tb:py-16 lt:px-16 lt:py-20">
          <MainHero />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
