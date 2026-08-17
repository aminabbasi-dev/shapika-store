import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  // UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { UserRole } from 'src/common/enums/user-role.enum';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('محصولات')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد محصول جدید' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'پیدا کردن همه محصولات' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  // @Roles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'پیدا کردن یک محصول' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'تغییر کامل یک محصول' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف یک محصول' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
