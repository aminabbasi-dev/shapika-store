import { getHeroSlides } from "../services/heroSlider.service";
import { HeroSlider } from "./HeroSlider";

export async function HeroSliderContainer() {
  const slides = await getHeroSlides();

  return (
    <HeroSlider slides={slides} autoPlayInterval={3500} className="w-full" />
  );
}
