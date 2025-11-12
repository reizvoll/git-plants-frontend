import { useEffect } from "react";

interface UseModalKeyboardOptions {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  enableSubmit?: boolean;
}

/**
 * Custom hook to handle keyboard events for modals
 * - Escape: Always closes the modal
 * - Enter: Submits/confirms when enabled (e.g., form is valid)
 * @param isOpen - Whether the modal is open
 * @param onClose - Callback to close the modal
 * @param onSubmit - Optional callback for Enter key (submit/confirm action)
 * @param enableSubmit - Whether Enter key is enabled (default: true if onSubmit exists)
 */
export const useModalKeyboard = ({ isOpen, onClose, onSubmit, enableSubmit = true }: UseModalKeyboardOptions) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key: always close modal
      if (e.key === "Escape") {
        onClose();
      }

      // Enter key: submit if enabled and callback exists
      if (e.key === "Enter" && onSubmit && enableSubmit) {
        e.preventDefault();
        onSubmit();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose, onSubmit, enableSubmit]);
};
