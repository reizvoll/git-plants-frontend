import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type Props = {
  profileImage: string | null | undefined;
  nickname?: string;
  size: number;
  className?: string;
};

const ProfileImageCircle = ({ profileImage, nickname, size, className }: Props) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  return (
    <Image
      src={isImgError || !profileImage ? "" : profileImage}
      alt={`${nickname}'s profile image`}
      width={size}
      height={size}
      className={clsx("overflow-hidden rounded-full bg-gray-50 object-cover", className)}
      onError={() => setIsImgError(true)}
    />
  );
};

export default ProfileImageCircle;
