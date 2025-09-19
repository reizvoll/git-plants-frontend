import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "en",
  localePrefix: "never" // URL 경로에 locale 표시 x
});
