import { CollectionMode } from "@/lib/hooks/mypage/useCollectionSort";
import { UserItem, Crop } from "@/lib/types/api/profile";
import BackgroundItem from "./BackgroundItem";
import CropItem from "./CropItem";
import PotItem from "./PotItem";

interface CollectionGridProps {
  mode: CollectionMode;
  backgrounds: UserItem[];
  pots: UserItem[];
  crops: Crop[];
}

const CollectionGrid = ({ mode, backgrounds, pots, crops }: CollectionGridProps) => {
  const renderContent = () => {
    switch (mode) {
      case "CROP":
        return (
          <ul className="m-0 grid list-none auto-rows-min grid-cols-10 items-start gap-[10px] p-0 leading-none">
            {crops.length > 0 && crops.map((crop) => <CropItem key={crop.id} crop={crop} />)}
          </ul>
        );

      case "BACKGROUND":
        return (
          <ul className="m-0 grid list-none auto-rows-min grid-cols-10 items-start gap-[10px] p-0 leading-none">
            {backgrounds.length > 0 && backgrounds.map((background) => <BackgroundItem key={background.id} background={background} />)}
          </ul>
        );

      case "POT":
        return (
          <ul className="m-0 grid list-none auto-rows-min grid-cols-10 items-start gap-[18px] px-1 py-1 leading-none">
            {pots.length > 0 && pots.map((pot) => <PotItem key={pot.id} pot={pot} />)}
          </ul>
        );

      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default CollectionGrid;