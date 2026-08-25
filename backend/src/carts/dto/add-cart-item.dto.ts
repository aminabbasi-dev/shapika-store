import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsInt, Min } from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({
    description: 'شناسه محصول',
    example: '65f1a8b2c4d5e6f789012345',
  })
  @IsMongoId()
  productId!: string;

  @ApiProperty({
    description: 'تعداد محصول',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity!: number;
}
