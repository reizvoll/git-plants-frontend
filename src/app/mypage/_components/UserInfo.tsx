"use client";

import CaretRight from "@/assets/icons/caret-right.svg";
import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useProfileStore } from "@/lib/store/profileStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import BadgeModal from "./BadgeModal";

const UserInfo = () => {
  const { user, seedCount, badges } = useProfileStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("mypage.userInfo");

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
            <div className="flex flex-row items-center gap-5">
              <Image src={seed} alt="seed" width={24} height={33} />
              <div className="font-galmuri text-title1 text-text-03">{seedCount.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <div className="text-subtitle text-text-03">{t("badge")}</div>
              <Button
                variant="primaryLight"
                size="mn"
                className="flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                {t("more")}
                <CaretRight className="h-4 w-4" strokeWidth={3} />
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
                  <div className="text-body text-center text-text-03">{t("noBadge")}</div>
                  <div className="text-center text-caption text-text-03">{t("noBadgeDescription")}</div>
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
