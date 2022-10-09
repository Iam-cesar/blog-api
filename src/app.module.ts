import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    ProfileModule,
    PostModule,
    AuthModule,
    CategoryModule,
    CommentsModule,
  ],
  providers: [PrismaService, RoleService],
})
export class AppModule {}
