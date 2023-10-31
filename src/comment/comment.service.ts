import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
  async create(data: Prisma.CommentCreateInput): Promise<CommentEntity> {
    try {
      return await db.comment.create({
        data,
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findOne(where: { id: string }): Promise<CommentEntity> {
    try {
      return await db.comment.findUnique({
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
          replys: {
            select: {
              _count: {
                select: {
                  like: true,
                },
              },
              id: true,
              like: {
                select: {
                  user: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                    },
                  },
                },
              },
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
            orderBy: {
              createdAt: 'asc',
            },
          },
          createdAt: true,
          updatedAt: true,
          _count: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findAllByPost(
    where: { post: { id: string } },
    params?: {
      skip?: number;
      take?: number;
      orderBy?: Prisma.CommentOrderByWithRelationInput;
    },
  ): Promise<CommentEntity[]> {
    try {
      const postId = where.post.id;
      return await db.comment.findMany({
        ...params,
        where: {
          postId,
        },
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true,
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
          replys: true,
          createdAt: true,
          updatedAt: true,
          _count: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async update(params: {
    where: { id: string };
    data: Prisma.CommentUpdateInput;
  }): Promise<CommentEntity> {
    try {
      const { where, data } = params;
      return await db.comment.update({
        where,
        data,
        select: { id: true },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async remove(where: { id: string }): Promise<CommentEntity> {
    try {
      return await db.comment.delete({ where, select: { id: true } });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }
}
