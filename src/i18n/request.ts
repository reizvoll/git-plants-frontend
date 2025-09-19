import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // Next.js 15 방식: requestLocale 사용
  let locale = await requestLocale;

  // 기본값 및 유효성 검사
  if (!locale || !["ko", "en"].includes(locale)) {
    locale = "en";
  }

  // 로컬 JSON 파일에서 번역 데이터 로드
  const messages = (await import(`../../locale/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
