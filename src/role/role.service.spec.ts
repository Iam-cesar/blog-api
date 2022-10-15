import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let roleService: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService, PrismaService],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(roleService).toBeDefined();
  });
});
