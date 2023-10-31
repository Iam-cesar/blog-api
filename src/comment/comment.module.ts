import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PostService } from '../post/post.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    PrismaService,
    UserService,
    PostService,
    CacheModule,
  ],
})
export class CommentModule {}
