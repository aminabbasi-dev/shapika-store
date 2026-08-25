import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CartService } from './carts.service';

import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import type { AuthUser } from '../auth/interfaces/auth-user.interface';

@ApiTags('سبد خرید')
@ApiBearerAuth()
@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // =========================
  // دریافت سبد خرید
  // =========================

  @Get()
  @ApiOperation({
    summary: 'دریافت سبد خرید',
    description:
      'سبد خرید کاربر احراز هویت‌شده را به همراه محصولات موجود در آن دریافت می‌کند.',
  })
  @ApiResponse({
    status: 200,
    description: 'سبد خرید با موفقیت دریافت شد.',
  })
  @ApiResponse({
    status: 401,
    description: 'کاربر احراز هویت نشده است.',
  })
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  @Header('Pragma', 'no-cache')
  @Header('Expires', '0')
  async getCart(@CurrentUser() user: AuthUser) {
    return this.cartService.getCart(user.id);
  }

  // =========================
  // افزودن محصول به سبد خرید
  // =========================

  @Post('items')
  @ApiOperation({
    summary: 'افزودن محصول به سبد خرید',
    description:
      'یک محصول را با تعداد مشخص به سبد خرید کاربر اضافه می‌کند. اگر محصول قبلاً در سبد وجود داشته باشد، تعداد آن افزایش پیدا می‌کند.',
  })
  @ApiBody({
    type: AddCartItemDto,
    description: 'شناسه محصول و تعداد موردنظر برای افزودن به سبد خرید.',
  })
  @ApiResponse({
    status: 201,
    description: 'محصول با موفقیت به سبد خرید اضافه شد.',
  })
  @ApiResponse({
    status: 400,
    description: 'تعداد درخواستی بیشتر از موجودی محصول است.',
  })
  @ApiResponse({
    status: 401,
    description: 'کاربر احراز هویت نشده است.',
  })
  @ApiResponse({
    status: 404,
    description: 'محصول موردنظر پیدا نشد.',
  })
  async addItem(
    @CurrentUser() user: AuthUser,
    @Body() addCartItemDto: AddCartItemDto,
  ) {
    return this.cartService.addItem(user.id, addCartItemDto);
  }

  // =========================
  // تغییر تعداد محصول
  // =========================

  @Patch('items/:productId')
  @ApiOperation({
    summary: 'تغییر تعداد محصول در سبد خرید',
    description:
      'تعداد یک محصول موجود در سبد خرید را تغییر می‌دهد. تعداد جدید نباید بیشتر از موجودی محصول باشد.',
  })
  @ApiParam({
    name: 'productId',
    description: 'شناسه محصولی که تعداد آن باید تغییر کند.',
    example: '65f1a8b2c4d5e6f789012345',
  })
  @ApiBody({
    type: UpdateCartItemDto,
    description: 'تعداد جدید محصول در سبد خرید.',
  })
  @ApiResponse({
    status: 200,
    description: 'تعداد محصول با موفقیت تغییر کرد.',
  })
  @ApiResponse({
    status: 400,
    description: 'تعداد جدید بیشتر از موجودی محصول است.',
  })
  @ApiResponse({
    status: 401,
    description: 'کاربر احراز هویت نشده است.',
  })
  @ApiResponse({
    status: 404,
    description: 'سبد خرید یا محصول موردنظر پیدا نشد.',
  })
  async updateItem(
    @CurrentUser() user: AuthUser,
    @Param('productId') productId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(user.id, productId, updateCartItemDto);
  }

  // =========================
  // حذف محصول از سبد خرید
  // =========================

  @Delete('items/:productId')
  @ApiOperation({
    summary: 'حذف محصول از سبد خرید',
    description: 'محصول مشخص‌شده را به طور کامل از سبد خرید کاربر حذف می‌کند.',
  })
  @ApiParam({
    name: 'productId',
    description: 'شناسه محصولی که باید از سبد خرید حذف شود.',
    example: '65f1a8b2c4d5e6f789012345',
  })
  @ApiResponse({
    status: 200,
    description: 'محصول با موفقیت از سبد خرید حذف شد.',
  })
  @ApiResponse({
    status: 401,
    description: 'کاربر احراز هویت نشده است.',
  })
  @ApiResponse({
    status: 404,
    description: 'سبد خرید یا محصول موردنظر پیدا نشد.',
  })
  async removeItem(
    @CurrentUser() user: AuthUser,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeItem(user.id, productId);
  }

  // =========================
  // خالی کردن سبد خرید
  // =========================

  @Delete()
  @ApiOperation({
    summary: 'خالی کردن سبد خرید',
    description: 'تمام محصولات موجود در سبد خرید کاربر را حذف می‌کند.',
  })
  @ApiResponse({
    status: 200,
    description: 'سبد خرید با موفقیت خالی شد.',
  })
  @ApiResponse({
    status: 401,
    description: 'کاربر احراز هویت نشده است.',
  })
  @ApiResponse({
    status: 404,
    description: 'سبد خرید پیدا نشد.',
  })
  async clearCart(@CurrentUser() user: AuthUser) {
    return this.cartService.clearCart(user.id);
  }
}
