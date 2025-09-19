import { create } from "zustand";

export type Locale = "ko" | "en";

interface LanguageState {
  language: Locale;
  setLanguage: (language: Locale) => void;
}

// export language from URL params
const getInitialLanguage = (): Locale => {
  if (typeof window === "undefined") {
    return "en"; // default language
  }

  // get language from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");

  console.log("Language store - URL params:", window.location.search);
  console.log("Language store - lang param:", langParam);

  // use URL param, if not, use default 'en'
  const result = (langParam === "ko" || langParam === "en") ? langParam : "en";
  console.log("Language store - final language:", result);

  return result;
};

// locale param for backend API calls
export const addLocaleParam = (url: string, locale?: Locale): string => {
  const currentLocale = locale || getInitialLanguage();
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}locale=${currentLocale}`;
};

// get translated value helper function
export const getTranslated = <T>(defaultValue: T, translatedValue: T | undefined, locale: Locale): T => {
  return locale === "ko" && translatedValue !== undefined ? translatedValue : defaultValue;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    set({ language });
  }
}));
