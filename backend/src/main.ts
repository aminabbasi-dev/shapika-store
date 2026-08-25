import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ============ تنظیمات کامل CORS ============
  app.enableCors({
    origin: 'http://localhost:3000', // ← آدرس دقیق فرانت
    credentials: true, // ← برای کوکی و احراز هویت
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Cookie',
      'X-Requested-With',
    ],
    exposedHeaders: ['Content-Type', 'Authorization'],
  });

  // تنظیم Swagger
  const config = new DocumentBuilder()
    .setTitle('فروشگاه آنلاین')
    .setDescription('مستندات API فروشگاه آنلاین ساخته شده با NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  if (process.env.DISABLE_SWAGGER !== 'true') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT || 5000);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
