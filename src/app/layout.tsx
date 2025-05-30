import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import TQProviders from "@/lib/providers/TQProvider";
import "@/lib/styles/globals.css";
import type { Metadata } from "next";
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TQProviders>
        <body className={`${pretendard.className} ${galmuri.className} overflow-x-hidden`}>
          <Header />
          <main className="relative mx-auto w-full max-w-[1200px] pt-20 tb:pb-[77px] tb:pt-0">{children}</main>
          <Footer />
        </body>
      </TQProviders>
    </html>
  );
}
