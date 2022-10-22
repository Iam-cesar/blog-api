import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageHelper } from '../common/helpers/message.helper';
import { MOCK_CREATE_USER_RESPONSE as MOCK_CREATE_USER } from '../user/mock/userService.mock';
import { UserService } from './../user/user.service';
import { ProfileEntity } from './entities/profile.entity';
import {
  MOCK_CREATE_PROFILE,
  MOCK_FIND_ONE_PROFILE_RESPONSE,
  MOCK_UPDATE_PROFILE,
} from './mock/profileController.mock';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let profileController: ProfileController;
  let userService: UserService;

  const MOCK_ID = 1;
  const profileServiceMock = {
    create: jest.fn().mockResolvedValue({ id: 1 }),
    findOne: jest
      .fn()
      .mockResolvedValue(new ProfileEntity(MOCK_FIND_ONE_PROFILE_RESPONSE)),
    update: jest.fn().mockResolvedValue({ id: 1 }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
  };
  const userServiceMock = {
    findOne: jest.fn().mockResolvedValue(MOCK_CREATE_USER),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
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

    profileController = module.get<ProfileController>(ProfileController);

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(profileController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('CREATE', () => {
    it('should be able to create a profile', async () => {
      const user = await userService.findOne({ id: MOCK_ID });
      const profile = await profileController.create(MOCK_CREATE_PROFILE, {
        user: { id: user.id },
      });
      expect(profile).toStrictEqual({ id: MOCK_ID });
    });
    it('should to throw an exception user not found', () => {
      userServiceMock.findOne.mockResolvedValueOnce(null);
      expect(
        profileController.create(MOCK_CREATE_PROFILE, {
          user: { id: MOCK_ID },
        }),
      ).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.PROFILE_NOT_FOUND),
      );
    });

    it('should to throw an exception profile not found', () => {
      profileServiceMock.create.mockResolvedValueOnce(null);
      expect(
        profileController.create(MOCK_CREATE_PROFILE, {
          user: { id: MOCK_ID },
        }),
      ).rejects.toStrictEqual(
        new BadRequestException(MessageHelper.PROFILE_BAD_REQUEST),
      );
    });
  });
  describe('FIND_ONE', () => {
    it('should be able to find one profile', async () => {
      const profile = await profileController.findOne(MOCK_ID);
      expect(profile).toStrictEqual(
        new ProfileEntity(MOCK_FIND_ONE_PROFILE_RESPONSE),
      );
    });
    it('should to throw an exception', () => {
      profileServiceMock.findOne.mockResolvedValueOnce(null);
      expect(profileController.findOne(null)).rejects.toStrictEqual(
        new NotFoundException(MessageHelper.PROFILE_NOT_FOUND),
      );
    });
  });
  describe('UPDATE', () => {
    it('should be able to update a profile', async () => {
      const profile = await profileController.update(
        MOCK_ID,
        MOCK_UPDATE_PROFILE,
      );
      expect(profile).toStrictEqual({ id: 1 });
    });
    it('should to throw an exception', () => {
      profileServiceMock.findOne.mockResolvedValueOnce(null);
      expect(profileController.update(MOCK_ID, {})).rejects.toThrowError();
    });
  });
  describe('REMOVE', () => {
    it('should be able to update a profile', async () => {
      const profile = await profileController.remove(
        MOCK_FIND_ONE_PROFILE_RESPONSE.id,
      );
      expect(profile).toStrictEqual({ id: 1 });
    });
    it('should to throw an exception', () => {
      profileServiceMock.findOne.mockResolvedValueOnce(null);
      expect(profileController.remove(MOCK_ID)).rejects.toThrowError();
    });
  });
});
