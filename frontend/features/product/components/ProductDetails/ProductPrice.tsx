// features/product/components/ProductDetails/ProductPrice.tsx

interface ProductPriceProps {
  price: number;
  discount: number;
}

export default function ProductPrice({ price, discount }: ProductPriceProps) {
  const finalPrice = price - (price * discount) / 100;

  return (
    <div className="mt-6">
      {discount > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 line-through">
            {price.toLocaleString()} تومان
          </span>

          <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
            {discount}%
          </span>
        </div>
      )}

      <p className="mt-2 text-2xl font-bold">
        {finalPrice.toLocaleString()} تومان
      </p>
    </div>
  );
}
