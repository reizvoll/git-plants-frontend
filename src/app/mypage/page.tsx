import ScrollTopButton from "@/components/shared/ScrollTopButton";
import UserInfo from "./_components/UserInfo";

const MyPage = () => {
  return (
    <>
      <div className="relative w-full bg-bg-03">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-60 px-8 pb-48 pt-32">
          <UserInfo />
        </div>
      </div>
      <ScrollTopButton />
    </>
  );
};

export default MyPage;
