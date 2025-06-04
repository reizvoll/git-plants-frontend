import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { ExportIcon } from "@phosphor-icons/react";

const StyleSection = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="relative flex w-full flex-col gap-6 rounded-2xl bg-brown-100 px-12 py-12">
        <div className="flex h-12 w-full flex-row items-start justify-end gap-[10px]">
          <Dropdown
            items={[{ label: "미니 모드" }, { label: "정원 모드", active: true }]}
            className="font-pretendard text-body1 text-sageGreen-900"
            mode="click"
          />
          <Button
            variant="secondaryLine"
            size="md"
            className="shadow-normal flex items-center gap-2 text-body1"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            링크 복사하기
            <ExportIcon width={20} height={20} />
          </Button>
        </div>

        {/* Todo : separate contents for each mode */}
        <div className="text-subtitle text-text-03">contents</div>
      </div>
    </div>
  );
};

export default StyleSection;
