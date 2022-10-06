import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UserModule, RoleModule, ProfileModule],
  controllers: [],
  providers: [PrismaService, RoleService],
})
export class AppModule {}
