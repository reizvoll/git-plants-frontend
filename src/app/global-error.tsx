"use client";

import ErrorScreen from "@/components/ErrorScreen";
import { NextIntlClientProvider } from "next-intl";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = "en";

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <ErrorScreen error={error} reset={reset} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
