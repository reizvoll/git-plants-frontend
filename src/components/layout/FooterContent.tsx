"use client";

import GithubIcon from "@/assets/icons/github";
import { useTranslations } from "next-intl";
import Link from "next/link";

const FooterContent = () => {
  const t = useTranslations("footer");

  return (
    <footer className="flex w-full items-center bg-gray-700">
      {/* Mobile Footer */}
      <section
        className="mx-auto flex w-full items-center justify-between px-3 xs:px-4 sm:px-6 tb:hidden"
        style={{ height: "clamp(60px, 12vh, 80px)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
          <h2 className="text-small font-medium text-text-01 xs:text-body1 sm:text-title2">Git-Plants</h2>
          <span className="text-mini text-text-02 xs:text-small sm:text-caption">© 2025</span>
        </div>

        {/* GitHub Repository Link */}
        <Link
          href="https://github.com/reizvoll/git-plants-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center rounded-lg bg-gray-600 transition-colors hover:bg-gray-500 gap-1.5 xs:gap-2 sm:gap-2 px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2.5"
        >
          <GithubIcon
            className="text-text-01 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5"
            width={16}
            height={16}
          />
          <span className="whitespace-nowrap text-mini font-medium text-text-01 xs:text-small sm:text-caption">Repository</span>
        </Link>
      </section>

      {/* Desktop Footer */}
      <section
        className="mx-auto hidden w-full max-w-full flex-col items-start justify-center px-4 tb:flex tb:max-w-[75rem] tb:px-8 tb:py-8 lt:py-12 gap-6 tb:gap-8 min-h-[120px] tb:min-h-[160px] lt:min-h-[208px]"
      >
        <header className="flex items-center gap-4 tb:gap-6">
          <h2 id="site-footer-title" className="text-title1 text-text-04 tb:text-subHeading">
            Git-Plants
          </h2>
          <Link href="https://github.com/reizvoll/git-plants-frontend" target="_blank" rel="noopener noreferrer">
            <GithubIcon
              className="text-text-04 w-6 h-6 tb:w-7 tb:h-7"
              width={24}
              height={24}
            />
          </Link>
        </header>

        <address className="flex flex-col items-start not-italic gap-4 tb:gap-6">
          <p
            className="font-pretendard text-caption font-medium text-text-01 tb:text-body1 leading-relaxed"
          >
            {t("description")}
            <br />
            {t("feedback")}
            <a
              href="https://github.com/reizvoll/git-plants-frontend/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="m-0.5 ml-1.5 underline"
            >
              {t("githubIssues")}
            </a>
            {t("feedbackEnd")}
          </p>

          <small className="text-caption text-text-01 tb:text-body1">{t("copyrightNotice")}</small>
        </address>
      </section>
    </footer>
  );
};

export default FooterContent;
