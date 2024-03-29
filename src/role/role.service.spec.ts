import { Test, TestingModule } from '@nestjs/testing';
import { RoleEntity } from './entities/role.entity';
import {
  MOCK_CREATE_ROLE,
  MOCK_FIND_ALL_ROLE_RESPONSE,
  MOCK_FIND_ONE_ROLE_RESPONSE,
  MOCK_UPDATE_ROLE,
} from './mock/roleService.mock';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let roleService: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RoleService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: '1' }),
            findAll: jest.fn().mockResolvedValue(MOCK_FIND_ALL_ROLE_RESPONSE),
            findOne: jest
              .fn()
              .mockResolvedValue(new RoleEntity(MOCK_FIND_ONE_ROLE_RESPONSE)),
            update: jest.fn().mockResolvedValue({ id: '1' }),
            remove: jest.fn().mockResolvedValue({ id: '1' }),
          },
        },
      ],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(roleService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a role', async () => {
      const role = await roleService.create(MOCK_CREATE_ROLE);
      expect(role).toStrictEqual({ id: '1' });
    });

    it('should to throw an exception', () => {
      jest.spyOn(roleService, 'create').mockRejectedValueOnce(new Error());
      expect(roleService.create(MOCK_CREATE_ROLE)).rejects.toThrowError();
    });
  });
  describe('FIND_ALL', () => {
    it('should be able to return an array of role entities', async () => {
      const roles = await roleService.findAll();
      expect(roles).toBeInstanceOf(Array);

      expect(roles[0]).toStrictEqual({
        id: '1',
        name: 'mock role',
        permitions: [],
      });
    });

    it('should be able to return an array of role entities with params', async () => {
      const roles = await roleService.findAll({ take: 10, skip: 1 });
      expect(roles).toBeInstanceOf(Array);

      expect(roles[0]).toStrictEqual({
        id: '1',
        name: 'mock role',
        permitions: [],
      });
    });

    it('should to throw an exception', () => {
      jest.spyOn(roleService, 'findAll').mockRejectedValueOnce(new Error());
      expect(roleService.findAll()).rejects.toThrowError();
    });
  });
  describe('FIND_ONE', () => {
    it('should be able to find one role', async () => {
      const role = await roleService.findOne({ id: '1' });
      expect(role).toStrictEqual(new RoleEntity(MOCK_FIND_ONE_ROLE_RESPONSE));
    });
    it('should to throw an exception', () => {
      const { id } = MOCK_FIND_ONE_ROLE_RESPONSE;
      jest.spyOn(roleService, 'findOne').mockRejectedValueOnce(new Error());
      expect(roleService.findOne({ id })).rejects.toThrowError();
    });
  });
  describe('UPDATE', () => {
    it('should be able to update a role', async () => {
      const role = await roleService.update({
        where: { id: '1' },
        data: MOCK_UPDATE_ROLE,
      });
      expect(role).toStrictEqual({ id: '1' });
    });
    it('should to throw an exception', () => {
      jest.spyOn(roleService, 'update').mockRejectedValueOnce(new Error());
      expect(
        roleService.update({
          where: { id: '1' },
          data: MOCK_CREATE_ROLE,
        }),
      ).rejects.toThrowError();
    });
  });
  describe('REMOVE', () => {
    it('should be able to remove role', async () => {
      const role = await roleService.remove({ id: '1' });
      expect(role).toStrictEqual({ id: '1' });
    });
    it('should to throw an exception', () => {
      jest.spyOn(roleService, 'remove').mockRejectedValueOnce(new Error());
      expect(roleService.remove({ id: '1' })).rejects.toThrowError();
    });
  });
});
