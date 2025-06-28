"use client";

import { useToastStore } from "@/lib/store/useToaststore";
import { CheckIcon, ExclamationMarkIcon, X } from "@phosphor-icons/react";
import clsx from "clsx";

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-[5vh] left-1/2 z-50 -translate-x-1/2 transform space-y-2">
      {toasts.slice(0, 5).map((toast, index) => (
        <div
          key={index}
          className="text-body relative flex min-h-[52px] min-w-[400px] animate-fadeIn items-center justify-between gap-2 overflow-hidden px-14 font-pretendard text-white tb:min-h-[48px] tb:min-w-[330px] tb:px-12"
        >
          <div className="click-box -z-10 rounded-full bg-black bg-opacity-40"></div>
          <i
            className={clsx(
              "absolute left-4 flex aspect-square w-7 flex-shrink-0 items-center justify-center rounded-full tb:w-5",
              {
                "bg-status-warning text-black": toast.type === "warning",
                "bg-status-success": toast.type === "success"
              }
            )}
          >
            {toast.type === "warning" && <ExclamationMarkIcon size={14} weight="bold" />}
            {toast.type === "success" && <CheckIcon size={14} weight="bold" />}
          </i>
          <p className="py-3">{toast.message}</p>
          <button onClick={() => removeToast(index)} className="absolute right-4">
            <X size={20} weight="bold" className="text-text-03" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
