import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt, updatedAt } from 'src/helpers/date.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCommentDto): Promise<CommentEntity> {
    return this.prisma.comment.create({
      data: { ...data, createdAt },
      select: { id: true },
    });
  }

  findOne(where: Prisma.CommentWhereUniqueInput): Promise<CommentEntity> {
    return this.prisma.comment.findUnique({
      where,
      select: {
        id: true,
        content: true,
        post: { select: { id: true } },
        user: { select: { id: true, firstName: true, lastName: true } },
        createdAt: true,
        updatedAt: true,
        _count: true,
      },
    });
  }

  update(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: UpdateCommentDto;
  }): Promise<CommentEntity> {
    const { where, data } = params;
    return this.prisma.comment.update({
      where,
      data: { ...data, updatedAt },
      select: { id: true },
    });
  }

  remove(where: Prisma.CommentWhereUniqueInput): Promise<CommentEntity> {
    return this.prisma.comment.delete({ where, select: { id: true } });
  }
}
