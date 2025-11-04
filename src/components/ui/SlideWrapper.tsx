import { cn } from "@/lib/utils/className";

interface SlideWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SlideWrapper = ({ children, className }: SlideWrapperProps) => (
  <div className={cn("flex shrink-0 basis-full justify-center", className)}>{children}</div>
);

export default SlideWrapper;
