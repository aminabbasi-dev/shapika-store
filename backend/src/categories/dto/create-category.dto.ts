import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'title' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ example: ['string'] })
  image!: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'slug' })
  slug!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'description' })
  description!: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true })
  isActive!: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'parentId' })
  parentId?: string;
}
