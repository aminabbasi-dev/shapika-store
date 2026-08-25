import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Cart, CartDocument } from './schemas/cart.schema';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

import { Product, ProductDocument } from '../products/schemas/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,

    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // =========================
  // Get Cart
  // =========================

  async getCart(userId: string) {
    const cart = await this.cartModel
      .findOne({
        user: new Types.ObjectId(userId),
      })
      .populate('items.product');

    if (!cart) {
      return {
        user: userId,
        items: [],
        totalItems: 0,
        subtotal: 0,
        totalPrice: 0,
      };
    }

    return cart;
  }

  // =========================
  // Add Item To Cart
  // =========================

  async addItem(userId: string, addCartItemDto: AddCartItemDto) {
    const { productId, quantity } = addCartItemDto;

    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < quantity) {
      throw new BadRequestException('Not enough product stock');
    }

    const userObjectId = new Types.ObjectId(userId);

    let cart = await this.cartModel.findOne({
      user: userObjectId,
    });

    // Create cart
    if (!cart) {
      cart = new this.cartModel({
        user: userObjectId,
        items: [
          {
            product: product._id,
            quantity,
          },
        ],
      });

      await this.recalculateCart(cart);

      return cart.populate('items.product');
    }

    // Check if product already exists
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.stock) {
        throw new BadRequestException('Not enough product stock');
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
      });
    }

    await this.recalculateCart(cart);

    return cart.populate('items.product');
  }

  // =========================
  // Update Cart Item
  // =========================

  async updateItem(
    userId: string,
    productId: string,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const { quantity } = updateCartItemDto;

    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (quantity > product.stock) {
      throw new BadRequestException('Not enough product stock');
    }

    const cart = await this.cartModel.findOne({
      user: new Types.ObjectId(userId),
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      throw new NotFoundException('Product is not in cart');
    }

    item.quantity = quantity;

    await this.recalculateCart(cart);

    return cart.populate('items.product');
  }

  // =========================
  // Remove Item From Cart
  // =========================

  async removeItem(userId: string, productId: string) {
    const cart = await this.cartModel.findOne({
      user: new Types.ObjectId(userId),
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId,
    );

    if (!itemExists) {
      throw new NotFoundException('Product is not in cart');
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await this.recalculateCart(cart);

    return cart.populate('items.product');
  }

  // =========================
  // Clear Cart
  // =========================

  async clearCart(userId: string) {
    const cart = await this.cartModel.findOne({
      user: new Types.ObjectId(userId),
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];

    await this.recalculateCart(cart);

    return cart;
  }

  // =========================
  // Recalculate Cart
  // =========================

  private async recalculateCart(cart: CartDocument) {
    let totalItems = 0;
    let subtotal = 0;

    for (const item of cart.items) {
      const product = await this.productModel.findById(item.product);

      if (!product) {
        continue;
      }

      const finalPrice = this.calculateFinalPrice(
        product.price,
        product.discount,
      );

      totalItems += item.quantity;

      subtotal += finalPrice * item.quantity;
    }

    cart.totalItems = totalItems;
    cart.subtotal = subtotal;
    cart.totalPrice = subtotal;

    await cart.save();
  }

  // =========================
  // Calculate Final Price
  // =========================

  private calculateFinalPrice(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }
}
