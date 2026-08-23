import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { HeroSlide, HeroSlideDocument } from './schemas/hero-slide.schema';

import { CreateHeroSlideDto } from './dto/create-hero-slide.dto';
import { UpdateHeroSlideDto } from './dto/update-hero-slide.dto';

@Injectable()
export class HeroSlidesService {
  constructor(
    @InjectModel(HeroSlide.name)
    private readonly heroSlideModel: Model<HeroSlideDocument>,
  ) {}

  async create(createHeroSlideDto: CreateHeroSlideDto) {
    const heroSlide = await this.heroSlideModel.create(createHeroSlideDto);

    return heroSlide;
  }

  async findAll() {
    return this.heroSlideModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .exec();
  }

  async findAllForAdmin() {
    return this.heroSlideModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string) {
    const heroSlide = await this.heroSlideModel.findById(id).exec();

    if (!heroSlide) {
      throw new NotFoundException('Hero slide not found');
    }

    return heroSlide;
  }

  async update(id: string, updateHeroSlideDto: UpdateHeroSlideDto) {
    const heroSlide = await this.heroSlideModel
      .findByIdAndUpdate(id, updateHeroSlideDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!heroSlide) {
      throw new NotFoundException('Hero slide not found');
    }

    return heroSlide;
  }

  async remove(id: string) {
    const heroSlide = await this.heroSlideModel.findByIdAndDelete(id).exec();

    if (!heroSlide) {
      throw new NotFoundException('Hero slide not found');
    }

    return {
      message: 'Hero slide deleted successfully',
    };
  }
}
