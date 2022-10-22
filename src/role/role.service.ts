import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt, updatedAt } from '../common/helpers/date.helper';
import { db } from '../prisma/utils/db.server';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  create(data: CreateRoleDto): Promise<RoleEntity> {
    return db.role.create({
      data: { ...data, createdAt },
      select: { id: true },
    });
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.RoleOrderByWithAggregationInput;
  }): Promise<RoleEntity[]> {
    return db.role.findMany({
      ...params,
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(where: Prisma.RoleWhereUniqueInput) {
    return db.role.findUnique({
      where,
      select: {
        id: true,
        name: true,
        canCreatePost: true,
        canCreateUser: true,
        canDeletePost: true,
        canDeleteUser: true,
        canLikePost: true,
        canLikeUser: true,
        canSoftDeletePost: true,
        canSoftDeleteUser: true,
        canUpdatePost: true,
        canUpdateUser: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  update(params: { where: Prisma.RoleWhereUniqueInput; data: UpdateRoleDto }) {
    const { where, data } = params;
    return db.role.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  remove(where: Prisma.RoleWhereUniqueInput) {
    return db.role.delete({ where, select: { id: true } });
  }
}
