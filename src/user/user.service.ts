import { BadRequestException, Injectable } from '@nestjs/common';
import { db } from '../prisma/utils/db.server';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  async create(data: CreateUserDto): Promise<UserEntity> {
    try {
      return await db.user.create({
        data,
        select: {
          id: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findOneWithPassword(where: { id: string }): Promise<UserEntity> {
    try {
      return await db.user.findUnique({
        where,
        select: {
          password: true,
          email: true,
          id: true,
          hashedRefreshToken: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findByEmailWithPassword(where: { email: string }): Promise<UserEntity> {
    try {
      return await db.user.findUnique({
        where: { email: where.email },
        select: {
          password: true,
          email: true,
          id: true,
          hashedRefreshToken: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: any;
  }): Promise<Partial<UserEntity[]>> {
    try {
      return await db.user.findMany({
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
      new BadRequestException(error?.meta?.message);
    }
  }

  async findOne(where: {
    id: string;
    email?: string;
  }): Promise<Partial<UserEntity> | null> {
    try {
      return await db.user.findUnique({
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
      new BadRequestException(error?.meta?.message);
    }
  }

  async update(params: {
    where: { id: string };
    data: UpdateUserDto;
  }): Promise<UserEntity> {
    try {
      const { where, data } = params;
      return await db.user.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async softRemove(where: { id: string }): Promise<UserEntity> {
    try {
      return await db.user.update({
        where,
        data: { deleted: true },
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async renew(where: { id: string }): Promise<UserEntity> {
    try {
      return await db.user.update({
        where,
        data: { deleted: false },
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async remove(where: { id: string }): Promise<UserEntity> {
    try {
      return await db.user.delete({ where, select: { id: true } });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }
}
