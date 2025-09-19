"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import CtaSection from "./section/cta/CtaSection";
import FeatureSection from "./section/feature/FeatureSection";
import HeroSection from "./section/hero/HeroSection";
import HowItWorksSection from "./section/how-it-works/HowItWorksSection";
import NoteSection from "./section/note/NoteSection";

export function HomeClient() {
  return (
    <main className="relative -ml-[calc(50vw-50%)] w-screen">
      <HeroSection />
      <div className="w-full bg-bg-02">
        <section className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-60 pb-48 pt-32">
          <NoteSection />
          <FeatureSection />
          <HowItWorksSection />
          <CtaSection />
        </section>
      </div>
      <ScrollTopButton />
    </main>
  );
}
