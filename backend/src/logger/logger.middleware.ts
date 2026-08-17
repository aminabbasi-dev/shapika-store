import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: Request, res: Response, next: () => void) {
    const startTime = Date.now();
    const { method, ip, protocol } = req;
    const headers = req.headers;
    const url = req.originalUrl || req.url;

    res.on('finish', () => {
      const responseTime = Date.now() - startTime;
      const statusCode = res.statusCode;
      const contentLength = res.get('content-length');

      const logData = {
        method,
        protocol,
        url,
        statusCode,
        responseTime: `${responseTime}ms`,
        ip,
        userAgent: headers['user-agent'],
        contentLength: contentLength ? `${contentLength} bytes` : 'unknown',
      };
      console.log('\n');
      this.logger.log(JSON.stringify(logData));
    });

    next();
  }
}
