import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // تنظیم Swagger
  const config = new DocumentBuilder()
    .setTitle('فروشگاه آنلاین')
    .setDescription('مستندات API فروشگاه آنلاین ساخته شده با NestJS')
    .setVersion('1.0')
    .addBearerAuth() // برای احراز هویت JWT
    .build();

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  app.use(cookieParser()); // eslint-disable-line @typescript-eslint/no-unsafe-call

  // تنظیم ValidationPipe به صورت سراسری
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // حذف فیلدهای اضافی
      forbidNonWhitelisted: true, // خطا در صورت وجود فیلد اضافی
      transform: true, // تبدیل خودکار به نوع تعیین‌شده
      transformOptions: {
        enableImplicitConversion: true, // تبدیل ضمنی
      },
    }),
  );
  await app.listen(process.env.PORT as string);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
