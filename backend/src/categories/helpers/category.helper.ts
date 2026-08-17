import { Model, QueryFilter } from 'mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryDocument } from '../schemas/category.schema';
import { ConflictException } from '@nestjs/common';
import { ProductDocument } from 'src/products/schemas/product.schema';
import { ProductInCategoryDto } from '../dto/product-in-category.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateCategoryDto } from '../dto/update-category.dto';

export class CategoryHelper {
  static async checkDuplicateOnCreate(
    categoryModel: Model<CategoryDocument>,
    createCategoryDto: CreateCategoryDto,
  ) {
    const category = await categoryModel
      .findOne({
        $or: [
          { title: createCategoryDto.title },
          { slug: createCategoryDto.slug },
        ],
      })
      .select('-_v')
      .lean();
    if (
      createCategoryDto.title === category?.title &&
      createCategoryDto.slug === category?.slug
    ) {
      throw new ConflictException('عنوان و اسلاگ دسته بندی تکراری هستند');
    }
    if (createCategoryDto.title === category?.title) {
      throw new ConflictException('عنوان دسته بندی تکراری است');
    }
    if (createCategoryDto.slug === category?.slug) {
      throw new ConflictException('اسلاگ دسته بندی تکراری است');
    }
  }
  static async getCategoryProducts(
    catId: string,
    productModel: Model<ProductDocument>,
  ): Promise<ProductInCategoryDto[]> {
    const data = await productModel
      .find({ categories: { $in: [catId] } })
      .select('-__v -updatedAt -createdAt')
      .lean()
      .exec();
    const products = plainToInstance(ProductInCategoryDto, data, {
      enableImplicitConversion: true,
    });

    return products;
  }

  static isNotDataEmpty(
    updateCategoryDto: Partial<UpdateCategoryDto>,
  ): boolean {
    // گرفتن کلیدهای موجود در DTO
    const fieldsToCheck = Object.keys(
      updateCategoryDto,
    ) as (keyof UpdateCategoryDto)[];

    // اگر DTO خالی بود
    if (fieldsToCheck.length === 0) return false;

    // چک کردن اینکه حداقل یکی از فیلدها مقدار داشته باشد
    return fieldsToCheck.some(
      (field) =>
        updateCategoryDto[field] !== undefined &&
        updateCategoryDto[field] !== null &&
        updateCategoryDto[field] !== '',
    );
  }

  //checkDuplicatedOnUpdate
  static async checkDuplicatedOnUpdate(
    id: string,
    categoryModel: Model<CategoryDocument>,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const orConditions: Array<{ title?: string } | { slug?: string }> = [];
    if (updateCategoryDto?.title) {
      orConditions.push({ title: updateCategoryDto.title });
    }
    if (updateCategoryDto?.slug) {
      orConditions.push({ slug: updateCategoryDto.slug });
    }

    if (orConditions.length === 0) {
      const query: QueryFilter<CategoryDocument> = {
        $or: orConditions,
        _id: { $ne: id },
      };

      const category = await categoryModel.findOne(query).exec();
      if (category) {
        // تشخیص دقیق اینکه کدام فیلد تکراری است
        if (
          updateCategoryDto.title &&
          category.title === updateCategoryDto.title
        ) {
          throw new ConflictException(
            'این عنوان دسته بندی قبلا استفاده شده است',
          );
        }
        if (
          updateCategoryDto.slug &&
          category.slug === updateCategoryDto.slug
        ) {
          throw new ConflictException('این اسلاگ قبلا استفاده شده است');
        }
      }
    }
  }

  // برسی تغیرات محصول و داده موجود
  static hasChanges(
    currentCategory: CategoryDocument,
    updateCategoryDto: UpdateCategoryDto,
  ): boolean {
    // فیلدهای قابل مقایسه
    const fieldsToCheck = [
      'title',
      'description',
      'slug',
      'image',
      'isActive',
      'parentId',
    ];
    for (const field of fieldsToCheck) {
      // اگر فیلد در DTO وجود دارد و با مقدار فعلی متفاوت است
      if (
        updateCategoryDto[field] !== undefined &&
        currentCategory[field] !== updateCategoryDto[field]
      ) {
        return true; // تغییری وجود دارد
      }
    }
    return false; // هیچ تغییری وجود ندارد
  }
}
