import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let userService: UserService;
  let jwtService: JwtService;
  let authHelper: AuthHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        UserService,
        JwtService,
        AuthHelper,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    authHelper = module.get<AuthHelper>(AuthHelper);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });
  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
  it('should be defined', () => {
    expect(jwtService).toBeDefined();
  });
  it('should be defined', () => {
    expect(authHelper).toBeDefined();
  });
});
