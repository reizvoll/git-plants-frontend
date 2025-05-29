import { ReactNode } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

const Dropdown = ({ trigger, children, className = "" }: DropdownProps) => {
  return (
    <div className="group relative">
      <div className="cursor-pointer">{trigger}</div>
      <div
        className={`shadow-emphasize absolute left-1/2 top-full z-50 mt-5 hidden min-w-[7.5rem] -translate-x-1/2 flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 group-hover:flex ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
