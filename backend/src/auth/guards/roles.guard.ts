import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // اگر Route محدودیت Role نداشت، اجازه بده
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // ✅ تایپ‌گذاری صحیح request
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // ✅ بررسی وجود کاربر
    if (!user) {
      throw new ForbiddenException('کاربر یافت نشد. لطفاً وارد شوید.');
    }

    // ✅ بررسی وجود نقش کاربر
    if (!user.role) {
      throw new ForbiddenException('نقش کاربر مشخص نیست.');
    }

    // ✅ بررسی دسترسی
    const hasRole = requiredRoles.some((role) => role === user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        `شما اجازه دسترسی به این بخش را ندارید. نقش‌های مجاز: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
