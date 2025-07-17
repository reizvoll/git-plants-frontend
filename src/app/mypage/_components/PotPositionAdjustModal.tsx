import Modal from "@/components/ui/Modal";

interface PotPositionAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPotPosition: { x: number; y: number };
  onApply: (position: { x: number; y: number }) => void;
  selectedPot?: {
    id: number;
    name: string;
    iconUrl: string;
  } | null;
}

const PotPositionAdjustModal = ({
  isOpen,
  onClose,
  currentPotPosition,
  onApply,
  selectedPot
}: PotPositionAdjustModalProps) => {
  const handlePositionSelect = (position: { x: number; y: number }) => {
    onApply(position);
  };

  const positionOptions = [
    { label: "왼쪽 가운데", x: 25, y: 50 },
    { label: "정중앙", x: 50, y: 50 },
    { label: "오른쪽 가운데", x: 75, y: 50 },
    { label: "왼쪽 아래", x: 25, y: 80 },
    { label: "가운데 아래", x: 50, y: 80 },
    { label: "오른쪽 아래", x: 75, y: 80 }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {selectedPot ? (
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <div className="text-center font-pretendard text-subtitle font-bold text-text-03">위치 선택</div>
              <div className="mx-auto grid grid-cols-3 gap-2">
                {positionOptions.map((pos) => (
                  <button
                    key={`${pos.x}-${pos.y}`}
                    onClick={() => handlePositionSelect({ x: pos.x, y: pos.y })}
                    className={`whitespace-nowrap rounded px-3 py-2 text-center font-pretendard transition-colors ${
                      currentPotPosition.x === pos.x && currentPotPosition.y === pos.y
                        ? "bg-primary-default text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    title={pos.label}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-body3 text-center text-text-04">화분을 먼저 선택해주세요.</div>
        )}
      </div>
    </Modal>
  );
};

export default PotPositionAdjustModal;
