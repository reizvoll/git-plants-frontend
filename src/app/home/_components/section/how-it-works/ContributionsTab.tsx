"use client";

import noimage from "@/assets/images/no_image.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useId, useState } from "react";

type TabKey = "tab1" | "tab2" | "tab3";

const ContributionsTab = () => {
  const [active, setActive] = useState<TabKey>("tab1");
  const t = useTranslations("feature.how-it-works.tab");
  const baseId = useId();

  const tabs = [
    { key: "tab1" as const, title: t("title1"), description: t("description1") },
    { key: "tab2" as const, title: t("title2"), description: t("description2") },
    { key: "tab3" as const, title: t("title3"), description: t("description3") }
  ];

  const activeIndex = tabs.findIndex((x) => x.key === active);
  const slice = 100 / tabs.length;

  const activeTabId = `${baseId}-tab-${active}`;
  const panelId = `${baseId}-panel`;

  return (
    <div className="w-full">
      <div className="relative flex" role="tablist" aria-orientation="horizontal" aria-label="How it works tabs">
        {tabs.map((tab) => {
          const tabId = `${baseId}-tab-${tab.key}`;
          const selected = active === tab.key;
          return (
            <button
              key={tab.key}
              id={tabId}
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.key)}
              className={`flex-1 px-2 py-2 text-center transition-colors mb:px-4 ${
                selected ? "text-primary-strong" : "text-brown-300"
              }`}
            >
              <div className={`font-pretendard text-caption mb:text-body1 ${selected ? "font-bold" : ""}`}>
                {tab.title}
              </div>
              <div className="mt-0.5 hidden whitespace-pre-line font-pretendard text-small mb:mt-1 mb:block">
                {tab.description}
              </div>
            </button>
          );
        })}

        <div
          className="absolute bottom-0 h-[2px] bg-primary-strong transition-all duration-300"
          style={{ width: `${slice}%`, left: `${slice * (activeIndex < 0 ? 0 : activeIndex)}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Add Images (later) */}
      <div id={panelId} role="tabpanel" aria-labelledby={activeTabId} className="pt-6 mb:pt-10">
        {active === "tab1" && (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="relative aspect-video w-full max-w-[500px]">
              <Image
                src={noimage}
                alt="Tab 1 preview"
                fill
                className="object-contain"
                sizes="(max-width: 480px) 100vw, 500px"
                loading="lazy"
              />
            </div>
            <p className="whitespace-pre-line text-center font-pretendard text-small text-primary-strong mb:hidden">
              {tabs[0].description}
            </p>
          </div>
        )}
        {active === "tab2" && (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="relative aspect-video w-full max-w-[500px]">
              <Image
                src={noimage}
                alt="Tab 2 preview"
                fill
                className="object-contain"
                sizes="(max-width: 480px) 100vw, 500px"
                loading="lazy"
              />
            </div>
            <p className="whitespace-pre-line text-center font-pretendard text-small text-primary-strong mb:hidden">
              {tabs[1].description}
            </p>
          </div>
        )}
        {active === "tab3" && (
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="relative aspect-video w-full max-w-[500px]">
              <Image
                src={noimage}
                alt="Tab 3 preview"
                fill
                className="object-contain"
                sizes="(max-width: 480px) 100vw, 500px"
                loading="lazy"
              />
            </div>
            <p className="whitespace-pre-line text-center font-pretendard text-small text-primary-strong mb:hidden">
              {tabs[2].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributionsTab;
