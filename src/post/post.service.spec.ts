import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';

describe('PostService', () => {
  let postService: PostService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();

    postService = module.get<PostService>(PostService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });
  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });
});
