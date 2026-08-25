import { ProductDetails } from "../../types/product-details.type";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";

interface ProductInfoProps {
  product: ProductDetails;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-2xl font-bold md:text-3xl">
        {product.title}
      </h1>

      <p className="mt-3 text-gray-500">
        برند: {product.brand}
      </p>

      <ProductPrice
        price={product.price}
        discount={product.discount}
      />

      <p className="mt-6 leading-8 text-gray-700">
        {product.description}
      </p>

      <div className="mt-6">
        {product.stock > 0 ? (
          <span className="text-green-600">
            موجودی: {product.stock} عدد
          </span>
        ) : (
          <span className="text-red-600">
            ناموجود
          </span>
        )}
      </div>

      <ProductActions
        productId={product._id}
        stock={product.stock}
      />
    </div>
  );
}