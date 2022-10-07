import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, RoleModule, ProfileModule],
  controllers: [],
  providers: [PrismaService, RoleService],
})
export class AppModule {}
