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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { MessageHelper } from '../common/helpers/message.helper';
import { exceptionIfProfileDontBelongsToUser } from '../common/utils/userPermissionToContent';
import { UserService } from '../user/user.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  async create(
    @Body() data: CreateProfileDto,
    @Req() req: { user: { id: string } },
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
  async findOne(@Param('id') id: string) {
    const profile = await this.profileService.findOne({ id });

    if (!profile) throw new NotFoundException(MessageHelper.PROFILE_NOT_FOUND);

    return profile;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProfileDto,
    @Req() req: { user: { id: string } },
  ) {
    const profile = await this.profileService.findOne({ id });

    if (!profile) throw new NotFoundException(MessageHelper.PROFILE_NOT_FOUND);

    exceptionIfProfileDontBelongsToUser({ user: req.user, profile });

    return await this.profileService.update({
      where: { id },
      data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    const profile = await this.profileService.findOne({ id });

    if (!profile) throw new NotFoundException(MessageHelper.PROFILE_NOT_FOUND);

    exceptionIfProfileDontBelongsToUser({ user: req.user, profile });

    return await this.profileService.remove({ id });
  }
}
