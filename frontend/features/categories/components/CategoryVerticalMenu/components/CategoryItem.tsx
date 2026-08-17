import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { CategoryItemProps } from "../Types/category-item-props.type";

export function CategoryItem({
  category,
  hoveredCategory,
  setHoveredCategory,
}: CategoryItemProps) {
  return (
    <li
      className={`relative rounded-sm ${hoveredCategory === category._id && "bg-white"}`}
      onMouseEnter={() => setHoveredCategory(category._id)}
      // onMouseLeave={() => setHoveredCategory(null)}
    >
      <Link
        href={`/categories/${category.slug}`}
        className={cn(
          "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 text-sm text-black font-medium",
        )}
      >
        <span className="flex items-center gap-2.5">{category.title}</span>
      </Link>
    </li>
  );
}
