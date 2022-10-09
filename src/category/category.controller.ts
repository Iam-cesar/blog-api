import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { updatedAt } from 'src/helpers/date.helper';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Get()
  async findAll(
    @Query()
    query?: {
      skip?: string;
      take?: string;
    },
  ) {
    return this.categoryService.findAll({
      skip: Number(query.skip) || undefined,
      take: Number(query.skip) || undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update({
      where: { id: Number(id) },
      data: { ...data, updatedAt },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove({ id: Number(id) });
  }
}
