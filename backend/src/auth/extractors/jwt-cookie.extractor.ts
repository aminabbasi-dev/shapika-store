import type { Request } from 'express';

interface AuthCookieRequest extends Request {
  cookies: {
    accessToken?: string;
  };
}

export function extractJwtFromCookie(request: Request): string | null {
  const authRequest = request as AuthCookieRequest;

  return authRequest.cookies.accessToken ?? null;
}
