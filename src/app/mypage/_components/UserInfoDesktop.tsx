"use client";

import CaretRight from "@/assets/icons/caret-right.svg";
import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useProfileStore } from "@/lib/store/profileStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import BadgeModal from "./modal/BadgeModalDesktop";

const UserInfoDesktop = () => {
  const { user, seedCount, badges } = useProfileStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("mypage.userInfo");

  if (!user) return null;

  return (
    <section aria-labelledby="user-info" className="flex w-full justify-center">
      <h2 id="user-info" className="sr-only">
        user info
      </h2>

      <div className="relative flex w-full max-w-[1000px] flex-row items-center justify-center gap-8 rounded-2xl bg-brown-100 px-8 py-6 tb:gap-12 tb:px-12 tb:py-7 lt:gap-16 lt:px-16 lt:py-8 xl:gap-20 xl:px-[96px]">
        <figure className="flex-shrink-0 overflow-hidden rounded-full">
          {user.image ? (
            <Image
              src={user.image}
              alt={`${user.username}'s avatar`}
              width={160}
              height={160}
              className="h-[120px] w-[120px] object-cover tb:h-[140px] tb:w-[140px] lt:h-[150px] lt:w-[150px] xl:h-[160px] xl:w-[160px]"
            />
          ) : (
            <div
              aria-label="avatar placeholder"
              className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-gray-200 text-text-03 tb:h-[140px] tb:w-[140px] lt:h-[150px] lt:w-[150px] xl:h-[160px] xl:w-[160px]"
            />
          )}
          <figcaption className="sr-only">{user.username}</figcaption>
        </figure>

        <div className="flex w-full flex-col gap-6 tb:gap-7 lt:gap-8">
          <div className="flex flex-row items-center justify-between gap-8 lt:gap-12 xl:gap-[200px]">
            <p className="text-title2 text-text-03 tb:text-title1" aria-label="username">
              {user.username}
            </p>

            <dl className="m-0 flex flex-row items-center gap-4 tb:gap-5">
              <dt className="sr-only">seedCount</dt>
              <dd className="m-0 flex flex-row items-center gap-4 tb:gap-5">
                <Image src={seed} alt="seed" width={22} height={30} className="tb:h-[33px] tb:w-[24px]" />
                <span className="text-title2 text-text-03 tb:text-title1">{seedCount.toLocaleString()}</span>
              </dd>
            </dl>
          </div>

          <div className="flex flex-col gap-5 tb:gap-6">
            <div className="flex flex-row items-center justify-between">
              <p className="text-body2 text-text-03 tb:text-subtitle">{t("badge")}</p>
              <Button
                variant="primaryLight"
                size="mn"
                className="flex items-center gap-2 px-3 py-1.5 text-caption tb:text-body2"
                onClick={() => setIsModalOpen(true)}
              >
                {t("more")}
                <CaretRight className="h-3.5 w-3.5 tb:h-4 tb:w-4" strokeWidth={3} />
              </Button>
            </div>

            <div className="flex w-full flex-row gap-3 tb:gap-4">
              {badges.length > 0 ? (
                <ul className="m-0 flex list-none gap-3 p-0 tb:gap-4" aria-label="badgeList">
                  {badges.map((badge) => (
                    <li key={badge.id} className="flex flex-col gap-1.5 tb:gap-2">
                      <Image
                        src={badge.badge.imageUrl}
                        alt={badge.badge.name || "Badge"}
                        width={48}
                        height={48}
                        className="h-[40px] w-[40px] tb:h-[44px] tb:w-[44px] lt:h-[48px] lt:w-[48px]"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-1.5 tb:gap-2">
                  <p className="tb:text-body text-center text-body2 text-text-03">{t("noBadge")}</p>
                  <p className="text-center text-[11px] text-text-03 tb:text-caption">{t("noBadgeDescription")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BadgeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} badges={badges} />
    </section>
  );
};

export default UserInfoDesktop;
