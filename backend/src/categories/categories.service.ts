import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CategoryHelper } from './helpers/category.helper';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';
import { CategoryResponseDto } from './dto/category-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    await CategoryHelper.checkDuplicateOnCreate(
      this.categoryModel,
      createCategoryDto,
    );
    const category = await this.categoryModel.create(createCategoryDto);

    return category;
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryModel
      .find({ isActive: true })
      .select('-__v -isActive') // حذف __v از کوئری
      .lean()
      .exec();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('هیچ دسته‌بندی وجود ندارد');
    }

    // تبدیل به DTO با plainToInstance
    return categories.map((category) =>
      plainToInstance(CategoryResponseDto, category, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      }),
    );
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    const categoryData = await this.categoryModel.findById(id);
    if (!categoryData) {
      throw new NotFoundException('دسته‌بندی یافت نشد');
    }
    const categoryProducts = await CategoryHelper.getCategoryProducts(
      id,
      this.ProductModel,
    );
    const category = plainToInstance(CategoryResponseDto, categoryData, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
    return { ...category, products: categoryProducts };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const isNotDataEmpty = CategoryHelper.isNotDataEmpty(updateCategoryDto);

    if (!isNotDataEmpty) {
      throw new BadRequestException('هیچ فیلد معتبری وجود ندارد');
    }
    await CategoryHelper.checkDuplicatedOnUpdate(
      id,
      this.categoryModel,
      updateCategoryDto,
    );
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
    );
    if (!category) {
      throw new ConflictException('دسته بندی پیدا نشد');
    }
    CategoryHelper.hasChanges(category, updateCategoryDto);
    return category;
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new ConflictException('دسته بندی پیدا نشد');
    }
    return category;
  }
}
