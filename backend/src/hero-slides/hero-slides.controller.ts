import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HeroSlidesService } from './hero-slides.service';
import { CreateHeroSlideDto } from './dto/create-hero-slide.dto';
import { UpdateHeroSlideDto } from './dto/update-hero-slide.dto';

@ApiTags('Hero Slides')
@Controller('hero-slides')
export class HeroSlidesController {
  constructor(private readonly heroSlidesService: HeroSlidesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new hero slide',
  })
  @ApiResponse({
    status: 201,
    description: 'Hero slide created successfully.',
  })
  create(@Body() createHeroSlideDto: CreateHeroSlideDto) {
    return this.heroSlidesService.create(createHeroSlideDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all active hero slides',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns active hero slides ordered by order.',
  })
  findAll() {
    return this.heroSlidesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a hero slide by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Hero slide found successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Hero slide not found.',
  })
  findOne(@Param('id') id: string) {
    return this.heroSlidesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a hero slide',
  })
  @ApiResponse({
    status: 200,
    description: 'Hero slide updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Hero slide not found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateHeroSlideDto: UpdateHeroSlideDto,
  ) {
    return this.heroSlidesService.update(id, updateHeroSlideDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a hero slide',
  })
  @ApiResponse({
    status: 200,
    description: 'Hero slide deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Hero slide not found.',
  })
  remove(@Param('id') id: string) {
    return this.heroSlidesService.remove(id);
  }
}
