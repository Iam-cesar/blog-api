import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaService],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });
});
