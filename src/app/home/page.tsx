import background from "@/assets/images/backgrounds.webp";
import ScrollTopButton from "@/components/shared/ScrollTopButton";
import dynamic from "next/dynamic";
import HeroSection from "./_components/section/hero/HeroSection";

// 하단 섹션들을 lazy loading으로 최적화
const NoteSection = dynamic(() => import("./_components/section/note/NoteSection"), {
  loading: () => <div className="h-32 animate-pulse rounded bg-bg-03" />
});
const FeatureSection = dynamic(() => import("./_components/section/feature/FeatureSection"), {
  loading: () => <div className="h-96 animate-pulse rounded bg-bg-03" />
});
const HowItWorksSection = dynamic(() => import("./_components/section/how-it-works/HowItWorksSection"), {
  loading: () => <div className="h-96 animate-pulse rounded bg-bg-03" />
});
const CtaSection = dynamic(() => import("./_components/section/cta/CtaSection"), {
  loading: () => <div className="h-32 animate-pulse rounded bg-bg-03" />
});

export default function HomePage() {
  return (
    <main className="relative -ml-[calc(50vw-50%)] w-screen">
      <HeroSection backgroundBlur={background.blurDataURL || ""} />
      <div className="w-full bg-bg-02">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-60 pb-48 pt-32">
          <NoteSection />
          <FeatureSection />
          <HowItWorksSection />
          <CtaSection />
        </div>
      </div>
      <ScrollTopButton />
    </main>
  );
}
