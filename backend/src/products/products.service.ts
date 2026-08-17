import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categories/schemas/category.schema';
import { ProductHelper } from './helpers/product.helper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    await ProductHelper.matchCategories(
      createProductDto.categories,
      this.categoryModel,
    );
    const isProductExist = await this.productModel.findOne({
      title: createProductDto.title,
    });
    if (isProductExist) {
      throw new ConflictException('محصولی با این نام موجود است');
    }
    return this.productModel.create(createProductDto);
  }

  async findAll() {
    const products = await this.productModel
      .find()
      .populate({
        path: 'categories',
        select: 'title slug description ',
      })
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return products || [];
  }

  async findOne(id: string) {
    // اعتبارسنجی ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('شناسه محصول معتبر نیست');
    }
    const product = await this.productModel.findOne({ _id: id });
    if (!product) {
      throw new ConflictException('محصول پیدا نشد');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const isNotDataEmpty = ProductHelper.isNotDataEmpty(updateProductDto);

    if (!isNotDataEmpty) {
      throw new BadRequestException('هیچ فیلد معتبری وجود ندارد');
    }
    await ProductHelper.checkDuplicatedOnUpdate(
      id,
      this.productModel,
      updateProductDto,
    );
    const product = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
    );
    if (!product) {
      throw new ConflictException('محصول پیدا نشد');
    }
    ProductHelper.hasChanges(product, updateProductDto);
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new ConflictException('محصول پیدا نشد');
    }
    return product;
  }
}
