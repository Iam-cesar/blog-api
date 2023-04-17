import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../user/entities/user.entity';
import {
  MOCK_CREATE_USER,
  MOCK_FIND_ONE_USER_RESPONSE,
} from '../user/mock/userService.mock';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  let authService: AuthService;

  let userService: UserService;

  let jwtService: JwtService;

  let authHelper: AuthHelper;

  const accessToken = 'mock_access_token';

  const authServiceMock = {
    signin: jest.fn().mockResolvedValue({ accessToken }),
    signup: jest.fn().mockResolvedValue({ accessToken }),
    logout: jest.fn().mockResolvedValue(null),
    refreshToken: jest.fn().mockResolvedValue({ accessToken }),
  };

  const userServiceMock = {
    findOneWithPassword: jest
      .fn()
      .mockResolvedValue(new UserEntity(MOCK_CREATE_USER)),
    create: jest.fn().mockResolvedValue(new UserEntity(MOCK_CREATE_USER)),
  };

  const authHelperMock = {
    createHashPassword: jest.fn().mockResolvedValue('hash_password'),
  };

  const jwtServiceMock = {
    sign: jest.fn().mockResolvedValue('mock_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: AuthHelper,
          useValue: authHelperMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    authHelper = module.get<AuthHelper>(AuthHelper);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(authHelper).toBeDefined();
    expect(authController).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('SIGNIN', () => {
    it('should generate tokens to user on signin', async () => {
      const signin = await authController.signinLocal({
        user: MOCK_FIND_ONE_USER_RESPONSE,
      });

      expect(signin).toStrictEqual({ accessToken });
    });

    it('should to throw an exception', () => {
      authServiceMock.signin.mockRejectedValueOnce(new Error());

      expect(
        authController.signinLocal({ user: MOCK_FIND_ONE_USER_RESPONSE }),
      ).rejects.toThrowError();
    });
  });

  describe('SIGNUP', () => {
    it('should create a user and return tokens', async () => {
      const signup = await authController.signupLocal(MOCK_CREATE_USER);

      expect(signup).toStrictEqual({ accessToken });
    });

    it('should to throw an exception', () => {
      authServiceMock.signup.mockRejectedValueOnce(new Error());

      expect(
        authController.signupLocal(MOCK_CREATE_USER),
      ).rejects.toThrowError();
    });
  });

  describe('LOGOUT', () => {
    it('should create a user and return tokens', async () => {
      const logout = await authService.logout(MOCK_FIND_ONE_USER_RESPONSE.id);

      expect(logout).toStrictEqual(null);
    });

    it('should to throw an exception', () => {
      authServiceMock.logout.mockRejectedValueOnce(new Error());

      expect(
        authController.logout({ user: { id: MOCK_FIND_ONE_USER_RESPONSE.id } }),
      ).rejects.toThrowError();
    });
  });

  describe('REFRESH_TOKEN', () => {
    it('should refresh user access token', async () => {
      const refreshedToken = await authController.refreshTokenLocal({
        user: {
          id: MOCK_FIND_ONE_USER_RESPONSE.id,
          hashedRefreshToken: accessToken,
        },
      });

      expect(refreshedToken).toStrictEqual({ accessToken });
    });

    it('should to throw an exception', () => {
      authServiceMock.refreshToken.mockRejectedValueOnce(new Error());

      expect(
        authController.refreshTokenLocal({
          user: {
            id: MOCK_FIND_ONE_USER_RESPONSE.id,
            hashedRefreshToken: accessToken,
          },
        }),
      ).rejects.toThrowError();
    });
  });
});
