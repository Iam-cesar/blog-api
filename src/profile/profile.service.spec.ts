import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, PrismaService],
    }).compile();

    profileService = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(profileService).toBeDefined();
  });
});
