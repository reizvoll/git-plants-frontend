import corn1 from "@/assets/images/corn1.webp";
import corn2 from "@/assets/images/corn2.webp";
import note from "@/assets/images/note.webp";
import plant from "@/assets/images/plant_icon.png";
import Image from "next/image";

const UpdateNote = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="relative h-[634px] w-[1000px]">
        <Image src={note} alt="Note" className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center px-12 py-12">
          <div className="flex w-full flex-row items-center justify-center gap-20">
            {/* Left Frame - Content Section */}
            <div className="flex flex-col items-center justify-center gap-8">
              {/* Section Title */}
              <div className="flex flex-col items-center gap-4">
                {/* Heading */}
                <div className="text-center font-galmuri text-title1 text-primary-strong">
                  이달의 식물노트:
                  <br />
                  옥수수(Corn)
                </div>

                {/* Text */}
                <div className="text-center font-galmuri text-title2 text-primary-strong">
                  옥수수는 여름을 대표하는 대표적인 작물로.
                  <br />
                  따뜻한 기후에서 잘 자라는 한해살이 식물입니다.
                  <br />
                  주로 6월에서 8월 사이에 수확되며
                  <br />
                  다양한 용도로 활용됩니다.(팝콘으로 제격이죠.)
                </div>
              </div>

              {/* Plant Image */}
              <div className="h-[233px] w-[350px]">
                <Image src={corn2} alt="corn" />
              </div>
            </div>

            {/* Right Frame */}
            <div className="flex flex-col items-center justify-center gap-20">
              {/* Main Character Image */}
              <div className="h-[196px] w-[196px] rounded-full bg-bg-01">
                <Image src={corn1} alt="corn" />
              </div>

              {/* Content */}
              <div className="flex flex-col items-center gap-4">
                {/* Row */}
                <div className="flex flex-row gap-6">
                  {/* First List Item */}
                  <div className="flex flex-grow flex-col items-start gap-4">
                    {/* Icon */}
                    <div className="h-[43px] w-12">
                      <Image src={plant} alt="icon" />
                    </div>

                    {/* Subheading */}
                    <div className="font-pretendard text-title2 font-bold text-text-04">성장 단계</div>

                    {/* Text */}
                    <p className="font-pretendard text-body1 text-text-04">
                      씨앗부터 수확까지,
                      <br />
                      총 5단계의 성장 과정을
                      <br />
                      함께 살펴봐요!
                    </p>
                  </div>

                  {/* Second List Item */}
                  <div className="flex flex-grow flex-col items-start gap-4">
                    {/* Icon */}
                    <div className="h-[43px] w-12">
                      <Image src={plant} alt="icon" />
                    </div>

                    {/* Subheading */}
                    <div className="font-pretendard text-title2 font-bold text-text-04">지금 시작해보세요!</div>

                    {/* Text */}
                    <p className="font-pretendard text-body1 text-text-04">
                      식물을 키우는 즐거움은 물론,
                      <br />
                      쏠쏠한 보상도 함께 챙겨봐요!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
