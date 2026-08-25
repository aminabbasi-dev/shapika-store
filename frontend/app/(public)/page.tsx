import AmazingSection from "@/features/amazing/components/AmazingSection";
import { CategoriesGrid } from "@/features/categories/components/CategoriesGrid";
import { mainCategories } from "@/features/categories/data/categories";
import { HeroSliderContainer } from "@/features/hero-slider/components/HeroSliderContainer";

export default async function Home() {
  return (
    <>
      <HeroSliderContainer />

      <CategoriesGrid
        categories={mainCategories}
        size="lg"
        columns={10}
        showCount={true}
      />
      <AmazingSection />
    </>
  );
}
