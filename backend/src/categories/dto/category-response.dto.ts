import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductInCategoryDto } from './product-in-category.dto';

export class CategoryResponseDto {
  @Expose()
  @ApiProperty({ example: 'id' })
  @IsNotEmpty()
  @IsString()
  _id!: string;

  @Expose()
  @ApiProperty({ example: 'title' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Expose()
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ example: ['string'] })
  image!: string[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'slug' })
  slug!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'description' })
  description!: string;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true })
  isActive!: boolean;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'parentId' })
  parentId?: string;

  @Exclude()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '3' })
  __v?: string;

  @Expose()
  @ApiProperty({ type: [ProductInCategoryDto] })
  @IsNotEmpty()
  products!: ProductInCategoryDto[];
}
