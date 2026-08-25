// features/product/components/ProductPage/ProductPage.tsx

import ProductDetails from "../ProductDetails/ProductDetails";
import { ProductDetails as ProductDetailsType } from "../../types/product-details.type";

interface ProductPageProps {
  product: ProductDetailsType;
}

export default function ProductPage({ product }: ProductPageProps) {
  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
}
