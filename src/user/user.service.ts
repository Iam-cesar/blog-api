import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  create(data: CreateUserDto): Promise<UserEntity> {
    try {
      return db.user.create({
        data,
        select: {
          id: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  findOneWithPassword(where: {
    id?: string;
    email?: string;
  }): Promise<UserEntity> {
    try {
      return db.user.findUnique({
        where,
        select: {
          password: true,
          email: true,
          id: true,
          hashedRefreshToken: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Partial<UserEntity[]>> {
    try {
      return db.user.findMany({
        ...params,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          deleted: true,
          createdAt: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  findOne(where: {
    id?: string;
    email?: string;
  }): Promise<Partial<User> | null> {
    try {
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
    } catch (error) {
      return error;
    }
  }

  update(params: {
    where: { id: string };
    data: UpdateUserDto;
  }): Promise<UserEntity> {
    try {
      const { where, data } = params;
      return db.user.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  softRemove(where: { id: string }): Promise<UserEntity> {
    try {
      return db.user.update({
        where,
        data: { deleted: true },
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  renew(where: { id: string }): Promise<UserEntity> {
    try {
      return db.user.update({
        where,
        data: { deleted: false },
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  remove(where: { id: string }): Promise<UserEntity> {
    try {
      return db.user.delete({ where, select: { id: true } });
    } catch (error) {
      return error;
    }
  }
}
