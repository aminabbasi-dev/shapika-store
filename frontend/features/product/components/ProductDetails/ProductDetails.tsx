import Image from "next/image";
import { ProductDetails as ProductDetailsType } from "../../types/product-details.type";
import ProductInfo from "./ProductInfo";

interface ProductDetailsProps {
  product: ProductDetailsType;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Product Information */}
        <ProductInfo product={product} />
      </div>
    </section>
  );
}