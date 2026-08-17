import AmazingCarousel from "@/features/amazing/components/AmazingCarousel";
import { amazingProducts } from "@/features/amazing/data/amazings";
import { CategoriesGrid } from "@/features/categories/components/CategoriesGrid";
import { CategoryVerticalMenu } from "@/features/categories/components/CategoryVerticalMenu/CategoryVerticalMenu";
import { mainCategories } from "@/features/categories/data/categories";
import { HeroSlider } from "@/features/hero-slider/components/HeroSlider";
import { kaboomSlides } from "@/features/hero-slider/data/slides";

export default async function Home() {
  return (
    <>
      <CategoryVerticalMenu />
      {/* اسلایدر اصلی با تصاویر طبیعت */}
      <HeroSlider
        slides={kaboomSlides}
        autoPlayInterval={3500}
        className="w-full"
      />

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
