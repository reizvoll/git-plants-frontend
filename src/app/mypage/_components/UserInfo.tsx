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

      <div className="relative flex w-full flex-row items-center justify-center gap-4 rounded-2xl bg-brown-100 px-4 py-6 xs:gap-6 xs:px-8 xs:py-6 sm:gap-6 sm:px-6 sm:py-8">
        <figure className="flex-shrink-0 overflow-hidden rounded-full">
          {user.image ? (
            <Image
              src={user.image}
              alt={`${user.username}'s avatar`}
              width={160}
              height={160}
              className="h-[80px] w-[80px] object-cover xs:h-[100px] xs:w-[100px] sm:h-[120px] sm:w-[120px]"
            />
          ) : (
            <div
              aria-label="avatar placeholder"
              className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gray-200 text-text-03 xs:h-[100px] xs:w-[100px] sm:h-[120px] sm:w-[120px]"
            />
          )}
          <figcaption className="sr-only">{user.username}</figcaption>
        </figure>

        <div className="flex w-full flex-col justify-center gap-4 sm:gap-6">
          <div className="flex flex-row items-center gap-4">
            <p className="text-body1 text-text-03 xs:text-title2 sm:text-title1" aria-label="username">
              {user.username}
            </p>

            <dl className="m-0 flex flex-row items-center">
              <dt className="sr-only">seedCount</dt>
              <dd className="m-0 flex flex-row items-center gap-3 sm:gap-4">
                <Image
                  src={seed}
                  alt="seed"
                  width={20}
                  height={27}
                  className="xs:h-[29px] xs:w-[22px] sm:h-[33px] sm:w-[24px]"
                />
                <span className="text-body1 text-text-03 xs:text-title2 sm:text-title1">
                  {seedCount.toLocaleString()}
                </span>
              </dd>
            </dl>
          </div>

          <div className="flex flex-row justify-end">
            {/* <p className="text-caption text-text-03 xs:text-body2 sm:text-subtitle">{t("badge")}</p> */}
            <Button
              variant="primaryLight"
              size="mn"
              className="flex items-center gap-1.5 px-2 py-1 text-[10px] xs:gap-2 xs:px-3 xs:py-1.5 xs:text-caption sm:text-body2"
              onClick={() => setIsModalOpen(true)}
            >
              {t("checkBadge")}
              <CaretRight className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>

      <BadgeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} badges={badges} />
    </section>
  );
};

export default UserInfo;
