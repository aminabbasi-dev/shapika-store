import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { UserHelper } from './helpers/user.helper';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    await UserHelper.checkDuplicateOnCreate(this.userModel, createUserDto);
    const hashedPassword = await UserHelper.hashPassword(
      createUserDto.password,
    );
    const userData = { ...createUserDto, password: hashedPassword };
    const user = await this.userModel.create(userData);

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel
      .find()
      .select('-password -__v')
      .lean()
      .exec();

    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    });
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userModel
      .findById(id)
      .select('-password -__v')
      .lean()
      .exec();
    if (!user) {
      throw new NotFoundException('کاربر یافت نشد');
    }
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const isNotEmptyData = UserHelper.isNotEmptyData(updateUserDto);

    if (!isNotEmptyData) {
      throw new BadRequestException('هیچ فیلد معتبری وجود ندارد');
    }
    const currentUser = await UserHelper.findByIdOrThrow(id, this.userModel);
    const hasChanges = UserHelper.hasChanges(
      currentUser.toJSON(),
      updateUserDto,
    );
    if (!hasChanges) {
      throw new BadRequestException('هیچ تغییری برای اعمال وجود ندارد');
    }

    await UserHelper.checkDuplicatedOnUpdate(id, this.userModel, updateUserDto);
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        returnDocument: 'after',
        runValidators: true,
      })
      .select('-password -__v')
      .lean()
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('کاربر یافت نشد');
    }

    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    });
  }
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async remove(id: string): Promise<UserResponseDto> {
    await UserHelper.findByIdOrThrow(id, this.userModel);
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return plainToInstance(UserResponseDto, deletedUser, {
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    });
  }
}
