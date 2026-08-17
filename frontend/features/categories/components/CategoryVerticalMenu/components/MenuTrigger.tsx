import { ChevronLeft, MenuIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { MenuTriggerProps } from "../Types/menu-trigger-props.type";

export function MenuTrigger({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: MenuTriggerProps) {
  return (
    <li
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 text-sm font-medium text-gray-700 cursor-pointer"
    >
      <span className="inline-flex items-center gap-2 relative">
        <MenuIcon className="w-4 h-4" />
        <span>دسته‌بندی‌ها</span>
        <ChevronLeft
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-270",
          )}
        />
        {isOpen ? (
          <span className="absolute -bottom-1.5 right-0 w-full h-0.5 bg-linear-to-l from-red-500 to-red-600 scale-x-100 transition-transform duration-300 origin-right rounded-full" />
        ) : (
          <span className="absolute -bottom-1.5 right-0 w-full h-0.5 bg-linear-to-l from-red-500 to-red-600 scale-x-0 transition-transform duration-300 origin-right rounded-full" />
        )}
      </span>
    </li>
  );
}
