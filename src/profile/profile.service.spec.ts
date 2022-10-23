import { Test, TestingModule } from '@nestjs/testing';
import { MOCK_CREATE_USER_RESPONSE as MOCK_CREATE_USER } from '../user/mock/userService.mock';
import { UserService } from '../user/user.service';

import {
  MOCK_CREATE_PROFILE,
  MOCK_FIND_ONE_PROFILE_RESPONSE,
  MOCK_UPDATE_PROFILE,
} from './mock/profileService.mock';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let profileService: ProfileService;
  let userService: UserService;

  const MOCK_ID = '1';
  const profileServiceMock = {
    create: jest.fn().mockResolvedValue({ id: '1' }),
    findOne: jest.fn().mockResolvedValue(MOCK_FIND_ONE_PROFILE_RESPONSE),
    update: jest.fn().mockResolvedValue({ id: '1' }),
    remove: jest.fn().mockResolvedValue({ id: '1' }),
  };
  const userServiceMock = {
    findOne: jest.fn().mockResolvedValue(MOCK_CREATE_USER),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProfileService,
          useValue: profileServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    profileService = module.get<ProfileService>(ProfileService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(profileService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a profile', async () => {
      const user = await userService.findOne({ id: MOCK_ID });
      const profile = await profileService.create({
        ...MOCK_CREATE_PROFILE,
        user: { connect: { id: user.id } },
      });

      expect(profile).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception', () => {
      profileServiceMock.create.mockRejectedValueOnce(new Error());
      expect(
        profileService.create({
          ...MOCK_CREATE_PROFILE,
          user: { connect: { id: MOCK_ID } },
        }),
      ).rejects.toThrowError();
    });
  });
  describe('FIND_ONE', () => {
    it('should be able to find one profile', async () => {
      const profile = await profileService.findOne({ id: MOCK_ID });
      expect(profile).toStrictEqual(MOCK_FIND_ONE_PROFILE_RESPONSE);
    });
    it('should to throw an exception', () => {
      profileServiceMock.findOne.mockRejectedValueOnce(new Error());
      expect(profileService.findOne({ id: MOCK_ID })).rejects.toThrowError();
    });
  });
  describe('UPDATE', () => {
    it('should be able to update a profile', async () => {
      const profile = await profileService.update({
        where: MOCK_FIND_ONE_PROFILE_RESPONSE,
        data: MOCK_UPDATE_PROFILE,
      });
      expect(profile).toStrictEqual({ id: '1' });
    });
    it('should to throw an exception', () => {
      profileServiceMock.update.mockRejectedValueOnce(new Error());
      expect(
        profileService.update({ where: {}, data: {} }),
      ).rejects.toThrowError();
    });
  });
  describe('REMOVE', () => {
    it('should be able to update a profile', async () => {
      const profile = await profileService.remove({
        id: MOCK_FIND_ONE_PROFILE_RESPONSE.id,
      });
      expect(profile).toStrictEqual({ id: '1' });
    });
    it('should to throw an exception', () => {
      profileServiceMock.remove.mockRejectedValueOnce(new Error());

      expect(profileService.remove({ id: MOCK_ID })).rejects.toThrowError();
    });
  });
});
