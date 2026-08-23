import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HeroSlideDocument = HydratedDocument<HeroSlide>;

@Schema({
  timestamps: true,
})
export class HeroSlide {
  @Prop({
    required: true,
    trim: true,
  })
  image!: string;

  @Prop({
    required: true,
    trim: true,
  })
  alt!: string;

  @Prop({
    trim: true,
  })
  title?: string;

  @Prop({
    trim: true,
  })
  description?: string;

  @Prop({
    trim: true,
  })
  link?: string;

  @Prop({
    trim: true,
  })
  credit?: string;

  @Prop({
    required: true,
    default: 0,
    unique: true,
  })
  order!: number;

  @Prop({
    default: true,
  })
  isActive?: boolean;
}

export const HeroSlideSchema = SchemaFactory.createForClass(HeroSlide);
