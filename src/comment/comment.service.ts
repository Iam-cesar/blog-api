import { Injectable } from '@nestjs/common';
import { createdAt, updatedAt } from '../common/helpers/date.helper';
import { db } from '../prisma/utils/db.server';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  create(data: CreateCommentDto): Promise<CommentEntity> {
    return db.comment.create({
      data: { ...data, createdAt },
      select: { id: true },
    });
  }

  findOne(where: { id: string }): Promise<CommentEntity> {
    return db.comment.findUnique({
      where,
      select: {
        id: true,
        content: true,
        post: {
          select: {
            id: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        like: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
        _count: true,
      },
    });
  }

  update(params: {
    where: { id: string };
    data: UpdateCommentDto;
  }): Promise<CommentEntity> {
    const { where, data } = params;
    return db.comment.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  remove(where: { id: string }): Promise<CommentEntity> {
    return db.comment.delete({ where, select: { id: true } });
  }
}
