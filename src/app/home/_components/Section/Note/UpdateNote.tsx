import corn1 from "@/assets/images/corn1.webp";
import corn2 from "@/assets/images/corn2.webp";
import note from "@/assets/images/note.webp";
import plant from "@/assets/images/plant_icon.png";
import Image from "next/image";

const UpdateNote = () => {
  return (
    <div className="relative w-full">
      <Image src={note} alt="Note" width={1200} height={400} className="w-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center px-12 py-12">
        <div className="flex w-full flex-row items-center justify-center gap-12">
          {/* Left Content Section */}
          <div className="flex w-[530px] flex-col items-center justify-center gap-8">
            {/* Section Title */}
            <div className="flex w-[530px] flex-col items-start gap-6">
              {/* Heading */}
              <h1 className="h-[108px] w-[530px] text-center font-galmuri text-heading font-normal leading-[150%] tracking-[-0.025em] text-primary-strong">
                이달의 식물노트:
                <br />
                옥수수(Corn)
              </h1>

              {/* Text */}
              <p className="h-[108px] w-[530px] text-center font-galmuri text-title2 font-normal leading-[150%] tracking-[-0.015em] text-primary-strong">
                옥수수는 여름을 대표하는 대표적인 작물로.
                <br />
                따뜻한 기후에서 잘 자라는 한해살이 식물입니다.
                <br />
                주로 6월에서 8월 사이에 수확되며
                <br />
                다양한 용도로 활용됩니다.(팝콘으로 제격이죠.)
              </p>
            </div>

            {/* Plant Image */}
            <div className="flex h-[233px] w-[350px] items-center justify-center">
              <Image src={corn2} alt="corn" />
            </div>
          </div>

          {/* Right Frame */}
          <div className="flex h-[467px] w-[430px] flex-grow flex-col items-center justify-center gap-20 p-0">
            {/* Main Character Image */}
            <div className="flex h-[196px] w-[196px] items-center justify-center rounded-full bg-bg-01">
              <Image src={corn1} alt="corn" />
            </div>

            {/* Content */}
            <div className="flex h-[191px] w-[430px] flex-col items-start gap-4 p-0">
              {/* Row */}
              <div className="flex h-[191px] w-[430px] flex-row items-start gap-6 px-0 py-2">
                {/* First List Item */}
                <div className="flex h-[175px] w-[203px] flex-grow flex-col items-start gap-4 p-0">
                  {/* Icon */}
                  <div className="flex h-[43px] w-12 items-center justify-center rounded">
                    <Image src={plant} alt="icon" />
                  </div>

                  {/* Subheading */}
                  <h3 className="h-7 w-[203px] font-pretendard text-subtitle text-text-04">성장 단계</h3>

                  {/* Text */}
                  <p className="h-[72px] w-[203px] font-pretendard text-text-04">
                    씨앗부터 수확까지,
                    <br />
                    총 5단계의 성장 과정을
                    <br />
                    함께 살펴봐요!
                  </p>
                </div>

                {/* Second List Item */}
                <div className="flex h-[151px] w-[203px] flex-grow flex-col items-start gap-4 p-0">
                  {/* Icon */}
                  <div className="flex h-[43px] w-12 items-center justify-center rounded">
                    <Image src={plant} alt="icon" />
                  </div>

                  {/* Subheading */}
                  <h3 className="h-7 w-[203px] font-pretendard text-subtitle text-text-04">지금 시작해보세요!</h3>

                  {/* Text */}
                  <p className="h-[72px] w-[203px] font-pretendard text-text-04">
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
  );
};

export default UpdateNote;
