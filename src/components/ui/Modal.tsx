"use client";

import useLockScroll from "@/lib/hooks/common/useLockScroll";
import clsx from "clsx";
import { type MouseEvent, type ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  mode?: "default" | "image";
  className?: string;
};

const ModalItem = ({ isOpen, onClose, children, mode = "default", className }: Props) => {
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
        isOpen ? "animate-fadeIn" : "animate-fadeOut"
      )}
      onMouseDown={handleOverlayClick}
    >
      <div
        className={clsx(
          "relative",
          {
            "inline-block h-fit w-auto rounded-lg bg-bg-01 p-6 shadow-lg": mode === "default",
            "inline-block max-h-[90vh] max-w-[90vw] overflow-auto": mode === "image"
          },
          isOpen ? "animate-fadeIn animate-scaleUp" : "animate-fadeOut animate-scaleDown",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalItem;
