"use client";

import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useProfileStore } from "@/lib/store/profileStore";
import { CaretRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import BadgeModal from "./BadgeModal";

const UserInfo = () => {
  const { user, seedCount, badges, isLoading, error, fetchProfile } = useProfileStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full justify-center">
      <div className="relative flex w-full max-w-[1000px] flex-row items-center justify-center gap-20 rounded-2xl bg-brown-100 px-[96px] py-8">
        <div className="flex-shrink-0 overflow-hidden rounded-full">
          {user.image ? (
            <Image src={user.image} alt={user.username} width={160} height={160} className="object-cover" />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>
        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-row gap-[200px]">
            <div className="font-galmuri text-title1 text-text-03">{user.username}</div>
            <div className="flex flex-row items-center gap-6">
              <Image src={seed} alt="seed" width={24} height={33} />
              <div className="font-galmuri text-title1 text-text-03">{seedCount}</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <div className="text-subtitle text-text-03">뱃지</div>
              <Button
                variant="primaryLight"
                size="mn"
                className="flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                더 보기
                <CaretRightIcon width={16} height={16} weight="bold" />
              </Button>
            </div>
            <div className="flex w-full flex-row gap-4">
              {badges.length > 0 ? (
                badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col gap-2">
                    <Image src={badge.badge.imageUrl} alt={badge.badge.name} width={48} height={48} />
                  </div>
                ))
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <div className="text-body text-center text-text-03">아직 뱃지가 없어요.</div>
                  <div className="text-center text-caption text-text-03">
                    (다양한 활동을 진행하면서 뱃지를 찾아봐요!)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BadgeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} badges={badges} />
    </div>
  );
};

export default UserInfo;
