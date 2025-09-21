"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import CollectionSection from "./CollectionSection";
import StyleSection from "./StyleSection";

type FilterKey = "tab1" | "tab2";
type Mode = "CROP" | "BACKGROUND" | "POT";

const SelectTab = () => {
  const t = useTranslations("mypage.selectTab");
  const [filter, setFilter] = useState<FilterKey>("tab1");
  const [collectionMode, setCollectionMode] = useState<Mode>("CROP");
  const baseId = useId();

  const tabs = [
    { key: "tab1" as const, title: t("style") },
    { key: "tab2" as const, title: t("collection") }
  ];

  const activeIndex = tabs.findIndex((x) => x.key === filter);
  const slice = 100 / tabs.length;

  const panelId = `${baseId}-panel`; // 단일 공용 패널
  const activeTabId = `${baseId}-tab-${filter}`;

  const handleNavigateToCollection = (mode: Mode) => {
    setCollectionMode(mode);
    setFilter("tab2");
  };

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <div
        className="relative mx-auto flex max-w-[900px]"
        role="tablist"
        aria-orientation="horizontal"
        aria-label="My page tabs"
      >
        {tabs.map((tab) => {
          const selected = filter === tab.key;
          const tabId = `${baseId}-tab-${tab.key}`;
          return (
            <button
              key={tab.key}
              id={tabId}
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => setFilter(tab.key)}
              className={`flex-1 border-b py-2 text-center transition-colors ${
                selected ? "border-primary-strong text-primary-strong" : "border-primary-light text-primary-light"
              }`}
            >
              <div className={`font-pretendard text-body1 ${selected ? "font-bold" : ""}`}>{tab.title}</div>
            </button>
          );
        })}
        {/* 하단 인디케이터 */}
        <div
          className="absolute bottom-0 h-[2px] bg-primary-strong transition-all duration-300"
          style={{ width: `${slice}%`, left: `${slice * (activeIndex < 0 ? 0 : activeIndex)}%` }}
        />
      </div>

      {/* 단일 공용 탭 패널: 활성 콘텐츠만 렌더 */}
      <div id={panelId} role="tabpanel" aria-labelledby={activeTabId} className="pt-16">
        {filter === "tab1" && (
          <div className="flex w-full flex-col items-center justify-center">
            <StyleSection onNavigateToCollection={handleNavigateToCollection} />
          </div>
        )}

        {filter === "tab2" && (
          <div className="flex w-full flex-col items-center justify-center">
            <CollectionSection initialMode={collectionMode} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectTab;
