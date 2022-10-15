import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from '../comment/comment.service';
import { PostService } from '../post/post.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

describe('LikeController', () => {
  let likeController: LikeController;

  let userService: UserService;
  let postService: PostService;
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        LikeService,
        PrismaService,
        UserService,
        PostService,
        CommentService,
      ],
    }).compile();

    likeController = module.get<LikeController>(LikeController);

    userService = module.get<UserService>(UserService);
    postService = module.get<PostService>(PostService);
    commentService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(likeController).toBeDefined();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  it('should be defined', () => {
    expect(postService).toBeDefined();
  });
  it('should be defined', () => {
    expect(commentService).toBeDefined();
  });
});
