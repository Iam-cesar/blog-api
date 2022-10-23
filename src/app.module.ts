import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';
import { UserModule } from './user/user.module';
import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';

@Module({
  imports: [
    UserModule,
    RoleModule,
    ProfileModule,
    PostModule,
    AuthModule,
    CategoryModule,
    CommentModule,
    LikeModule,
  ],
  providers: [PrismaService, RoleService, AppService],
  controllers: [AppController],
})
export class AppModule {}
