import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  async create(data: Prisma.RoleCreateInput): Promise<RoleEntity> {
    try {
      return await db.role.create({
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
    orderBy?: Prisma.RoleOrderByWithAggregationInput;
  }): Promise<RoleEntity[]> {
    try {
      return await db.role.findMany({
        ...params,
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findOne(where: Prisma.RoleWhereUniqueInput): Promise<RoleEntity> {
    try {
      return await db.role.findUnique({
        where,
        select: {
          id: true,
          name: true,
          permitions: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findOneByName({
    name,
  }: Prisma.RoleWhereUniqueInput): Promise<RoleEntity> {
    try {
      return await db.role.findUnique({
        where: { name },
        select: {
          id: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async update(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<RoleEntity> {
    try {
      const { where, data } = params;
      return await db.role.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async remove(where: Prisma.RoleWhereUniqueInput): Promise<RoleEntity> {
    try {
      return await db.role.delete({ where, select: { id: true } });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }
}
