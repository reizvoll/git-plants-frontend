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

      <div className="relative flex w-full flex-row items-center justify-center gap-3 rounded-2xl bg-brown-100 px-3 py-5 xs:gap-4 xs:px-4 xs:py-6 sm:gap-6 sm:px-6 sm:py-8">
        <figure className="flex-shrink-0 overflow-hidden rounded-full">
          {user.image ? (
            <Image
              src={user.image}
              alt={`${user.username}'s avatar`}
              width={160}
              height={160}
              className="h-[60px] w-[60px] object-cover xs:h-[80px] xs:w-[80px] sm:h-[100px] sm:w-[100px]"
            />
          ) : (
            <div
              aria-label="avatar placeholder"
              className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-200 text-text-03 xs:h-[80px] xs:w-[80px] sm:h-[100px] sm:w-[100px]"
            />
          )}
          <figcaption className="sr-only">{user.username}</figcaption>
        </figure>

        <div className="flex w-full flex-col justify-center gap-2 xs:gap-4 sm:gap-6">
          <div className="flex flex-row items-center gap-2 xs:gap-4">
            <p className="text-caption text-text-03 xs:text-title2" aria-label="username">
              {user.username}
            </p>

            <dl className="m-0 flex flex-row items-center">
              <dt className="sr-only">seedCount</dt>
              <dd className="m-0 flex flex-row items-center gap-1.5 xs:gap-3 sm:gap-4">
                <Image
                  src={seed}
                  alt="seed"
                  width={20}
                  height={27}
                  className="h-[24px] w-[18px] xs:h-[29px] xs:w-[22px] sm:h-[33px] sm:w-[24px]"
                />
                <span className="text-caption text-text-03 xs:text-title2">{seedCount.toLocaleString()}</span>
              </dd>
            </dl>
          </div>

          <div className="flex flex-row justify-end">
            {/* <p className="text-caption text-text-03 xs:text-body2 sm:text-subtitle">{t("badge")}</p> */}
            <Button
              variant="primaryLight"
              size="mn"
              className="flex items-center gap-1 text-mini xs:gap-1.5 xs:px-2 xs:py-1 xs:text-small sm:text-caption"
              onClick={() => setIsModalOpen(true)}
            >
              {t("checkBadge")}
              <CaretRight className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>

      <BadgeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} badges={badges} />
    </section>
  );
};

export default UserInfo;
