"use client";

import { useState } from "react";

import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/stores/cart";
import { Button } from "@/components/ui/button";

export function MiniCart() {
  const { cartItems, addItem, removeItem, getTotalItems, getTotalPrice } =
    useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* آیکون سبد خرید */}

      <Button
        variant="ghost"
        size="icon"
        className="text-blue-700 cursor-pointer hover:text-blue-950"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <ShoppingCart className="w-5 h-5 text-red-400" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </Button>

      {/* کارت کوچک سبد خرید */}
      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute left-0 w-80 bg-white border rounded-lg shadow-lg p-4 z-50"
        >
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">سبد خرید خالی است.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 px-2">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-amber-600 font-bold text-sm">
                      {item.price.toLocaleString()} تومان
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => removeItem(item.id)}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() =>
                        addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        })
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="text-right font-bold mt-2">
                جمع کل: {getTotalPrice().toLocaleString()} تومان
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
