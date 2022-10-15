import { Test, TestingModule } from '@nestjs/testing';
import { AuthHelper } from '../auth/auth.helper';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;

  let authHelper: AuthHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, AuthHelper],
    }).compile();

    userController = module.get<UserController>(UserController);

    authHelper = module.get<AuthHelper>(AuthHelper);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should be defined', () => {
    expect(authHelper).toBeDefined();
  });
});
