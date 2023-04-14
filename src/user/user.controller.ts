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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthHelper } from '../auth/auth.helper';
import { FindAllQueryDto } from '../common/helpers/dto/findAllQuery.dto';
import { MessageHelper } from '../common/helpers/message.helper';
import { exceptionIfContentDontBelongsToUser } from '../common/utils/userPermissionToContent';
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
    try {
      const { password } = data;

      const user = await this.userService.create({
        ...data,
        password: await this.authHelper.createHashPassword(password),
      });
      if (!user) throw new BadRequestException(MessageHelper.ROLE_BAD_REQUEST);

      return user;
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
      return await this.userService.findAll({
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
      const user = await this.userService.findOne({ id });

      if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @Req() req: { user: { id: string } },
  ) {
    try {
      const user = await this.userService.findOne({ id });

      if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

      exceptionIfContentDontBelongsToUser({ user: req.user, content: user });

      return await this.userService.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/soft-delete')
  @HttpCode(200)
  async softRemove(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne({ id });

      if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

      return await this.userService.softRemove({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/renew')
  @HttpCode(200)
  async renew(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne({ id });

      if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

      return this.userService.renew({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    try {
      const user = await this.userService.findOne({ id });

      if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

      exceptionIfContentDontBelongsToUser({ user: req.user, content: user });

      return await this.userService.remove({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
