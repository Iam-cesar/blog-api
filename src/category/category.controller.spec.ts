import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageHelper } from '../common/helpers/message.helper';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import {
  MOCK_CREATE_CATEGORY,
  MOCK_FIND_ALL_CATEGORY_RESPONSE,
  MOCK_FIND_ONE_CATEGORY_RESPONSE,
} from './mock/categoryService.mock';

describe('CategoryController', () => {
  let categoryController: CategoryController;

  const MOCK_ID = 1;

  const categoryServiceMock = {
    create: jest.fn().mockReturnValue({ id: MOCK_ID }),
    findOne: jest
      .fn()
      .mockReturnValue(new CategoryEntity(MOCK_FIND_ONE_CATEGORY_RESPONSE)),
    findAll: jest.fn().mockReturnValue(MOCK_FIND_ALL_CATEGORY_RESPONSE),
    update: jest.fn().mockReturnValue({ id: MOCK_ID }),
    remove: jest.fn().mockReturnValue({ id: MOCK_ID }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: categoryServiceMock,
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a category', async () => {
      const category = await categoryController.create(MOCK_CREATE_CATEGORY);
      expect(category).toStrictEqual({ id: MOCK_ID });
    });
    it('should throw an exception', () => {
      categoryServiceMock.create.mockResolvedValueOnce(null);
      expect(
        categoryController.create(MOCK_CREATE_CATEGORY),
      ).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.CATEGORY_BAD_REQUEST),
      );
    });
  });
  describe('FIND_ONE', () => {
    it('should be able to find one category', async () => {
      const category = await categoryController.findOne(MOCK_ID);
      expect(category).toStrictEqual(
        new CategoryEntity(MOCK_FIND_ONE_CATEGORY_RESPONSE),
      );
    });
    it('should throw an exception', () => {
      categoryServiceMock.findOne.mockResolvedValueOnce(null);
      expect(categoryController.findOne(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND),
      );
    });
  });
  describe('FIND_ALL', () => {
    it('should be able to find all with params', async () => {
      const category = await categoryController.findAll({ skip: 1, take: 10 });
      expect(category).toStrictEqual(MOCK_FIND_ALL_CATEGORY_RESPONSE);
    });
    it('should be able to find all categories', async () => {
      const category = await categoryController.findAll();
      expect(category).toStrictEqual(MOCK_FIND_ALL_CATEGORY_RESPONSE);
    });
  });
  describe('UPDATE', () => {
    it('should be able to update category', async () => {
      const category = await categoryController.update(MOCK_ID, {
        name: 'updated_name',
      });
      expect(category).toStrictEqual({ id: MOCK_ID });
    });
    it('should throw an exception', () => {
      categoryServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        categoryController.update(MOCK_ID, MOCK_CREATE_CATEGORY),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND),
      );
    });
  });
  describe('REMOVE', () => {
    it('should be able to find one category', async () => {
      const category = await categoryController.remove(MOCK_ID);
      expect(category).toStrictEqual({ id: MOCK_ID });
    });
    it('should throw an exception', () => {
      categoryServiceMock.findOne.mockResolvedValueOnce(null);
      expect(categoryController.remove(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND),
      );
    });
  });
});
