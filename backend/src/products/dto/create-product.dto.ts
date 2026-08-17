import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'title' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  title!: string;

  @ApiProperty({ example: 'description' })
  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  description!: string;

  @ApiProperty({ example: ['category1', 'category2'] })
  @IsNotEmpty()
  @IsArray()
  categories!: string[];

  @ApiProperty({ example: 500000 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(100)
  discount?: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiProperty({ example: 'http://url.com' })
  @IsNotEmpty()
  @IsUrl()
  @IsString()
  image!: string;

  @ApiProperty({ example: 'brand' })
  @IsString()
  @IsNotEmpty()
  brand!: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive!: boolean;
}
