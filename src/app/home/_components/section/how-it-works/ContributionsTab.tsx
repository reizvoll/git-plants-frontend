"use client";

import noimage from "@/assets/images/no_image.webp";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const ContributionsTab = () => {
  const [filter, setFilter] = useState<"tab1" | "tab2" | "tab3">("tab1");
  const t = useTranslations("feature.how-it-works.tab");

  const tabContents = {
    //Todo : add images
    tab1: (
      <div className="flex w-full flex-col items-center justify-center pt-10">
        <Image src={noimage} alt="tab1" width={500} />
      </div>
    ),
    tab2: (
      <div className="flex flex-col items-center justify-center pt-10">
        <Image src={noimage} alt="tab1" width={500} />
      </div>
    ),
    tab3: (
      <div className="flex flex-col items-center justify-center pt-10">
        <Image src={noimage} alt="tab1" width={500} />
      </div>
    )
  };

  return (
    <div className="w-full">
      <div className="relative flex">
        {[
          {
            key: "tab1",
            title: t("title1"),
            description: t("description1")
          },
          {
            key: "tab2",
            title: t("title2"),
            description: t("description2")
          },
          {
            key: "tab3",
            title: t("title3"),
            description: t("description3")
          }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as "tab1" | "tab2" | "tab3")}
            className={`flex-1 py-2 text-center transition-colors ${
              filter === tab.key ? "text-primary-strong" : "text-brown-300"
            }`}
          >
            <div className={`font-pretendard text-body1 ${filter === tab.key ? "font-bold" : ""}`}>{tab.title}</div>
            <div className="mt-1 whitespace-pre-line font-pretendard text-small">{tab.description}</div>
          </button>
        ))}
        <div
          className="absolute bottom-0 h-[2px] bg-primary-strong transition-all duration-300"
          style={{
            width: "33.333%",
            left: filter === "tab1" ? "0%" : filter === "tab2" ? "33.333%" : "66.666%"
          }}
        />
      </div>
      {tabContents[filter]}
    </div>
  );
};

export default ContributionsTab;
