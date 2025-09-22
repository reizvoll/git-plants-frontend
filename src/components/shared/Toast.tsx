"use client";

import Check from "@/assets/icons/check.svg";
import ExclamationMark from "@/assets/icons/exclamation-mark.svg";
import X from "@/assets/icons/x.svg";
import { useToastStore } from "@/lib/store/useToaststore";
import clsx from "clsx";

const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-[5vh] left-1/2 z-50 -translate-x-1/2 transform space-y-2">
      {toasts.slice(0, 5).map((toast, index) => (
        <div
          key={index}
          className="text-body relative flex min-h-[52px] min-w-[400px] animate-fadeIn items-center justify-between gap-2 overflow-hidden px-14 font-pretendard text-white"
        >
          <div className="click-box -z-10 rounded-full bg-black bg-opacity-40"></div>
          <i
            className={clsx(
              "absolute left-4 flex aspect-square w-7 flex-shrink-0 items-center justify-center rounded-full",
              {
                "bg-status-warning text-black": toast.type === "warning",
                "bg-status-success": toast.type === "success"
              }
            )}
          >
            {toast.type === "warning" && <ExclamationMark className="h-[14px] w-[14px]" strokeWidth={3} />}
            {toast.type === "success" && <Check className="h-[14px] w-[14px]" strokeWidth={3} />}
          </i>
          <p className="py-3">{toast.message}</p>
          <button onClick={() => removeToast(index)} className="absolute right-4">
            <X className="h-5 w-5 text-text-03" strokeWidth={3} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
