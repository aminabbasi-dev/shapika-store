import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('کاربران')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد کاربر جدید' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'دریافت لیست کاربران' })
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'دریافت یک کاربر' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'بروزرسانی کامل یک کاربر' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return user;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف یک کاربر' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
