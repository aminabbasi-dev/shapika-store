import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { SubCategoryItemProps } from "../Types/sub-category-item-props.type";

export function SubCategoryItem({ subCategory }: SubCategoryItemProps) {
  return (
    <div className="relative">
      <Link
        href={`/categories/${subCategory.slug}`}
        className={cn(
          "flex items-center justify-between px-3 py-2.5 transition-all duration-150 text-sm font-medium",
        )}
      >
        <span className="flex items-center gap-2.5 text-black font-normal hover:text-red-500">
          {subCategory.title}
        </span>
      </Link>
    </div>
  );
}
