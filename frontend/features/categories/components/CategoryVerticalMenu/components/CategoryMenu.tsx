
import { CategoryMenuProps } from "../Types/category-menu-props.type";
import { Category } from "../Types/category.type";
import { CategoryItem } from "./CategoryItem";
import { LoadingSkeleton } from "./LoadingSkeleton";


export function CategoryMenu({
  categories,
  // getChildren,
  // pathname,
  hoveredCategory,
  setHoveredCategory,
  isLoading,
  error,
}: CategoryMenuProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500 text-sm">
        خطا در دریافت دسته‌بندی‌ها
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-sm">
        هیچ دسته‌بندی یافت نشد
      </div>
    );
  }

  return (
    <ul className="space-y-0.5 bg-neutral-200">
      {categories.map((category:Category) => {

        return (
          <CategoryItem
            key={category._id}
            category={category}
            hoveredCategory={hoveredCategory}
            setHoveredCategory={setHoveredCategory}
          />
        );
      })}
    </ul>
  );
}
