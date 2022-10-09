import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdAt, updatedAt } from '../helpers/date.helper';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateRoleDto): Promise<RoleEntity> {
    return this.prisma.role.create({
      data: { ...data, createdAt },
      select: { id: true },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.RoleOrderByWithAggregationInput;
  }): Promise<RoleEntity[]> {
    return this.prisma.role.findMany({
      ...params,
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.findUnique({
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
    return this.prisma.role.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  remove(where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.delete({ where, select: { id: true } });
  }
}
