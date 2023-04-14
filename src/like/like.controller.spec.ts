import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from '../comment/comment.service';
import { MOCK_FIND_ONE_COMMENT_RESPONSE } from '../comment/mock/commentController.mock';
import { MessageHelper } from '../common/helpers/message.helper';
import { MOCK_FIND_ONE_POST_RESPONSE } from '../post/mock/postController.mock';
import { PostService } from '../post/post.service';
import { MOCK_FIND_ONE_USER_RESPONSE } from '../user/mock/userController.mock';
import { UserService } from '../user/user.service';
import { LikeEntity } from './entities/like.entity';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import {
  MOCK_COMMENT_WITH_LIKE,
  MOCK_FIND_ONE_LIKE_RESPONSE,
  MOCK_POST_WITH_LIKE,
} from './mock/likeService.mock';

describe('LikeController', () => {
  let likeController: LikeController;
  let userService: UserService;
  let postService: PostService;
  let commentService: CommentService;

  const MOCK_ID = '1';
  const MOCK_EMAIL = 'user@email.com';

  const userServiceMock = {
    findOne: jest.fn().mockResolvedValue(MOCK_FIND_ONE_USER_RESPONSE),
  };

  const postServiceMock = {
    findOne: jest.fn().mockResolvedValue(MOCK_FIND_ONE_POST_RESPONSE),
  };

  const commentServiceMock = {
    findOne: jest.fn().mockResolvedValue(MOCK_FIND_ONE_COMMENT_RESPONSE),
  };

  const likeServiceMock = {
    create: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    findOne: jest
      .fn()
      .mockResolvedValue(new LikeEntity(MOCK_FIND_ONE_LIKE_RESPONSE)),
    remove: jest.fn().mockResolvedValue({ id: MOCK_ID }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        {
          provide: CommentService,
          useValue: commentServiceMock,
        },
        {
          provide: PostService,
          useValue: postServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: LikeService,
          useValue: likeServiceMock,
        },
      ],
    }).compile();

    likeController = module.get<LikeController>(LikeController);
    userService = module.get<UserService>(UserService);
    postService = module.get<PostService>(PostService);
    commentService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(likeController).toBeDefined();
    expect(postService).toBeDefined();
    expect(userService).toBeDefined();
    expect(commentService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should to be able to create a like in post', async () => {
      const post = await postService.findOne({ id: MOCK_ID });
      const like = await likeController.create(
        {
          user: { connect: { email: MOCK_EMAIL } },
          postId: {
            ...post,
            connect: { id: MOCK_ID },
          },
        },
        { user: { email: MOCK_EMAIL } },
      );

      expect(like).toStrictEqual({ id: MOCK_ID });
    });
    it('should to be able to create a like in comment', async () => {
      const comment = await commentService.findOne({ id: MOCK_ID });
      const like = await likeController.create(
        {
          user: { connect: { email: MOCK_EMAIL } },
          commentId: { ...comment, connect: { id: MOCK_ID } },
        },
        { user: { email: MOCK_EMAIL } },
      );

      expect(like).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception when content target arent provided', async () => {
      likeServiceMock.create.mockResolvedValueOnce(null);
      const user = await userService.findOne({ id: MOCK_ID });
      expect(
        likeController.create(
          { user: { connect: { id: user.id } } },
          { user: { email: MOCK_EMAIL } },
        ),
      ).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.COMMENT_AND_POST_INVALID),
      );
    });

    it('should accept only one content target', async () => {
      likeServiceMock.create.mockResolvedValueOnce(null);
      expect(
        likeController.create(
          {
            user: { connect: { email: MOCK_EMAIL } },
            commentId: { ...MOCK_COMMENT_WITH_LIKE, connect: { id: MOCK_ID } },
            postId: {
              ...MOCK_POST_WITH_LIKE,
              connect: { id: MOCK_ID },
            },
          },
          { user: { email: MOCK_EMAIL } },
        ),
      ).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.COMMENT_OR_POST_PROVIDE),
      );
    });

    it('should to throw an exception when user not provided', async () => {
      userServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        likeController.create(
          {
            user: { connect: { email: MOCK_EMAIL } },
            postId: {
              ...MOCK_POST_WITH_LIKE,
              connect: { id: MOCK_ID },
            },
          },
          { user: { email: MOCK_EMAIL } },
        ),
      ).rejects.toStrictEqual(
        new UnauthorizedException(MessageHelper.USER_NOT_FOUND),
      );
    });
    it('should to throw an exception when post not found', async () => {
      postServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        likeController.create(
          {
            user: { connect: { email: MOCK_EMAIL } },
            postId: {
              ...MOCK_POST_WITH_LIKE,
              connect: { id: MOCK_ID },
            },
          },
          { user: { email: MOCK_EMAIL } },
        ),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.POST_NOT_FOUND),
      );
    });
    it('should to throw an exception when comment not found', async () => {
      commentServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        likeController.create(
          {
            user: { connect: { email: MOCK_EMAIL } },
            commentId: { ...MOCK_COMMENT_WITH_LIKE, connect: { id: MOCK_ID } },
          },
          { user: { email: MOCK_EMAIL } },
        ),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.COMMENT_NOT_FOUND),
      );
    });
    it('should to throw an exception if user already liked a comment', async () => {
      commentServiceMock.findOne.mockResolvedValueOnce(MOCK_COMMENT_WITH_LIKE);
      expect(
        likeController.create(
          {
            user: { connect: { email: MOCK_EMAIL } },
            commentId: { ...MOCK_COMMENT_WITH_LIKE, connect: { id: MOCK_ID } },
          },
          { user: { email: MOCK_EMAIL } },
        ),
      ).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.USER_ALREADY_LIKED),
      );
    });
    it('should to throw an exception if user already liked a post', async () => {
      postServiceMock.findOne.mockResolvedValueOnce(MOCK_POST_WITH_LIKE);
      expect(
        likeController.create(
          {
            user: { connect: { email: MOCK_EMAIL } },
            postId: { ...MOCK_POST_WITH_LIKE, connect: { id: MOCK_ID } },
          },
          { user: { email: MOCK_EMAIL } },
        ),
      ).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.USER_ALREADY_LIKED),
      );
    });
  });
  describe('FIND_ONE', () => {
    it('should to find one like', async () => {
      const like = await likeController.findOne(MOCK_ID);
      expect(like).toStrictEqual(new LikeEntity(MOCK_FIND_ONE_LIKE_RESPONSE));
    });
    it('should to throw an exception', async () => {
      likeServiceMock.findOne.mockResolvedValueOnce(null);
      expect(likeController.findOne(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.LIKE_NOT_FOUND),
      );
    });
  });
  describe('REMOVE', () => {
    it('should to delete a like', async () => {
      const like = await likeController.remove(MOCK_ID);
      expect(like).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', async () => {
      likeServiceMock.findOne.mockResolvedValueOnce(null);
      expect(likeController.remove(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.LIKE_NOT_FOUND),
      );
    });
  });
});
