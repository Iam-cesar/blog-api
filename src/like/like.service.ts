import { BadRequestException, Injectable } from '@nestjs/common';
import { Like, Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikeService {
  async create(data: CreateLikeDto): Promise<LikeEntity> {
    try {
      return await db.like.create({
        data,
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findOne(where: Prisma.LikeWhereUniqueInput): Promise<Partial<Like>> {
    try {
      return await db.like.findUnique({
        where,
        select: {
          id: true,
          commentId: true,
          postId: true,
          user: { select: { id: true } },
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async remove(where: Prisma.LikeWhereUniqueInput): Promise<LikeEntity> {
    try {
      return await db.like.delete({ where, select: { id: true } });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }
}
