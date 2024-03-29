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
    await this.findOneByName(data.name);

    const permitions = data.permitions || ['read'];

    const createRole = { ...data, permitions };

    const role = await this.roleService.create({
      ...createRole,
    });

    if (!role) throw new BadRequestException(MessageHelper.ROLE_BAD_REQUEST);

    return role;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':roleId/add-user/:userId')
  @HttpCode(201)
  async addUser(@Param('roleId') id: string, @Param('userId') userId: string) {
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
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':roleId/remove-user/:userId')
  @HttpCode(201)
  async removeUser(
    @Param('roleId') id: string,
    @Param('userId') userId: string,
  ) {
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
  }

  @Get()
  @HttpCode(200)
  async findAll(
    @Query()
    query?: FindAllQueryDto,
  ) {
    return await this.roleService.findAll({
      skip: Number(query?.skip) || undefined,
      take: Number(query?.take) || undefined,
    });
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const role = await this.roleService.findOne({ id });

    if (!role) throw new NotFoundException(MessageHelper.ROLE_NOT_FOUND);

    return role;
  }

  @Get(':id')
  @HttpCode(200)
  async findOneByName(@Param('name') name: string): Promise<void> {
    const role = await this.roleService.findOneByName({ name });
    if (role?.id)
      throw new BadRequestException(MessageHelper.ROLE_ALREADY_EXISTS);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
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
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    const role = await this.roleService.findOne({ id });

    if (!role) throw new NotFoundException(MessageHelper.ROLE_NOT_FOUND);

    return await this.roleService.remove({ id });
  }
}
