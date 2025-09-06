import background from "@/assets/images/backgrounds.webp";
import Image from "next/image";

const BackgroundImage = () => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <div className="relative h-full w-full">
        <Image
          src={background}
          alt="background"
          priority
          className="h-full w-full object-cover"
          quality={100}
          sizes="100vw"
          fill
        />
      </div>
    </div>
  );
};

export default BackgroundImage;
