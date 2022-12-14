import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageHelper } from '../common/helpers/message.helper';
import { MOCK_FIND_ONE_POST_RESPONSE } from '../post/mock/postService.mock';
import { PostService } from '../post/post.service';
import { FIND_ONE_USER_MOCK_RESPONSE } from '../user/mock/userService.mock';
import { UserService } from '../user/user.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { MOCK_FIND_ONE_COMMENT_RESPONSE } from './mock/commentController.mock';

describe('CommentController', () => {
  let commentController: CommentController;

  let userService: UserService;
  let postService: PostService;

  const MOCK_ID = '1';
  const MOCK_EMAIL = 'mock@email.com';

  const userServiceMock = {
    findOne: jest.fn().mockResolvedValue(FIND_ONE_USER_MOCK_RESPONSE),
  };
  const commentServiceMock = {
    create: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    findOne: jest
      .fn()
      .mockResolvedValue(new CommentEntity(MOCK_FIND_ONE_COMMENT_RESPONSE)),
    update: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    remove: jest.fn().mockResolvedValue({ id: MOCK_ID }),
  };
  const postServiceMock = {
    findOne: jest.fn().mockResolvedValue(MOCK_FIND_ONE_POST_RESPONSE),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: commentServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: PostService,
          useValue: postServiceMock,
        },
      ],
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

  describe('CREATE', () => {
    it('should be able to create a comment', async () => {
      const comment = await commentController.create(
        {
          content: 'mock_comment_updated',
          post: { connect: { id: MOCK_ID } },
          user: { connect: { email: MOCK_EMAIL } },
        },
        { user: { email: MOCK_EMAIL } },
      );
      expect(comment).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception if user not provided', async () => {
      userServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        commentController.create(
          {
            content: 'mock_comment_updated',
            post: { connect: { id: MOCK_ID } },
            user: { connect: { email: MOCK_EMAIL } },
          },
          { user: null },
        ),
      ).rejects.toStrictEqual(
        new UnauthorizedException(MessageHelper.USER_NOT_FOUND),
      );
    });
    it('should to throw an exception if post not provided', async () => {
      postServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        commentController.create(
          {
            content: 'mock_comment_updated',
            post: { connect: { id: MOCK_ID } },
            user: { connect: { email: MOCK_EMAIL } },
          },
          { user: { email: MOCK_EMAIL } },
        ),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.POST_NOT_FOUND),
      );
    });
    it('should to throw an exception', () => {
      commentServiceMock.create.mockResolvedValueOnce(null);
      expect(
        commentController.create(
          {
            content: '',
            user: { connect: { email: MOCK_EMAIL } },
            post: { connect: { id: MOCK_ID } },
          },
          { user: { email: MOCK_EMAIL } },
        ),
      ).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.COMMENT_BAD_REQUEST),
      );
    });
  });
  describe('FIND_ONE', () => {
    it('should be able to find one comment', async () => {
      const comment = await commentController.findOne(MOCK_ID);
      expect(comment).toStrictEqual(
        new CommentEntity(MOCK_FIND_ONE_COMMENT_RESPONSE),
      );
    });
    it('should to throw an exception', () => {
      commentServiceMock.findOne.mockResolvedValueOnce(null);
      expect(commentController.findOne(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.COMMENT_NOT_FOUND),
      );
    });
  });
  describe('UPDATE', () => {
    it('should be able to update a comment', async () => {
      const comment = await commentController.update(MOCK_ID, {
        content: 'mock_comment_updated',
        post: { connect: { id: MOCK_ID } },
        user: { connect: { email: MOCK_EMAIL } },
      });
      expect(comment).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      commentServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        commentController.update(MOCK_ID, {
          content: '',
          post: { connect: { id: MOCK_ID } },
        }),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.COMMENT_NOT_FOUND),
      );
    });
  });
  describe('REMOVE', () => {
    it('should be able to remove a comment', async () => {
      const comment = await commentController.remove(MOCK_ID);
      expect(comment).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      commentServiceMock.findOne.mockResolvedValueOnce(null);
      expect(commentController.remove(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.COMMENT_NOT_FOUND),
      );
    });
  });
});
