import { cn } from "@/lib/utils/className";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type MouseEvent } from "react";

const buttonVariants = cva(
  "inline-block rounded-[8px] font-medium transition duration-300 font-pretendard", // 공통 스타일
  {
    variants: {
      variant: {
        primary: "bg-primary-default !text-text-01 hover:bg-primary-light active:bg-primary-strong",
        primaryLight: "bg-primary-light !text-text-01 hover:bg-primary-default active:bg-primary-default",
        secondary: "bg-secondary-default !text-text-01 hover:bg-sageGreen-700",
        primaryLine: "bg-white border border-primary-strong !text-primary-strong active:bg-primary-light",
        secondaryLine:
          "bg-bg-01 border border-sageGreen-900 !text-sageGreen-900 hover:bg-sageGreen-50 active:bg-sageGreen-700",
        secondaryStrong: "bg-sageGreen-700 !text-text-01 hover:bg-sageGreen-900",
        disabled: "bg-gray-50 !text-text-02",
        disabledLine: "bg-bg-01 border border-line-02 !text-text-02",
        gray: "bg-gray-800 !text-text-01 hover:bg-gray-700 active:bg-gray-600",
        grayLine: "bg-bg-01 border border-gray-500 !text-text-03 hover:bg-gray-50"
      },
      size: {
        lg: "h-14 leading-[3.5rem] px-6 text-subtitle",
        md: "h-12 leading-[3rem] px-5 text-title2",
        sm: "h-11 leading-[2.75rem] px-4 text-body",
        mn: "h-9 leading-[2.25rem] px-3 text-body"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant, size, onClick, ...props }, ref) => {
    const Container = asChild ? Slot : "button";
    return (
      <Container ref={ref} className={cn(buttonVariants({ variant, size }), className)} onClick={onClick} {...props} />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
