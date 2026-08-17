import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'user' })
  @IsEnum(UserRole)
  @IsOptional()
  UserRole?: UserRole;

  @ApiProperty({ example: '+989121234567' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number!: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
