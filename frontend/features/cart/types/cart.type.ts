export interface CartProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  image: string;
  brand: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface Cart {
  _id?: string;
  user: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddCartItemPayload {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}
