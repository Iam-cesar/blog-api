import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@Controller('role')
@UseGuards(AuthGuard('jwt'))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() data: CreateRoleDto) {
    return this.roleService.create(data);
  }

  @Get()
  findAll(
    @Query()
    query?: {
      skip?: string;
      take?: string;
    },
  ) {
    return this.roleService.findAll({
      skip: Number(query.skip) || undefined,
      take: Number(query.skip) || undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return this.roleService.update({ where: { id: Number(id) }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove({ id: Number(id) });
  }
}
