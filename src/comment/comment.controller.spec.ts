import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
  let commentController: CommentController;

  let userService: UserService;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentService, UserService, PostService],
    }).compile();

    commentController = module.get<CommentController>(CommentController);

    userService = module.get<UserService>(UserService);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(commentController).toBeDefined();
    expect(postService).toBeDefined();
    expect(userService).toBeDefined();
  });
});
