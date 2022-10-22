import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { MOCK_FIND_ONE_COMMENT_RESPONSE } from './mock/commentController.mock';

describe('CommentService', () => {
  let commentService: CommentService;

  const MOCK_ID = 1;
  const commentServiceMock = {
    create: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    findOne: jest
      .fn()
      .mockResolvedValue(new CommentEntity(MOCK_FIND_ONE_COMMENT_RESPONSE)),
    update: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    remove: jest.fn().mockResolvedValue({ id: MOCK_ID }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CommentService,
          useValue: commentServiceMock,
        },
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(commentService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a comment', async () => {
      const comment = await commentService.create({
        content: '',
        post: { connect: { id: MOCK_ID } },
        user: { connect: { email: '' } },
      });

      expect(comment).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      commentServiceMock.create.mockRejectedValueOnce(new Error());
      expect(
        commentService.create({
          content: '',
          post: { connect: { id: MOCK_ID } },
          user: { connect: { email: '' } },
        }),
      ).rejects.toThrowError();
    });
  });
  describe('FIND_ONE', () => {
    it('should be able to create a comment', async () => {
      const comment = await commentService.create({
        content: '',
        post: { connect: { id: MOCK_ID } },
        user: { connect: { email: 'mock@email.com' } },
      });
      expect(comment).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      commentServiceMock.findOne.mockRejectedValueOnce(new Error());
      expect(commentService.findOne({ id: MOCK_ID })).rejects.toThrowError();
    });
  });
  describe('UPDATE', () => {
    it('should be able to create a comment', async () => {
      const comment = await commentService.update({
        where: { id: MOCK_ID },
        data: {
          content: '',
          post: { connect: { id: MOCK_ID } },
          user: { connect: { email: 'mock@email.com' } },
        },
      });
      expect(comment).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception', () => {
      commentServiceMock.update.mockRejectedValueOnce(new Error());
      expect(
        commentService.update({
          where: { id: MOCK_ID },
          data: {
            content: '',
            post: { connect: { id: MOCK_ID } },
            user: { connect: { email: '' } },
          },
        }),
      ).rejects.toThrowError();
    });
  });
  describe('REMOVE', () => {
    it('should be able to remove a comment', async () => {
      const comment = await commentService.remove({ id: MOCK_ID });
      expect(comment).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      commentServiceMock.remove.mockRejectedValueOnce(new Error());
      expect(commentService.remove({ id: MOCK_ID })).rejects.toThrowError();
    });
  });
});
