// user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @ApiProperty({ example: 'علی', description: 'نام کاربر' })
  @IsNotEmpty()
  first_name!: string;

  @Expose()
  @ApiProperty({ example: 'رضایی', description: 'نام خانوادگی' })
  @IsNotEmpty()
  last_name!: string;

  @Expose()
  @ApiProperty({ example: 'ali@example.com', description: 'ایمیل' })
  @IsNotEmpty()
  email!: string;

  @Expose()
  @ApiProperty({ example: '09123456789', description: 'شماره موبایل' })
  @IsNotEmpty()
  phone_number!: string;

  @Expose()
  @ApiProperty({ example: 'user', description: 'نقش کاربر' })
  @IsNotEmpty()
  UserRole!: string;

  @Expose()
  @ApiProperty({
    example: '2026-07-21T10:00:00.000Z',
    description: 'تاریخ ایجاد',
  })
  @IsNotEmpty()
  createdAt!: Date;

  @Expose()
  @ApiProperty({
    example: '2026-07-21T10:00:00.000Z',
    description: 'تاریخ بروزرسانی',
  })
  @IsNotEmpty()
  updatedAt!: Date;

  @Exclude()
  @IsNotEmpty()
  password!: string;

  @Exclude()
  @IsNotEmpty()
  id!: string;

  @Exclude()
  @IsNotEmpty()
  __v!: string;
}
