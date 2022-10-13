import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './../user/user.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let profileController: ProfileController;
  let prismaService: PrismaService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService, PrismaService, UserService],
    }).compile();

    profileController = module.get<ProfileController>(ProfileController);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(profileController).toBeDefined();
  });
  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
