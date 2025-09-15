import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";


export default getRequestConfig(async () => {
  // 미들웨어에서 전달받은 URL 쿼리 파라미터 사용
  const headersList = headers();
  const search = headersList.get('x-search') || '';

  // lang 파라미터 추출
  const urlParams = new URLSearchParams(search);
  const locale = (urlParams.get('lang') || "en") as "ko" | "en";

  // 로컬 JSON 파일에서 번역 데이터 로드
  const messages = (await import(`../../locale/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
