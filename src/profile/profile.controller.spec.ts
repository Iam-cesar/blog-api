import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './../user/user.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let profileController: ProfileController;

  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService, UserService],
    }).compile();

    profileController = module.get<ProfileController>(ProfileController);

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(profileController).toBeDefined();
    expect(userService).toBeDefined();
  });
});
