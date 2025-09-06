import GithubIcon from "@/assets/icons/github";
import { useTranslations } from "next-intl";

const FooterContent = () => {
  const t = useTranslations("footer");

  return (
    <div className="flex h-52 w-full items-center bg-gray-700">
      <div className="mx-auto flex w-full max-w-[75rem] flex-col items-start justify-center gap-6 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="text-subHeading text-text-04">Git-Plants</span>
          <GithubIcon className="text-text-04" width={28} height={28} />
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="font-pretendard text-caption font-medium text-text-01">
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
            &nbsp;
            {t("copyright")}
          </div>
          <div className="font-galmuri text-caption text-text-01">{t("copyrightNotice")}</div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
