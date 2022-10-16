import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthHelper } from '../auth/auth.helper';
import { MessageHelper } from '../helpers/message.helper';
import { UserEntity } from './entities/user.entity';
import {
  FIND_ALL_MOCK_RESPONSE,
  FIND_ONE_MOCK_RESPONSE,
  MOCK_CREATE,
  MOCK_CREATE_RESPONSE,
  MOCK_UPDATE,
} from './mock/userController.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let authHelper: AuthHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue(new UserEntity(MOCK_CREATE_RESPONSE)),
            findOneWithPassword: jest.fn().mockResolvedValue({ id: 2 }),
            findAll: jest.fn().mockResolvedValue(FIND_ALL_MOCK_RESPONSE),
            findOne: jest.fn().mockResolvedValue(FIND_ONE_MOCK_RESPONSE),
            update: jest.fn().mockResolvedValue({ id: 2 }),
            softRemove: jest.fn().mockResolvedValue({ id: 2 }),
            renew: jest.fn().mockResolvedValue({ id: 2 }),
            remove: jest.fn().mockResolvedValue({ id: 2 }),
          },
        },
        AuthHelper,
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    authHelper = module.get<AuthHelper>(AuthHelper);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(authHelper).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a user', async () => {
      const user = await userController.create(MOCK_CREATE);
      expect(user.id).toBe(2);
    });
  });

  describe('FIND_ONE', () => {
    it('should be able to find one user', async () => {
      const user = await userController.findOne(MOCK_CREATE_RESPONSE.id);
      expect(user).toStrictEqual(MOCK_CREATE_RESPONSE);
    });

    it('should to throw an exception', () => {
      jest
        .spyOn(userController, 'findOne')
        .mockRejectedValueOnce(
          new NotFoundException(MessageHelper.USER_NOT_FOUND),
        );
      expect(userController.findOne(null)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
  });

  describe('FIND_ALL', () => {
    it('should be able to find an array of users', async () => {
      const users = await userController.findAll();
      expect(users).toBeInstanceOf(Array);

      const [user] = users;
      expect(user.id).toBe(2);
    });

    it('should be able to find an array of users with url params', async () => {
      const users = await userController.findAll({ skip: 10, take: 1 });
      expect(users).toBeInstanceOf(Array);

      const [user] = users;
      expect(user.id).toBe(2);
    });
  });

  describe('UPDATE', () => {
    it('should be able to update a user', async () => {
      const user = await userController.update(1, MOCK_UPDATE);
      expect(user).toStrictEqual({ id: 2 });
    });

    it('should to throw an exception', () => {
      jest
        .spyOn(userController, 'update')
        .mockRejectedValueOnce(
          new NotFoundException(MessageHelper.USER_NOT_FOUND),
        );

      expect(userController.update(null, MOCK_UPDATE)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
  });

  describe('REMOVE', () => {
    it('should be able to remove user', async () => {
      const user = await userController.remove(MOCK_CREATE_RESPONSE.id);
      expect(user).toStrictEqual({ id: 2 });
    });

    it('should to throw an exception', () => {
      jest
        .spyOn(userController, 'remove')
        .mockRejectedValueOnce(
          new NotFoundException(MessageHelper.USER_NOT_FOUND),
        );

      expect(userController.remove(null)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
  });

  describe('SOFT_REMOVE', () => {
    it('should be able to soft delete one user', async () => {
      const user = await userController.softRemove(MOCK_CREATE_RESPONSE.id);
      expect(user).toStrictEqual({ id: 2 });
    });

    it('should to throw an exception', () => {
      jest
        .spyOn(userController, 'softRemove')
        .mockRejectedValueOnce(
          new NotFoundException(MessageHelper.USER_NOT_FOUND),
        );
      expect(userController.softRemove(null)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
  });

  describe('RENEW', () => {
    it('should be able to renew user', async () => {
      const user = await userController.renew(MOCK_CREATE_RESPONSE.id);
      expect(user).toStrictEqual({ id: 2 });
    });

    it('should to throw an exception', () => {
      jest
        .spyOn(userController, 'renew')
        .mockRejectedValueOnce(
          new NotFoundException(MessageHelper.USER_NOT_FOUND),
        );
      expect(userController.renew(null)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
  });
});
