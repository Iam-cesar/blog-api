import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { LikeService } from './like.service';

describe('LikeService', () => {
  let likeService: LikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeService, PrismaService],
    }).compile();

    likeService = module.get<LikeService>(LikeService);
  });

  it('should be defined', () => {
    expect(likeService).toBeDefined();
  });
});
