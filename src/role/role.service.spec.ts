import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let roleService: RoleService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService, PrismaService],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(roleService).toBeDefined();
  });
  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });
});
