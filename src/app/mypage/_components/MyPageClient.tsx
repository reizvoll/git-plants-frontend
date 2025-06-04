"use client";

import { authApi } from "@/api/api";
import LoadingText from "@/components/shared/LoadingText";
import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useProfileStore } from "@/lib/store/profileStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SelectTab from "./SelectTab";
import UserInfo from "./UserInfo";

const MyPageClient = () => {
  const router = useRouter();
  const { isLoading, fetchProfile } = useProfileStore();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await authApi.getSession();
        if (!response.data?.success) {
          alert("로그인이 필요한 서비스입니다.");
          router.push("/");
        } else {
          await fetchProfile();
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/");
      }
    };

    checkLoginStatus();
  }, [router, fetchProfile]);

  if (isLoading || isInitialLoad) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-03">
        <LoadingText text="Loading..." className="text-subHeading text-primary-default" />
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full bg-bg-03">
        <div className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-16 px-8 pb-48 pt-20">
          <UserInfo />
          <SelectTab />
        </div>
      </div>
      <ScrollTopButton />
    </>
  );
};

export default MyPageClient;
