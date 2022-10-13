import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthHelper } from '../auth/auth.helper';
import { FindAllQueryDto } from '../helpers/dto/findAllQuery.dto';
import { MessageHelper } from '../helpers/message.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authHelper: AuthHelper,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateUserDto) {
    const { password } = data;

    const user = await this.userService.create({
      ...data,
      password: await this.authHelper.createHashPassword(password),
    });

    if (!user) throw new BadRequestException(MessageHelper.USER_BAD_REQUEST);

    return user;
  }

  @Get()
  @HttpCode(200)
  async findAll(
    @Query()
    query?: FindAllQueryDto,
  ) {
    const users = await this.userService.findAll({
      skip: Number(query.skip) || undefined,
      take: Number(query.take) || undefined,
    });

    if (!users) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

    return users;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne({ id });

    if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    const user = await this.userService.findOne({ id });

    if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

    return await this.userService.update({
      where: { id },
      data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/soft-delete')
  @HttpCode(200)
  async softRemove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne({ id });

    if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

    return await this.userService.softRemove({ id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/renew')
  @HttpCode(200)
  async renew(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne({ id });

    if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

    return this.userService.renew({ id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne({ id });

    if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

    return await this.userService.remove({ id });
  }
}
