import { create } from "zustand";
import { persist } from "zustand/middleware";
import ICartItem from "../types/carItem";

interface ICartStore {
  cartItems: ICartItem[];
  addItem: (item: Omit<ICartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create(
  persist<ICartStore>(
    (set, get) => ({
      cartItems: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.cartItems.find((i) => i.id === item.id);
          const newCart = existing
            ? state.cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            : [...state.cartItems, { ...item, quantity: 1 }];
          return { cartItems: newCart };
        }),

      removeItem: (id) =>
        set((state) => {
          const newCart = state.cartItems
            .map((i) =>
              i.id === id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i
            )
            .filter((i) => i.quantity > 0);
          return { cartItems: newCart };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const newCart = state.cartItems
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0);
          return { cartItems: newCart };
        }),

      clearCart: () => set({ cartItems: [] }),

      getTotalItems: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().cartItems.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        ),
    }),
    {
      name: "cart",
    }
  )
);
