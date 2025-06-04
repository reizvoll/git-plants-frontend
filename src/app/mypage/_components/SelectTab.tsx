"use client";

import { useState } from "react";

const SelectTab = () => {
  const [filter, setFilter] = useState<"tab1" | "tab2">("tab1");

  const tabContents = {
    //Todo : add contents
    tab1: <div className="flex w-full flex-col items-center justify-center pt-16">contents1</div>,
    tab2: <div className="flex w-full flex-col items-center justify-center pt-16">contents2</div>
  };

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <div className="relative mx-auto flex max-w-[900px]">
        {[
          {
            key: "tab1",
            title: "꾸미기"
          },
          {
            key: "tab2",
            title: "컬렉션"
          }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as "tab1" | "tab2")}
            className={`flex-1 border-b py-2 text-center transition-colors ${
              filter === tab.key
                ? "border-primary-strong text-primary-strong"
                : "border-primary-light text-primary-light"
            }`}
          >
            <div className={`font-pretendard text-body1 ${filter === tab.key ? "font-bold" : ""}`}>{tab.title}</div>
          </button>
        ))}
        <div
          className="absolute bottom-0 h-[2px] bg-primary-strong transition-all duration-300"
          style={{
            width: "50%",
            left: filter === "tab1" ? "0%" : "50%"
          }}
        />
      </div>
      {tabContents[filter]}
    </div>
  );
};

export default SelectTab;
