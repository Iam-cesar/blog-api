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
@UseGuards(AuthGuard('jwt'))
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateRoleDto) {
    const role = await this.roleService.create(data);

    if (!role) throw new BadRequestException(MessageHelper.ROLE_BAD_REQUEST);

    return role;
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

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    const role = await this.roleService.findOne({ id });

    if (!role) throw new NotFoundException(MessageHelper.ROLE_NOT_FOUND);

    return await this.roleService.update({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    const role = await this.roleService.findOne({ id });

    if (!role) throw new NotFoundException(MessageHelper.ROLE_NOT_FOUND);

    return await this.roleService.remove({ id });
  }
}
