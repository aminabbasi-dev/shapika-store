import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterDto {
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

  @ApiProperty({ example: '+989121234567' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number!: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
