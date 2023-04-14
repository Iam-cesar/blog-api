import { Test, TestingModule } from '@nestjs/testing';

import { MOCK_CREATE_USER_RESPONSE as MOCK_CREATE_USER } from '../user/mock/userService.mock';

import { UserService } from '../user/user.service';

import { PostEntity } from './entities/post.entity';

import {
  MOCK_CREATE_POST,
  MOCK_FIND_ALL_BY_AUTHOR_POST_RESPONSE,
  MOCK_FIND_ALL_POST_RESPONSE,
  MOCK_FIND_ONE_POST_RESPONSE,
  MOCK_UPDATE_POST,
} from './mock/postService.mock';

import { PostService } from './post.service';

describe('PostService', () => {
  let postService: PostService;

  let userService: UserService;

  const MOCK_ID = '1';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PostService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: '1' }),
            findAll: jest.fn().mockResolvedValue(MOCK_FIND_ALL_POST_RESPONSE),
            findAllByAuthor: jest
              .fn()
              .mockResolvedValue(MOCK_FIND_ALL_BY_AUTHOR_POST_RESPONSE),
            findOne: jest
              .fn()
              .mockResolvedValue(new PostEntity(MOCK_FIND_ONE_POST_RESPONSE)),
            update: jest.fn().mockResolvedValue({ id: '1' }),
            remove: jest.fn().mockResolvedValue({ id: '1' }),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(MOCK_CREATE_USER),
          },
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a post', async () => {
      const user = await userService.findOne({ id: MOCK_ID });

      const post = await postService.create({
        ...MOCK_CREATE_POST,
        author: { connect: { email: user.email } },
      });

      expect(post).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception', () => {
      jest.spyOn(postService, 'create').mockRejectedValueOnce(new Error());

      expect(postService.create(null)).rejects.toThrowError();
    });
  });

  describe('FIND_ALL', () => {
    it('should be able to return an array of post entity', async () => {
      const post = await postService.findAll();

      expect(post).toStrictEqual(MOCK_FIND_ALL_POST_RESPONSE);
    });

    it('should to throw an exception', () => {
      jest.spyOn(postService, 'findAll').mockRejectedValueOnce(new Error());

      expect(postService.findAll(null)).rejects.toThrowError();
    });
  });

  describe('FIND_ALL_BY_AUTHOR', () => {
    it('should be able to return an array of post entity', async () => {
      const post = await postService.findAllByAuthor(MOCK_ID);

      expect(post).toStrictEqual(MOCK_FIND_ALL_BY_AUTHOR_POST_RESPONSE);
    });

    it('should to throw an exception', () => {
      jest
        .spyOn(postService, 'findAllByAuthor')
        .mockRejectedValueOnce(new Error());

      expect(postService.findAllByAuthor(null)).rejects.toThrowError();
    });
  });

  describe('FIND_ONE', () => {
    it('should be able to find one post', async () => {
      const post = await postService.findOne({ id: MOCK_ID });

      expect(post).toStrictEqual(new PostEntity(MOCK_FIND_ONE_POST_RESPONSE));
    });

    it('should to throw an exception', () => {
      jest.spyOn(postService, 'findOne').mockRejectedValueOnce(new Error());

      expect(postService.findOne(null)).rejects.toThrowError();
    });
  });

  describe('UPDATE', () => {
    it('should be able to update a post', async () => {
      const post = await postService.update({
        where: { id: MOCK_ID },
        data: MOCK_UPDATE_POST,
      });

      expect(post).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception', () => {
      jest.spyOn(postService, 'update').mockRejectedValueOnce(new Error());

      expect(postService.update(null)).rejects.toThrowError();
    });
  });

  describe('REMOVE', () => {
    it('should be able to remove a post', async () => {
      const post = await postService.remove({ id: MOCK_ID });

      expect(post).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception', () => {
      jest.spyOn(postService, 'remove').mockRejectedValueOnce(new Error());

      expect(postService.remove(null)).rejects.toThrowError();
    });
  });
});
