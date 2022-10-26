import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt, deletedAt, updatedAt } from '../common/helpers/date.helper';
import { db } from '../prisma/utils/db.server';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  create(data: CreateUserDto): Promise<UserEntity> {
    return db.user.create({
      data: { ...data, createdAt },
      select: {
        id: true,
      },
    });
  }

  findOneWithPassword(where: {
    id?: string;
    email?: string;
  }): Promise<UserEntity> {
    return db.user.findUnique({
      where,
      select: {
        password: true,
        email: true,
        id: true,
        hashedRefreshToken: true,
      },
    });
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserEntity[]> {
    return db.user.findMany({
      ...params,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        deleted: true,
        createdAt: true,
      },
    });
  }

  findOne(where: { id?: string; email?: string }): Promise<UserEntity | null> {
    return db.user.findUnique({
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
    where: { id: string };
    data: UpdateUserDto;
  }): Promise<UserEntity> {
    const { where, data } = params;
    return db.user.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  softRemove(where: { id: string }): Promise<UserEntity> {
    return db.user.update({
      where,
      data: { deleted: true, deletedAt },
      select: { id: true },
    });
  }

  renew(where: { id: string }): Promise<UserEntity> {
    return db.user.update({
      where,
      data: { deleted: false, updatedAt },
      select: { id: true },
    });
  }

  remove(where: { id: string }): Promise<UserEntity> {
    return db.user.delete({ where, select: { id: true } });
  }
}
