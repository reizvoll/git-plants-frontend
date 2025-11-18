import { create } from "zustand";
import { getErrorMessage } from "@/lib/utils/errorHandler";

type Toast = {
  message: string;
  type: "warning" | "success";
};

type ToastStore = {
  toasts: Toast[];
  addToast: (message: string, type: "warning" | "success") => void;
  addErrorToast: (error: unknown, defaultMessage: string) => void;
  removeToast: (index: number) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    set((state) => ({
      toasts: [...state.toasts, { message, type }]
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.slice(1)
      }));
    }, 3000);
  },
  addErrorToast: (error, defaultMessage) => {
    const message = getErrorMessage(error, defaultMessage);
    set((state) => ({
      toasts: [...state.toasts, { message, type: "warning" }]
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.slice(1)
      }));
    }, 3000);
  },
  removeToast: (index) => {
    set((state) => ({
      toasts: state.toasts.filter((_, i) => i !== index)
    }));
  }
}));
