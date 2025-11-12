"use client";

import CaretDown from "@/assets/icons/caret-down.svg";
import { useState } from "react";

type LanguageOption = {
  label: string;
  value: "ko" | "en";
  active: boolean;
};

type LanguageToggleProps = {
  currentLanguage: "ko" | "en";
  onLanguageChange: (lang: "ko" | "en") => void;
  className?: string;
};

const LanguageToggle = ({ currentLanguage, onLanguageChange, className = "" }: LanguageToggleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const languages: LanguageOption[] = [
    {
      label: "English",
      value: "en",
      active: currentLanguage === "en"
    },
    {
      label: "한국어",
      value: "ko",
      active: currentLanguage === "ko"
    }
  ];

  const currentLangLabel = currentLanguage === "ko" ? "한국어" : "English";

  const handleLanguageSelect = (lang: "ko" | "en") => {
    onLanguageChange(lang);
    setIsExpanded(false);
  };

  return (
    <div className={`flex w-full flex-col items-center gap-4 ${className}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex h-[1.6875rem] w-full items-center justify-center gap-1 px-2 text-body1 text-text-04 transition-colors tb:hover:text-text-03"
      >
        {currentLangLabel}
        <CaretDown
          className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          strokeWidth={3}
        />
      </button>

      {/* Expanded Options */}
      {isExpanded && languages.map((lang, index) => [
        <hr key={`hr-before-${lang.value}`} className="w-full border-t border-line-02" />,
        <button
          key={lang.value}
          onClick={() => handleLanguageSelect(lang.value)}
          className={`flex h-[1.6875rem] w-full items-center justify-center px-2 text-body1 transition-colors tb:hover:text-text-03 ${
            lang.active ? "text-text-04" : "text-text-02"
          }`}
        >
          {lang.label}
        </button>
      ])}
    </div>
  );
};

export default LanguageToggle;
