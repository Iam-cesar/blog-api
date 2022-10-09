import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt, updatedAt } from './../helpers/date.helper';
import { PrismaService } from './../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCategoryDto): Promise<CategoryEntity> {
    return this.prisma.category.create({
      data: { ...data, createdAt },
      select: { id: true },
    });
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<CategoryEntity[]> {
    return this.prisma.category.findMany({
      ...params,
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(where: Prisma.CategoryWhereUniqueInput): Promise<CategoryEntity> {
    return this.prisma.category.findUnique({
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
    return this.prisma.category.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  remove(where: Prisma.CategoryWhereUniqueInput): Promise<CategoryEntity> {
    return this.prisma.category.delete({ where, select: { id: true } });
  }
}
