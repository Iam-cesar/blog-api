import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() data: CreateProfileDto,
    @Req() req: { user: { id: number } },
  ) {
    const user = await this.userService.findOne({ id: req.user.id });
    return this.profileService.create({
      ...data,
      user: { connect: { id: user.id } },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.profileService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProfileDto) {
    return this.profileService.update({ where: { id: Number(id) }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.profileService.remove({ id: Number(id) });
  }
}
