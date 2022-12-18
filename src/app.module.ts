import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    ConfigModule.forRoot(),
  ],
  providers: [PrismaService, RoleService, AppService],
  controllers: [AppController],
})
export class AppModule {}
