import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let categoryController: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, PrismaService],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });
});
