import { Injectable } from '@nestjs/common';
import { Like, Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikeService {
  create(data: CreateLikeDto): Promise<LikeEntity> {
    try {
      return db.like.create({
        data,
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  findOne(where: Prisma.LikeWhereUniqueInput): Promise<Partial<Like>> {
    try {
      return db.like.findUnique({
        where,
        select: {
          id: true,
          commentId: true,
          postId: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  remove(where: Prisma.LikeWhereUniqueInput): Promise<LikeEntity> {
    try {
      return db.like.delete({ where, select: { id: true } });
    } catch (error) {
      return error;
    }
  }
}
