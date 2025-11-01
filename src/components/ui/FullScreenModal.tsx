"use client";

import CaretLeft from "@/assets/icons/caret-left.svg";
import useLockScroll from "@/lib/hooks/common/useLockScroll";
import clsx from "clsx";
import { type ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  title?: string;
  className?: string;
};

const FullScreenModal = ({ isOpen, onClose, children, title, className }: Props) => {
  useLockScroll(isOpen);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex w-full flex-row justify-center bg-bg-01">
      <div className="flex w-full max-w-[1200px] flex-col">
        <header className="sticky top-0 z-10 flex h-[60px] items-center bg-bg-01 px-4">
          <div className="flex flex-row items-center gap-[10px]">
            <button onClick={onClose} type="button" aria-label="close" className="cursor-pointer">
              <CaretLeft width={24} height={24} strokeWidth={3} />
            </button>
            <div className="flex-1 text-center font-pretendard text-title2 font-bold">{title}</div>
          </div>
        </header>

        <div className={clsx("flex flex-1 flex-col overflow-auto", className)}>{children}</div>
      </div>
    </div>
  );
};

export default FullScreenModal;
