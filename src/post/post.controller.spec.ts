import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category/category.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let postController: PostController;
  let prismaService: PrismaService;
  let userService: UserService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, PrismaService, UserService, CategoryService],
    }).compile();

    postController = module.get<PostController>(PostController);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });
  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });
});
