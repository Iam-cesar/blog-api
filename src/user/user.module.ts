import { Module } from '@nestjs/common';
import { AuthHelper } from '../auth/auth.helper';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthHelper],
})
export class UserModule {}
