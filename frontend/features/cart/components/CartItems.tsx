import type { CartItem } from '../types/cart.type';

import { CartItem as CartItemComponent } from './CartItem';

interface CartItemsProps {
  items: CartItem[];
}

export function CartItems({
  items,
}: CartItemsProps) {
  return (
    <div>
      {items.map((item) => (
        <CartItemComponent
          key={item.product._id}
          item={item}
        />
      ))}
    </div>
  );
}