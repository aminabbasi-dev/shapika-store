import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  image!: string[];

  @Prop()
  slug!: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
  })
  description?: string;

  @Prop({
    type: Boolean,
    default: true,
    index: true,
  })
  isActive!: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
    required: false,
    index: true,
    default: null,
  })
  parentId?: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
