import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { updatedAt } from '../common/helpers/date.helper';
import { FindAllQueryDto } from '../common/helpers/dto/findAllQuery.dto';
import { MessageHelper } from '../common/helpers/message.helper';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'))
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
      skip: Number(query?.skip) || undefined,
      take: Number(query?.take) || undefined,
    });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne({ id });

    if (!category)
      throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return category;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    const category = await this.categoryService.findOne({ id });

    if (!category)
      throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return await this.categoryService.update({
      where: { id },
      data: { ...data, updatedAt },
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.findOne({ id });

    if (!category)
      throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return await this.categoryService.remove({ id });
  }
}
