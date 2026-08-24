import { getAmazingProducts } from "../services/amazing.service";
import AmazingCarousel from "./AmazingCarousel";

export default async function AmazingSection() {
  const products = await getAmazingProducts();

  if (!products.length) {
    return null;
  }

  return <AmazingCarousel products={products} />;
}