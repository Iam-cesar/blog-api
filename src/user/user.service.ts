import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt, deletedAt, updatedAt } from '../helpers/date.helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findOneWithPassword(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where,
      select: {
        password: true,
        email: true,
        id: true,
        hashedRefreshToken: true,
      },
    });
  }

  create(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: { ...data, createdAt },
      select: {
        id: true,
      },
    });
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      ...params,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        deleted: true,
        createdAt: true,
      },
    });
  }

  findOne(where: Prisma.UserWhereUniqueInput): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where,
      select: {
        _count: true,
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        deleted: true,
        profile: {
          select: {
            bio: true,
          },
        },
        post: {
          select: {
            id: true,
            category: true,
            title: true,
            createdAt: false,
            updatedAt: false,
          },
        },
        role: true,
        updatedAt: true,
        createdAt: true,
        deletedAt: true,
      },
    });
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<UserEntity> {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  softRemove(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.prisma.user.update({
      where,
      data: { deleted: true, deletedAt },
      select: { id: true },
    });
  }

  renew(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.prisma.user.update({
      where,
      data: { deleted: false, updatedAt },
      select: { id: true },
    });
  }

  remove(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return this.prisma.user.delete({ where, select: { id: true } });
  }
}
