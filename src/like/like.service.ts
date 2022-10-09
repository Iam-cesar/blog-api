import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createdAt } from 'src/helpers/date.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLikeDto): Promise<LikeEntity> {
    return this.prisma.like.create({
      data: { ...data, createdAt },
      select: { id: true },
    });
  }

  findOne(where: Prisma.LikeWhereUniqueInput): Promise<LikeEntity> {
    return this.prisma.like.findUnique({ where });
  }

  remove(where: Prisma.LikeWhereUniqueInput): Promise<LikeEntity> {
    return this.prisma.like.delete({ where, select: { id: true } });
  }
}
