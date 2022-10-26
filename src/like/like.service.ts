import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt } from '../common/helpers/date.helper';
import { db } from '../prisma/utils/db.server';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikeService {
  create(data: CreateLikeDto): Promise<LikeEntity> {
    return db.like.create({
      data: { ...data, createdAt },
      select: { id: true },
    });
  }

  findOne(where: Prisma.LikeWhereUniqueInput): Promise<LikeEntity> {
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
  }

  remove(where: Prisma.LikeWhereUniqueInput): Promise<LikeEntity> {
    return db.like.delete({ where, select: { id: true } });
  }
}
