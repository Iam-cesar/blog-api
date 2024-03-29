import { Test, TestingModule } from '@nestjs/testing';

import {
  FIND_ALL_USER_MOCK_RESPONSE,
  MOCK_CREATE_USER,
  MOCK_CREATE_USER_RESPONSE,
  MOCK_FIND_ONE_USER_RESPONSE,
  MOCK_UPDATE_USER,
} from './mock/userService.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  const MOCK_ID = '1';

  const userServiceMock = {
    create: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    findOneWithPassword: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    findAll: jest.fn().mockResolvedValue(FIND_ALL_USER_MOCK_RESPONSE),
    findOne: jest.fn().mockResolvedValue(MOCK_FIND_ONE_USER_RESPONSE),
    update: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    softRemove: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    renew: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    remove: jest.fn().mockResolvedValue({ id: MOCK_ID }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a user', async () => {
      const user = await userService.create(MOCK_CREATE_USER);
      expect(user).toStrictEqual({ id: MOCK_ID });
    });

    it('should to throw an exception', () => {
      userServiceMock.create.mockRejectedValueOnce(new Error());
      expect(userService.create(null)).rejects.toThrowError();
    });
  });

  describe('FIND ONE WITH PASSWORD', () => {
    it('should be able to find with sensitive information', async () => {
      const user = await userService.findOneWithPassword({
        id: MOCK_FIND_ONE_USER_RESPONSE.id,
      });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.findOneWithPassword.mockRejectedValueOnce(new Error());
      expect(
        userService.findOneWithPassword({ id: MOCK_FIND_ONE_USER_RESPONSE.id }),
      ).rejects.toThrowError();
    });
  });
  describe('FIND ONE USER', () => {
    it('should be able to find a user', async () => {
      const user = await userService.findOne({
        id: MOCK_FIND_ONE_USER_RESPONSE.id,
      });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.findOne.mockRejectedValueOnce(new Error());
      expect(
        userService.findOne({ id: MOCK_FIND_ONE_USER_RESPONSE.id }),
      ).rejects.toThrowError();
    });
  });

  describe('FIND ALL USERS', () => {
    it('should return a array of userEntities', async () => {
      const users = await userService.findAll();
      expect(users).toBeInstanceOf(Array);

      const [user] = users;
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());
      expect(userService.findAll()).rejects.toThrowError();
    });
  });

  describe('UPDATE', () => {
    it('should be able to update a user', async () => {
      const user = await userService.update({
        where: { id: MOCK_CREATE_USER_RESPONSE.id },
        data: MOCK_UPDATE_USER,
      });

      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.update.mockRejectedValueOnce(new Error());
      expect(
        userService.update({
          where: { id: MOCK_CREATE_USER_RESPONSE.id },
          data: MOCK_UPDATE_USER,
        }),
      ).rejects.toThrowError();
    });
  });

  describe('REMOVE', () => {
    it('should be able to remove a user', async () => {
      const user = await userService.remove({
        id: MOCK_CREATE_USER_RESPONSE.id,
      });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.remove.mockRejectedValueOnce(new Error());
      expect(
        userService.remove({ id: MOCK_CREATE_USER_RESPONSE.id }),
      ).rejects.toThrowError();
    });
  });

  describe('SOFT REMOVE', () => {
    it('should be able to soft delete a user', async () => {
      const user = await userService.softRemove({
        id: MOCK_CREATE_USER_RESPONSE.id,
      });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.softRemove.mockRejectedValueOnce(new Error());
      expect(
        userService.softRemove({ id: MOCK_CREATE_USER_RESPONSE.id }),
      ).rejects.toThrowError();
    });
  });

  describe('RENEW', () => {
    it('should be able to renew a user', async () => {
      const user = await userService.renew({
        id: MOCK_CREATE_USER_RESPONSE.id,
      });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.renew.mockRejectedValueOnce(new Error());
      expect(
        userService.renew({ id: MOCK_CREATE_USER_RESPONSE.id }),
      ).rejects.toThrowError();
    });
  });
});
