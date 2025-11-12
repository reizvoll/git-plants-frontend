"use client";

import GithubIcon from "@/assets/icons/github";
import { useTranslations } from "next-intl";
import Link from "next/link";

const FooterContent = () => {
  const t = useTranslations("footer");

  return (
    <footer className="flex w-full items-center bg-gray-700">
      {/* Mobile Footer */}
      <section className="mx-auto flex h-[clamp(80px,12vh,96px)] w-full items-center justify-between px-3 xs:px-4 sm:px-6 tb:hidden">
        {/* Logo */}
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
          <h2 className="text-caption text-text-01 xs:text-body1 sm:text-subtitle">Git-Plants</h2>
          <span className="text-mini text-text-02 xs:text-small sm:text-caption">© 2025</span>
        </div>

        {/* GitHub Repository Link */}
        <Link
          href="https://github.com/reizvoll/git-plants-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-gray-600 px-2 py-1.5 transition-colors hover:bg-gray-500 xs:gap-2 xs:px-3 xs:py-2 sm:gap-2 sm:px-4 sm:py-2.5"
        >
          <GithubIcon className="h-3.5 w-3.5 text-text-01 xs:h-4 xs:w-4 sm:h-5 sm:w-5" width={16} height={16} />
          <span className="whitespace-nowrap text-mini font-medium text-text-01 xs:text-small sm:text-caption">
            Repository
          </span>
        </Link>
      </section>

      {/* Desktop Footer */}
      <section className="mx-auto hidden min-h-[120px] w-full max-w-full flex-col items-start justify-center gap-6 px-4 tb:flex tb:max-h-[210px] tb:max-w-[75rem] tb:gap-8 tb:px-8 tb:py-8 lt:py-12">
        <header className="flex items-center gap-4 tb:gap-6">
          <h2 id="site-footer-title" className="text-title1 text-text-04 tb:text-subHeading">
            Git-Plants
          </h2>
          <Link href="https://github.com/reizvoll/git-plants-frontend" target="_blank" rel="noopener noreferrer">
            <GithubIcon className="h-6 w-6 text-text-04 tb:h-7 tb:w-7" width={24} height={24} />
          </Link>
        </header>

        <address className="flex flex-col items-start gap-4 not-italic tb:gap-6">
          <p className="font-pretendard text-caption font-medium leading-relaxed text-text-01 tb:text-body1">
            {t("description")}
            <br />
            {t.rich("feedback", {
              link: (chunks) => (
                <a
                  href="https://github.com/reizvoll/git-plants-frontend/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-0.5 ml-1.5 underline"
                >
                  {chunks}
                </a>
              )
            })}
          </p>

          <small className="text-caption text-text-01 tb:text-body1">{t("copyrightNotice")}</small>
        </address>
      </section>
    </footer>
  );
};

export default FooterContent;
