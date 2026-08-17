// src/modules/users/helpers/user.helper.ts
import { Model, QueryFilter } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UserHelper {
  //hashPassword
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  //comparePassword
  static async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  //checkDuplicateOnCreate
  static async checkDuplicateOnCreate(
    model: Model<UserDocument>,
    createUserDto: CreateUserDto,
  ): Promise<void> {
    const user = await model.findOne({
      $or: [
        { email: createUserDto.email },
        { phone_number: createUserDto.phone_number },
      ],
    });

    if (user) {
      throw new ConflictException('ایمیل یا شماره تلفن تکراری است');
    }
  }

  //checkDuplicatedOnUpdate
  static async checkDuplicatedOnUpdate(
    id: string,
    model: Model<UserDocument>,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const orConditions: Array<{ email?: string } | { phone_number?: string }> =
      [];
    if (updateUserDto?.email) {
      orConditions.push({ email: updateUserDto.email });
    }
    if (updateUserDto?.phone_number) {
      orConditions.push({ phone_number: updateUserDto.phone_number });
    }
    const query: QueryFilter<UserDocument> = {
      $or: orConditions,
      _id: { $ne: id },
    };

    const user = await model.findOne(query).exec();
    if (user) {
      // تشخیص دقیق اینکه کدام فیلد تکراری است
      if (updateUserDto.email && user.email === updateUserDto.email) {
        throw new ConflictException(
          'این ایمیل قبلاً توسط کاربر دیگری استفاده شده است',
        );
      }
      if (
        updateUserDto.phone_number &&
        user.phone_number === updateUserDto.phone_number
      ) {
        throw new ConflictException(
          'این شماره تلفن قبلاً توسط کاربر دیگری استفاده شده است',
        );
      }
    }
  }

  // findByIdOrThrow
  static async findByIdOrThrow(id: string, model: Model<UserDocument>) {
    const currentUser = await model
      .findById(id)
      .select('-password -__v')
      .exec();
    if (!currentUser) {
      throw new ConflictException('این کاربر وجود ندارد');
    }
    return currentUser;
  }

  /**
   * بررسی تغییرات بین کاربر فعلی و داده‌های جدید
   * ✅ اینجا در سرویس
   */
  static hasChanges(
    currentUser: UserDocument,
    updateUserDto: UpdateUserDto,
  ): boolean {
    // فیلدهای قابل مقایسه
    const fieldsToCheck = [
      'first_name',
      'last_name',
      'email',
      'phone_number',
      'UserRole',
    ];

    for (const field of fieldsToCheck) {
      // اگر فیلد در DTO وجود دارد و با مقدار فعلی متفاوت است
      if (
        updateUserDto[field] !== undefined &&
        currentUser[field] !== updateUserDto[field]
      ) {
        return true; // تغییری وجود دارد
      }
    }
    return false; // هیچ تغییری وجود ندارد
  }

  static isNotEmptyData(updateUserDto: Partial<UpdateUserDto>): boolean {
    // گرفتن کلیدهای موجود در DTO
    const fieldsToCheck = Object.keys(updateUserDto) as (keyof UpdateUserDto)[];

    // اگر DTO خالی بود
    if (fieldsToCheck.length === 0) return false;

    // چک کردن اینکه حداقل یکی از فیلدها مقدار داشته باشد
    return fieldsToCheck.some(
      (field) =>
        updateUserDto[field] !== undefined &&
        updateUserDto[field] !== null &&
        updateUserDto[field] !== '',
    );
  }
}
