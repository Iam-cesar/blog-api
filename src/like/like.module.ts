import { Module } from '@nestjs/common';
import { CommentService } from '../comment/comment.service';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { PrismaService } from './../prisma/prisma.service';
import { LikeController } from './like.controller';
import { LikeHelper } from './like.helper';
import { LikeService } from './like.service';

@Module({
  controllers: [LikeController],
  providers: [
    LikeService,
    PrismaService,
    UserService,
    PostService,
    CommentService,
    LikeHelper,
  ],
})
export class LikeModule {}
