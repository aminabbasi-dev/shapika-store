// auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import type { Payload } from '../interfaces/payload.interface';
import type { AuthUser } from '../interfaces/auth-user.interface';
import { extractJwtFromCookie } from '../extractors/jwt-cookie.extractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  validate(payload: Payload): AuthUser {
    if (!payload.sub || !payload.email || !payload.role) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
