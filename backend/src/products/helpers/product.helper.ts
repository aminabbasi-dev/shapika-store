import { Model } from 'mongoose';

import { ConflictException } from '@nestjs/common';
import { CategoryDocument } from 'src/categories/schemas/category.schema';
import { ProductDocument } from '../schemas/product.schema';
import { UpdateProductDto } from '../dto/update-product.dto';
import { QueryFilter } from 'mongoose';

export class ProductHelper {
  static async matchCategories(
    categories: string[],
    model: Model<CategoryDocument>,
  ): Promise<void> {
    const mistakeCategories: string[] = [];
    const allCategories = await model.find().select('_id').lean();
    const existingCategoriesId = allCategories.map((cat) => cat._id.toString());

    for (const catId of categories) {
      if (existingCategoriesId.includes(catId)) {
        continue;
      } else if (!mistakeCategories.includes(catId)) {
        mistakeCategories.push(catId);
      }
    }

    if (mistakeCategories.length > 0) {
      throw new ConflictException(`${mistakeCategories.join(',')} not exist`);
    }
  }

  // برسی تغیرات محصول و داده موجود
  static hasChanges(
    currentProduct: ProductDocument,
    updateProductDto: UpdateProductDto,
  ): boolean {
    // فیلدهای قابل مقایسه
    const fieldsToCheck = [
      'title',
      'description',
      'categories',
      'price',
      'discount',
      'stock',
      'image',
      'brand',
      'isActive',
    ];
    for (const field of fieldsToCheck) {
      // اگر فیلد در DTO وجود دارد و با مقدار فعلی متفاوت است
      if (
        updateProductDto[field] !== undefined &&
        currentProduct[field] !== updateProductDto[field]
      ) {
        return true; // تغییری وجود دارد
      }
    }
    return false; // هیچ تغییری وجود ندارد
  }

  static isNotDataEmpty(updateProductDto: Partial<UpdateProductDto>): boolean {
    // گرفتن کلیدهای موجود در DTO
    const fieldsToCheck = Object.keys(
      updateProductDto,
    ) as (keyof UpdateProductDto)[];

    // اگر DTO خالی بود
    if (fieldsToCheck.length === 0) return false;

    // چک کردن اینکه حداقل یکی از فیلدها مقدار داشته باشد
    return fieldsToCheck.some(
      (field) =>
        updateProductDto[field] !== undefined &&
        updateProductDto[field] !== null &&
        updateProductDto[field] !== '',
    );
  }

  //checkDuplicatedOnUpdate
  static async checkDuplicatedOnUpdate(
    id: string,
    model: Model<ProductDocument>,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    if (updateProductDto.title) {
      const query: QueryFilter<ProductDocument> = {
        title: updateProductDto.title,
        _id: { $ne: id },
      };
      const product = await model.findOne(query).exec();
      if (product) {
        throw new ConflictException('محصولی با این عنوان وجود دارد');
      }
    }
  }
}
