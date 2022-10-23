import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import {
  MOCK_CREATE_CATEGORY,
  MOCK_FIND_ALL_CATEGORY_RESPONSE,
  MOCK_FIND_ONE_CATEGORY_RESPONSE,
} from './mock/categoryService.mock';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  const MOCK_ID = '1';

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
      providers: [
        {
          provide: CategoryService,
          useValue: categoryServiceMock,
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a category', async () => {
      const category = await categoryService.create(MOCK_CREATE_CATEGORY);
      expect(category).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      categoryServiceMock.create.mockRejectedValueOnce(new Error());
      expect(categoryService.create(MOCK_CREATE_CATEGORY)).rejects.toThrowError(
        new Error(),
      );
    });
  });
  describe('FIND_ONE', () => {
    it('should be able to find one category', async () => {
      const category = await categoryService.findOne({ id: MOCK_ID });
      expect(category).toStrictEqual(
        new CategoryEntity(MOCK_FIND_ONE_CATEGORY_RESPONSE),
      );
    });
    it('should to throw an exception', () => {
      categoryServiceMock.findOne.mockRejectedValueOnce(new Error());
      expect(categoryService.findOne({ id: MOCK_ID })).rejects.toThrowError(
        new Error(),
      );
    });
  });
  describe('FIND_ALL', () => {
    it('should be able to find all with params', async () => {
      const category = await categoryService.findAll({ skip: 1, take: 10 });
      expect(category).toStrictEqual(MOCK_FIND_ALL_CATEGORY_RESPONSE);
    });
    it('should be able to find all categories', async () => {
      const category = await categoryService.findAll();
      expect(category).toStrictEqual(MOCK_FIND_ALL_CATEGORY_RESPONSE);
    });
    it('should to throw an exception', () => {
      categoryServiceMock.findAll.mockRejectedValueOnce(new Error());
      expect(categoryService.findAll()).rejects.toThrowError(new Error());
    });
  });
  describe('UPDATE', () => {
    it('should be able to update a category', async () => {
      const category = await categoryService.update({
        where: { id: MOCK_ID },
        data: {
          name: 'updated_name',
        },
      });
      expect(category).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      categoryServiceMock.update.mockRejectedValueOnce(new Error());
      expect(
        categoryService.update({
          data: MOCK_CREATE_CATEGORY,
          where: { id: MOCK_ID },
        }),
      ).rejects.toThrowError(new Error());
    });
  });
  describe('REMOVE', () => {
    it('should be able to find one category', async () => {
      const category = await categoryService.remove({ id: MOCK_ID });
      expect(category).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      categoryServiceMock.remove.mockRejectedValueOnce(new Error());
      expect(categoryService.remove({ id: MOCK_ID })).rejects.toThrowError(
        new Error(),
      );
    });
  });
});
