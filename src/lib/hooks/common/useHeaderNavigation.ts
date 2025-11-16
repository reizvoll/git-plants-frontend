import { useLanguageStore } from "@/lib/store/languageStore";
import { useRouter } from "next/navigation";

/**
 * Custom hook to handle language switching and navigation with language parameters
 * @returns Language state and navigation handlers
 */
export const useHeaderNavigation = () => {
  const { language, setLanguage } = useLanguageStore();
  const router = useRouter();

  const handleLanguageToggle = () => {
    const newLang = language === "ko" ? "en" : "ko";
    setLanguage(newLang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.location.href = url.toString();
  };

  const handleLanguageChange = (lang: "ko" | "en") => {
    if (lang === language) return; // 이미 선택된 언어면 무시
    setLanguage(lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.location.href = url.toString();
  };

  const navigateWithLang = (path: string) => {
    const url = new URL(window.location.href);
    const lang = url.searchParams.get("lang");
    if (lang) {
      router.push(`${path}?lang=${lang}`);
    } else {
      router.push(path);
    }
  };

  return {
    language,
    handleLanguageToggle,
    handleLanguageChange,
    navigateWithLang
  };
};
