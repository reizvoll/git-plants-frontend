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
          className="text-body relative flex min-h-[40px] min-w-[220px] animate-fadeIn items-center justify-between gap-1.5 overflow-hidden px-8 font-pretendard text-white xs:min-w-[260px] xs:gap-2 xs:px-10 sm:min-h-[48px] sm:min-w-[330px] sm:px-12 tb:min-h-[52px] tb:min-w-[400px] tb:px-14"
        >
          <div className="click-box -z-10 rounded-full bg-black bg-opacity-40"></div>
          <i
            className={clsx(
              "absolute left-2 flex aspect-square w-4 flex-shrink-0 items-center justify-center rounded-full xs:left-3 xs:w-5 sm:left-4 tb:w-7",
              {
                "bg-status-warning text-black": toast.type === "warning",
                "bg-status-success": toast.type === "success"
              }
            )}
          >
            {toast.type === "warning" && <ExclamationMark className="h-3 w-3 xs:h-[14px] xs:w-[14px] tb:h-4 tb:w-4" strokeWidth={3} />}
            {toast.type === "success" && <Check className="h-3 w-3 xs:h-[14px] xs:w-[14px] tb:h-4 tb:w-4" strokeWidth={3} />}
          </i>
          <p className="whitespace-nowrap py-2.5 text-small xs:py-3 xs:text-caption tb:text-body">{toast.message}</p>
          <button onClick={() => removeToast(index)} className="absolute right-2 xs:right-2.5 sm:right-3 tb:right-4">
            <X className="h-3.5 w-3.5 text-text-03 xs:h-4 xs:w-4 tb:h-5 tb:w-5" strokeWidth={3} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
