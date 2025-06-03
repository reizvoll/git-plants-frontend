"use client";

import noimage from "@/assets/images/no_image.webp";
import Image from "next/image";
import { useState } from "react";

const ContributionsTab = () => {
  const [filter, setFilter] = useState<"tab1" | "tab2" | "tab3">("tab1");

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
            title: "성장 방식",
            description: "Pull Request나 Commit을 통해\n기여도를 쌓을 수 있습니다."
          },
          {
            key: "tab2",
            title: "보상 리워드",
            description: "작물을 가꾸고 씨앗을 모아\n새로운 아이템을 잠금 해제해 보세요!"
          },
          {
            key: "tab3",
            title: "지금 바로 참여하세요!",
            description: "GitHub 활동을 통해 멋진 정원을 가꾸고,\n보람 있는 코딩을 즐겨봐요!"
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
            <div className="mt-1 whitespace-pre-line font-pretendard text-caption">{tab.description}</div>
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
