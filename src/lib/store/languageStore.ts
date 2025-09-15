import { create } from "zustand";

export type Locale = "ko" | "en";

interface LanguageState {
  language: Locale;
  setLanguage: (language: Locale) => void;
}

// export language from cookie
const getInitialLanguage = (): Locale => {
  if (typeof window === "undefined") {
    return "ko";
  }

  // get language from cookie
  const cookie = document.cookie.split("; ").find((row) => row.startsWith("NEXT_LOCALE="));
  const savedLanguage = cookie?.split("=")[1] as Locale;

  // use saved language, if not, use default 'ko'
  return savedLanguage || "ko";
};

// locale param for api
export const addLocaleParam = (url: string, locale?: Locale): string => {
  const currentLocale = locale || getInitialLanguage();
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}locale=${currentLocale}`;
};

// get translated value
export const getTranslated = <T>(defaultValue: T, translatedValue: T | undefined, locale: Locale): T => {
  return locale === "ko" && translatedValue !== undefined ? translatedValue : defaultValue;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    // save language to cookie
    document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000`;
    set({ language });
    // refresh page (the top of the page)
    window.location.href = window.location.pathname;
  }
}));
