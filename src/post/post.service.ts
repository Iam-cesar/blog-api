import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { db } from '../prisma/utils/db.server';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  async create(data: CreatePostDto): Promise<PostEntity> {
    try {
      return await db.post.create({
        data,
        select: {
          id: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<PostEntity[]> {
    try {
      return await db.post.findMany({
        ...params,
        select: {
          _count: true,
          id: true,
          title: true,
          createdAt: true,
          category: { select: { name: true } },
          published: true,
          author: { select: { id: true, firstName: true, lastName: true } },
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findAllByAuthor(
    authorId: string,
    params?: {
      skip?: number;
      take?: number;
      orderBy?: Prisma.PostOrderByWithRelationInput;
    },
  ): Promise<PostEntity[]> {
    try {
      return await db.post.findMany({
        ...params,
        where: { authorId },
        select: {
          id: true,
          title: true,
          category: { select: { name: true } },
          published: true,
          updatedAt: true,
          deleted: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: { select: { name: true } },
            },
          },
          _count: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async findOne(where: { id: string }): Promise<Partial<PostEntity>> {
    try {
      return await db.post.findUnique({
        where,
        select: {
          _count: true,
          id: true,
          title: true,
          content: true,
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
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async update(params: {
    where: { id: string };
    data: UpdatePostDto;
  }): Promise<PostEntity> {
    try {
      const { where, data } = params;
      return await db.post.update({
        where,
        data,
        select: {
          id: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }

  async remove(where: { id: string }): Promise<PostEntity> {
    try {
      return await db.post.delete({
        where,
        select: {
          id: true,
        },
      });
    } catch (error) {
      new BadRequestException(error?.meta?.message);
    }
  }
}
