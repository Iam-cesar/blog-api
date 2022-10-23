import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt, updatedAt } from '../common/helpers/date.helper';
import { db } from '../prisma/utils/db.server';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  create(data: CreatePostDto): Promise<PostEntity> {
    return db.post.create({
      data: { ...data, createdAt },
      select: {
        id: true,
      },
    });
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<PostEntity[]> {
    return db.post.findMany({
      ...params,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
  }

  findOne(where: { id: string }): Promise<PostEntity> {
    return db.post.findUnique({
      where,
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        published: true,
        comment: {
          select: {
            id: true,
            createdAt: true,
            content: true,
            user: { select: { id: true, firstName: true, lastName: true } },
            like: {
              select: {
                id: true,
                createdAt: true,
                user: { select: { id: true, firstName: true, lastName: true } },
              },
            },
          },
        },
        createdAt: true,
        deleted: true,
        like: {
          select: {
            id: true,
            createdAt: true,
            user: { select: { id: true, firstName: true, lastName: true } },
          },
        },
        updatedAt: true,
      },
    });
  }

  update(params: {
    where: { id: string };
    data: UpdatePostDto;
  }): Promise<PostEntity> {
    const { where, data } = params;
    return db.post.update({
      where,
      data: { ...data, updatedAt },
      select: {
        id: true,
      },
    });
  }

  remove(where: { id: string }): Promise<PostEntity> {
    return db.post.delete({
      where,
      select: {
        id: true,
      },
    });
  }
}
