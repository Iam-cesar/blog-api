import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

describe('RoleController', () => {
  let roleController: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [RoleService, PrismaService],
    }).compile();

    roleController = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(roleController).toBeDefined();
  });
});
