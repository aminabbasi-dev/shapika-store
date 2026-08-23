import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true, unique: true })
  title!: string;

  @Prop({ required: true, trim: true })
  description!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true,
    default: [],
  })
  categories!: Types.ObjectId[];

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  discount!: number;

  @Prop({ required: true })
  stock!: number;

  @Prop({ required: true, trim: true })
  image!: string;

  @Prop({ required: true, trim: true })
  brand!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
