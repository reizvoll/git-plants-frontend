"use client";

import CaretRight from "@/assets/icons/caret-right.svg";
import seed from "@/assets/images/seed.webp";
import { Button } from "@/components/ui/Button";
import { useProfileStore } from "@/lib/store/profileStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import BadgeModal from "./modal/BadgeModal";

const UserInfo = () => {
  const { user, seedCount, badges } = useProfileStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("mypage.userInfo");

  if (!user) return null;

  return (
    <section aria-labelledby="user-info" className="flex w-full justify-center">
      <h2 id="user-info" className="sr-only">
        user info
      </h2>

      <div className="relative flex w-full max-w-[1000px] flex-row items-center justify-center gap-20 rounded-2xl bg-brown-100 px-[96px] py-8">
        <figure className="flex-shrink-0 overflow-hidden rounded-full">
          {user.image ? (
            <Image
              src={user.image}
              alt={`${user.username}'s avatar`}
              width={160}
              height={160}
              className="object-cover"
            />
          ) : (
            <div
              aria-label="avatar placeholder"
              className="flex h-[160px] w-[160px] items-center justify-center rounded-full bg-gray-200 text-text-03"
            />
          )}
          <figcaption className="sr-only">{user.username}</figcaption>
        </figure>

        <div className="flex w-full flex-col gap-8">
          <div className="flex flex-row gap-[200px]">
            <p className="text-title1 text-text-03" aria-label="username">
              {user.username}
            </p>

            <dl className="m-0 flex flex-row items-center gap-5">
              <dt className="sr-only">seedCount</dt>
              <dd className="m-0 flex flex-row items-center gap-5">
                <Image src={seed} alt="seed" width={24} height={33} />
                <span className="text-title1 text-text-03">{seedCount.toLocaleString()}</span>
              </dd>
            </dl>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <p className="text-subtitle text-text-03">{t("badge")}</p>
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
                <ul className="m-0 flex list-none gap-4 p-0" aria-label="badgeList">
                  {badges.map((badge) => (
                    <li key={badge.id} className="flex flex-col gap-2">
                      <Image src={badge.badge.imageUrl} alt={badge.badge.name || "Badge"} width={48} height={48} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <p className="text-body text-center text-text-03">{t("noBadge")}</p>
                  <p className="text-center text-caption text-text-03">{t("noBadgeDescription")}</p>
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

export default UserInfo;
