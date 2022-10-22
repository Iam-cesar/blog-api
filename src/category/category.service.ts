import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt, updatedAt } from '../common/helpers/date.helper';
import { db } from '../prisma/utils/db.server';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  create(data: CreateCategoryDto): Promise<CategoryEntity> {
    return db.category.create({
      data: { ...data, createdAt },
      select: { id: true },
    });
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<CategoryEntity[]> {
    return db.category.findMany({
      ...params,
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(where: Prisma.CategoryWhereUniqueInput): Promise<CategoryEntity> {
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
  }

  update(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: UpdateCategoryDto;
  }): Promise<CategoryEntity> {
    const { where, data } = params;
    return db.category.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  remove(where: Prisma.CategoryWhereUniqueInput): Promise<CategoryEntity> {
    return db.category.delete({ where, select: { id: true } });
  }
}
