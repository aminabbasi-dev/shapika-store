import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Types } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
import type { Date } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ProductInCategoryDto extends CreateProductDto {
  @ApiProperty({
    type: String,
    example: '507f1f77bcf86cd799439020',
    description: 'شناسه محصول',
  })
  @Expose()
  _id!: Types.ObjectId;

  @ApiProperty({
    type: String,
    example: '2024-01-15T10:30:00.000Z',
    description: 'تاریخ ایجاد',
  })
  @Exclude()
  createdAt?: Date;

  @ApiProperty({
    type: String,
    example: '2024-07-27T14:20:00.000Z',
    description: 'تاریخ آخرین به‌روزرسانی',
  })
  @Exclude()
  updatedAt?: Date;

  @Exclude()
  __v?: number;
}
