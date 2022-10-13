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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { MessageHelper } from '../helpers/message.helper';
import { UserService } from '../user/user.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() data: CreateProfileDto,
    @Req() req: { user: { id: number } },
  ) {
    const user = await this.userService.findOne({ id: req.user.id });

    if (!user) throw new NotFoundException(MessageHelper.PROFILE_NOT_FOUND);

    const profile = await this.profileService.create({
      ...data,
      user: { connect: { id: user.id } },
    });

    if (!profile)
      throw new BadRequestException(MessageHelper.PROFILE_BAD_REQUEST);

    return profile;
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const profile = await this.profileService.findOne({ id });

    if (!profile) throw new NotFoundException(MessageHelper.PROFILE_NOT_FOUND);

    return profile;
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProfileDto,
  ) {
    const profile = await this.profileService.findOne({ id });

    if (!profile) throw new NotFoundException(MessageHelper.PROFILE_NOT_FOUND);

    return await this.profileService.update({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const profile = await this.profileService.findOne({ id });

    if (!profile) throw new NotFoundException(MessageHelper.PROFILE_NOT_FOUND);

    return await this.profileService.remove({ id });
  }
}
