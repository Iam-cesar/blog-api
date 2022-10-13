import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PrismaService } from './../prisma/prisma.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService, UserService],
})
export class ProfileModule {}
