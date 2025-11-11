import { useTranslations } from "next-intl";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
  const t = useTranslations("common.loginRequired");

  return (
    <Modal isOpen={isOpen} onClose={onClose} mode="default" className="min-w-[300px] text-center">
      <h1 className="text-xl w-full font-bold">{t("title")}</h1>
      <Button variant="primary" size="md" className="mt-4 w-full" onClick={onClose}>
        {t("confirm")}
      </Button>
    </Modal>
  );
}

export default LoginRequiredModal;
