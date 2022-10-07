import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createdAt, updatedAt } from './../app.helper';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateRoleDto): Promise<RoleEntity> {
    return this.prisma.role.create({
      data: { ...data, createdAt },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.RoleOrderByWithAggregationInput;
  }): Promise<RoleEntity[] | null> {
    return this.prisma.role.findMany({
      ...params,
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(where: Prisma.RoleWhereUniqueInput) {
    return this.prisma.role.findUnique({ where });
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
