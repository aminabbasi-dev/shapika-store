import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ _id: false })
export class CartItem {
  @Prop({
    type: Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product!: Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  quantity!: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema({ timestamps: true })
export class Cart {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  user!: Types.ObjectId;

  @Prop({
    type: [CartItemSchema],
    default: [],
  })
  items!: CartItem[];

  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  totalItems!: number;

  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  subtotal!: number;

  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  totalPrice!: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
