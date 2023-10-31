import { BadRequestException, Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return await db.category.create({
        data,
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<CategoryEntity[]> {
    try {
      return await db.category.findMany({
        ...params,
        select: {
          id: true,
          name: true,
          post: { select: { _count: true, id: true } },
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findOne(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<Partial<Category>> {
    try {
      return await db.category.findUnique({
        where,
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          post: { select: { id: true, title: true, _count: true } },
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async update(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: UpdateCategoryDto;
  }): Promise<CategoryEntity> {
    try {
      const { where, data } = params;
      return await db.category.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async remove(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryEntity> {
    try {
      return await db.category.delete({ where, select: { id: true } });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }
}
