import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let postController: PostController;

  let userService: UserService;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, UserService, CategoryService],
    }).compile();

    postController = module.get<PostController>(PostController);

    userService = module.get<UserService>(UserService);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
    expect(userService).toBeDefined();
    expect(categoryService).toBeDefined();
  });
});
