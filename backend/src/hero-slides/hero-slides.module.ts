import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HeroSlidesController } from './hero-slides.controller';
import { HeroSlidesService } from './hero-slides.service';

import { HeroSlide, HeroSlideSchema } from './schemas/hero-slide.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HeroSlide.name,
        schema: HeroSlideSchema,
      },
    ]),
  ],
  controllers: [HeroSlidesController],
  providers: [HeroSlidesService],
})
export class HeroSlidesModule {}
