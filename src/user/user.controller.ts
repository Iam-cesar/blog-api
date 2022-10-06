import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import authHelper from 'src/auth/auth.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const hashPassword = await authHelper.createHashPassword(password);
      return await this.userService.create({
        ...createUserDto,
        password: hashPassword,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  @Get()
  findAll(
    @Query()
    query?: {
      skip?: string;
      take?: string;
    },
  ) {
    return this.userService.findAll({
      skip: Number(query.skip) || undefined,
      take: Number(query.take) || undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update({
      where: { id: Number(id) },
      data,
    });
  }

  @Patch(':id/soft-delete')
  softRemove(@Param('id') id: string) {
    return this.userService.softRemove({ id: Number(id) });
  }

  @Patch(':id/renew')
  renew(@Param('id') id: string) {
    return this.userService.renew({ id: Number(id) });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({ id: Number(id) });
  }
}
