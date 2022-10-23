import { Test, TestingModule } from '@nestjs/testing';

import {
  FIND_ALL_USER_MOCK_RESPONSE,
  FIND_ONE_USER_MOCK_RESPONSE,
  MOCK_CREATE_USER,
  MOCK_UPDATE_USER,
} from './mock/userService.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  const MOCK_ID = 1;

  const userServiceMock = {
    create: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    findOneWithPassword: jest.fn().mockResolvedValue({ id: MOCK_ID }),
    findAll: jest.fn().mockResolvedValue(FIND_ALL_USER_MOCK_RESPONSE),
    findOne: jest.fn().mockResolvedValue(FIND_ONE_USER_MOCK_RESPONSE),
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
        email: FIND_ONE_USER_MOCK_RESPONSE.email,
      });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.findOneWithPassword.mockRejectedValueOnce(new Error());
      expect(
        userService.findOneWithPassword(MOCK_CREATE_USER),
      ).rejects.toThrowError();
    });
  });
  describe('FIND ONE USER', () => {
    it('should be able to find a user', async () => {
      const user = await userService.findOne({
        email: FIND_ONE_USER_MOCK_RESPONSE.email,
      });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.findOne.mockRejectedValueOnce(new Error());
      expect(
        userService.findOne({ email: FIND_ONE_USER_MOCK_RESPONSE.email }),
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
        where: { email: MOCK_CREATE_USER.email },
        data: MOCK_UPDATE_USER,
      });

      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.update.mockRejectedValueOnce(new Error());
      expect(
        userService.update({
          where: { email: MOCK_CREATE_USER.email },
          data: MOCK_UPDATE_USER,
        }),
      ).rejects.toThrowError();
    });
  });

  describe('REMOVE', () => {
    it('should be able to remove a user', async () => {
      const user = await userService.remove({ email: MOCK_CREATE_USER.email });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.remove.mockRejectedValueOnce(new Error());
      expect(
        userService.remove({ email: MOCK_CREATE_USER.email }),
      ).rejects.toThrowError();
    });
  });

  describe('SOFT REMOVE', () => {
    it('should be able to soft delete a user', async () => {
      const user = await userService.softRemove({
        email: MOCK_CREATE_USER.email,
      });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.softRemove.mockRejectedValueOnce(new Error());
      expect(
        userService.softRemove({ email: MOCK_CREATE_USER.email }),
      ).rejects.toThrowError();
    });
  });

  describe('RENEW', () => {
    it('should be able to renew a user', async () => {
      const user = await userService.renew({ email: MOCK_CREATE_USER.email });
      expect(user.id).toBe(MOCK_ID);
    });

    it('should to throw an exception', () => {
      userServiceMock.renew.mockRejectedValueOnce(new Error());
      expect(
        userService.renew({ email: MOCK_CREATE_USER.email }),
      ).rejects.toThrowError();
    });
  });
});
