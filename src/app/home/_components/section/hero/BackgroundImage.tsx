import background from "@/assets/images/backgrounds.webp";
import Image from "next/image";

type BackgroundImageProps = {
  blurDataURL: string;
};

const BackgroundImage = ({ blurDataURL }: BackgroundImageProps) => {
  return (
    <div className="absolute inset-0 h-full w-full" aria-hidden="true">
      <Image
        src={background}
        alt="Hero background"
        priority
        className="h-full w-full object-cover object-center"
        quality={80}
        sizes="100vw"
        fill
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </div>
  );
};

export default BackgroundImage;
