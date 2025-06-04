import { ReactNode } from "react";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface DropdownProps {
  trigger?: ReactNode;
  children?: ReactNode;
  items?: DropdownItem[];
  className?: string;
  triggerClassName?: string;
}

const Dropdown = ({ trigger, children, items, className = "", triggerClassName = "" }: DropdownProps) => {
  // use active item as trigger
  const activeItem = items?.find((item) => item.active);
  const displayTrigger =
    trigger ||
    (activeItem ? (
      <button className={`focus:outline-none ${triggerClassName} ${className}`}>{activeItem.label}</button>
    ) : null);

  return (
    <div className="group relative">
      <div className="cursor-pointer">{displayTrigger}</div>
      <div
        className={`shadow-emphasize absolute left-1/2 top-full z-50 mt-5 hidden min-w-[7.5rem] -translate-x-1/2 flex-col items-center justify-center gap-4 rounded-2xl bg-white p-5 before:absolute before:-top-5 before:left-0 before:h-5 before:w-full before:content-[''] group-hover:flex ${className}`}
      >
        {items
          ? items.map((item, index) => [
              <button
                key={`item-${index}`}
                onClick={item.onClick}
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
