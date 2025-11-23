import { useBreakpoint } from "@/lib/hooks/common/useBreakpoints";
import { useTranslations } from "next-intl";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
  const t = useTranslations("common.loginRequired");
  const breakpoint = useBreakpoint();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      mode={breakpoint === "mobile" ? "mobile" : "default"}
      className="min-w-[200px] bg-bg-01 text-center"
      contentClassName="px-5 py-8"
    >
      <h1 className="text-xl w-full font-bold">{t("title")}</h1>
      <Button variant="primary" size="md" className="mt-4 w-full" onClick={onClose}>
        {t("confirm")}
      </Button>
    </Modal>
  );
}

export default LoginRequiredModal;
