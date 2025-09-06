import { create } from "zustand";

type Language = "ko" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

// export language from cookie
const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") {
    // 서버 사이드에서는 기본값 'ko' 반환
    return "ko";
  }

  // get language from cookie
  const cookie = document.cookie.split("; ").find((row) => row.startsWith("NEXT_LOCALE="));
  const savedLanguage = cookie?.split("=")[1] as Language;

  // use saved language, if not, use default 'ko'
  return savedLanguage || "ko";
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    // save language to cookie
    document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000`;
    set({ language });
    // refresh page
    window.location.reload();
  }
}));
