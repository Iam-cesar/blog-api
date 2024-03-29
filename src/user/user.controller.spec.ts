import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthHelper } from '../auth/auth.helper';
import { MessageHelper } from '../common/helpers/message.helper';
import { UserEntity } from './entities/user.entity';
import {
  MOCK_CREATE_USER,
  MOCK_CREATE_USER_RESPONSE,
  MOCK_FIND_ALL_USER_RESPONSE,
  MOCK_FIND_ONE_USER_RESPONSE,
  MOCK_UPDATE_USER,
} from './mock/userController.mock';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let authHelper: AuthHelper;
  const MOCK_ID = '1';

  const userServiceMock = {
    create: jest
      .fn()
      .mockResolvedValue(new UserEntity(MOCK_CREATE_USER_RESPONSE)),
    findOneWithPassword: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    findAll: jest.fn().mockResolvedValue(MOCK_FIND_ALL_USER_RESPONSE),
    findOne: jest.fn().mockResolvedValue(MOCK_FIND_ONE_USER_RESPONSE),
    update: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    softRemove: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    renew: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    remove: jest.fn().mockResolvedValue({ id: MOCK_ID }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
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
      const user = await userController.create(MOCK_CREATE_USER);
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.create.mockResolvedValueOnce(null);
      expect(userController.create(MOCK_CREATE_USER)).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.ROLE_BAD_REQUEST),
      );
    });
  });

  describe('FIND_ONE', () => {
    it('should be able to find one user', async () => {
      const user = await userController.findOne(MOCK_CREATE_USER_RESPONSE.id);
      expect(user).toStrictEqual(MOCK_CREATE_USER_RESPONSE);
    });

    it('should to throw an exception', () => {
      userServiceMock.findOne.mockResolvedValueOnce(null);
      expect(userController.findOne(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
  });

  describe('FIND_ALL', () => {
    it('should be able to find an array of users', async () => {
      const users = await userController.findAll();
      expect(users).toBeInstanceOf(Array);

      const [user] = users;
      expect(user.id).toBe(MOCK_ID);
    });

    it('should be able to find an array of users with url params', async () => {
      const users = await userController.findAll({ skip: 10, take: 1 });
      expect(users).toBeInstanceOf(Array);

      const [user] = users;
      expect(user.id).toBe(MOCK_ID);
    });
  });

  describe('UPDATE', () => {
    it('should be able to update a user', async () => {
      const user = await userController.update('1', MOCK_UPDATE_USER, {
        user: { id: MOCK_ID },
      });
      expect(user).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      userServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        userController.update(MOCK_ID, null, { user: { id: MOCK_ID } }),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
    it('should to throw an exception if user id diferent of author id', async () => {
      expect(
        userController.remove(MOCK_ID, { user: { id: MOCK_ID + 1 } }),
      ).rejects.toStrictEqual(
        new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST),
      );
    });
  });

  describe('REMOVE', () => {
    it('should be able to remove user', async () => {
      const user = await userController.remove(MOCK_CREATE_USER_RESPONSE.id, {
        user: { id: MOCK_ID },
      });
      expect(user).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      userServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        userController.remove(MOCK_ID, { user: { id: MOCK_ID } }),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
    it('should to throw an exception if user id diferent of author id', async () => {
      expect(
        userController.remove(MOCK_ID, { user: { id: MOCK_ID + 1 } }),
      ).rejects.toStrictEqual(
        new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST),
      );
    });
  });

  describe('SOFT_REMOVE', () => {
    it('should be able to soft delete one user', async () => {
      const user = await userController.softRemove(
        MOCK_CREATE_USER_RESPONSE.id,
      );
      expect(user).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception', () => {
      userServiceMock.findOne.mockResolvedValueOnce(null);
      expect(userController.softRemove(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
  });

  describe('RENEW', () => {
    it('should be able to renew user', async () => {
      const user = await userController.renew(MOCK_CREATE_USER_RESPONSE.id);
      expect(user).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception', () => {
      userServiceMock.findOne.mockResolvedValueOnce(null);
      expect(userController.renew(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.USER_NOT_FOUND),
      );
    });
  });
});
