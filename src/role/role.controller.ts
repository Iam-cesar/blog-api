import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { FindAllQueryDto } from '../common/helpers/dto/findAllQuery.dto';
import { MessageHelper } from '../common/helpers/message.helper';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateRoleDto) {
    try {
      const roleByName = await this.roleService.findOneByName({
        name: data.name,
      });

      if (roleByName)
        throw new BadRequestException(MessageHelper.ROLE_ALREADY_EXISTS);

      const permitions = data.permitions || ['read'];

      const createRole = { ...data, permitions };

      const role = await this.roleService.create({
        ...createRole,
      });

      if (!role) throw new BadRequestException(MessageHelper.ROLE_BAD_REQUEST);

      return role;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':roleId/add-user/:userId')
  @HttpCode(201)
  async addUser(@Param('roleId') id: string, @Param('userId') userId: string) {
    try {
      if (!id) throw new BadRequestException(MessageHelper.ID_NOT_PROVIDED);

      if (!userId) throw new BadRequestException(MessageHelper.ID_NOT_PROVIDED);

      return await this.roleService.update({
        where: {
          id,
        },
        data: {
          user: { connect: { id: userId } },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':roleId/remove-user/:userId')
  @HttpCode(201)
  async removeUser(
    @Param('roleId') id: string,
    @Param('userId') userId: string,
  ) {
    try {
      if (!id) throw new BadRequestException(MessageHelper.ID_NOT_PROVIDED);

      if (!userId) throw new BadRequestException(MessageHelper.ID_NOT_PROVIDED);

      return await this.roleService.update({
        where: {
          id,
        },
        data: {
          user: { connect: { id } },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(
    @Query()
    query?: FindAllQueryDto,
  ) {
    try {
      return await this.roleService.findAll({
        skip: Number(query?.skip) || undefined,
        take: Number(query?.take) || undefined,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    try {
      const role = await this.roleService.findOne({ id });

      if (!role) throw new NotFoundException(MessageHelper.ROLE_NOT_FOUND);

      return role;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    try {
      const role = await this.roleService.findOne({ id });

      if (!role) throw new NotFoundException(MessageHelper.ROLE_NOT_FOUND);

      const updatedPermitions = new Set(
        [...data.permitions, role.permitions].flat(),
      );
      const permitions = Array.from(updatedPermitions);

      return await this.roleService.update({
        where: { id },
        data: { ...data, permitions },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    try {
      const role = await this.roleService.findOne({ id });

      if (!role) throw new NotFoundException(MessageHelper.ROLE_NOT_FOUND);

      return await this.roleService.remove({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
