import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  create(data: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      return db.category.create({
        data,
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<CategoryEntity[]> {
    try {
      return db.category.findMany({
        ...params,
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  findOne(where: Prisma.CategoryWhereUniqueInput): Promise<Partial<Category>> {
    try {
      return db.category.findUnique({
        where,
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          post: { select: { id: true, title: true } },
        },
      });
    } catch (error) {
      return error;
    }
  }

  update(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: UpdateCategoryDto;
  }): Promise<CategoryEntity> {
    try {
      const { where, data } = params;
      return db.category.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  remove(where: Prisma.CategoryWhereUniqueInput): Promise<CategoryEntity> {
    try {
      return db.category.delete({ where, select: { id: true } });
    } catch (error) {
      return error;
    }
  }
}
