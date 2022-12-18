import { CacheModule, Module } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PrismaService,
    UserService,
    CategoryService,
    CacheModule,
  ],
})
export class PostModule {}
