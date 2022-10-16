import { Test, TestingModule } from '@nestjs/testing';

import {
  FIND_ALL_MOCK_RESPONSE,
  FIND_ONE_MOCK_RESPONSE,
  MOCK_CREATE,
  MOCK_CREATE_RESPONSE,
  MOCK_UPDATE,
} from './mock/userService.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(MOCK_CREATE_RESPONSE),
            findOneWithPassword: jest.fn().mockResolvedValue({ id: 2 }),
            findAll: jest.fn().mockResolvedValue(FIND_ALL_MOCK_RESPONSE),
            findOne: jest.fn().mockResolvedValue(FIND_ONE_MOCK_RESPONSE),
            update: jest.fn().mockResolvedValue({ id: 2 }),
            softRemove: jest.fn().mockResolvedValue({ id: 2 }),
            renew: jest.fn().mockResolvedValue({ id: 2 }),
            remove: jest.fn().mockResolvedValue({ id: 2 }),
          },
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
      const user = await userService.create(MOCK_CREATE);
      expect(user.email).toBe('mock_email@email.com');
      expect(user).toStrictEqual(MOCK_CREATE_RESPONSE);
    });

    it('should to throw an exception', () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());
      expect(userService.create(MOCK_CREATE)).rejects.toThrowError();
    });
  });

  describe('FIND ONE WITH PASSWORD', () => {
    it('should be able to find with sensitive information', async () => {
      const user = await userService.findOneWithPassword({
        email: FIND_ONE_MOCK_RESPONSE.email,
      });
      expect(user.id).toBe(2);
    });

    it('should to throw an exception', () => {
      jest
        .spyOn(userService, 'findOneWithPassword')
        .mockRejectedValueOnce(new Error());
      expect(
        userService.findOneWithPassword(MOCK_CREATE),
      ).rejects.toThrowError();
    });
  });
  describe('FIND ONE USER', () => {
    it('should be able to find a user', async () => {
      const user = await userService.findOne({
        email: FIND_ONE_MOCK_RESPONSE.email,
      });
      expect(user.id).toBe(2);
    });

    it('should to throw an exception', () => {
      jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());
      expect(
        userService.findOne({ email: FIND_ONE_MOCK_RESPONSE.email }),
      ).rejects.toThrowError();
    });
  });

  describe('FIND ALL USERS', () => {
    it('should return a array of userEntities', async () => {
      const users = await userService.findAll();
      expect(users).toBeInstanceOf(Array);

      const [user] = users;
      expect(user.id).toBe(2);
    });

    it('should to throw an exception', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());
      expect(userService.findAll()).rejects.toThrowError();
    });
  });

  describe('UPDATE', () => {
    it('should be able to update a user', async () => {
      const user = await userService.update({
        where: { email: MOCK_CREATE.email },
        data: MOCK_UPDATE,
      });

      expect(user.id).toBe(2);
    });

    it('should to throw an exception', () => {
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());
      expect(
        userService.update({
          where: { email: MOCK_CREATE.email },
          data: MOCK_UPDATE,
        }),
      ).rejects.toThrowError();
    });
  });

  describe('DELETE', () => {
    it('should be able to delete a user', async () => {
      const user = await userService.remove({ email: MOCK_CREATE.email });
      expect(user.id).toBe(2);
    });

    it('should to throw an exception', () => {
      jest.spyOn(userService, 'remove').mockRejectedValueOnce(new Error());
      expect(
        userService.remove({ email: MOCK_CREATE.email }),
      ).rejects.toThrowError();
    });
  });

  describe('SOFT DELETE', () => {
    it('should be able to soft delete a user', async () => {
      const user = await userService.softRemove({ email: MOCK_CREATE.email });
      expect(user.id).toBe(2);
    });

    it('should to throw an exception', () => {
      jest.spyOn(userService, 'softRemove').mockRejectedValueOnce(new Error());
      expect(
        userService.softRemove({ email: MOCK_CREATE.email }),
      ).rejects.toThrowError();
    });
  });

  describe('RENEW', () => {
    it('should be able to renew a user', async () => {
      const user = await userService.renew({ email: MOCK_CREATE.email });
      expect(user.id).toBe(2);
    });

    it('should to throw an exception', () => {
      jest.spyOn(userService, 'renew').mockRejectedValueOnce(new Error());
      expect(
        userService.renew({ email: MOCK_CREATE.email }),
      ).rejects.toThrowError();
    });
  });
});
