import { Category } from "../Types/category.type";
import { SubCategoryMenuProps } from "../Types/sub-category-menu-props.type";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { SubCategoryItem } from "./SubCategoryItem";

export function SubCategoryMenu({
  subCategories,
  isLoading,
  error,
}: SubCategoryMenuProps) {

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

  if (subCategories.length === 0) {
    //  [ho] = useState()
    return (
      <div className="text-center py-6 text-gray-500 text-sm">
        هیچ زیر دسته‌بندی یافت نشد
      </div>
    );
  }

  return (
    <ul className="space-y-0.5">
      <li>
        {subCategories.map((subCategory: Category) => {
          return (
            <SubCategoryItem key={subCategory._id} subCategory={subCategory} />
          );
        })}
      </li>
    </ul>
  );
}
