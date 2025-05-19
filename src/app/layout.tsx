import "@/styles/globals.css";
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
  variable: "--font-galmuri",
});

export const metadata: Metadata = {
  title: "Git Plants",
  description: "Generating plant visuals based on GitHub activity, designed for use in profile READMEs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} ${galmuri.className}`}>{children}</body>
    </html>
  );
}
