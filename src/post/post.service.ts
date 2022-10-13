import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt, updatedAt } from '../helpers/date.helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: CreatePostDto): Promise<PostEntity> {
    return this.prisma.post.create({
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
    return this.prisma.post.findMany({
      ...params,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
  }

  findOne(where: Prisma.PostWhereUniqueInput): Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where,
      select: {
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
    where: Prisma.PostWhereUniqueInput;
    data: UpdatePostDto;
  }): Promise<PostEntity> {
    const { where, data } = params;
    return this.prisma.post.update({
      where,
      data: { ...data, updatedAt },
      select: {
        id: true,
      },
    });
  }

  remove(where: Prisma.PostWhereUniqueInput): Promise<PostEntity> {
    return this.prisma.post.delete({
      where,
      select: {
        id: true,
      },
    });
  }
}
