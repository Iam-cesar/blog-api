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
import { AuthHelper } from 'src/auth/auth.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    try {
      const { password } = data;
      return await this.userService.create({
        ...data,
        password: await new AuthHelper().createHashPassword(password),
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
