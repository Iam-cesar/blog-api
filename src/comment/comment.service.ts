import { Injectable } from '@nestjs/common';
import { db } from '../prisma/utils/db.server';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  create(data: CreateCommentDto): Promise<CommentEntity> {
    try {
      return db.comment.create({
        data,
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  findOne(where: { id: string }): Promise<CommentEntity> {
    try {
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
    } catch (error) {
      return error;
    }
  }

  update(params: {
    where: { id: string };
    data: UpdateCommentDto;
  }): Promise<CommentEntity> {
    try {
      const { where, data } = params;
      return db.comment.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      return error;
    }
  }

  remove(where: { id: string }): Promise<CommentEntity> {
    try {
      return db.comment.delete({ where, select: { id: true } });
    } catch (error) {
      return error;
    }
  }
}
