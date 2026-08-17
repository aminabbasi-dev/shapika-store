"use client";

import { useCategoryTree } from "../../hooks/use-category-tree";
import { useMenuDelay } from "./hooks/useMenuDelay";
import { MenuTrigger } from "./components/MenuTrigger";
import { SpecialOfferItem } from "./components/SpecialOfferItem";
import { CategoryMenu } from "./components/CategoryMenu";
import { SubCategoryMenu } from "./components/SubCategoryMenu";
import { useMemo } from "react";
import { TrendingProducts } from "./components/TrendingProducts";

export function CategoryVerticalMenu() {
  const { rootCategories, getChildren, isLoading, error } = useCategoryTree();
  const {
    isOpen,
    hoveredCategory,
    setHoveredCategory,
    handleMouseEnter,
    handleMouseLeave,
  } = useMenuDelay();
  const subCategories = useMemo(() => {
    if (hoveredCategory !== null) {
      return getChildren(hoveredCategory);
    }
    // دیفالت: زیرمجموعه‌های اولین دسته
    return rootCategories.length > 0 ? getChildren(rootCategories[0]._id) : [];
  }, [hoveredCategory, getChildren, rootCategories]);

  return (
    <div className="relative">
      <ul className="flex">
        <MenuTrigger
          isOpen={isOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <SpecialOfferItem />
        <TrendingProducts/>
      </ul>

      {isOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex absolute right-0 top-full mt-1 w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
        >
          <div className="max-h-[400px] overflow-y-auto p-2">
            <CategoryMenu
              selectedCategory={rootCategories[0]}
              categories={rootCategories}
              getChildren={getChildren}
              hoveredCategory={hoveredCategory}
              setHoveredCategory={setHoveredCategory}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <div className="max-h-[400px] overflow-y-auto p-2">
            <SubCategoryMenu
              subCategories={subCategories}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
}
