import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { updatedAt } from '../helpers/date.helper';
import { FindAllQueryDto } from '../helpers/dto/findAllQuery.dto';
import { MessageHelper } from '../helpers/message.helper';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateCategoryDto) {
    const category = await this.categoryService.create(data);

    if (!category)
      throw new BadRequestException(MessageHelper.CATEGORY_BAD_REQUEST);

    return category;
  }

  @Get()
  @HttpCode(200)
  async findAll(
    @Query()
    query?: FindAllQueryDto,
  ) {
    return await this.categoryService.findAll({
      skip: Number(query.skip) || undefined,
      take: Number(query.skip) || undefined,
    });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.findOne({ id });

    if (!category)
      throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return category;
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.findOne({ id });

    if (!category)
      throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return await this.categoryService.update({
      where: { id },
      data: { ...data, updatedAt },
    });
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.findOne({ id });

    if (!category)
      throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return await this.categoryService.remove({ id });
  }
}
