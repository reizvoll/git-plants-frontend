import { CollectionMode } from "@/lib/hooks/mypage/useCollectionSort";
import { Crop, UserItem } from "@/lib/types/api/profile";
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
  // TODO: 아이템 크기가 inventory 슬롯 이미지 크기에 맞춰 자동으로 조정되도록 개선 필요
  // 현재는 고정 픽셀 크기를 사용하고 있어서 슬롯 이미지가 반응형으로 줄어들어도 아이템 크기가 따라 줄어들지 않음
  const renderContent = () => {
    switch (mode) {
      case "CROP":
        return (
          <ul className="m-0 grid list-none auto-rows-min grid-cols-5 items-start gap-2 p-0 leading-none mb:grid-cols-4 mb:gap-[10px] tb:grid-cols-10">
            {crops.length > 0 && crops.map((crop) => <CropItem key={crop.id} crop={crop} />)}
          </ul>
        );

      case "BACKGROUND":
        return (
          <ul className="m-0 grid list-none auto-rows-min grid-cols-5 items-start gap-2 p-0 leading-none mb:grid-cols-4 mb:gap-[10px] tb:grid-cols-10">
            {backgrounds.length > 0 &&
              backgrounds.map((background) => <BackgroundItem key={background.id} background={background} />)}
          </ul>
        );

      case "POT":
        return (
          <ul className="m-0 grid list-none auto-rows-min grid-cols-5 items-start gap-2 p-0 leading-none mb:grid-cols-4 mb:gap-[18px] mb:px-1 mb:py-1 tb:grid-cols-10">
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
