import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageHelper } from '../common/helpers/message.helper';
import { FIND_ONE_USER_MOCK_RESPONSE } from '../user/mock/userService.mock';
import { UserService } from '../user/user.service';
import { RoleEntity } from './entities/role.entity';
import {
  MOCK_CREATE_ROLE,
  MOCK_FIND_ALL_ROLE_RESPONSE,
  MOCK_FIND_ONE_ROLE_RESPONSE,
  MOCK_UPDATE_ROLE,
} from './mock/roleController.mock';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

describe('RoleController', () => {
  let roleController: RoleController;
  let userService: UserService;

  const MOCK_ID = '1';
  const roleServiceMock = {
    create: jest.fn().mockResolvedValue({ id: '1' }),
    addUser: jest.fn().mockResolvedValue({ id: '1' }),
    removeUser: jest.fn().mockResolvedValue({ id: '1' }),
    findAll: jest.fn().mockResolvedValue(MOCK_FIND_ALL_ROLE_RESPONSE),
    findOne: jest
      .fn()
      .mockResolvedValue(new RoleEntity(MOCK_FIND_ONE_ROLE_RESPONSE)),
    update: jest.fn().mockResolvedValue({ id: '1' }),
    remove: jest.fn().mockResolvedValue({ id: '1' }),
  };

  const userServiceMock = {
    findOne: jest.fn().mockResolvedValue(FIND_ONE_USER_MOCK_RESPONSE),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: roleServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    roleController = module.get<RoleController>(RoleController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(roleController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a role', async () => {
      const role = await roleController.create(MOCK_CREATE_ROLE);
      expect(role).toStrictEqual({ id: '1' });
    });
    it('should to throw an exception', () => {
      roleServiceMock.create.mockResolvedValueOnce(null);
      expect(roleController.create(MOCK_CREATE_ROLE)).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.ROLE_BAD_REQUEST),
      );
    });
  });
  describe('ADD_USER', () => {
    it('should be able to add a user to role', async () => {
      const user = await userServiceMock.findOne(
        FIND_ONE_USER_MOCK_RESPONSE.id,
      );
      const role = await roleServiceMock.findOne(
        FIND_ONE_USER_MOCK_RESPONSE.id,
      );
      const roleWithUser = await roleController.addUser(role.id, user.id);

      expect(roleWithUser).toStrictEqual({ id: '1' });
    });
    it('should to throw an exception if user id not provided', () => {
      roleServiceMock.addUser.mockRejectedValueOnce(
        new BadRequestException(MessageHelper.ID_NOT_PROVIDED),
      );
      expect(roleController.addUser(MOCK_ID, null)).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.ID_NOT_PROVIDED),
      );
    });
    it('should to throw an exception if role id not provided', () => {
      roleServiceMock.addUser.mockRejectedValueOnce(
        new BadRequestException(MessageHelper.ID_NOT_PROVIDED),
      );
      expect(roleController.addUser(null, MOCK_ID)).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.ID_NOT_PROVIDED),
      );
    });
  });

  describe('REMOVE_USER', () => {
    it('should be able to remove a user to role', async () => {
      const user = await userServiceMock.findOne(
        FIND_ONE_USER_MOCK_RESPONSE.id,
      );
      const role = await roleServiceMock.findOne(
        FIND_ONE_USER_MOCK_RESPONSE.id,
      );
      const roleWithUser = await roleController.removeUser(role.id, user.id);

      expect(roleWithUser).toStrictEqual({ id: '1' });
    });
    it('should to throw an exception if user id not provided', () => {
      roleServiceMock.removeUser.mockRejectedValueOnce(
        new BadRequestException(MessageHelper.ID_NOT_PROVIDED),
      );
      expect(roleController.removeUser(MOCK_ID, null)).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.ID_NOT_PROVIDED),
      );
    });
    it('should to throw an exception if role id not provided', () => {
      roleServiceMock.addUser.mockRejectedValueOnce(
        new BadRequestException(MessageHelper.ID_NOT_PROVIDED),
      );
      expect(roleController.addUser(null, MOCK_ID)).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.ID_NOT_PROVIDED),
      );
    });
  });
  describe('FIND_ALL', () => {
    it('should be able to find all a role', async () => {
      const role = await roleController.findAll();
      expect(role).toStrictEqual(MOCK_FIND_ALL_ROLE_RESPONSE);
    });
    it('should be able to find all a role with params', async () => {
      const role = await roleController.findAll({ skip: 1, take: 10 });
      expect(role).toStrictEqual(MOCK_FIND_ALL_ROLE_RESPONSE);
    });
    it('should to throw an exception', () => {
      jest.spyOn(roleController, 'findAll').mockRejectedValueOnce(new Error());
      expect(roleController.findAll()).rejects.toThrowError();
    });
  });
  describe('FIND_ONE', () => {
    it('should be able to find all a role', async () => {
      const role = await roleController.findOne(MOCK_ID);
      expect(role).toStrictEqual(new RoleEntity(MOCK_FIND_ONE_ROLE_RESPONSE));
    });
    it('should to throw an exception', () => {
      roleServiceMock.findOne.mockResolvedValueOnce(null);
      expect(roleController.findOne(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.ROLE_NOT_FOUND),
      );
    });
  });
  describe('UPDATE', () => {
    it('should be able to update a role', async () => {
      const role = await roleController.update(MOCK_ID, MOCK_UPDATE_ROLE);
      expect(role).toStrictEqual({ id: '1' });
    });
    it('should to throw an exception', () => {
      roleServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        roleController.update(MOCK_ID, MOCK_UPDATE_ROLE),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.ROLE_NOT_FOUND),
      );
    });
  });
  describe('REMOVE', () => {
    it('should be able to remove a role', async () => {
      const role = await roleController.remove(MOCK_ID);
      expect(role).toStrictEqual({ id: '1' });
    });
    it('should to throw an exception', () => {
      roleServiceMock.findOne.mockResolvedValueOnce(null);
      expect(roleController.remove(MOCK_ID)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.ROLE_NOT_FOUND),
      );
    });
  });
});
