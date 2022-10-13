import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let commentService: CommentService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService, PrismaService],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(commentService).toBeDefined();
  });
  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });
});
