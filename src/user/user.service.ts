import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneWithPassword(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where, select: { password: true } });
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserEntity[] | null> {
    return this.prisma.user.findMany({
      ...params,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        deleted: true,
      },
    });
  }

  async findOne(
    uniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: uniqueInput,
      select: {
        _count: true,
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        deleted: true,
        like: true,
        post: {
          select: {
            id: true,
            authorId: true,
            category: true,
            title: true,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
          },
        },
        profile: true,
        role: true,
        updatedAt: true,
        createdAt: true,
        deletedAt: true,
      },
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<UserEntity> {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data: { ...data, updatedAt: new Date().toISOString() },
      select: { id: true },
    });
  }

  async softRemove(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.prisma.user.update({
      where,
      data: { deleted: true, deletedAt: new Date().toISOString() },
      select: { id: true },
    });
  }

  async renew(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.prisma.user.update({
      where,
      data: { deleted: false, updatedAt: new Date().toISOString() },
      select: { id: true },
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.prisma.user.delete({ where, select: { id: true } });
  }
}
