import { Button } from "../ui/Button";
import Modal from "../ui/Modal";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} mode="default" className="min-w-[300px] text-center">
      <h1 className="text-xl w-full font-bold">로그인이 필요합니다</h1>
      <Button variant="primary" size="md" className="mt-4 w-full" onClick={onClose}>
        확인
      </Button>
    </Modal>
  );
}

export default LoginRequiredModal;
