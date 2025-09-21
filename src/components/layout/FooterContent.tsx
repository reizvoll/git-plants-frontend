"use client";

import GithubIcon from "@/assets/icons/github";
import { useLocale, useTranslations } from "next-intl";

const FooterContent = () => {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="flex h-52 w-full items-center bg-gray-700">
      <section className="mx-auto flex w-full max-w-[75rem] flex-col items-start justify-center gap-6 px-4 md:px-6 lg:px-8">
        <header className="flex items-center gap-4">
          <h2 id="site-footer-title" className="text-subHeading text-text-04">
            Git-Plants
          </h2>
          <GithubIcon className="text-text-04" width={28} height={28} />
        </header>

        <address className="flex flex-col items-start gap-4 not-italic">
          <p className="font-pretendard text-caption font-medium text-text-01">
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
            {locale === "en" ? <br /> : <span>&nbsp;</span>}
            {t("copyright")}
          </p>

          <small className="text-caption text-text-01">{t("copyrightNotice")}</small>
        </address>
      </section>
    </footer>
  );
};

export default FooterContent;
