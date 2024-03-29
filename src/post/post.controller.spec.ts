import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Test, TestingModule } from '@nestjs/testing';

import { CategoryService } from '../category/category.service';

import { MOCK_FIND_ONE_CATEGORY_RESPONSE } from '../category/mock/categoryService.mock';

import { MessageHelper } from '../common/helpers/message.helper';

import { MOCK_FIND_ONE_USER_RESPONSE } from '../user/mock/userService.mock';

import { UserService } from '../user/user.service';

import { PostEntity } from './entities/post.entity';

import {
  MOCK_CREATE_POST,
  MOCK_FIND_ALL_BY_AUTHOR_POST_RESPONSE,
  MOCK_FIND_ALL_POST_RESPONSE,
  MOCK_FIND_ONE_POST_RESPONSE,
  MOCK_UPDATE_POST,
} from './mock/postController.mock';

import { PostController } from './post.controller';

import { PostService } from './post.service';

describe('PostController', () => {
  let postController: PostController;

  let postService: PostService;

  let userService: UserService;

  let categoryService: CategoryService;

  const MOCK_ID = '1';

  const postServiceMock = {
    create: jest.fn().mockReturnValue({ id: MOCK_ID }),
    findAll: jest.fn().mockReturnValue(MOCK_FIND_ALL_POST_RESPONSE),
    findAllByAuthor: jest
      .fn()
      .mockReturnValue(MOCK_FIND_ALL_BY_AUTHOR_POST_RESPONSE),
    findOne: jest
      .fn()
      .mockReturnValue(new PostEntity(MOCK_FIND_ONE_POST_RESPONSE)),
    update: jest.fn().mockReturnValue({ id: MOCK_ID }),
    remove: jest.fn().mockReturnValue({ id: MOCK_ID }),
    addCategory: jest.fn().mockReturnValue({ id: MOCK_ID }),
    removeCategory: jest.fn().mockReturnValue({ id: MOCK_ID }),
  };

  const categoryServiceMock = {
    findOne: jest.fn().mockReturnValue(MOCK_FIND_ONE_CATEGORY_RESPONSE),
  };

  const userServiceMock = {
    findOne: jest.fn().mockReturnValue(MOCK_FIND_ONE_USER_RESPONSE),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: CategoryService,
          useValue: categoryServiceMock,
        },
        {
          provide: PostService,
          useValue: postServiceMock,
        },
      ],
    }).compile();

    postController = module.get<PostController>(PostController);

    postService = module.get<PostService>(PostService);

    userService = module.get<UserService>(UserService);

    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();

    expect(userService).toBeDefined();

    expect(categoryService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a post', async () => {
      const user = await userService.findOne({ id: MOCK_ID });

      const post = await postController.create(
        {
          ...MOCK_CREATE_POST,
          author: { connect: { id: user.id } },
        },
        { user: { email: user.email, id: MOCK_ID } },
      );

      expect(post).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception when author not found', () => {
      userServiceMock.findOne.mockReturnValueOnce(null);

      expect(
        postController.create(
          {
            ...MOCK_CREATE_POST,
            author: { connect: { id: MOCK_ID } },
          },
          { user: { email: '', id: undefined } },
        ),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });

    it('should to throw an exception unauthorized user', async () => {
      const user = await userService.findOne({ id: MOCK_ID });

      postServiceMock.create.mockReturnValueOnce(null);

      expect(
        postController.create(
          {
            ...MOCK_CREATE_POST,
            author: { connect: { id: user.id } },
          },
          { user: { email: user.email, id: MOCK_ID } },
        ),
      ).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.POST_BAD_REQUEST),
      );
    });

    it('should to throw an exception', async () => {
      const user = await userService.findOne({ id: MOCK_ID });

      postServiceMock.create.mockReturnValueOnce(null);

      expect(
        postController.create(
          {
            ...MOCK_CREATE_POST,
            author: { connect: { id: user.id } },
          },
          null,
        ),
      ).rejects.toStrictEqual(
        new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST),
      );
    });
  });

  describe('FIND_ALL', () => {
    it('should be able to return an array of post entity', async () => {
      const post = await postController.findAll();

      expect(post).toStrictEqual(MOCK_FIND_ALL_POST_RESPONSE);
    });

    it('should be able to return an array of post entity with params', async () => {
      const post = await postController.findAll({ skip: 1, take: 10 });

      expect(post).toStrictEqual(MOCK_FIND_ALL_POST_RESPONSE);
    });

    it('should to throw an exception', () => {
      jest.spyOn(postController, 'findAll').mockRejectedValueOnce(new Error());

      expect(postController.findAll(null)).rejects.toThrowError();
    });
  });

  describe('FIND_ALL_BY_AUTHOR', () => {
    it('should be able to return an array of post entity', async () => {
      const post = await postController.findAllByAuthor({
        user: { id: MOCK_ID },
      });

      expect(post).toStrictEqual(MOCK_FIND_ALL_BY_AUTHOR_POST_RESPONSE);
    });

    it('should be able to return an array of post entity with params', async () => {
      const post = await postController.findAllByAuthor(
        {
          user: { id: MOCK_ID },
        },
        {
          skip: 1,
          take: 10,
        },
      );

      expect(post).toStrictEqual(MOCK_FIND_ALL_BY_AUTHOR_POST_RESPONSE);
    });

    it('should be able to return an array of post entity with params', async () => {
      const post = await postController.findAllByAuthor({
        user: { id: MOCK_ID },
      });

      expect(post).toStrictEqual(MOCK_FIND_ALL_BY_AUTHOR_POST_RESPONSE);
    });

    it('should to throw an exception', () => {
      jest
        .spyOn(postController, 'findAllByAuthor')
        .mockRejectedValueOnce(new Error());

      expect(postController.findAllByAuthor(null)).rejects.toThrowError();
    });
  });

  describe('FIND_ONE', () => {
    it('should be able to find one post', async () => {
      const post = await postController.findOne(MOCK_ID);

      expect(post).toStrictEqual(new PostEntity(MOCK_FIND_ONE_POST_RESPONSE));
    });

    it('should to throw an exception', () => {
      postServiceMock.findOne.mockResolvedValueOnce(null);

      expect(postController.findOne(null)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.POST_NOT_FOUND),
      );
    });
  });

  describe('UPDATE', () => {
    it('should be able to update a post', async () => {
      const post = await postController.update(MOCK_ID, MOCK_UPDATE_POST, {
        user: { id: MOCK_ID },
      });

      expect(post).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception', () => {
      postServiceMock.findOne.mockResolvedValueOnce(null);

      expect(
        postController.update(MOCK_ID, MOCK_UPDATE_POST, {
          user: { id: MOCK_ID },
        }),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.POST_NOT_FOUND),
      );
    });

    it('should to throw an exception if user id diferent of author id', async () => {
      expect(
        postController.update(MOCK_ID, MOCK_UPDATE_POST, {
          user: { id: MOCK_ID + 1 },
        }),
      ).rejects.toStrictEqual(
        new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST),
      );
    });
  });

  describe('REMOVE', () => {
    it('should be able to remove a post', async () => {
      const post = await postController.remove(MOCK_ID, {
        user: { id: MOCK_ID },
      });

      expect(post).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception if user id diferent of author id', async () => {
      expect(
        postController.remove(MOCK_ID, {
          user: { id: MOCK_ID + 1 },
        }),
      ).rejects.toStrictEqual(
        new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST),
      );
    });

    it('should to throw an exception', () => {
      postServiceMock.findOne.mockResolvedValueOnce(null);

      expect(
        postController.remove(MOCK_ID, {
          user: { id: MOCK_ID },
        }),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.POST_NOT_FOUND),
      );
    });
  });

  describe('ADD_CATEGORY', () => {
    it('should be able to add category to post', async () => {
      const category = await categoryService.findOne({ id: MOCK_ID });

      const post = await postService.findOne({ id: MOCK_ID });

      expect(
        await postController.addCategory(
          {
            categoryId: category.id,
            id: post.id,
          },
          {
            user: { id: MOCK_ID },
          },
        ),
      ).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception post not found', () => {
      postServiceMock.findOne.mockResolvedValueOnce(null);

      expect(
        postController.addCategory(
          { categoryId: MOCK_ID, id: MOCK_ID },
          {
            user: { id: MOCK_ID },
          },
        ),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.POST_NOT_FOUND),
      );
    });

    it('should to throw an exception category not found', () => {
      categoryServiceMock.findOne.mockResolvedValueOnce(null);

      expect(
        postController.addCategory(
          { categoryId: MOCK_ID, id: MOCK_ID },
          {
            user: { id: MOCK_ID },
          },
        ),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND),
      );
    });

    it('should to throw an exception if user id diferent of author id', async () => {
      expect(
        postController.addCategory(
          { categoryId: MOCK_ID, id: MOCK_ID },
          {
            user: { id: MOCK_ID + 1 },
          },
        ),
      ).rejects.toStrictEqual(
        new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST),
      );
    });
  });

  describe('REMOVE_CATEGORY', () => {
    it('should be able to remove category of post', async () => {
      const category = await categoryService.findOne({ id: MOCK_ID });

      const post = await postService.findOne({ id: MOCK_ID });

      expect(
        await postController.removeCategory(
          {
            categoryId: category.id,
            id: post.id,
          },
          { user: { id: MOCK_ID } },
        ),
      ).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception post not found', () => {
      postServiceMock.findOne.mockResolvedValueOnce(null);

      expect(
        postController.removeCategory(
          { categoryId: MOCK_ID, id: MOCK_ID },
          { user: { id: MOCK_ID } },
        ),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.POST_NOT_FOUND),
      );
    });

    it('should to throw an exception category not found', () => {
      categoryServiceMock.findOne.mockResolvedValueOnce(null);

      expect(
        postController.removeCategory(
          { categoryId: MOCK_ID, id: MOCK_ID },
          { user: { id: MOCK_ID } },
        ),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND),
      );
    });

    it('should to throw an exception if user id diferent of author id', async () => {
      expect(
        postController.removeCategory(
          { categoryId: MOCK_ID, id: MOCK_ID },
          {
            user: { id: MOCK_ID + 1 },
          },
        ),
      ).rejects.toStrictEqual(
        new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST),
      );
    });
  });
});
