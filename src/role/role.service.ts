import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  create(data: CreateRoleDto): Promise<RoleEntity> {
    try {
      return db.role.create({
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
    orderBy?: Prisma.RoleOrderByWithAggregationInput;
  }): Promise<RoleEntity[]> {
    try {
      return db.role.findMany({
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

  findOne(where: Prisma.RoleWhereUniqueInput): Promise<RoleEntity> {
    try {
      return db.role.findUnique({
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
      return error;
    }
  }

  findOneByName({ name }: Prisma.RoleWhereUniqueInput): Promise<RoleEntity> {
    try {
      return db.role.findUnique({
        where: { name },
        select: {
          id: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  update(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: UpdateRoleDto;
  }): Promise<RoleEntity> {
    try {
      const { where, data } = params;
      return db.role.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  remove(where: Prisma.RoleWhereUniqueInput): Promise<RoleEntity> {
    try {
      return db.role.delete({ where, select: { id: true } });
    } catch (error) {
      return error;
    }
  }
}
