"use client";

import Image from "next/image";
import { Product } from "@/shared/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function AmazingCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`}>
      <div
        className={`border border-stone-200 rounded mb-2 bg-white  p-3 w-450 sm:w-60 text-center shadow-md hover:shadow-lg transition-shadow flex flex-col items-center`}
      >
        {/* عکس محصول */}
        <div className="relative w-full aspect-square mb-2 bg-gray-100 rounded-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* نام محصول */}
        <h3 className="text-xs lg:text-sm font-medium line-clamp-1 mb-0.5">
          {product.title}
        </h3>

        {/* قیمت محصول */}
        <div className="flex flex-row-reverse gap-2 items-baseline">
          <p className="text-xs line-through text-gray-400 font-medium">
            {product.price.toLocaleString()}
          </p>
          <p className="text-white rounded-2xl px-2 bg-red-600 text-sm font-bold">
            {product.discount.toLocaleString()}%
          </p>
        </div>
        <p className="text-xs sm:text-sm md:text-base lg:text-sm font-bold">
          {((product.price * (100 - product.discount)) / 100).toLocaleString()}{" "}
          تومان
        </p>
      </div>
    </Link>
  );
}
