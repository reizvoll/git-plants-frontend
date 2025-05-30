import GithubIcon from "@/assets/images/github";

const FooterContent = () => {
  return (
    <div className="flex h-52 w-full items-center bg-gray-700">
      <div className="mx-auto flex w-full max-w-[75rem] flex-col items-start justify-center gap-6 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <span className="text-subHeading text-text-04">Git-Plants</span>
          <GithubIcon className="text-text-04" width={30} height={30} />
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="font-pretendard text-body1 font-medium text-text-01">
            본 서비스는 개발자 포트폴리오 및 학습 목적의 비영리 프로젝트입니다.
            <br />
            문의 및 피드백은
            <a
              href="https://github.com/reizvoll/git-plants-frontend/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="m-0.5 ml-1.5 underline"
            >
              GitHub Issues
            </a>
            에 남겨주세요.
            <br />
            창작물에 대한 무단 복제 및 상업적 사용을 금합니다.
          </div>
          <div className="font-galmuri text-small text-text-01">
            © 2025 reizvoll. All illustrations and UI elements are copyright protected.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterContent;
