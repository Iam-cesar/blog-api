import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { FIND_ONE_USER_MOCK_RESPONSE } from '../user/mock/userService.mock';
import { UserService } from '../user/user.service';
import { UserEntity } from './../user/entities/user.entity';
import { MOCK_CREATE_USER } from './../user/mock/userController.mock';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let authHelper: AuthHelper;

  const accessToken = 'mock_access_token';
  const refreshToken = 'mock_refresh_token';

  const authServiceMock = {
    signin: jest.fn().mockResolvedValue({ accessToken, refreshToken }),
    signup: jest.fn().mockResolvedValue({ accessToken, refreshToken }),
    logout: jest.fn().mockResolvedValue({ accessToken, refreshToken }),
    refreshToken: jest.fn().mockResolvedValue({ accessToken, refreshToken }),
    validateUser: jest.fn().mockResolvedValue(new UserEntity(MOCK_CREATE_USER)),
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

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    authHelper = module.get<AuthHelper>(AuthHelper);
  });

  it('should be defined', () => {
    expect(authHelper).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('SIGNIN', () => {
    it('should generate tokens to user on signin', async () => {
      const signin = await authService.signin(new UserEntity(MOCK_CREATE_USER));
      expect(signin).toStrictEqual({ accessToken, refreshToken });
    });
    it('should to throw an exception', () => {
      authServiceMock.signin.mockRejectedValueOnce(new Error());
      expect(
        authService.signin(new UserEntity(MOCK_CREATE_USER)),
      ).rejects.toThrowError();
    });
  });
  describe('SIGNUP', () => {
    it('should create a user and return tokens', async () => {
      const signup = await authService.signup(MOCK_CREATE_USER);
      expect(signup).toStrictEqual({ accessToken, refreshToken });
    });
    it('should to throw an exception', () => {
      authServiceMock.signup.mockRejectedValueOnce(new Error());
      expect(authService.signup(MOCK_CREATE_USER)).rejects.toThrowError();
    });
  });
  describe('LOGOUT', () => {
    it('should create a user and return tokens', async () => {
      const logout = await authService.logout(FIND_ONE_USER_MOCK_RESPONSE.id);
      expect(logout).toStrictEqual({ accessToken, refreshToken });
    });
    it('should to throw an exception', () => {
      authServiceMock.logout.mockRejectedValueOnce(new Error());
      expect(
        authService.logout(FIND_ONE_USER_MOCK_RESPONSE.id),
      ).rejects.toThrowError();
    });
  });
  describe('REFRESH_TOKEN', () => {
    it('should refresh user access token', async () => {
      const refreshedToken = await authService.refreshToken({
        id: FIND_ONE_USER_MOCK_RESPONSE.id,
        requestRefreshToken: accessToken,
      });
      expect(refreshedToken).toStrictEqual({ accessToken, refreshToken });
    });
    it('should to throw an exception', () => {
      authServiceMock.refreshToken.mockRejectedValueOnce(new Error());
      expect(
        authService.refreshToken({
          id: FIND_ONE_USER_MOCK_RESPONSE.id,
          requestRefreshToken: accessToken,
        }),
      ).rejects.toThrowError();
    });
  });
  describe('VALIDATE_USER', () => {
    it('should be able to validate a user', async () => {
      const refreshedToken = await authService.validateUser(
        MOCK_CREATE_USER.email,
        MOCK_CREATE_USER.password,
      );
      expect(refreshedToken).toStrictEqual(new UserEntity(MOCK_CREATE_USER));
    });
    it('should to throw an exception', () => {
      authServiceMock.validateUser.mockRejectedValueOnce(new Error());
      expect(
        authService.validateUser(
          MOCK_CREATE_USER.email,
          MOCK_CREATE_USER.password,
        ),
      ).rejects.toThrowError();
    });
  });
});
