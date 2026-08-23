import AmazingCarousel from "@/features/amazing/components/AmazingCarousel";
import { amazingProducts } from "@/features/amazing/data/amazings";
import { CategoriesGrid } from "@/features/categories/components/CategoriesGrid";
import { CategoryVerticalMenu } from "@/features/categories/components/CategoryVerticalMenu/CategoryVerticalMenu";
import { mainCategories } from "@/features/categories/data/categories";
import { HeroSliderContainer } from "@/features/hero-slider/components/HeroSliderContainer";


export default async function Home() {
  return (
    <>
      <CategoryVerticalMenu />
      {/* اسلایدر اصلی با تصاویر طبیعت */}
      <HeroSliderContainer/>

      <CategoriesGrid
        categories={mainCategories}
        size="lg"
        columns={10}
        showCount={true}
      />
      <AmazingCarousel
      products={amazingProducts}/>
    </>
  );
}
