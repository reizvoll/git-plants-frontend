import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Toast from "@/components/shared/Toast";
import TQProviders from "@/lib/providers/TQProvider";
import "@/lib/styles/globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard"
});

const galmuri = localFont({
  src: "../assets/fonts/GalmuriMono9.woff2",
  display: "swap",
  variable: "--font-galmuri"
});

export const metadata: Metadata = {
  title: "Git Plants",
  description: "Generating plant visuals based on GitHub activity, designed for use in profile READMEs."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${pretendard.variable} ${galmuri.variable}`}>
      <TQProviders>
        <body className={`${pretendard.className} ${galmuri.className} overflow-x-hidden`}>
          <NextIntlClientProvider locale={locale}>
            <Header />
            <main className="relative mx-auto w-full pt-20">{children}</main>
            <Footer />
            <Toast />
          </NextIntlClientProvider>
        </body>
      </TQProviders>
    </html>
  );
}
