"use client";

import useLockScroll from "@/lib/hooks/common/useLockScroll";
import clsx from "clsx";
import { type MouseEvent, type ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  mode?: "default" | "image" | "mobile";
  className?: string;
  maxWidth?: string;
  contentClassName?: string;
};

const ModalItem = ({ isOpen, onClose, children, mode = "default", className, maxWidth, contentClassName }: Props) => {
  useLockScroll(isOpen);
  if (!isOpen) return null;

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
        mode === "mobile" && "p-4",
        isOpen ? "animate-fadeIn" : "animate-fadeOut"
      )}
      onMouseDown={handleOverlayClick}
    >
      <div
        className={clsx(
          "relative",
          {
            "inline-block h-fit w-auto rounded-lg bg-bg-01 p-6 shadow-lg": mode === "default",
            "inline-block max-h-[90vh] max-w-[90vw] overflow-auto": mode === "image",
            "max-h-[90vh] w-full overflow-hidden rounded-lg": mode === "mobile"
          },
          isOpen ? "animate-fadeIn animate-scaleUp" : "animate-fadeOut animate-scaleDown",
          className
        )}
        style={maxWidth ? { maxWidth } : undefined}
      >
        <div className={clsx(mode === "mobile" && "max-h-[90vh] overflow-y-auto scrollbar-hide", contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalItem;
