import CaretDown from "@/assets/icons/caret-down.svg";
import { ReactNode, useEffect, useRef, useState } from "react";

type DropdownItem = {
  label: string;
  displayLabel?: string;
  onClick?: () => void;
  active?: boolean;
};

type DropdownProps = {
  mode?: "hover" | "click";
  trigger?: ReactNode;
  children?: ReactNode;
  items?: DropdownItem[];
  className?: string;
  triggerClassName?: string;
};

const Dropdown = ({
  mode = "hover",
  trigger,
  children,
  items,
  className = "",
  triggerClassName = ""
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // use active item as trigger
  const activeItem = items?.find((item) => item.active);
  const displayTrigger =
    trigger ||
    (activeItem ? (
      <button
        className={`flex items-center gap-2 focus:outline-none ${triggerClassName} ${className} ${
          mode === "click" ? "shadow-normal rounded-lg bg-bg-01 px-5 py-3" : ""
        }`}
      >
        {activeItem.displayLabel || activeItem.label}
        {mode === "click" && (
          <CaretDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "-rotate-180" : ""}`}
            strokeWidth={3}
          />
        )}
      </button>
    ) : null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (mode === "click") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (mode === "click") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [mode]);

  const handleTriggerClick = () => {
    if (mode === "click") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="group relative" ref={dropdownRef}>
      <div className="cursor-pointer" onClick={handleTriggerClick}>
        {displayTrigger}
      </div>
      <div
        className={`shadow-emphasize absolute left-1/2 top-full z-50 -translate-x-1/2 flex-col items-center justify-center gap-4 whitespace-nowrap rounded-2xl bg-white p-5 before:absolute before:-top-5 before:left-0 before:h-5 before:w-full before:content-[''] ${
          mode === "hover" ? "mt-5 hidden group-hover:flex" : isOpen ? "mt-2 flex" : "hidden"
        } ${className}`}
      >
        {items
          ? items.map((item, index) => [
              <button
                key={`item-${index}`}
                onClick={() => {
                  item.onClick?.();
                  if (mode === "click") {
                    setIsOpen(false);
                  }
                }}
                className={`flex h-[1.6875rem] w-full flex-row items-center justify-center px-2 ${className} transition-colors hover:text-text-03 ${
                  item.active ? "text-text-04" : "text-text-02"
                }`}
              >
                {item.label}
              </button>,
              index < items.length - 1 && <hr key={`hr-${index}`} className="w-full border-t border-line-02" />
            ])
          : children}
      </div>
    </div>
  );
};

export default Dropdown;
