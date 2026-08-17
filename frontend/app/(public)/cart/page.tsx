"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/stores/cart";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { cartItems, addItem, removeItem, clearCart } = useCart();

  // جمع کل سبد
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">سبد خرید شما</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">سبد خرید خالی است.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center border rounded-lg p-4 shadow-sm"
            >
              {/* تصویر محصول */}
              <div className="w-32 h-32 relative flex-shrink-0 mb-4 md:mb-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                  unoptimized
                />
              </div>

              {/* نام و قیمت */}
              <div className="flex-1 md:ml-6">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-amber-600 font-bold mt-1">
                  {item.price.toLocaleString()} تومان
                </p>

                {/* تعداد محصول */}
                <div className="flex items-center gap-3 mt-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => removeItem(item.id)}
                    className="h-9 w-9 rounded-full bg-red-200 text-red-600 hover:bg-red-300"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <Badge className="min-w-10 h-9 px-3 flex items-center justify-center text-sm font-semibold">
                    {item.quantity}
                  </Badge>

                  <Button
                    size="icon"
                    className="h-9 w-9 rounded-full bg-green-500 text-white hover:bg-green-600"
                    onClick={() => addItem(item)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-9 w-9 rounded-full ml-auto"
                    onClick={() => clearCart()}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* جمع کل */}
          <div className="text-right mt-4 text-xl font-bold">
            جمع کل: {totalPrice.toLocaleString()} تومان
          </div>

          <div className="text-right mt-2">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
              ادامه خرید / پرداخت
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
