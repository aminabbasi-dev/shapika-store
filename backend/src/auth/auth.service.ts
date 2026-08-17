import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import type { Payload } from './interfaces/payload.interface';
import { AuthUser } from './interfaces/auth-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    await this.userService.create(registerDto);
    const user = await this.userService.findByEmail(registerDto.email);
    if (!user) {
      throw new InternalServerErrorException('User could not be created');
    }
    const payLoad: Payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payLoad);

    return { user, accessToken };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new HttpException('email or password wrong', 403);
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('email or password wrong', 403);
    }
    const payLoad: Payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payLoad);

    return { user, accessToken };
  }

  async getMe(authUser: AuthUser) {
    return await this.userService.findOne(authUser.id);
  }
}
