import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageHelper } from '../common/helpers/message.helper';
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

  const MOCK_ID = '1';
  const roleServiceMock = {
    create: jest.fn().mockResolvedValue({ id: '1' }),
    findAll: jest.fn().mockResolvedValue(MOCK_FIND_ALL_ROLE_RESPONSE),
    findOne: jest
      .fn()
      .mockResolvedValue(new RoleEntity(MOCK_FIND_ONE_ROLE_RESPONSE)),
    update: jest.fn().mockResolvedValue({ id: '1' }),
    remove: jest.fn().mockResolvedValue({ id: '1' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: roleServiceMock,
        },
      ],
    }).compile();

    roleController = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(roleController).toBeDefined();
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
