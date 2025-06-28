import { create } from "zustand";

type Toast = {
  message: string;
  type: "warning" | "success";
};

type ToastStore = {
  toasts: Toast[];
  addToast: (message: string, type: "warning" | "success") => void;
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
  removeToast: (index) => {
    set((state) => ({
      toasts: state.toasts.filter((_, i) => i !== index)
    }));
  }
}));
